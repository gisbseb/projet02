import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import AddMaterial from "./AddMaterial";
import { Modal } from "../../../components/modal/Modal";
const Material = ({ pageTitle, currentPage }) => {
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState();
  const { data, loading, error, refetch } = useFetch(
    "http://localhost:8000/material"
  );

  if (pageTitle != currentPage) return;
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  return (
    <div className="container">
      <Modal isOpen={isAddMaterialOpen} setIsOpen={setIsAddMaterialOpen}>
        <AddMaterial
          material={currentMaterial}
          setIsOpen={setIsAddMaterialOpen}
          refetch={refetch}
        />
      </Modal>
      <h2>Matériaux</h2>
      <table className="dash-table ">
        <thead>
          <tr>
            <th>N°</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Commande</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{el.name}</td>
              <td>{el.stock}</td>
              <td>
                <button
                  onClick={() => {
                    setCurrentMaterial(el);
                    setIsAddMaterialOpen(true);
                  }}
                >
                  Commander
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Material;
