import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { userInfo, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="container-app h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-700">VehicleRent</Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className="text-sm font-medium">Home</NavLink>
          {userInfo ? (
            <>
              <NavLink to="/dashboard" className="text-sm font-medium">Dashboard</NavLink>
              <NavLink to="/add-vehicle" className="text-sm font-medium">Add Vehicle</NavLink>
              {userInfo.role === "admin" && <NavLink to="/admin" className="text-sm font-medium">Admin</NavLink>}
              <button onClick={logout} className="btn btn-danger">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm font-medium">Login</NavLink>
              <NavLink to="/register" className="btn btn-primary">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
