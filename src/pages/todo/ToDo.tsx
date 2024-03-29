import { useState } from "react";
import "./ToDo.css";

import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";

const ToDo = () => {
  // const [taskList, setTaskList] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [responsible, setResponsible] = useState("Andrea");

  const { addDocument, deleteDocument, response } = useFirestore("todo");
  const { documents: todo } = useCollection("todo");

  const addNewTask = (e) => {
    e.preventDefault();

    const task = {
      id: todo.length + 1,
      title: newTaskTitle,
      dueDate: dueDate,
      responsible: responsible,
    };

    console.log(task);
    addDocument(task);
    if (response.error) {
      console.log(response.error);
    }

    // setTaskList([...taskList, task]);
    setNewTaskTitle("");
    setDueDate("");
    setResponsible("Andrea");
  };

  return (
    <div className="todo">
      <form onSubmit={addNewTask}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="newTaskTitle">Attività</label>
                <input
                  required
                  type="text"
                  id="newTaskTitle"
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  value={newTaskTitle}
                />
              </td>

              <td>
                <label htmlFor="dueDate">Scadenza</label>
                <input
                  type="date"
                  id="dueDate"
                  onChange={(e) => setDueDate(e.target.value)}
                  value={dueDate}
                />
              </td>
              <td>
                <label htmlFor="responsible">Responsabile</label>
                <select
                  name="responsible"
                  id="responsible"
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                >
                  <option value="Andrea">Andrea</option>
                  <option value="Silvia">Silvia</option>
                  <option value="Marco">Marco</option>
                </select>
              </td>
              <td>
                <label>Actions</label>
                <button className="btn" type="submit">
                  Aggiungi
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="todo-list">
        <table>
          <thead>
            <tr>
              <th>Attività</th>
              <th>Scadenza</th>
              <th>Responsabile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todo &&
              todo.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.responsible}</td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => deleteDocument(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDo;
