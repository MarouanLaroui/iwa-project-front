import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import CriteriaForm from '../components/forms/criteria/criteria-form';
import Loading from '../components/loading';
import { useFetchCriterias } from '../hooks/request/criteriaHooks';

export default function CriteriaPage() {
  const [criterias, loading, error] = useFetchCriterias();

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
    <Stack width="100%" alignItems="center">
      <Typography variant="h3">
        {criterias && !error ? 'Update your criterias' : 'Set your criterias'}
      </Typography>
      <CriteriaForm criteria={criterias} />
    </Stack>
  );
}
