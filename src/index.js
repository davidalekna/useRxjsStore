import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./useStore";
import { addTodo } from "./store/todos/actions";
import storeConfig from "./store";

import "./styles.css";

const initialState = {
  visibilityFilter: "SHOW_ALL",
  todos: [
    {
      text: "Consider using Redux",
      completed: true
    },
    {
      text: "Keep all state in a single tree",
      completed: false
    }
  ]
};

function App() {
  return (
    <StoreProvider store={storeConfig(initialState)}>
      {({ state, dispatch }) => (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          <button
            onClick={() =>
              dispatch(
                addTodo({
                  text: "Checking stuff",
                  completed: false
                })
              )
            }
          >
            update
          </button>
          {state.todos.map((todo, key) => (
            <div key={key}>{todo.text}</div>
          ))}
        </div>
      )}
    </StoreProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
