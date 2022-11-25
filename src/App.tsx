import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Navbar from './components/navbar';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <Box marginTop="3rem" paddingBottom={10}>
          <Outlet />
        </Box>
      </div>
    </LocalizationProvider>
  );
}

export default App;
