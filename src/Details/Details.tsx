import { useParams } from "react-router-dom";
import type {APITodoItemInfo, TodoItemInfo} from "../TodoItemInfo.ts";
import {useEffect, useState} from "react";

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState<TodoItemInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | Error | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`);
        const data = await response.json() as APITodoItemInfo;
        setItem({
          ...data,
          dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        });
      } catch (e) {
        if (typeof e === "string" || e instanceof Error)
          setError(e);
        else
          setError("Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    void fetchTask();
  }, []);

  if (!id) return <p>Todo not found!</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {typeof error === "string" ? error : error.message}</p>;
  if (!item) return <p>Todo not found!</p>;

  return (
    <>
      <h2>{item.name}</h2>
      <p>Due by: {item.dueDate?.toDateString()}</p>
      <p>{item.description ?? ""}</p>
    </>
  )
}