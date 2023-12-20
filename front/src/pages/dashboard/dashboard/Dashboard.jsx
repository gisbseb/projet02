import { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Categorie from "../categorie/Categorie";
import Company from "../company/Company";
import Furniture from "../furniture/Furniture";
import Material from "../material/Material";
import "./dashboard.scss";
import Stats from "../Stats/Stats";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("stats");

  const switchPage = (newPage) => {
    setCurrentPage(newPage);
  };
  let content;
  switch (currentPage) {
    case "stats":
      content = <Stats />;
      break;
    case "furniture":
      content = <Furniture />;
      break;
    case "company":
      content = <Company />;
      break;
    case "categorie":
      content = <Categorie />;
      break;
    case "material":
      content = <Material />;
      break;
    default:
      content = <Stats />;
  }

  return (
    <div className="dashboard">
      <Sidebar switchPage={switchPage} currentPage={currentPage} />
      <div className="content">{content}</div>
    </div>
  );
};

export default Dashboard;
