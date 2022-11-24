import React from 'react';

import { Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import { useNavigate } from 'react-router-dom';
import { Company } from '../types/company/Company';

export default function CompanyCard(
  props: {
    company: Company
  },
) {
  const { company } = props;
  const navigation = useNavigate();

  const navigateToCompanyDetailedPage = () => {
    navigation(`/company/details/${company.id}`);
  };
  return (
    <Box
      component={Paper}
      elevation={2}
      width="100%"
      borderRadius="5px"
      onClick={navigateToCompanyDetailedPage}
      sx={{
        '&: hover': {
          transform: 'scale(1.03)',
          transition: 'transform .1s',
          cursor: 'pointer',
        },
      }}
    >
      <Stack
        direction="column"
        alignItems="flex-start"
        paddingX="40px"
        paddingY="25px"
        gap="5px"
      >
        <Typography variant="h3" fontWeight="bold">{company.name}</Typography>

        <Stack direction="row" justifyContent="center" gap="10px">
          <LoyaltyOutlinedIcon />
          <Typography>{company.sector}</Typography>
        </Stack>

        {/* <Stack direction="row" justifyContent="center" gap="10px">
          <LocationOnOutlinedIcon />
          <Typography>{company.}</Typography>
        </Stack> */}

        <Stack direction="row" justifyContent="center" gap="10px">
          <PeopleAltOutlinedIcon />
          <Typography>
            {company.employeesNumber}
            salariés
          </Typography>
        </Stack>

      </Stack>
    </Box>

  );
}
