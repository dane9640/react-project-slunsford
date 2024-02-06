import React from 'react'

export default function Todo({todo, toggleTodo}) {

  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <li key={todo.id}>
      <label>
      <input type="checkbox" checked={todo.completed} onChange={handleTodoClick} />
      {todo.name}
      </label>
    </li>
  )
}
