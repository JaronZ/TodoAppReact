import * as React from "react";
import {useEffect, useState} from "react";
import type {APITodoItemInfo, TodoItemInfo} from "../TodoItemInfo.ts";
import {useNavigate, useParams} from "react-router-dom";

export default function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<APITodoItemInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | Error | null>(null);
  const [editError, setEditError] = useState<string | Error | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`);
        const data = await response.json() as APITodoItemInfo;
        setItem(data);
      } catch (e) {
        if (typeof e === "string" || e instanceof Error)
          setFetchError(e);
        else
          setFetchError("Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    void fetchTask();
  }, []);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString();
    const date = formData.get("date")?.toString();
    const description = formData.get("description")?.toString();

    if (!id) {
      return setEditError("Unknown error occurred.");
    }

    if (!name) {
      return setEditError("Please enter a valid name");
    }

    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id,
          name,
          dueDate: date,
          description,
        } satisfies APITodoItemInfo)
      });
      navigate("/");
    } catch (e) {
      if (typeof e === "string" || e instanceof Error)
        setEditError(e);
      else
        setEditError("Unknown error occurred.");
    }
  }

  if (!id) return <p>Item not found</p>;
  if (loading) return <p>Loading...</p>;
  if (fetchError) return <p>Error: {typeof fetchError === "string" ? fetchError : fetchError.message}</p>
  if (!item) return <p>Item not found</p>;

  return (
    <>
      <h1>Edit Todo</h1>
      {editError && <p>{typeof editError === "string" ? editError : editError.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input className="form-control" id="name" type="text" name="name" defaultValue={item.name} required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="due-date">Due Date</label>
          <input className="form-control" id="due-date" type="date" name="date" defaultValue={item?.dueDate ?? ""} />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea rows={20} className="form-control" id="description" name="description" defaultValue={item?.description ?? ""} />
        </div>

        <button type="submit" className="button">Edit</button>
      </form>
    </>
  );
}