import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationList from '../components/applications/application-list';
import OfferDetailsCard from '../components/offers/offer-details-card';
import AlertContext from '../context/alert-context';
import richAxios from '../database/axios/axios-client';
import useFetchMany from '../hooks/generic/useFetchMany';
import { useFetchOffer } from '../hooks/request/offerHooks';
import Application from '../types/application/Application';
import ApplicationFull from '../types/application/ApplicationFull';
import Worker from '../types/worker/Worker';
import { HOME_ROUTE } from './routing/routes';

export default function MyOfferDetailsPage() {
  const params = useParams();
  const { setErrorMessage } = useContext(AlertContext);
  const { offerId } = params;
  const navigate = useNavigate();
  const [applicationsFull, setApplicationsFull] = useState<ApplicationFull[]>([]);

  useEffect(() => {
    if (!offerId) {
      setErrorMessage('No offer id in the route parameters.');
      navigate(HOME_ROUTE);
    }
  });

  const [offer, offerLoading, offerError] = useFetchOffer(offerId!);
  const [applications, , applicationsLoading, applicationsError] = useFetchMany<Application>(`applications/findByOfferId/${offerId}`);

  useMemo(() => applications.forEach((application) => {
    const { workerId } = application;
    richAxios
      .get<Worker>(`workers/${workerId}`)
      .then((response) => {
        const worker = response.data;
        worker.birthDate = new Date(worker.birthDate);
        const applicationFull = {
          ...application,
          worker,
        };
        setApplicationsFull([...applicationsFull, applicationFull]);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }), [applications]);

  useEffect(() => {
    if (offerError) {
      setErrorMessage(offerError.message);
      navigate(HOME_ROUTE);
    }
  });

  useEffect(() => {
    if (applicationsError) {
      setErrorMessage(applicationsError.message);
      navigate(HOME_ROUTE);
    }
  });

  if (offerLoading || applicationsLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack width="100%" direction="column" gap="2em">
      <OfferDetailsCard offer={offer!} onClick={() => {}} />
      <ApplicationList applications={applicationsFull} />
    </Stack>
  );
}
