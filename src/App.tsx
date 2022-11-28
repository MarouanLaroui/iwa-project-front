import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Alert } from '@mui/material';
import { DefaultTFuncReturn } from 'i18next';
import { AxiosError } from 'axios';
import Navbar from './components/navbar/navbar';
import AlertContext, { AlertContextType } from './context/alert-context';
import UserContext, { UserContextType } from './context/user-context';
import { refreshUserInfoFromStorage, removeAuthFromStorage } from './helpers/user-helper';

function App() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [workerId, setWorkerId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [error, setError] = useState < AxiosError | null>(null);
  const [successMessage, setSuccessMessage] = useState('' as DefaultTFuncReturn);

  const alertContext = useMemo<AlertContextType>(() => ({
    setError,
    setSuccessMessage,
  }), [setError, setSuccessMessage]);

  useEffect(() => {
    setErrorMessage(error?.message);
    setError(null);
    if (error?.response?.status === 401) {
      setWorkerId(null);
      setCompanyId(null);
      removeAuthFromStorage();
    }
  }, [error]);

  const userContext = useMemo<UserContextType>(() => ({
    workerId,
    companyId,
    setWorkerId,
    setCompanyId,
  }), [workerId, setWorkerId, companyId, setCompanyId]);

  useEffect(() => {
    refreshUserInfoFromStorage(setWorkerId, setCompanyId);
  }, []);

  return (
    <AlertContext.Provider value={alertContext}>
      <UserContext.Provider value={userContext}>
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
      </UserContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;
