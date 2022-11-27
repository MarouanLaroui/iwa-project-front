import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OfferDetailsCard from '../components/offers/offer-details-card';
import AlertContext from '../context/alert-context';
import { useFetchOffer } from '../hooks/request/offerHooks';
import { HOME_ROUTE } from './routing/routes';

export default function MyOfferDetailsPage() {
  const params = useParams();
  const { setErrorMessage } = useContext(AlertContext);
  const { offerId } = params;
  const navigate = useNavigate();

  useEffect(() => {
    if (!offerId) {
      setErrorMessage('No offer id in the route parameters.');
      navigate(HOME_ROUTE);
    }
  });

  const [offer, offerLoading, offerError] = useFetchOffer(offerId!);

  // const [
  //   applications,
  //   applicationsLoading,
  //   applicationsError,
  // ] = useFetchApplicationsForOfferId(offerId!);

  useEffect(() => {
    if (offerError) {
      setErrorMessage(offerError.message);
      navigate(HOME_ROUTE);
    }
  });

  // TODO: useEffect
  //   if (applicationsError) {
  //     setErrorMessage(applicationsError.message);
  //     navigate(HOME_ROUTE);
  //   }

  if (offerLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack width="100%" direction="column" gap="2em">
      <OfferDetailsCard offer={offer!} onClick={() => {}} />
      {/* <ApplicationList applications={applications!} /> */}
    </Stack>
  );
}
