import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function CompanyProfilePage() {
  const params = useParams();

  return (
    <Stack>
      <Typography>
        Company profile page
        {' '}
        {params.companyId}
      </Typography>
    </Stack>
  );
}
