import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Routes } from "react-router-dom";
import DeckList from "../Deck/DeckList";
import { listDecks } from "../utils/api";
import DeckPage from "../Deck/DeckPage";
import DeckStudyPage from "../Deck/DeckStudyPage";

function Layout() {
  /**
   * @TODO:
   * 1. Mess around with the API to read all of the data.
   * 2. Pass down the data via props.
   */

  const [decks, setDecks] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      const signal = abortController.signal;
      const data = await listDecks(signal);

      setDecks(data);
    }

    loadData();

    // return abortController.abort();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<DeckList decks={decks} />} />
          {/* Deck Routes */}
          <Route path="/decks">
            <Route path=":deckId" element={<DeckPage />} />
            <Route path=":deckId/study" element={<DeckStudyPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
