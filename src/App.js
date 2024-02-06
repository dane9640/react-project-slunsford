import React, {useState, useRef, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {

  //Misc Hooks
  const [todos, setTodos] = useState([]); 
  const todoNameRef = useRef();

  //UseEffect to get todos from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storedTodos) setTodos(storedTodos);
  }, []);

  //UseEffect to save todos to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  //Toggles the completed status of a todo
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  //Function to handle adding todos
  function handleAddTodo(e) {
   const name = todoNameRef.current.value;

   if (name === '' || e.key !== 'Enter') {
    return
   }
   todoNameRef.current.value = null;
   
   setTodos(prevTodos => {
     return [...prevTodos, {id: uuidv4(), name: name, completed: false}]
   })
  }

  //Function to handle clearing completed todos
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.completed);
    
    setTodos(newTodos);
  }

  //Renders the app
  return (
    <>
    <h1>Todo List</h1>
    <div className="taskCounter">{todos.filter(todo => !todo.completed).length} left to do</div>
    <div className='form'>
      <input ref={todoNameRef} type="text" onKeyDown={handleAddTodo} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button className="clearButton" onClick={handleClearTodos}>Clear Completed</button>
    </div>
    <ol>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    </ol>
    </>
  );
}

export default App;
