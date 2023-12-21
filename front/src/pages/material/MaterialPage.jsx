import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./MaterialPage.scss";
import Card from "../homepage/components/Card";
const MaterialPage = () => {
  const { materialId } = useParams();

  const {
    data: material,
    loading,
    error,
  } = useFetch(`http://localhost:8000/material/${materialId}`);

  useEffect(() => {
    console.log(material);
  }, [material]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  return (
    <div className="material-page page">
      <section className="single-material container">
        <h1>{material.name}</h1>
        <p>{material.description}</p>
      </section>
      <section className="card-container">
        {material.Furniture.map((el, idx) => {
          return <Card key={idx} data={el} />;
        })}
      </section>
    </div>
  );
};

export default MaterialPage;
