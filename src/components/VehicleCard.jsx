import { Link } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
  return (
    <div className="card overflow-hidden">
      <img
        src={vehicle.image ? vehicle.image : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"}
        alt={vehicle.title || `${vehicle.make} ${vehicle.model}`}
        className="h-52 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">
          {vehicle.title || `${vehicle.make} ${vehicle.model}`}
        </h3>

        <p className="text-sm text-slate-600">
          {vehicle.make} • {vehicle.model} • {vehicle.year}
        </p>

        <p className="text-sm text-slate-600">
          {vehicle.type} • {vehicle.location}
        </p>

        <p className="font-semibold text-blue-700">
          ₹{vehicle.pricePerDay}/day
        </p>

        <p className="text-sm">
          ⭐ {vehicle.averageRating?.toFixed?.(1) || 0} ({vehicle.totalReviews || 0})
        </p>

        <Link
          to={`/vehicles/${vehicle._id}`}
          className="btn btn-primary inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}