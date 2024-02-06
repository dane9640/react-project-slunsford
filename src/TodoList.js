import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {
  //If there are no tasks, display a message
  if (todos.length === 0) {
    return <li>No Tasks to display</li>
  }
  //Return the list of todos
  return (
    todos.map(todo => {
      return (
          <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
          )
        })
  )
}
