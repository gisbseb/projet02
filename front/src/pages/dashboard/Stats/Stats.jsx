import React from "react";
import MaterialsChart from "./chart/MaterialsChart";
import FurnitureChart from "./chart/FurnitureChart";
import "./stats.scss";
const Stats = ({ currentPage, pageTitle }) => {
  if (currentPage != pageTitle) return;

  return (
    <div className="stats">
      <MaterialsChart />
      <FurnitureChart />
    </div>
  );
};

export default Stats;
