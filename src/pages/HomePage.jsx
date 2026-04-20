import { useEffect, useState } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard";

export default function HomePage() {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    location: "",
    minPrice: "",
    maxPrice: ""
  });

  const fetchVehicles = async () => {
    const query = new URLSearchParams(filters).toString();
    const { data } = await api.get(`/vehicles?${query}`);
    setVehicles(data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    fetchVehicles();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-blue-700 text-white p-8">
        <h1 className="text-4xl font-bold mb-3">Online Vehicle Rental System</h1>
        <p className="max-w-2xl">Search, book, pay and manage rentals for cars, bikes, scooters, SUVs and more.</p>
      </section>

      <form onSubmit={submitHandler} className="card p-4 grid md:grid-cols-5 gap-3">
        <input className="input" placeholder="Search make/model" value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} />
        <select className="input" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All Types</option>
          <option>Car</option>
          <option>Bike</option>
          <option>Scooter</option>
          <option>SUV</option>
          <option>Van</option>
          <option>Truck</option>
        </select>
        <input className="input" placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <input className="input" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
        <input className="input" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
        <button className="btn btn-primary md:col-span-5">Search Vehicles</button>
      </form>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => <VehicleCard key={vehicle._id} vehicle={vehicle} />)}
      </section>
    </div>
  );
}
