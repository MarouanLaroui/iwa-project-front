import {
  CircularProgress,
  Grid, Tab, Tabs, Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { t } from 'i18next';
import React, { useContext } from 'react';
import CompanyProfileForm from '../components/forms/company/update/company-profile-form';
import Loading from '../components/loading';
import AlertContext from '../context/alert-context';
import useAuth from '../hooks/context/useAuth';
import { updateCompany, useFetchCompany } from '../hooks/request/companyHooks';
import { CompanyUpdateDTOFileToUpload } from '../types/company/CompanyDTO';
import MyFeedbacksCompanyPage from './my-feedbacks-company-page';

export default function CompanyProfilePage() {
  const { companyId } = useAuth();
  const [company, loading, error] = useFetchCompany(companyId!);
  const { setError, setSuccessMessage } = useContext(AlertContext);

  const [value, setValue] = React.useState(0);

  const onSubmit = (companyToUpdate: CompanyUpdateDTOFileToUpload) => {
    updateCompany(companyToUpdate).then(
      () => {
        setSuccessMessage(t('information-successfully-updated'));
      },
      (err) => { setError(err); },
    );
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (error) {
    setError(error);
  }

  if (loading) {
    return (
      <Grid
        container
        width="100%"
        height="80vh"
        justifyContent="center"
        alignItems="center"
      >
        <Loading />
      </Grid>
    );
  }

  return (
    <>
      {company && (
      <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '30px' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={t('personal-information')} />
            <Tab label={t('feedback-received')} />
          </Tabs>
        </Box>
        {value === 0
              && (
              <Stack>
                <Stack direction="column" alignItems="center" spacing={4}>
                  <Typography variant="h3">{t('personal-information')}</Typography>
                  <Box
                    maxWidth="40rem"
                    minWidth="600px"
                  >
                    <CompanyProfileForm onSubmit={onSubmit} company={company} />
                  </Box>
                </Stack>
              </Stack>
              )}
        {value === 1 && <MyFeedbacksCompanyPage />}

      </>
      )}
      {loading && <CircularProgress />}
    </>
  );
}
