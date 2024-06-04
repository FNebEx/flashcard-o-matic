import { Link } from "react-router-dom";
import Deck from "./Deck";

function DeckList({ decks, handleDelete }) {
  return (
    <>
      {/* Should probably be a link to /deck/new */}
      <Link className="btn btn-secondary" to={"/decks/new"}>
        Create Deck
      </Link>
      {decks &&
        decks.map((deck) => {
          // console.log(deck);

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
