import React, { useEffect } from "react";

import useFetch from "../../../../hooks/useFetch";
import MyChart from "./MyChart.jsx";

const MaterialsChart = ({ currentPage, pageTitle }) => {
  if (currentPage != pageTitle) return;

  const { data, loading, error } = useFetch(
    "http://localhost:8000/material/count"
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  const getMaterialLabel = (item) => item.name;
  const getMaterialValue = (item) => item.usage;

  return (
    <MyChart
      data={data}
      chartId="chartMaterial"
      label="Matériaux utilisés"
      getLabel={getMaterialLabel}
      getValue={getMaterialValue}
      chartType="doughnut"
    />
  );
};

export default MaterialsChart;
