import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import React, {
  useEffect, useMemo, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationList from '../components/applications/application-list';
import OfferDetailsCard from '../components/offers/offer-details-card';
import richAxios from '../database/axios/axios-client';
import useAlert from '../hooks/context/useAlert';
import useFetchMany from '../hooks/generic/useFetchMany';
import { useFetchOffer } from '../hooks/request/offerHooks';
import Application from '../types/application/Application';
import ApplicationFull from '../types/application/ApplicationFull';
import Worker from '../types/worker/Worker';
import { HOME_ROUTE } from './routing/routes';

export default function MyOfferDetailsPage() {
  const params = useParams();
  const { offerId } = params;
  const navigate = useNavigate();
  const [applicationsFull, setApplicationsFull] = useState<ApplicationFull[]>([]);
  const { setError } = useAlert();

  useEffect(() => {
    if (!offerId) {
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
        setApplicationsFull((curApplicationsFull) => [...curApplicationsFull, applicationFull]);
      })
      .catch((err) => {
        setError(err);
      });
  }), [applications]);

  useEffect(() => {
    if (offerError) {
      setError(offerError);
      navigate(HOME_ROUTE);
    }
  });

  useEffect(() => {
    if (applicationsError) {
      setError(applicationsError);
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
