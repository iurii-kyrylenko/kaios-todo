import React, { useState, useEffect } from "react";
import "./App.css";
import * as u from "./utils";

function App() {
  const inputRef = React.createRef();

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    if (selected) {
      inputRef.current.blur();
    } else {
      inputRef.current.focus();
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  const handleInput = evt => setInput(evt.target.value);

  const handleKeyDown = evt => {
    switch (evt.key) {
      case "ArrowDown":
        // Navigate down
        setSelected(u.getSelectedDown(selected, todos.length));
        setOffset(u.getOffsetDown(offset, selected, todos.length));
        break;
      case "ArrowUp":
        // Navigate up
        setSelected(u.getSelectedUp(selected, todos.length));
        setOffset(u.getOffsetUp(offset, selected, todos.length));
        break;
      case "ArrowRight":
        // Remove selected
        if (selected) {
          setTodos(u.getTodosDelete(todos, selected));
          setSelected(u.getSelectedDelete(selected, todos.length));
          setOffset(u.getOffsetDelete(offset, todos.length));
        }
        break;
      case "Enter":
        // Toggle selected
        if (selected) {
          setTodos(u.getTodosToggle(todos, selected));
          break;
        }
        // Add new item
        const todo = input.trim();
        if (todo) {
          setTodos(u.getTodosCreate(todos, todo));
          setOffset(u.getOffsetCreate(todos.length));
        }
        setInput("");
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
      />
      <ul>
        {u.getTodosSlice(todos, offset).map((todo, index) => (
          <li
            key={todo.id}
            className={u.getTodoStyles(todo, selected, offset + index)}
          >
            {todo.name}
          </li>
        ))}
      </ul>
      <div>
        <code>{u.getStatus(selected)}</code>
      </div>
    </div>
  );
}

export default App;
