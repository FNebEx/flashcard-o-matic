import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import Breadcrumbs from "../Breadcrumbs";
import Card from "../Cards/Card";

function DeckDetailsPage() {
  /**
   * This will essentially be what the deck page originally was.
   */

  const { deckId } = useParams();
  const [deck, setDeck] = useState(undefined);
  const abortControleler = new AbortController();

  console.log(typeof deckId)

  useEffect(() => {
    async function loadData() {
      const data = await readDeck(deckId, abortControleler.signal);
      setDeck(data);
    }

    loadData();
  }, [deckId]);

  return (
    <>
      <Breadcrumbs deck={deck} />

      <h1>{deck && deck.name}</h1>
      <p>{deck && deck.description}</p>

      <div className="d-flex justify-content-between">
        <div>
          <Link className="btn btn-secondary mr-2" to={`/decks/${deckId}/edit`}>Edit</Link>
          <Link className="btn btn-primary mr-2" to={`/decks/${deckId}/study`}>Study</Link>
          <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
        </div>
        <button className="btn btn-danger" type="button">
          Delete
        </button>
      </div>

      <h3>Cards</h3>
      {deck &&
        deck?.cards.map((card) => (
          <Card key={card.id} card={card} id={card.id} deckId={deckId} />
        ))}
    </>
  );
}

export default DeckDetailsPage;
