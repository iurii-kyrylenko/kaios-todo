import React, { useState, useEffect } from "react";

function App() {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  })

  const handleKeyDown = evt => {
    switch (evt.key) {
      case "Enter":
        if (!input) {
          return;
        }
        setTodos([...todos, { id: todos.length + 1, name: input }]);
        setInput("");
        break;
      default:
        return;
    }
  };

  const handleInput = evt => setInput(evt.target.value);

  return (
    <div>
      <input type="text" value={input} onChange={handleInput}></input>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
