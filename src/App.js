import React, { useState, useEffect } from "react";
import { Header, Input, ToDos, Softkey } from "./components";
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
      // case "ArrowRight":
      case "SoftRight":
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
    <>
      <Header title="ToDo List" />
      <Input ref={inputRef} value={input} onChange={handleInput} />
      <ToDos todos={todos} offset={offset} selected={selected} />
      <Softkey
        center={selected ? "Toggle" : "Insert"}
        right={selected ? "Delete" : ""}
      />
    </>
  );
}

export default App;
