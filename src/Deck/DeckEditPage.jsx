import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Breadcrumbs from "../Breadcrumbs";

function DeckEditPage() {
  /**
   * TODO
   * 1. When the user clicks update, have the deck name and/or description. update.
   * 2. Add event handlers to the component.
   */

  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const abortController = new AbortController();
  const signal = abortController.signal;

  console.log(typeof deckId);

  useEffect(() => {
    async function loadData() {
      const data = await readDeck(deckId, signal);
      setDeck(data);
      setFormData({ name: data.name, description: data.description });
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

    const updatedDeck = {
      ...formData,
      id: deckId,
    };

    updateDeck(updatedDeck, signal);
  };
  return (
    <>
      {/** Breadcrumbs*/}
      <Breadcrumbs deck={deck} pageTitle={"Edit Deck"}/>

      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            defaultValue={deck.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            defaultValue={deck.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <Link className="btn btn-secondary mr-2" to={'/'}>Cancel</Link>
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default DeckEditPage;
