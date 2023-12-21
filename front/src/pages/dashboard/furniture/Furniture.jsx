import { useEffect, useState } from "react";
import NewFurniture from "./NewFurniture";
import useFetch from "../../../hooks/useFetch";
import { Modal } from "../../../components/modal/Modal";
import IncrementFurniture from "./IncrementFurniture";
import DeleteFurniture from "./DeleteFurniture";
import EditFurniture from "./EditFurniture";
const Furniture = () => {
  const [isAddFurnitureOpen, setIsAddFurnitureOpen] = useState(false);
  const { data, loading, error, refetch } = useFetch(
    "http://localhost:8000/furniture"
  );

  const {
    data: categories,
    loading: catLoading,
    error: catError,
  } = useFetch("http://localhost:8000/categorie", { credentials: "include" });
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  return (
    <>
      <Modal isOpen={isAddFurnitureOpen} setIsOpen={setIsAddFurnitureOpen}>
        <NewFurniture setIsOpen={setIsAddFurnitureOpen} refetch={refetch} />
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
              <th>Modifier</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{el.name}</td>
                <td>{el.creationCount}</td>
                <td>
                  <IncrementFurniture
                    furnitureId={el.id}
                    refetch={refetch}
                    materials={el.Materials}
                  />
                </td>
                <td>
                  {categories && (
                    <EditFurniture
                      furniture={el}
                      refetch={refetch}
                      categories={categories}
                    />
                  )}
                </td>
                <td>
                  <DeleteFurniture furnitureId={el.id} refetch={refetch} />
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
