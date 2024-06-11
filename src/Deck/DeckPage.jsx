import { useParams, Routes, Route } from "react-router-dom";
import DeckStudyPage from "./DeckStudyPage";
import DeckDetailsPage from "./DeckDetailsPage";
import NotFound from "../Layout/NotFound";
import DeckEditPage from "./DeckEditPage";
import CardEditPage from "../Cards/CardEditPage";
import NewCardPage from "../Cards/NewCardPage";

/**
 * A component that acts as an outlet for routes to be rendered to.
 * @returns
 */

function DeckPage() {
  const { deckId } = useParams();

  return (
    <>
      <Routes>
        <Route path="/" element={<DeckDetailsPage />} />
        <Route path="/study" element={<DeckStudyPage />} />
        <Route path="/edit" element={<DeckEditPage />} />
        <Route path="/cards/new" element={<NewCardPage />} />
        <Route path="/cards/:cardId/edit" element={<CardEditPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default DeckPage;
