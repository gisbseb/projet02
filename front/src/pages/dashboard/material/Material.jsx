import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import AddMaterial from "./AddMaterial";
import { Modal } from "../../../components/modal/Modal";
import UpdateMaterial from "./UpdateMaterial";
const Material = () => {
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [isUpdateMaterialOpen, setIsUpdateMaterialOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState();
  const { data, loading, error, refetch } = useFetch(
    "http://localhost:8000/material"
  );

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
      <Modal isOpen={isUpdateMaterialOpen} setIsOpen={setIsUpdateMaterialOpen}>
        <UpdateMaterial
          material={currentMaterial}
          setIsOpen={setIsUpdateMaterialOpen}
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
            <th>Modifier</th>
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
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    setCurrentMaterial(el);
                    setIsUpdateMaterialOpen(true);
                  }}
                >
                  Modifier
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
