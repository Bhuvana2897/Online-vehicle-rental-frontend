import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function AddVehiclePage() {
  const [form, setForm] = useState({
    title: "",
    make: "",
    model: "",
    year: "",
    type: "Car",
    pricePerDay: "",
    location: "",
    availability: true,
    images: "",
    description: "",
    fuelType: "",
    transmission: "",
    seats: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("make", form.make);
      formData.append("model", form.model);
      formData.append("year", form.year);
      formData.append("type", form.type);
      formData.append("pricePerDay", form.pricePerDay);
      formData.append("location", form.location);
      formData.append("availability", form.availability);
      formData.append("description", form.description);
      formData.append("fuelType", form.fuelType);
      formData.append("transmission", form.transmission);
      formData.append("seats", form.seats);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await api.post("/vehicles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Vehicle submitted");

      setForm({
        title: "",
        make: "",
        model: "",
        year: "",
        type: "Car",
        pricePerDay: "",
        location: "",
        availability: true,
        images: "",
        description: "",
        fuelType: "",
        transmission: "",
        seats: "",
      });

      setImageFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add vehicle");
    }
  };

  return (
    <div className="max-w-3xl mx-auto card p-6">
      <h1 className="text-2xl font-bold mb-4">Add Vehicle Listing</h1>

      <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-3">
        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          className="input"
          placeholder="Make"
          value={form.make}
          onChange={(e) => setForm({ ...form, make: e.target.value })}
          required
        />

        <input
          className="input"
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          required
        />

        <input
          className="input"
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <select
          className="input"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Car</option>
          <option>Bike</option>
          <option>Scooter</option>
          <option>SUV</option>
          <option>Van</option>
          <option>Truck</option>
        </select>

        <input
          className="input"
          type="number"
          placeholder="Price per day"
          value={form.pricePerDay}
          onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
          required
        />

        <input
          className="input"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <input
          className="input"
          placeholder="Fuel Type"
          value={form.fuelType}
          onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
        />

        <input
          className="input"
          placeholder="Transmission"
          value={form.transmission}
          onChange={(e) => setForm({ ...form, transmission: e.target.value })}
        />

        <input
          className="input"
          type="number"
          placeholder="Seats"
          value={form.seats}
          onChange={(e) => setForm({ ...form, seats: e.target.value })}
        />

        <input
          className="input md:col-span-2"
          placeholder="Images URLs (comma separated)"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
        />

        <textarea
          className="input md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <button className="btn btn-primary md:col-span-2">
          Submit Vehicle
        </button>
      </form>
    </div>
  );
}

export default AddVehiclePage;


