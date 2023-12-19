import { NavLink } from "react-router-dom";
import "./Navbar.scss";
const logoUrl = "src/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar bg-white">
      <div>
        <NavLink to={"/"} className="hover-fade">
          <img className="logo" src={logoUrl} />
        </NavLink>
      </div>
      <ul>
        <li className="hover-fade">
          <NavLink to={"connexion"}>Connexion</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
