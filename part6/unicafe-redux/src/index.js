import React from "react";
import ReactDOM from "react-dom/client";
import unicafeServices from "./reducer";
import { createStore } from "redux";

const store = createStore(unicafeServices.counterReducer);

const App = () => {
  console.log();
  return (
    <div>
      <div>
        <button onClick={(e) => store.dispatch({ type: "GOOD" })}>Good</button>{" "}
        <span>{store.getState().good}</span>
      </div>
      <div>
        <button onClick={(e) => store.dispatch({ type: "BAD" })}>Bad</button>{" "}
        <span>{store.getState().bad}</span>
      </div>
      <div>
        <button onClick={(e) => store.dispatch({ type: "OK" })}>ok</button>{" "}
        <span>{store.getState().ok}</span>
      </div>
      <div>
        <button onClick={(e) => store.dispatch({ type: "ZERO" })}>Reset</button>{" "}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
