import { Divider, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TypographyWithIcon from '../../typography-with-icon';
import { Offer } from '../../../types/offer/Offer';

export default function LastOfferMobile(props:{
  offers: Offer[]
}) {
  const navigation = useNavigate();
  const { offers } = props;
  const { t } = useTranslation();
  return (
    <Stack direction="column" width="100%">
      <Typography padding={2} sx={{ fontWeight: 600 }} align="left" fontSize="20px">Derniers jobs</Typography>
      <Stack direction="row" maxWidth="100%" sx={{ overflowY: 'scroll' }} spacing={3} paddingY="2px" paddingLeft="2px">
        {
          offers.map((offer) => (
            <Box component={Paper} elevation={2} borderRadius="20px" onClick={() => navigation(`/offer/details/${offer.offerId}`)}>
              <Stack
                direction="column"
                spacing={2}
                alignItems="flex-start"
                paddingX="2em"
                paddingBottom="2em"
                paddingTop="1em"
              >
                <Typography variant="h5" align="left" alignItems="flex-start" fontWeight="bold">{offer.title}</Typography>
                <Stack direction="column" spacing={1} alignItems="flex-start">
                  <TypographyWithIcon
                    text={offer.contractType}
                    icon={<WorkOutlineOutlinedIcon />}
                    align="left"
                    sx={{ fontSize: '15px' }}
                  />
                  <TypographyWithIcon
                    text={`${offer.salary} euros / ${t('month')}`}
                    icon={<EuroOutlinedIcon />}
                    align="left"
                    sx={{ fontSize: '15px' }}
                  />
                  <TypographyWithIcon
                    text={`${offer.location}`}
                    icon={<LocationOnOutlinedIcon />}
                    align="left"
                    sx={{ fontSize: '15px' }}
                  />
                  {offer.needDrivingLicence && (
                    <TypographyWithIcon
                      text={t('driving-license-required')}
                      align="left"
                      icon={<BadgeIcon />}
                      sx={{ fontSize: '15px' }}
                    />
                  )}
                </Stack>
              </Stack>
              <Divider sx={{ width: '100%' }} />
            </Box>

          ))
        }
      </Stack>

    </Stack>
  );
}
