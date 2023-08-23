import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Logo
      </Link>
      <Link to="/create" className="cart">
        Create
      </Link>
    </nav>
  );
};
