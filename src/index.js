import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider, useSelector } from './useStore';
import { addTodo } from './store/todos/actions';
import { toggleFilter } from './store/filter/actions';
import storeConfig from './store';

import './styles.css';

function Filters() {
  const { filter, dispatch } = useSelector('filter');
  // console.log('filter');
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <button onClick={() => dispatch(toggleFilter(!filter.visibilityFilter))}>
        toggle filter
      </button>
      <div>{filter.visibilityFilter ? 'toggled on' : 'toggled off'}</div>
    </div>
  );
}

function Todos() {
  const { todos, dispatch } = useSelector('todos');
  // console.log('todos');
  return (
    <div>
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
      {todos.map((todo, key) => (
        <div key={key}>{todo.text}</div>
      ))}
    </div>
  );
}

function Root() {
  console.log('store');
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Filters />
      <Todos />
    </div>
  );
}

function App() {
  return (
    <StoreProvider store={storeConfig()}>
      <Root />
    </StoreProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
