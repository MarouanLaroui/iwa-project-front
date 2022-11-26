import React from 'react';

import { Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../types/company/Company';
import TypographyWithIcon from '../typography-with-icon';

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
        paddingY="35px"
        spacing={2}
      >
        {/* Icon and title */}

        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ width: { xs: 80, md: 100 }, height: { xs: 80, md: 100 }, background: 'green' }} />
          <Stack direction="column" alignItems="flex-start">
            <Typography variant="h3" fontWeight="bold">{company.name}</Typography>
            <Typography variant="caption" fontWeight="bold">Science for a better life !</Typography>
          </Stack>

        </Stack>
        {/* Labels and icons */}
        <Stack direction="row" spacing={1} justifyContent="space-around" width="100%">
          <TypographyWithIcon text={company.sector} icon={<LoyaltyOutlinedIcon />} />
          <TypographyWithIcon text={`${company.employeesNumber} salariés`} icon={<PeopleAltOutlinedIcon />} />
        </Stack>
      </Stack>
    </Box>

  );
}