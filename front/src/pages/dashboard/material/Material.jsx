import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
const Material = ({ pageTitle, currentPage }) => {
  const { data, loading, error } = useFetch("http://localhost:8000/material");

  useEffect(() => {
    console.log(data);
  }, [data]);
  if (pageTitle != currentPage) return;
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  return (
    <div className="container">
      <h2>Matériaux</h2>
      <table className="dash-table ">
        <thead>
          <tr>
            <th>N°</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{el.name}</td>
              <td>{el.stock}</td>
              <td>
                <button>Voir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Material;
