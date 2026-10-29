import {Link} from 'react-router-dom';

import './Header.css';

export default function Header() {
  return (
    <header>
      <nav>
        <h1>
          <Link to="/">Todo List</Link>
        </h1>
      </nav>
    </header>
  )
}