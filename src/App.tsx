import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Outlet />
    </div>
  );
}

export default App;
