import './Todo.css';
import type {APITodoItemInfo, TodoItemInfo} from "../TodoItemInfo.ts";
import TodoItem from "../TodoItem/TodoItem.tsx";
import {type JSX, useState, useEffect} from "react";
import {Link} from "react-router-dom";

export default function Todo(): JSX.Element {
  const [items, setItems] = useState<TodoItemInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error | string | null>(null);
  const [deleteError, setDeleteError] = useState<Error | string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const data = await response.json() as APITodoItemInfo[];
        setItems(data.map(item => ({
          id: item.id,
          name: item.name,
          dueDate: item.dueDate ? new Date(item.dueDate) : undefined,
          description: item.description,
        })));
      } catch (e) {
        if (typeof e === "string" || e instanceof Error)
          setFetchError(e);
        else
          setFetchError("Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    void fetchTasks();
  }, []);

  async function deleteTodoItem(id: string): Promise<void> {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
      });
      setItems(items => items.filter(item => item.id !== id));
    } catch (e) {
      if (typeof e === "string" || e instanceof Error)
        setDeleteError(e);
      else
        setDeleteError("Unknown error occurred.");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {typeof fetchError === "string" ? fetchError : fetchError.message}</div>;

  return (
    <>
      {deleteError && <p>{typeof deleteError === "string" ? deleteError : deleteError.message}</p>}
      <div className="title">
        <h2>Tasks</h2>
        <Link className="button" to="/add">Add Task</Link>
      </div>
      <ul className="todo-list">
        {items.map(item => (
          <li key={item.id}>
            <TodoItem item={item} onDelete={() => deleteTodoItem(item.id)}/>
          </li>
        ))}
      </ul>
    </>
  );
}