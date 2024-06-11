import { Link } from "react-router-dom";
import Deck from "./Deck";
import { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../utils/api";

function DeckList() {
  /**
   * Think about doing the API call here instead of the Layout component.
   */
  const [decks, setDecks] = useState([]);
  const abortController = new AbortController();

  useEffect(() => {
    async function loadData() {
      const data = await listDecks(abortController.signal);
      setDecks(data);
    }

    loadData();
  }, []);

  const handleDelete = async (id) => {
    const otherController = new AbortController();
    const result = window.confirm("Are you sure?");

    if (result) {
      try {
        // const response = await deleteDeck(id);
        // const newDeckInfo = await response.json();
        // setDecks((prev) => prev.filter((item) => item.id !== id));
        // console.log(newDeckInfo);
        console.log(123);
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  return (
    <>
      {/* Should probably be a link to /deck/new */}
      <Link className="btn btn-secondary" to={"/decks/new"}>
        Create Deck
      </Link>
      {decks &&
        decks.map((deck) => {
          return (
            <Deck
              key={deck.id}
              id={deck.id}
              name={deck.name}
              description={deck.description}
              cards={deck.cards.length}
              handleDelete={handleDelete}
            />
          );
        })}
    </>
  );
}

export default DeckList;
