import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Book/Books";
import NewBook from "./components/Book/NewBook";
import LoginForm from "./components/Login/Form";
import { useApolloClient } from "@apollo/client";
import Recommendation from "./components/Book/Recommendation";
import { useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;

      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBook }) => {
    return {
      allBook: uniqByName(allBook.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState("");
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      alert(`${addedBook?.title} has been added`);
    },
  });

  const logout = () => {
    setToken(null);
    client.resetStore();
    localStorage.clear();
    setPage("login");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, [token]);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <span>
            <button onClick={() => setPage("recommendation")}>
              recommendation
            </button>
            <button onClick={() => setPage("add")}>add book</button>

            <button onClick={logout}>Logout</button>
          </span>
        )}
      </div>

      <Authors token={token} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recommendation show={page === "recommendation"} />

      <LoginForm
        setPage={setPage}
        setToken={setToken}
        show={page === "login"}
      />
    </div>
  );
};

export default App;
