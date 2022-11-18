import React from 'react';

import { Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';

export default function CompanyCard() {
  return (
    <Box component={Paper} elevation={2} maxWidth="450px" borderRadius="5px">
      <Stack
        direction="column"
        alignItems="flex-start"
        paddingX="20px"
        paddingY="20px"
        gap="5px"
      >
        <Typography variant="h3" fontWeight="bold">Waalaxy</Typography>

        <Stack direction="row" justifyContent="center" gap="10px">
          <LoyaltyOutlinedIcon />
          <Typography>Informatique</Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" gap="10px">
          <LocationOnOutlinedIcon />
          <Typography>Avenue Nina Simone Montpellier 34000</Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" gap="10px">
          <PeopleAltOutlinedIcon />
          <Typography>450 salariés</Typography>
        </Stack>

      </Stack>
    </Box>

  );
}
