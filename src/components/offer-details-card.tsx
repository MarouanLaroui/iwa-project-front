import {
  Box, Paper, Stack, Typography,
} from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import BadgeIcon from '@mui/icons-material/Badge';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TypographyWithIcon from './typography-with-icon';
import { Offer } from '../types/offer/Offer';

type Props = {
  offer: Offer
};

export default function OfferDetailsCard({ offer }: Props) {
  const { t } = useTranslation();
  return (
    <Box component={Paper} elevation={2} maxWidth="450px" borderRadius="5px">
      <Stack
        direction="column"
        alignItems="flex-start"
        paddingX="20px"
        paddingY="20px"
        gap="5px"
      >
        <Typography style={{ fontWeight: 'bold' }}>{t('offer-details')}</Typography>
        <Typography>{offer.description}</Typography>
        <TypographyWithIcon text={t('contract-type', { contractType: offer.contractType })} icon={<DescriptionIcon />} />
        <TypographyWithIcon text={t('monthly-salary', { salary: offer.salary })} icon={<MonetizationOnIcon />} />
        {offer.hasCompanyCar && (
          <TypographyWithIcon text={t('company-car-included')} icon={<DirectionsCarFilledIcon />} />
        )}
        {offer.needDrivingLicense && (
          <TypographyWithIcon text={t('driving-license-required')} icon={<BadgeIcon />} />
        )}
      </Stack>
    </Box>
  );
}
