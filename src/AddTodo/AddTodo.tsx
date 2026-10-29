import * as React from "react";
import {useNavigate} from "react-router-dom";
import type {APITodoItemInfo} from "../TodoItemInfo.ts";
import {useState} from "react";

export default function AddTodo() {
  const [error, setError] = useState<string | Error | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString();
    const date = formData.get("date")?.toString();
    const description = formData.get("description")?.toString();

    if (!name) {
      return setError("Please enter a valid name");
    }

    try {
      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify({
          id: "",
          name,
          dueDate: date,
          description
        } satisfies APITodoItemInfo)
      });
      navigate("/");
    } catch (e) {
      if (typeof e === "string" || e instanceof Error)
        setError(e);
      else
        setError("Unknown error occurred.");
    }
  }

  return (
    <>
      <h1>Add Todo</h1>
      {error && <p>{typeof error === "string" ? error : error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input className="form-control" id="name" type="text" name="name" required/>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="due-date">Due Date</label>
          <input className="form-control" id="due-date" type="date" name="date"/>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea rows={20} className="form-control" id="description" name="description"/>
        </div>

        <button type="submit" className="button">Create</button>
      </form>
    </>
  );
}