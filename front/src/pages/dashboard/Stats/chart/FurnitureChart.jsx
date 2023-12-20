import React from "react";

import MyChart from "./MyChart";
import useFetch from "../../../../hooks/useFetch";

const FurnitureChart = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/furniture");
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  const getFurnitureLabel = (item) => item.name;
  const getFurnitureValue = (item) => item.creationCount;

  return (
    <>
      <MyChart
        data={data}
        chartId="chartFurniture"
        label="Meubles les plus créer"
        getLabel={getFurnitureLabel}
        getValue={getFurnitureValue}
        chartType="doughnut"
      />
    </>
  );
};

export default FurnitureChart;
