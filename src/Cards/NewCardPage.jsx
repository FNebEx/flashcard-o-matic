import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import Breadcrumbs from "../Breadcrumbs";

function NewCardPage() {
  const { deckId } = useParams();
  const [formData, setFormData] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState(null);

  const deckID = deckId;

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    async function loadData() {
      const data = await readDeck(deckId, signal);

      setDeck(data)
    }

    loadData();
  }, []);

  const handleInputChange = (event) => {
    const { target } = event;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const card = {
      ...formData,
      deckID,
      id: "_" + Math.random().toString(36).substring(2, 9),
    };

    // deckId is being stored as null.
    createCard(deckId, card, signal);

    setFormData({ front: "", back: "" });
  };

  return (
    <>
      {/** Breadcrumb Trail */}
      <Breadcrumbs deck={deck} pageTitle={"Add Card"}/>

      <h1>{deck && deck.name}: Add Card</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-front">Front</label>
          <textarea
            name="front"
            className="form-control"
            placeholder="Front side of the card"
            value={formData.front}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="card-back">Front</label>
          <textarea
            name="back"
            className="form-control"
            placeholder="Back side of the card"
            value={formData.back}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <Link className="btn btn-secondary" to={"/"}>
          Done
        </Link>
        <button className="btn btn-primary ml-2" type="submit">
          Save
        </button>
      </form>
    </>
  );
}

export default NewCardPage;
