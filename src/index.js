import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider, useSelector } from './useStore';
import { addTodo } from './store/todos/actions';
import { toggleFilter } from './store/filter/actions';
import storeConfig from './store';

import './styles.css';

function Filters() {
  const { filter } = useSelector('filter');
  console.log('filter');
  return filter.visibilityFilter ? 'toggled on' : 'toggled off';
}

function Todos() {
  const { todos } = useSelector('todos');
  console.log('todos');
  return todos.map((todo, key) => <div key={key}>{todo.text}</div>);
}

function Root({ dispatch }) {
  console.log('store');
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
      <button onClick={() => dispatch(toggleFilter())}>toggle filter</button>
      <Filters />
      <Todos />
    </div>
  );
}

function App() {
  return (
    <StoreProvider store={storeConfig()}>
      {props => <Root {...props} />}
    </StoreProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
