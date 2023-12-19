import "./sidebar.scss";
const Sidebar = ({ switchPage, currentPage }) => {
  return (
    <div className="sidebar bg-white container">
      <ul>
        <li
          className={`hover-fade  ${currentPage == "stats" ? "active" : ""}`}
          onClick={() => switchPage("stats")}
        >
          Dashboard
        </li>

        <li
          className={`hover-fade  ${
            currentPage == "furniture" ? "active" : ""
          }`}
          onClick={() => switchPage("furniture")}
        >
          Créations
        </li>
        <li
          className={`hover-fade  ${currentPage == "company" ? "active" : ""}`}
          onClick={() => switchPage("company")}
        >
          Fournisseurs
        </li>
        <li
          className={`hover-fade ${currentPage == "material" ? "active" : ""}`}
          onClick={() => switchPage("material")}
        >
          Matériaux
        </li>
        <li
          className={`hover-fade  ${
            currentPage == "categorie" ? "active" : ""
          }`}
          onClick={() => switchPage("categorie")}
        >
          Catégories
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
