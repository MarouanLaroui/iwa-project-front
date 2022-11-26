import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Alert } from '@mui/material';
import { DefaultTFuncReturn } from 'i18next';
import Navbar from './components/navbar';
import AlertContext, { AlertContextType } from './context/alert-context';

function App() {
  const [errorMessage, setErrorMessage] = useState('' as DefaultTFuncReturn);
  const [successMessage, setSuccessMessage] = useState('' as DefaultTFuncReturn);

  const alertContext = useMemo<AlertContextType>(() => ({
    setErrorMessage,
    setSuccessMessage,
  }), [setErrorMessage, setSuccessMessage]);

  return (
    <AlertContext.Provider value={alertContext}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="App">
          <header>
            <Navbar />
          </header>
          <Box marginTop="3rem" paddingBottom={10}>
            {successMessage && (
            <Alert
              severity="success"
              sx={{ marginBottom: 2 }}
              onClose={() => {
                setSuccessMessage('');
              }}
            >
              {successMessage}
            </Alert>
            )}
            {errorMessage && (
            <Alert
              severity="error"
              sx={{ marginBottom: 2 }}
              onClose={() => {
                setErrorMessage('');
              }}
            >
              {errorMessage}
            </Alert>
            )}
            <Outlet />
          </Box>
        </div>
      </LocalizationProvider>
    </AlertContext.Provider>
  );
}

export default App;
