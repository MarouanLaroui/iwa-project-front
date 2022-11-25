import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Box marginTop="3rem" paddingBottom={10}>
        <Outlet />
      </Box>

    </div>
  );
}

export default App;
