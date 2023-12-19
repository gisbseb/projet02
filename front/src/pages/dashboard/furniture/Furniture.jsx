import { useEffect, useState } from "react";
import NewFurniture from "./NewFurniture";
import useFetch from "../../../hooks/useFetch";
import { Modal } from "../../../components/modal/Modal";
const Furniture = ({ pageTitle, currentPage }) => {
  const [isAddFurnitureOpen, setIsAddFurnitureOpen] = useState(false);
  const { data, loading, error, refetch } = useFetch(
    "http://localhost:8000/furniture"
  );

  useEffect(() => {
    refetch("http://localhost:8000/furniture");
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;
  if (pageTitle != currentPage) return;

  return (
    <>
      <Modal isOpen={isAddFurnitureOpen} setIsOpen={setIsAddFurnitureOpen}>
        <NewFurniture setIsOpen={setIsAddFurnitureOpen} />
      </Modal>
      {!isAddFurnitureOpen && (
        <button onClick={() => setIsAddFurnitureOpen(true)}>
          Nouvelle création
        </button>
      )}

      <div className="container">
        <h2>Créations</h2>

        <table className="dash-table container">
          <thead>
            <tr>
              <th>N°</th>
              <th>Nom</th>
              <th>Nombre</th>
              <th>Ajouter</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{el.name}</td>
                <td>{el.creationCount}</td>
                <td>
                  <span className="add hover-fade">+</span>
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
