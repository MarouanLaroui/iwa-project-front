import { Tab, Tabs, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import CompanySignupForm from '../components/forms/company/company-signup-form';
import CompanyLoginForm from '../components/forms/login/company-login-form';
import CompanyAuthenticated from '../types/company/CompanyAuthenticated';
import UserContext from '../context/user-context';
import { COMPANY_PROFILE_BASE_ROUTE, WORKER_LOGIN_ROUTE } from './routing/routes';
import { onUserAuthenticated } from '../helpers/user-helper';

export default function CompanyLoginRegisterPage() {
  const [tabNumber, setTabNumber] = useState(0);
  const { setCompanyId } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue:number) => {
    setTabNumber(newValue);
  };

  const onRegisterSuccess = (company: CompanyAuthenticated) => {
    onUserAuthenticated(company, setCompanyId);
    navigate(`${COMPANY_PROFILE_BASE_ROUTE}/${company.id}`);
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
          {t('are-you-looking-for-a-job')}
        </Typography>

        <Link to={`/${WORKER_LOGIN_ROUTE}`}>{`${t('click-here') !}`}</Link>
      </Stack>
    </Stack>
  );
}
