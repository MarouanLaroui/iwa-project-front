import { Tab, Tabs } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkerLoginForm from '../components/forms/login/worker-login-form';
import WorkerSignupForm from '../components/forms/worker/signup/worker-signup-form';
import saveTokenInLocalStorage from '../database/utils/local-storage';
import WorkerAuthenticated from '../types/worker/WorkerAuthenticated';
import { WORKER_PROFILE_BASE_ROUTE } from './routing/routes';

export default function LoginRegisterPage() {
  const [tabNumber, setTabNumber] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue:number) => {
    setTabNumber(newValue);
  };

  const onRegisterSuccess = (worker: WorkerAuthenticated) => {
    saveTokenInLocalStorage(worker.authorizationToken);
    navigate(`${WORKER_PROFILE_BASE_ROUTE}/${worker.id}`);
  };

  return (
    <Stack direction="column" alignItems="center" spacing={5} width="100%">
      <Tabs value={tabNumber} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label="Se connecter" />
        <Tab label="S'inscrire" />
      </Tabs>

      {
        tabNumber === 0 && (
          <Stack direction="row" width="100%" justifyContent="center">
            <Box width={{ xs: '100%', sm: '500px' }}>
              <WorkerLoginForm />
            </Box>
          </Stack>

        )
      }

      {
        tabNumber === 1 && (
          <Stack direction="row" width="100%" justifyContent="center">
            <Box width={{ xs: '100%', sm: '500px' }}>
              <WorkerSignupForm
                onSubmissionSuccess={onRegisterSuccess}
                readonly={false}
              />
            </Box>
          </Stack>
        )
      }
    </Stack>
  );
}
