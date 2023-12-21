import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../components/modal/Modal";
import useFetch from "../../../hooks/useFetch";
import { useSnackbar } from "../../../context/SnackBarContext";

const EditFurniture = ({ furniture, refetch, categories }) => {
  const { addSnackbar } = useSnackbar();
  const [isEditFurnitureOpen, setIsEditFurnitureOpen] = useState(false);

  const [furnitureData, setFurnitureData] = useState({
    name: furniture.name,
    category: furniture.categorieId,
  });
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFurnitureData({ ...furnitureData, [name]: value });
  };
  useEffect(() => {
    if (furniture) {
      setImagePreview(`http://localhost:8000/images/${furniture.filename}`);
    }
  }, [furniture, isEditFurnitureOpen]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("categorie", furnitureData.category);
    formData.append("name", furnitureData.name);

    try {
      const response = await fetch(
        `http://localhost:8000/furniture/${furniture.id}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      const responseData = await response.json();
      addSnackbar(responseData.message, responseData.className);
    } catch (err) {
      console.log(err);
    }
    refetch();
    setIsEditFurnitureOpen(false);
  };

  return (
    <div className="edit-furniture">
      <button onClick={() => setIsEditFurnitureOpen(true)}>Edit</button>
      <Modal isOpen={isEditFurnitureOpen} setIsOpen={setIsEditFurnitureOpen}>
        {furniture && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom</label>
              <br />
              <input
                type="text"
                value={furnitureData.name}
                onChange={(e) =>
                  setFurnitureData({ ...furnitureData, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Catégorie</label>
              <br />
              <select
                id="category"
                name="category"
                value={furnitureData.category}
                onChange={handleChange}
              >
                <>
                  <option value="" disabled>
                    Sélectionner une catégorie
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      selected={category.id === furnitureData.category}
                    >
                      {category.name}
                    </option>
                  ))}
                </>
              </select>
            </div>
            <div className="form-group img-group container">
              <div>
                <label>Image</label>
                <br />
                <input
                  ref={imageRef}
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                {image ? (
                  <img
                    className="preview"
                    src={URL.createObjectURL(image)}
                    alt="Nouvelle Furniture"
                  />
                ) : (
                  <img className="preview" src={imagePreview} alt="Furniture" />
                )}
              </div>
            </div>
            <button type="submit">Mettre à jour</button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default EditFurniture;
