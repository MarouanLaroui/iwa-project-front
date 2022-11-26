import { Tab, Tabs, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanySignupForm from '../components/forms/company/company-signup-form';
import CompanyLoginForm from '../components/forms/login/company-login-form';
import saveTokenInLocalStorage from '../database/utils/local-storage';
import CompanyAuthenticated from '../types/company/CompanyAuthenticated';
import { WORKER_LOGIN_ROUTE, WORKER_PROFILE_BASE_ROUTE } from './routing/routes';

export default function CompanyLoginRegisterPage() {
  const [tabNumber, setTabNumber] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue:number) => {
    setTabNumber(newValue);
  };

  const onRegisterSuccess = (company: CompanyAuthenticated) => {
    saveTokenInLocalStorage(company.authorizationToken);
    navigate(`${WORKER_PROFILE_BASE_ROUTE}/${company.id}`);
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
              <CompanyLoginForm />
            </Box>
          </Stack>

        )
      }

      {
        tabNumber === 1 && (
          <Stack direction="row" width="100%" justifyContent="center">
            <Box width={{ xs: '100%', sm: '500px' }}>
              <CompanySignupForm
                onSubmitionSuccess={onRegisterSuccess}
              />
            </Box>
          </Stack>
        )
      }

      <Stack direction="row" spacing={1}>
        <Typography>
          Vous cherchez un emploi ?
        </Typography>

        <Link to={WORKER_LOGIN_ROUTE}>cliquez ici</Link>
      </Stack>
    </Stack>
  );
}
