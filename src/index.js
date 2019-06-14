import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider, useStoreContext } from './useStore';
import { addTodo } from './store/todos/actions';
import { toggleFilter } from './store/filter/actions';
import storeConfig from './store';

import './styles.css';

function Filters() {
  const { filter } = useStoreContext('filter');
  console.log('rerendering filter');
  return filter.visibilityFilter ? 'toggled on' : 'toggled off';
}

function Todos() {
  const { todos } = useStoreContext('todos');
  console.log('rerendering todos');
  return todos.map((todo, key) => <div key={key}>{todo.text}</div>);
}

function App() {
  return (
    <StoreProvider store={storeConfig()}>
      {({ dispatch }) => {
        return (
          <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <button
              onClick={() =>
                dispatch(
                  addTodo({
                    text: 'Checking stuff',
                    completed: false,
                  }),
                )
              }
            >
              add todo
            </button>
            <button onClick={() => dispatch(toggleFilter())}>
              toggle filter
            </button>
            <Filters />
            <Todos />
          </div>
        );
      }}
    </StoreProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
