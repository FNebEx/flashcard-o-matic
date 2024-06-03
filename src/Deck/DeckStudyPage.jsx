import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function DeckStudyPage() {
  const { deckId } = useParams();
  const [cards, setCards] = useState(null);
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  let currentCard = [];

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      const signal = abortController.signal;
      const data = await readDeck(deckId, signal);

      setCards(data);
    }

    loadData();
  }, []);

  if (cards && cards.cards) {
    currentCard = cards.cards[index];
    
  }

  const handleFlip = () => {
    setFlip(true);
  };

  const handleNext = () => {
    setIndex(index >= currentCard.length - 1 ? 0 : index + 1);
    setFlip(false);
  };

  return (
    <>
      <h1>Study: {cards && cards.name}</h1>

      <div className="card">
        <div className="card-body">
          <h4>
            {index + 1} of {cards && currentCard.length}
          </h4>
          <p>{flip ? currentCard.back : currentCard.front }</p>
          <button
            className="btn btn-secondary"
            onClick={handleFlip}
            disabled={flip}
          >
            Flip
          </button>
          {flip && <button className="btn btn-primary" onClick={handleNext}>Next</button>}
        </div>
      </div>
    </>
  );
}

export default DeckStudyPage;
