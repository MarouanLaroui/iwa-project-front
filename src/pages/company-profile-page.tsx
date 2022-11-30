import {
  Grid, Typography,
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

export default function CompanyProfilePage() {
  const { companyId } = useAuth();
  const [company, loading, error] = useFetchCompany(companyId!);
  const { setError, setSuccessMessage } = useContext(AlertContext);

  const onSubmit = (companyToUpdate: CompanyUpdateDTOFileToUpload) => {
    updateCompany(companyToUpdate).then(
      () => {
        setSuccessMessage(t('information-successfully-updated'));
      },
      (err) => { setError(err); },
    );
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
    <Stack>
      {
        company && (
        <Stack direction="column" alignItems="center" spacing={4}>
          <Typography variant="h3">{t('personal-information')}</Typography>
          <Box
            maxWidth="40rem"
            minWidth="600px"
          >
            <CompanyProfileForm onSubmit={onSubmit} company={company} />
          </Box>

        </Stack>
        )
      }
    </Stack>
  );
}
