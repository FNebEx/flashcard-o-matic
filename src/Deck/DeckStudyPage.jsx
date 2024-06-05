import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function DeckStudyPage() {
  /**
   * TODO
   * 1. After the user views the final card in the deck, a prompt
   * comes up asking if the want to start the deck over. If the
   * user wants to restart the deck, start from the frist card.
   * If the user doesn't want to restart the deck, they are
   * taken back to the homescreen.
   *
   */

  const { deckId } = useParams();
  const [cards, setCards] = useState(null);
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  let currentCard = [];
  let length = 0;

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      const signal = abortController.signal;
      const data = await readDeck(deckId, signal);

      setCards(data);
    }

    loadData();
  }, [deckId]);

  if (cards && cards.cards) {
    currentCard = cards.cards[index];
    length = cards.cards.length;
  }

  const handleFlip = () => {
    setFlip(true);
  };

  const handleNext = () => {
    setIndex(index >= length - 1 ? 0 : index + 1);

    if (index === length) {
      alert(3);
    }

    setFlip(false);
  };

  return (
    <>
      <h1>Study: {cards && cards.name}</h1>

      {length < 3 ? (
        <>
          <h3>Not enough cards</h3>
          <p>
            You need at least 3 cards to study. There are {length} cards this
            deck.{" "}
          </p>
          {/* Links to the "Add Card" Screen */}
          <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>
            Add Card
          </Link>
        </>
      ) : (
        <div className="card">
          <div className="card-body">
            <h4>
              {index + 1} of {cards && length}
            </h4>
            <p>{flip ? currentCard?.back : currentCard?.front}</p>
            <button
              className="btn btn-secondary"
              onClick={handleFlip}
              disabled={flip}
            >
              Flip
            </button>
            {flip && (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DeckStudyPage;
