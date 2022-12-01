import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import './App.css';
import { Cloudinary } from '@cloudinary/url-gen';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Alert } from '@mui/material';
import { DefaultTFuncReturn } from 'i18next';
import { AxiosError } from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/navbar/navbar';
import AlertContext, { AlertContextType } from './context/alert-context';
import UserContext, { UserContextType } from './context/user-context';
import { refreshUserInfoFromStorage, removeAuthFromStorage } from './helpers/user-helper';
import CloudinaryContext, { CloudinaryContextType } from './context/cloudinary-context';
import theme from './theme/theme';

function App() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [workerId, setWorkerId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [error, setError] = useState < AxiosError | null>(null);
  const [successMessage, setSuccessMessage] = useState('' as DefaultTFuncReturn);

  /* for images and files */
  const [cloudinary] = useState(new Cloudinary({
    cloud: {
      cloudName: `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`,
      apiKey: `${process.env.REACT_APP_CLOUDINARY_API_KEY}`,
    },
  }));

  const cloudinaryContext = useMemo<CloudinaryContextType>(() => ({
    cloudinary,
  }), [cloudinary]);

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
    <ThemeProvider theme={theme}>
      <CloudinaryContext.Provider value={cloudinaryContext}>
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
      </CloudinaryContext.Provider>
    </ThemeProvider>

  );
}

export default App;
