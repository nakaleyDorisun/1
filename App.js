import { useState } from "react";
import "./App.css";
import { TodoDigist } from "./TodoDigest";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("");
  const [edit, setEdit] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [complete, setComplete] = useState(false);

  const addHandler = () => {
    if (!task) {
      return;
    }
    setTodos([...todos, { id: Math.random(), title: task, isDone: false }]);
    setTask("");
  };

  const removeTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTask = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        } else {
          todo.title = editedValue;
          return todo;
        }
      })
    );
    setEdit((prev) => !prev);
  };

  const editHandler = (value, id) => {
    setEditedValue(value);
    console.log(id);
  };

  const changeCheckbox = (id) => {
    let a = todos.filter((todo) => todo.id === id);
    a[0].isDone = !a[0].isDone;
    setTodos([...todos], a);
    setComplete((prev) => !prev);
  };

  let todosFiltred = todos;

  if (filter === "Complete") {
    todosFiltred = todos.filter((todo) => todo.isDone);
  }
  if (filter === "New") {
    todosFiltred = todos.filter((todo) => !todo.isDone);
  }
  return (
    <div className="App">
      <div className="todo-wrp">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addHandler}>Add</button>
        <ul>
          {todosFiltred.map((todo) => (
            <li className="task" key={todo.id}>
              <input
                type="checkbox"
                onChange={() => changeCheckbox(todo.id)}
                checked={todo.isDone}
              />
              <div className={complete ? "complete" : ""}>{todo.title}</div>
              <div className="close" onClick={() => removeTask(todo.id)}>
                X
              </div>
              <div className="edit" onClick={() => setEdit((prev) => !prev)}>
                Edit
              </div>
              {edit && (
                <input onChange={(e) => editHandler(e.target.value, todo.id)} />
              )}
              {edit && (
                <div
                  className="complete-edit"
                  onClick={() => editTask(todo.id)}
                >
                  done
                </div>
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Complete")}>Complete</button>
        <button onClick={() => setFilter("New")}>New</button>
      </div>
      <div className="todo-digest">
        <TodoDigist todos={todos} />
      </div>
    </div>
  );
}

export default App;
