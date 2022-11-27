import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import useAuth from '../hooks/context/useAuth';

export default function CompanyProfilePage() {
  const { companyId } = useAuth();

  return (
    <Stack>
      <Typography>
        Company profile page
        {' '}
        {companyId}
      </Typography>
    </Stack>
  );
}
