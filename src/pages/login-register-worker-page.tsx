import { Tab, Tabs, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import WorkerLoginForm from '../components/forms/login/worker-login-form';
import WorkerSignupForm from '../components/forms/worker/signup/worker-signup-form';
import UserContext from '../context/user-context';
import { onWorkerAuthenticated } from '../helpers/user-helper';
import WorkerAuthenticated from '../types/worker/WorkerAuthenticated';
import { COMPANY_LOGIN_ROUTE, WORKER_PROFILE_BASE_ROUTE } from './routing/routes';

export default function WorkerLoginRegisterPage() {
  const [tabNumber, setTabNumber] = useState(0);
  const { setWorkerId, setCompanyId } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue:number) => {
    setTabNumber(newValue);
  };

  const onRegisterSuccess = (worker: WorkerAuthenticated) => {
    onWorkerAuthenticated(worker, setCompanyId, setWorkerId);
    navigate(`${WORKER_PROFILE_BASE_ROUTE}`);
  };

  return (
    <Stack direction="column" alignItems="center" spacing={5} width="100%">
      <Tabs value={tabNumber} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label={`${t('login')}`} />
        <Tab label={`${t('register')}`} />
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

      <Stack direction="row" spacing={1}>
        <Typography>
          {t('are-you-a-company')}
        </Typography>

        <Link to={`/${COMPANY_LOGIN_ROUTE}`}>{`${t('click-here')!}`}</Link>
      </Stack>
    </Stack>
  );
}
