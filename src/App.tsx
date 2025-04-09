import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './index.css';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Perfumes</Link>
            </li>
            <li>
              <Link to="/stores">Tiendas</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Aquí se renderizarán las rutas definidas en NavigationWrapper */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
