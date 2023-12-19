import { useEffect } from "react";
import NewFurniture from "./NewFurniture";
import useFetch from "../../../hooks/useFetch";
const Furniture = ({ pageTitle, currentPage }) => {
  const { data, loading, error } = useFetch("http://localhost:8000/furniture");

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;
  if (pageTitle != currentPage) return;

  return (
    <>
      <NewFurniture />

      <div className="container">
        <h2>Créations</h2>
        <table className="dash-table container">
          <thead>
            <tr>
              <th>N°</th>
              <th>Nom</th>
              <th>Nombre</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{el.name}</td>
                <td>{el.creationCount}</td>
                <td>
                  <button>Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Furniture;
