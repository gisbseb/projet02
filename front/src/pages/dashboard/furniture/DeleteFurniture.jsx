import { useState } from "react";
import { Modal } from "../../../components/modal/Modal";
import { useSnackbar } from "../../../context/SnackBarContext";

const DeleteFurniture = ({ furnitureId, refetch }) => {
  const { addSnackbar } = useSnackbar();
  const [isDeleteFurnitureOpen, setIsDeleteFurnitureOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/furniture/${furnitureId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const responseData = await response.json();
      addSnackbar(responseData.message, responseData.className);
    } catch (error) {
      console.error("err:", error.message);
    }
    setIsDeleteFurnitureOpen(false);
    refetch();
  };
  return (
    <div className="edit-furniture">
      <button onClick={() => setIsDeleteFurnitureOpen(true)}>Supprimer</button>
      <Modal
        isOpen={isDeleteFurnitureOpen}
        setIsOpen={setIsDeleteFurnitureOpen}
      >
        <h2>Confirmer la suppression</h2>
        <br />
        <button onClick={handleDelete}>Supprimer</button>
      </Modal>
    </div>
  );
};

export default DeleteFurniture;
