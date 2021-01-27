import React, { useState, useEffect } from "react";
import "./App.css";

const circular = (value, length) => length
  ? (value + length + 1) % (length + 1)
  : 0;

let id = 1;
const getId = () => id++;

function App() {
  const inputRef = React.createRef();

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    if (selected) {
      inputRef.current.blur();
    } else {
      inputRef.current.focus();
    }
  });

  const changeSelected = value => setSelected(circular(value, todos.length));

  const handleKeyDown = evt => {
    switch (evt.key) {
      case "ArrowDown":
        // Navigate down
        changeSelected(selected + 1);
        break;
      case "ArrowUp":
        // Navigate up
        changeSelected(selected - 1);
        break;
      case "ArrowRight":
        // Skip when input
        if (!selected) {
          break;
        }
        // Remove selected
        const fst = todos.slice(0, selected - 1);
        const snd = todos.slice(selected);
        setTodos([...fst, ...snd]);
        // Recalculate selected when removing last item
        if (selected === todos.length) {
          changeSelected(selected - 1);
        }
        break;
      case "Enter":
        // Toggle selected
        if (selected) {
          const fst = todos.slice(0, selected - 1);
          const snd = todos.slice(selected);
          const target = todos[selected - 1];
          setTodos([
            ...fst,
            { ...target, completed: !target.completed },
            ...snd
          ]);
          break;
        }
        // Prevent blank items
        if (!input.trim()) {
          break;
        }
        // Add new item
        setTodos([...todos, { id: getId(), name: input, completed: false }]);
        setInput("");
        break;
      default:
        return;
    }
  };

  const handleInput = evt => setInput(evt.target.value);

  const getTodoStyles = (todo, selected, index) => {
    const selectedClass = (selected === index + 1) ? "selected" : "";
    const completedClass = todo.completed ? "completed" : "";
    return [selectedClass, completedClass].join(" ");
  }

  const status = selected
    ? "Center: TOGGLE | Right: Delete"
    : "Center: INSERT";

  return (
    <div>
      <input ref={inputRef} type="text" value={input} onChange={handleInput} />
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id} className={getTodoStyles(todo, selected, index)}>
            {todo.name}
          </li>
        ))}
      </ul>
      <div>
        <code>{status}</code>
      </div>
    </div>
  );
}

export default App;
