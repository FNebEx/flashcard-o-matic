import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";
import Card from "../Cards/Card";

/**
 * A component that renders the contents of a specific deck.
 *
 * @returns {JSX.Element}
 */
function DeckPage() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(undefined);

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    async function loadData() {
      const data = await readDeck(deckId, signal);
      setDeck(data);
    }

    loadData();

    // return abortController.abort();
  }, [deckId]);

  const handleDelete = (id) => {
    // deleteCard(id, signal)
    alert(123)
  };

  return (
    <>
      <h1>{deck && deck.name} </h1>
      <p>{deck && deck.description}</p>

      {/* Buttons */}
      <div className="d-flex justify-content-between">
        <div>
          <Link className="btn btn-secondary mr-2" to={`/decks/${deckId}/edit`}>
            Edit
          </Link>
          <Link className="btn btn-primary mr-2" to={`/decks/${deckId}/study`}>Study</Link>
          <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>
            Add Cards
          </Link>
        </div>
        <button className="btn btn-danger">Delete</button>
      </div>

      {/* cards */}
      <h3>Cards</h3>
      {deck &&
        deck?.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            id={card.id}
            deckId={deckId}
            deleteCard={() => handleDelete(card.id)}
          />
        ))}
    </>
  );
}

export default DeckPage;
