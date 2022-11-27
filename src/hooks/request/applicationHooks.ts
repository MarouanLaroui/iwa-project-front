import { useState } from 'react';
import useFetchMany from '../generic/useFetchMany';
import usePost from '../generic/usePost';
import useFetch from '../generic/useFetchOne';
import Application from '../../types/application/Application';
import ApplicationDTO from '../../types/application/ApplicationDTO';
import { Offer } from '../../types/offer/Offer';
import ApplicationFull from '../../types/application/ApplicationFull';
import richAxios from '../../database/axios/axios-client';
import Worker from '../../types/worker/Worker';

const useFetchApplication = (id: string) => useFetch<Application>(`applications/${id}`);

function useFetchApplicationsForOfferId(offerId: string):
[ApplicationFull[] | undefined, boolean, Error | undefined] {
  const [data, setData] = useState<ApplicationFull[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  // useEffect(() => {
  const [applications, , applicationsLoading, applicationsError] = useFetchMany<Application>(`applications/findByOfferId/${offerId}`);
  setLoading(applicationsLoading);
  setError(applicationsError);

  const applicationsFull: ApplicationFull[] | undefined = [];
  applications.forEach((application) => {
    const { workerId } = application;
    richAxios
      .get<Worker>(`workers/${workerId}`)
      .then((response) => ({
        ...application,
        worker: response.data,
      }));
    // .catch((err) => {
    //   setError(err);
    // })
    // .finally(() => setLoading(false));
  });

  setData(applicationsFull);
  // });

  return [data, loading, error];
}

const createApplication = (applicationDTO: ApplicationDTO, offerData: Pick<Offer, 'offerId'>) => usePost<ApplicationDTO, Application>(`offers/${offerData.offerId}/applications/`, applicationDTO);

export { useFetchApplication, useFetchApplicationsForOfferId, createApplication };
