import { Link } from "react-router-dom";

function Card({ card, deckId, deleteCard, id }) {

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            {card.front}
          </div>
          <div>{card.back}</div>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Link
            className="btn btn-secondary mr-2"
            to={`/decks/${deckId}/cards/${card.id}/edit`}
          >
            Edit
          </Link>
          <button className="btn btn-danger" onClick={() => deleteCard(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
