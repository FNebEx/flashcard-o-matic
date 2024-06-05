import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import DeckList from "../Deck/DeckList";
import { deleteDeck, listDecks } from "../utils/api";
import DeckPage from "../Deck/DeckPage";
import DeckStudyPage from "../Deck/DeckStudyPage";
import NewDeckPage from "../Deck/NewDeckPage";
import DeckEditPage from "../Deck/DeckEditPage";
import NewCardPage from "../Cards/NewCardPage";
import CardEditPage from "../Cards/CardEditPage";

function Layout() {
  /**
   * @TODO:
   * 1. Mess around with the API to read all of the data.
   * 2. Pass down the data via props.
   */

  const [decks, setDecks] = useState(null);
  const navigate = useNavigate();

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    async function loadData() {
      const data = await listDecks(signal);

      setDecks(data);
    }

    loadData();

    // return abortController.abort();
  }, []);

  // Potentially pass this as a prop to the DeckPage component
  const hadndleDeleteDeck = (id) => {
    if (window.confirm(`Are you sure you want to delete record ${id}`)) {
      console.log("deleted Deck ", id);
      // deleteDeck(id, signal);
      // navigate('/')
    } else {
      console.log("nothing");
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <DeckList decks={decks} handleDelete={hadndleDeleteDeck} />
            }
          />
          {/* Deck Routes */}
          <Route path="/decks">
            <Route path="new" element={<NewDeckPage />} />
            <Route path=":deckId" element={<DeckPage />} />
            <Route path=":deckId/study" element={<DeckStudyPage />} />
            <Route path=":deckId/edit" element={<DeckEditPage />} />
            <Route path=":deckId/cards/new" element={<NewCardPage />} />
            <Route path=":deckId/cards/:cardId/edit" element={<CardEditPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
