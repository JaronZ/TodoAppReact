import './TodoItem.css';
import type {TodoItemInfo} from "../TodoItemInfo.ts";
import type {JSX} from "react";
import { Link } from "react-router-dom";

interface TodoItemProps {
    item: TodoItemInfo;
    onDelete?: () => void;
}

export default function TodoItem({ item, onDelete }: TodoItemProps): JSX.Element {
    return (
        <div className="todo-item">
            <p>{item.name}</p>
            <p>{item.dueDate?.toDateString()}</p>
            <div className="todo-buttons">
                <Link className="button" to={`/details/${item.id}`}>View</Link>
                <Link className="button" to={`/edit/${item.id}`}>Edit</Link>
                <button type="button" className="button" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}