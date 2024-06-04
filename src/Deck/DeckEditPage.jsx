import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function DeckEditPage() {
  /**
   * TODO
   * 1. When the user clicks update, have the deck name and/or description. update.
   * 2. Add event handlers to the component.
   */

  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    async function loadData() {
      const data = await readDeck(deckId, signal);
      setDeck(data);
    }

    loadData();
  }, []);

  return (
    <>
      <h1>Edit Deck</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          type="text"
          name="name"
          defaultValue={deck.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          name="description"
          defaultValue={deck.description}
        ></textarea>
      </div>
      <button className="btn btn-secondary mr-2">Cancel</button>
      <button className="btn btn-primary">Submit</button>
      <form></form>
    </>
  );
}

export default DeckEditPage;
