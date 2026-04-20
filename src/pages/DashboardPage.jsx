import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import PaymentButton from "../components/PaymentButton";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState({ bookings: [], payments: [], reviews: [] });
  const [reviewForm, setReviewForm] = useState({ bookingId: "", rating: 5, comment: "" });

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/users/dashboard");
      setDashboard(data);
    } catch (error) {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cancelBooking = async (id) => {
    try {
      await api.patch(`/bookings/${id}/cancel`);
      toast.success("Booking cancelled");
      fetchDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reviews", reviewForm);
      toast.success("Review submitted for moderation");
      setReviewForm({ bookingId: "", rating: 5, comment: "" });
      fetchDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Review failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Dashboard</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="card p-4">
          <h2 className="text-xl font-bold mb-4">My Bookings</h2>
          <div className="space-y-4">
            {dashboard.bookings.map((booking) => (
              <div key={booking._id} className="border border-slate-200 rounded-xl p-4">
                <p className="font-semibold">{booking.vehicle?.title}</p>
                <p className="text-sm">Dates: {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
                <p className="text-sm">Amount: ₹{booking.totalAmount}</p>
                <p className="text-sm">Booking Status: {booking.bookingStatus}</p>
                <p className="text-sm mb-3">Payment Status: {booking.paymentStatus}</p>
                <div className="flex flex-wrap gap-2">
                  {booking.paymentStatus !== "paid" && booking.bookingStatus !== "cancelled" && (
                    <PaymentButton booking={booking} onSuccess={fetchDashboard} />
                  )}
                  {booking.bookingStatus !== "cancelled" && (
                    <button onClick={() => cancelBooking(booking._id)} className="btn btn-danger">Cancel</button>
                  )}
                </div>
              </div>
            ))}
            {dashboard.bookings.length === 0 && <p className="text-slate-500">No bookings yet.</p>}
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-xl font-bold mb-4">My Payments</h2>
          <div className="space-y-3">
            {dashboard.payments.map((payment) => (
              <div key={payment._id} className="border border-slate-200 rounded-xl p-4">
                <p className="font-semibold">{payment.booking?.vehicle?.title}</p>
                <p className="text-sm">Invoice: {payment.invoiceNumber}</p>
                <p className="text-sm">Amount: ₹{payment.amount}</p>
                <p className="text-sm">Status: {payment.status}</p>
              </div>
            ))}
            {dashboard.payments.length === 0 && <p className="text-slate-500">No payments yet.</p>}
          </div>
        </section>
      </div>

      <section className="card p-4">
        <h2 className="text-xl font-bold mb-4">Leave Review</h2>
        <form onSubmit={submitReview} className="grid md:grid-cols-3 gap-3">
          <select className="input" value={reviewForm.bookingId} onChange={(e) => setReviewForm({ ...reviewForm, bookingId: e.target.value })} required>
            <option value="">Select Completed/Confirmed Booking</option>
            {dashboard.bookings.map((booking) => (
              <option key={booking._id} value={booking._id}>
                {booking.vehicle?.title} - {booking.bookingStatus}
              </option>
            ))}
          </select>
          <select className="input" value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}>
            {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} Star</option>)}
          </select>
          <input className="input" placeholder="Your review" value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} required />
          <button className="btn btn-primary md:col-span-3">Submit Review</button>
        </form>
      </section>
    </div>
  );
}
