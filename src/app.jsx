import { React } from "react";
import TagsList from "./components/tag-list";
import "./app.scss";

/**
 * App component.
 *
 * @returns {object}
 *   The component.
 */
function App() {
  return (
    <div className="App">
      <TagsList />
    </div>
  );
}

export default App;
