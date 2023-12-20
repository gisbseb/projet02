import React from "react";

import MyChart from "./MyChart";
import useFetch from "../../../../hooks/useFetch";

const CategoryChart = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8000/furniture/categorie"
  );
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  const getCategorieLabel = (item) => item.name;
  const getCategorieCount = (item) => item.count;

  return (
    <>
      <MyChart
        data={data}
        chartId="chartCategory"
        label="Meubles par catégories"
        getLabel={getCategorieLabel}
        getValue={getCategorieCount}
        chartType="bar"
      />
    </>
  );
};

export default CategoryChart;
