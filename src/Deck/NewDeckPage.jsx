import { useState } from "react";
import { createDeck } from "../utils/api";

function NewDeckPage() {
  /**
   * TODO
   * 1. Add a state varibale to hold the values of the input fields.
   * 2. Create an event handler for both input fields.
   * 3. Add a function that's passed through props that actually adds the data when the form is submitted.
   * 4. Note: a new deck would have {name, description, id}.
   */

  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // I might need to do an API Call here to actually create the deck. So there's kind of no need for createDeck.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    const signal = abortController.signal;
    const deck = {
      ...formData,
      id: "_" + Math.random().toString(36).substring(2, 9),
    };

    createDeck(deck, signal);

    setFormData({ name: "", description: "" });
  };

  return (
    <>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Deck Name"
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            placeholder="Brief description of the new deck"
            onChange={handleInputChange}
            value={formData.description}
          ></textarea>
        </div>
        <button className="btn btn-secondary mr-3">Cancel</button>
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default NewDeckPage;
