// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">Focus Point</Link>
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}
