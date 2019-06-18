import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import StoreProvider, { useSelector, dispatch } from './useStore';
import { addTodo, toggleTodo } from './store/todos/actions';
import { toggleFilter } from './store/filter/actions';
import storeConfig from './store';

import './styles.css';

const Filters = () => {
  const filter = useSelector(state => state.filter);
  console.log('filter');
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
};

const Todos = () => {
  const [value, setInput] = useState('');
  const todos = useSelector(state => state.todos);
  console.log('todos');
  return (
    <div>
      <form
        onSubmit={evt => {
          evt.preventDefault();
          dispatch(addTodo({ text: value, completed: false }));
          setInput('');
        }}
      >
        <input
          type="text"
          value={value}
          onChange={evt => {
            setInput(evt.target.value);
          }}
        />
        <button type="submit">add todo</button>
      </form>
      {todos.map((todo, index) => (
        <div
          key={index}
          style={{
            textDecoration: todo.completed ? 'line-through' : null,
            userSelect: 'none',
          }}
          onClick={() => dispatch(toggleTodo(index))}
        >
          {todo.text}
        </div>
      ))}
    </div>
  );
};

function Root() {
  console.log('root');
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
  console.log('app');
  return (
    <StoreProvider store={storeConfig()}>
      <Root />
    </StoreProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
