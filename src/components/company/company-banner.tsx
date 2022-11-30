import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Stack, Box } from '@mui/system';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import TypographyWithIcon from '../typography-with-icon';
import { Company } from '../../types/company/Company';

export default function CompanyBanner(props:{
  company:Company
}) {
  const { company } = props;
  return (
    <Stack direction="row" gap={4} alignItems="center">
      <Box sx={{ width: { xs: '100px', md: '120px' }, height: { xs: '100px', md: '120px' } }}>
        <img src={company.pictureUrl} alt="logo" style={{ width: '100%%', height: '100%' }} />
      </Box>
      <Stack direction="column" alignItems="flex-start" justifyContent="center" spacing={1}>
        <Typography variant="h3" sx={{ fontSize: { xs: '33px', md: '35px', lg: '40px' } }} align="left">{company.name}</Typography>

        <Grid direction="row" container gap={2}>
          <TypographyWithIcon icon={<LoyaltyOutlinedIcon />} text={company.sector} />
          <TypographyWithIcon
            icon={<PeopleAltOutlinedIcon />}
            text={`${company.employeesNumber} salariés`}
          />
        </Grid>

      </Stack>
    </Stack>
  );
}
