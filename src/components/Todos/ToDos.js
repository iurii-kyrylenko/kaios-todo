import React from 'react';
import { getTodosSlice } from "../../utils";
import css from "./ToDos.module.css";

const getTodoStyles = (todo, selected, index) => {
  const selectedClass = (selected === index + 1) ? `${css.selected}` : "";
  const completedClass = todo.completed ? `${css.completed}` : "";
  return [selectedClass, completedClass].join(" ");
}

export const ToDos = ({ todos, offset, selected }) => {
  return (
    <div className={css.todos}>
      {getTodosSlice(todos, offset).map((todo, index) => (
        <span
          key={todo.id}
          className={getTodoStyles(todo, selected, offset + index)}
        >
          {todo.name}
        </span>
      ))}
    </div>
  )
}
