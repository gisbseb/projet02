import "./Navbar.scss";
const logoUrl = "src/assets/logo.png";
const userUrl = "src/assets/icones/user.png";
const Navbar = () => {
  return (
    <nav className="navbar bg-white">
      <div>
        <img className="logo" src={logoUrl} />
      </div>
      <ul>
        <li>
          <img className="icone hover-fade" src={userUrl} alt="utilisateur" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
