import "./card.scss";
const Card = (data) => {
  return (
    <div className="container card bg-white">
      <div>
        <div className="card-img">Img</div>
      </div>
      <h2>{data.data.name}</h2>
      <div className="keyword-container">
        <span className={`keyword hover-fade ${"fer"}`}>Fer</span>
        <span className="keyword hover-fade">Noyer</span>
      </div>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis ab
        numquam veniam eligendi tenetur.
      </p>

      <button>Voir</button>
    </div>
  );
};

export default Card;
