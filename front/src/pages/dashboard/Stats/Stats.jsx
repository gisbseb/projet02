import React from "react";
import MaterialsChart from "./chart/MaterialsChart";
import FurnitureChart from "./chart/FurnitureChart";
import "./stats.scss";
import CategoryChart from "./chart/CategorieChart";
const Stats = () => {
  return (
    <div className="stats">
      <MaterialsChart />
      <FurnitureChart />
      <CategoryChart />
    </div>
  );
};

export default Stats;
