import Deck from "./Deck";

function DeckList({ decks }) {
  return (
    <>
      {/* Should probably be a link to /deck/new */}
      <button className="btn btn-secondary">Create Deck</button>
      {decks && decks.map(({ id, name, description }) => (
        <Deck key={id} name={name} description={description} id={id}/>
      ))}
    </>
  );
}

export default DeckList;
