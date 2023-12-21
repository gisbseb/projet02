import { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import Material from "../dashboard/material/Material";
import Furniture from "../dashboard/furniture/Furniture";
import Card from "../../components/card/Card";
const Homepage = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/furniture");

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  return (
    <div className="homepage page">
      <div className="card-container">
        {data.map((furniture, idx) => (
          <Card key={idx} data={furniture} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
