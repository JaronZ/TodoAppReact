import './App.css'
import Header from "./Header/Header.tsx";
import Todo from "./Todo/Todo.tsx";
import {Routes, Route} from 'react-router-dom';
import Details from "./Details/Details.tsx";
import AddTodo from "./AddTodo/AddTodo.tsx";
import EditTodo from "./EditTodo/EditTodo.tsx";

function App() {
  return (
    <>
      <Header/>
      <section className="content">
        <Routes>
          <Route path="/" element={<Todo/>}/>
          <Route path="/details/:id" element={<Details/>}/>
          <Route path="/add" element={<AddTodo />}/>
          <Route path="/edit/:id" element={<EditTodo />}/>
        </Routes>
      </section>
    </>
  )
}

export default App
