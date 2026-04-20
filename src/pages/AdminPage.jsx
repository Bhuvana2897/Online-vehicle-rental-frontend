import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [maintenance, setMaintenance] = useState({
    vehicle: "",
    title: "",
    details: "",
    serviceDate: "",
    cost: "",
    nextServiceDate: ""
  });

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch (error) {
      toast.error("Failed to load admin dashboard");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateVehicleStatus = async (id, status) => {
    await api.patch(`/admin/vehicles/${id}/status`, { status });
    toast.success("Vehicle status updated");
    fetchData();
  };

  const moderateReview = async (id, status) => {
    await api.patch(`/reviews/${id}/moderate`, { status });
    toast.success("Review moderated");
    fetchData();
  };

  const completeBooking = async (id) => {
    await api.patch(`/admin/bookings/${id}/complete`);
    toast.success("Booking marked complete");
    fetchData();
  };

  const addMaintenance = async (e) => {
    e.preventDefault();
    try {
      await api.post("/maintenance", maintenance);
      toast.success("Maintenance record added");
      setMaintenance({ vehicle: "", title: "", details: "", serviceDate: "", cost: "", nextServiceDate: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="card p-4"><p className="text-sm">Users</p><h3 className="text-2xl font-bold">{data.stats.usersCount}</h3></div>
        <div className="card p-4"><p className="text-sm">Vehicles</p><h3 className="text-2xl font-bold">{data.stats.vehiclesCount}</h3></div>
        <div className="card p-4"><p className="text-sm">Bookings</p><h3 className="text-2xl font-bold">{data.stats.bookingsCount}</h3></div>
        <div className="card p-4"><p className="text-sm">Revenue</p><h3 className="text-2xl font-bold">₹{data.stats.revenue}</h3></div>
      </div>

      <section className="card p-4">
        <h2 className="text-xl font-bold mb-4">Pending Vehicle Approvals</h2>
        <div className="space-y-3">
          {data.pendingVehicles.map((item) => (
            <div key={item._id} className="border rounded-xl p-4 flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm">{item.make} {item.model} - ₹{item.pricePerDay}/day</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateVehicleStatus(item._id, "approved")} className="btn btn-primary">Approve</button>
                <button onClick={() => updateVehicleStatus(item._id, "rejected")} className="btn btn-danger">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-4">
        <h2 className="text-xl font-bold mb-4">Pending Reviews</h2>
        <div className="space-y-3">
          {data.pendingReviews.map((item) => (
            <div key={item._id} className="border rounded-xl p-4 flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-semibold">{item.vehicle?.title}</p>
                <p className="text-sm">By {item.user?.name} | Rating {item.rating}</p>
                <p className="text-sm">{item.comment}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => moderateReview(item._id, "approved")} className="btn btn-primary">Approve</button>
                <button onClick={() => moderateReview(item._id, "rejected")} className="btn btn-danger">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-4">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        <div className="space-y-3">
          {data.recentBookings.map((item) => (
            <div key={item._id} className="border rounded-xl p-4 flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-semibold">{item.vehicle?.title}</p>
                <p className="text-sm">User: {item.user?.name}</p>
                <p className="text-sm">Status: {item.bookingStatus} | Payment: {item.paymentStatus}</p>
              </div>
              <button onClick={() => completeBooking(item._id)} className="btn btn-primary">Mark Complete</button>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-4">
        <h2 className="text-xl font-bold mb-4">Add Maintenance Record</h2>
        <form onSubmit={addMaintenance} className="grid md:grid-cols-2 gap-3">
          <input className="input" placeholder="Vehicle ID" value={maintenance.vehicle} onChange={(e) => setMaintenance({ ...maintenance, vehicle: e.target.value })} required />
          <input className="input" placeholder="Title" value={maintenance.title} onChange={(e) => setMaintenance({ ...maintenance, title: e.target.value })} required />
          <input className="input" placeholder="Details" value={maintenance.details} onChange={(e) => setMaintenance({ ...maintenance, details: e.target.value })} required />
          <input className="input" type="date" value={maintenance.serviceDate} onChange={(e) => setMaintenance({ ...maintenance, serviceDate: e.target.value })} required />
          <input className="input" placeholder="Cost" value={maintenance.cost} onChange={(e) => setMaintenance({ ...maintenance, cost: e.target.value })} />
          <input className="input" type="date" value={maintenance.nextServiceDate} onChange={(e) => setMaintenance({ ...maintenance, nextServiceDate: e.target.value })} />
          <button className="btn btn-primary md:col-span-2">Save Maintenance Record</button>
        </form>
      </section>
    </div>
  );
}
