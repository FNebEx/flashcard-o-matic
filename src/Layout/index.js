import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import DeckList from "../Deck/DeckList";
import { deleteDeck, listDecks } from "../utils/api";
import DeckPage from "../Deck/DeckPage";
import NewDeckPage from "../Deck/NewDeckPage";

function Layout() {
  // const [decks, setDecks] = useState(null);
  const navigate = useNavigate();

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    async function loadData() {
      const data = await listDecks(signal);

      // setDecks(data);
    }

    loadData();
  }, []);

  // Potentially pass this as a prop to the DeckPage component

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<DeckList />} />
          <Route path="/decks/new" element={<NewDeckPage />} />
          <Route path="/decks/:deckId/*" element={<DeckPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* <Routes>
          <Route
            path="/"
            element={
              <DeckList decks={decks} handleDelete={hadndleDeleteDeck} />
            }
          />
          <Route path="/decks">
            <Route path="new" element={<NewDeckPage />} />
            <Route path=":deckId" element={<DeckPage />} />
            <Route path=":deckId/study" element={<DeckStudyPage />} />
            <Route path=":deckId/edit" element={<DeckEditPage />} />
            <Route path=":deckId/cards/new" element={<NewCardPage />} />
            <Route
              path=":deckId/cards/:cardId/edit"
              element={<CardEditPage />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default Layout;
