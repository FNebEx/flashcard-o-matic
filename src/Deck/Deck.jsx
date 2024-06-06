import { Link } from "react-router-dom";

function Deck({ name, description, id, cards, handleDelete }) {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{name}</h5>
          <span>{cards} of cards</span>
        </div>
        <p className="card-text">{description}</p>
        {/* TODO: Have view and study to the left and delete to the right */}
        <div className="d-flex">
          <div className="">
            <Link className="btn btn-secondary mr-2" to={`/decks/${id}`}>
              View
            </Link>
            <Link className="btn btn-primary mr-2" to={`/decks/${id}/study`}>
              Study
            </Link>
          </div>
          <button className="btn btn-danger" onClick={() => handleDelete(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Deck;
