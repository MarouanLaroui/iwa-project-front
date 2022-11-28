import {
  Box, Paper, Stack, Typography,
} from '@mui/material';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TypographyWithIcon from '../typography-with-icon';
import { Offer } from '../../types/offer/Offer';

type OfferDetailsCardProps = {
  offer: Offer
  onClick: () => void
};

export default function OfferDetailsCard({ offer, onClick }: OfferDetailsCardProps) {
  const { t } = useTranslation();

  return (
    <Box
      component={Paper}
      elevation={2}
      width="100%"
      borderRadius="5px"
      onClick={() => onClick}
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
        paddingX="20px"
        paddingY="20px"
        gap="5px"
      >
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>{offer.title}</Typography>
        <Typography>{offer.description}</Typography>
        <Stack
          direction="row"
          gap="15px"
        >
          <TypographyWithIcon text={offer.contractType} icon={<WorkOutlineOutlinedIcon />} />
          <TypographyWithIcon text={`${offer.salary} euros/${t('month')}`} icon={<EuroOutlinedIcon />} />
          <TypographyWithIcon text={`${offer.location}`} icon={<LocationOnOutlinedIcon />} />
          {offer.needDrivingLicence && (
          <TypographyWithIcon text={t('driving-license-required')} icon={<BadgeIcon />} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
