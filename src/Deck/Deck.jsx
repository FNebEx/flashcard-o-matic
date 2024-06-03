import { Link } from "react-router-dom";

function Deck({name, description, id}) {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        {/* TODO: Have view and study to the left and delete to the right */}
        <div className="d-flex">
          <div className="">
            <Link className="btn btn-secondary" to={`/decks/${id}`}>View</Link>
            <button className="btn btn-primary">Study</button>
          </div>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Deck;
