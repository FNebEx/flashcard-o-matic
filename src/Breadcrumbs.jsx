import { Link } from "react-router-dom";

function Breadcrumbs({ deck, pageTitle }) {
  /**
   * There is probably a more elegant way to make this using the useLocation hook.
   */

  return (
    <div>
      <Link to={"/"}>Home</Link> {deck && <span> / {deck.name}</span>}{" "}
      {pageTitle && <span className="text-muted"> / {pageTitle}</span>}
    </div>
  );
}

export default Breadcrumbs;
