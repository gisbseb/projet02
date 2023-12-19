import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./Homepage.scss";
import useFetch from "../../hooks/useFetch";
const Homepage = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/furniture");
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  return (
    <div className="homepage">
      <div className="card-container">
        {data.map((furniture, idx) => (
          <Card key={idx} data={furniture} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
