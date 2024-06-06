import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import Breadcrumbs from "../Breadcrumbs";

function CardEditPage() {
  const { cardId, deckId } = useParams();
  const [card, setCard] = useState({});
  const [deckName, setDeckName] = useState('');
  const [formData, setFormData] = useState({ front: "", back: "" });

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    async function loadData() {
      const data = await readCard(cardId, signal);
      const dataName = await readDeck(deckId, signal);
      setDeckName(dataName);
      setCard(data);
      setFormData({ front: data.front, back: data.back });
    }

    loadData();
  }, []);

  const handleInputChage = (event) => {
    const { target } = event;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedCard = {
      ...formData,
      id: cardId,
      deckId: Number(deckId)
    };

    updateCard(updatedCard, signal)
  };

  return (
    <>
      {/** Breadcrum trail */}
      <Breadcrumbs deck={deckName} pageTitle={`Edit Card ${card.id}`}/>

      <h1>Edit Card</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            name="front"
            className="form-control"
            defaultValue={card.front}
            onChange={handleInputChage}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            name="back"
            className="form-control"
            defaultValue={card.back}
            onChange={handleInputChage}
          ></textarea>
        </div>
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-primary" type="submit">
          submit
        </button>
      </form>
    </>
  );
}

export default CardEditPage;
