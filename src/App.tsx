import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Box marginTop="3rem">
        <Outlet />
      </Box>

    </div>
  );
}

export default App;
