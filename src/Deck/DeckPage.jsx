import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

/**
 * A component that renders the contents of a specific deck.
 *
 * @returns {JSX.Element}
 */
function DeckPage() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadData() {
      const data = await readDeck(deckId, signal);
      setDeck(data);
    }

    loadData();

    // return abortController.abort();
  }, [deckId]);

  return (
    <>
      <h1>{deck && deck.name} </h1>
      <p>{deck && deck.description}</p>

      {/* Buttons */}
      <div className="d-flex justify-content-between">
        <div>
          <button className="btn btn-secondary mr-2">Edit</button>
          <button className="btn btn-primary mr-2">Study</button>
          <button className="btn btn-primary">Add Cards</button>
        </div>
        <button className="btn btn-danger">Delete</button>
      </div>

      {/* cards */}
      <h3>Cards</h3>
      {deck &&
        deck?.cards.map((card) => (
          <div key={card.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  {card.front} {`Card id: ${card.id}`}
                </div>
                <div>{card.back}</div>
              </div>
              <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-secondary mr-2">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default DeckPage;
