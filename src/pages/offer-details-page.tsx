import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Paper, Stack, Typography,
} from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import BadgeIcon from '@mui/icons-material/Badge';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTranslation } from 'react-i18next';
import { useFetchOffer } from '../hooks/request/offerHooks';
import { useFetchCompany } from '../hooks/request/companyHooks';
import TypographyWithIcon from '../components/typography-with-icon';

export default function OfferDetailsPage() {
  const { t } = useTranslation();

  const params = useParams();
  const [offer, , ,] = useFetchOffer(`${params.offerId}`);
  // revoir
  const [company, , ,] = useFetchCompany(`${offer?.companyId}`);

  if (offer) {
    return (
      <Box component={Paper} elevation={2} width="100%" borderRadius="5px">
        <Stack
          direction="column"
          alignItems="flex-start"
          paddingX="20px"
          paddingY="20px"
          gap="5px"
        >
          <Typography style={{ fontWeight: 'bold' }}>{offer.title}</Typography>
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
        <div>{company?.name}</div>
      </Box>
    );
  }

  return (<div>coucou</div>);
}
