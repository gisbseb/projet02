const IncrementFurniture = ({ furnitureId, refetch }) => {
  const handleIncrement = () => {
    console.log(furnitureId, "+1");

    refetch();
  };

  return (
    <span onClick={handleIncrement} className="add hover-fade">
      +
    </span>
  );
};

export default IncrementFurniture;
