import useFetchMany from '../generic/useFetchMany';
import usePost from '../generic/usePost';
import useFetch from '../generic/useFetchOne';
import { Application } from '../../types/application/Application';
import ApplicationDTO from '../../types/application/ApplicationDTO';
import { Offer } from '../../types/offer/Offer';

const useFetchApplication = (id: string) => useFetch<Application>(`applications/${id}`);

const useFetchApplications = () => useFetchMany<Application>('applications/');

const createApplication = (applicationDTO: ApplicationDTO, offerId: Pick<Offer, 'offerId'>) => usePost<ApplicationDTO, Application>(`offers/${offerId}/applications/`, applicationDTO);

export { useFetchApplication, useFetchApplications, createApplication };
