import { Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TypographyWithIcon from '../../typography-with-icon';
import { Offer } from '../../../types/offer/Offer';

export default function LastOffersDesktop(props:{
  offers: Offer[]
}) {
  const { offers } = props;
  const navigation = useNavigate();
  const { t } = useTranslation();
  return (
    <Stack direction="column" sx={{ borderRadius: '1px', border: 'solid 1px', borderColor: 'gray' }}>
      <Typography padding={2} sx={{ background: 'gray', fontWeight: 600 }}>Derniers jobs</Typography>
      <Stack direction="column" />
      {
        offers.map((offer) => (
          <>
            <Stack
              direction="column"
              spacing={2}
              alignItems="flex-start"
              paddingX="2em"
              paddingBottom="2em"
              paddingTop="1em"
              onClick={() => navigation(`/offer/details/${offer.offerId}`)}
            >
              <Typography variant="h5" align="left" alignItems="flex-start" fontWeight="bold">{offer.title}</Typography>
              <Stack direction="column" spacing={1} alignItems="flex-start">
                <TypographyWithIcon text={offer.contractType} icon={<WorkOutlineOutlinedIcon />} />
                <TypographyWithIcon text={`${offer.salary} euros/${t('month')}`} icon={<EuroOutlinedIcon />} />
                <TypographyWithIcon text={`${offer.location}`} icon={<LocationOnOutlinedIcon />} />
                {offer.needDrivingLicence && (
                  <TypographyWithIcon text={t('driving-license-required')} icon={<BadgeIcon />} />
                )}
              </Stack>
            </Stack>
            <Divider sx={{ width: '100%' }} />
          </>

        ))
      }
    </Stack>
  );
}
