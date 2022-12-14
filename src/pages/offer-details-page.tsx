import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Button, Dialog, Divider, Grid, Stack, Typography,
} from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTranslation } from 'react-i18next';
import { useFetchOffer } from '../hooks/request/offerHooks';
import { useFetchCompany } from '../hooks/request/companyHooks';
import Loading from '../components/loading';
import TypographyWithIcon from '../components/typography-with-icon';
import CandidateToOffer from '../components/offers/candidate-to-offer/candidate-to-offer';
import useAuth from '../hooks/context/useAuth';

export default function OfferDetailsPage() {
  const params = useParams();
  const { t } = useTranslation();
  const { workerId } = useAuth();
  const [offer, isOfferLoading, offerError] = useFetchOffer(`${params.offerId}`);
  // revoir
  const [company, isCompanyLoading, companyError] = useFetchCompany(`${offer?.companyId}`);
  const [openApplyModal, setOpenApplyModal] = useState(false);

  const openModal = () => (
    setOpenApplyModal(true)
  );

  if (isOfferLoading || isCompanyLoading) {
    <Grid
      container
      width="100%"
      height="80vh"
      justifyContent="center"
      alignItems="center"
    >
      <Loading />
    </Grid>;
  }

  if ((offerError || companyError) && !company) {
    return <div>error</div>;
  }

  if (offer && company) {
    return (
      <>
        <Dialog open={openApplyModal} onClose={() => setOpenApplyModal(false)} fullWidth>
          <CandidateToOffer
            onSubmitionSuccess={() => { setOpenApplyModal(false); }}
            offer={offer}
            company={company}
          />
        </Dialog>
        <Stack direction="column" gap={5}>

          {/* header entreprise */}
          <Stack direction="row" gap={4} alignItems="center">
            { company.pictureUrl && (
            <Box sx={{ width: { xs: '100px', md: '120px' }, height: { xs: '100px', md: '120px' } }}>
              <img src={company.pictureUrl} alt="logo" style={{ width: '100%', height: '100%' }} />
            </Box>
            )}
            <Stack direction="column" alignItems="flex-start" justifyContent="center" spacing={1}>
              <Typography variant="h3" sx={{ fontSize: { xs: '33px', md: '35px', lg: '40px' } }} align="left">{`${company.name} recrute un(e) ${offer.title.toLowerCase()}!`}</Typography>

              <Grid direction="row" container gap={2}>
                <TypographyWithIcon icon={<DateRangeOutlinedIcon />} text={`?? partir du ${offer.startingDate}`} />
                <TypographyWithIcon icon={<LoyaltyOutlinedIcon />} text={company.sector} />
                <TypographyWithIcon
                  icon={<PeopleAltOutlinedIcon />}
                  text={`${company.employeesNumber} salari??s`}
                />
              </Grid>

            </Stack>

          </Stack>
          {/* body */}

          <Stack direction="row" columnGap={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Stack direction="column" width="280px" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/* L'entreprise */}
              <Stack direction="column" alignItems="flex-start" spacing={1}>
                <Typography align="left">L&apos;ENTREPRISE</Typography>
                <Typography align="left" sx={{ fontSize: '28px', fontWeight: 600 }}>{company.name}</Typography>
                <TypographyWithIcon icon={<LoyaltyOutlinedIcon />} text={company.sector} />
                <TypographyWithIcon
                  icon={<PeopleAltOutlinedIcon />}
                  text={`${company.employeesNumber} salari??s`}
                />
              </Stack>

              <Divider sx={{ width: '90%' }} />

              {/* Le poste */}
              <Stack direction="column" alignItems="flex-start" spacing={1}>
                <Typography align="left">LE POSTE</Typography>
                <Typography align="left" sx={{ fontSize: '28px', fontWeight: 600 }}>{offer.title}</Typography>
                <Stack direction="column" spacing={1} alignItems="flex-start">
                  <TypographyWithIcon
                    text={offer.contractType}
                    icon={<WorkOutlineOutlinedIcon />}
                  />
                  <TypographyWithIcon text={`${offer.salary} euros/${t('month')}`} icon={<EuroOutlinedIcon />} />
                  <TypographyWithIcon text={`${offer.location}`} icon={<LocationOnOutlinedIcon />} />
                  {offer.needDrivingLicence && (
                    <TypographyWithIcon text={t('driving-license-required')} icon={<BadgeOutlinedIcon />} />
                  )}
                  <TypographyWithIcon
                    icon={<PeopleAltOutlinedIcon />}
                    text={`${company.employeesNumber} salari??s`}
                  />
                </Stack>

              </Stack>

              <Divider sx={{ width: '90%' }} />

              {/* Postuler */}
              <Stack direction="column" alignItems="flex-start" spacing={2}>
                <Typography align="left">{t('interested')}</Typography>
                {workerId ? <Button variant="contained" onClick={openModal}>POSTULER</Button> : <Typography>{t('login-to-apply')}</Typography>}

              </Stack>

            </Stack>

            <Stack direction="column" justifyContent="center" spacing={10} sx={{ maxWidth: { xs: '100%', md: '70%' } }}>
              {/* Description entreprise */}
              <Stack direction="column" justifyContent="flex-start" spacing={2}>
                <Typography variant="h4" fontWeight={600} align="left">Qui sont ils ?</Typography>
                <Divider variant="fullWidth" sx={{ width: '100%', background: 'black' }} />
                <Typography fontSize="20px" align="left">{company.description}</Typography>
              </Stack>

              {/* Offre d'emploi */}
              <Stack direction="column" justifyContent="flex-start" spacing={2}>
                <Typography variant="h4" fontWeight={600} align="left">Pr??sentation du poste</Typography>
                <Divider variant="fullWidth" sx={{ width: '100%', background: 'black' }} />
                <Typography align="left" fontSize="20px">{company.description}</Typography>
              </Stack>
            </Stack>
          </Stack>

        </Stack>
      </>

    );
  }
  return <div>coucou</div>;
}
