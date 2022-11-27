import usePost from '../generic/usePost';
import useFetch from '../generic/useFetchOne';
import Application from '../../types/application/Application';
import ApplicationDTO from '../../types/application/ApplicationDTO';
import { Offer } from '../../types/offer/Offer';
import usePut from '../generic/usePut';

const useFetchApplication = (id: string) => useFetch<Application>(`applications/${id}`);

const createApplication = (applicationDTO: ApplicationDTO, offerData: Pick<Offer, 'offerId'>) => usePost<ApplicationDTO, Application>(`offers/${offerData.offerId}/applications/`, applicationDTO);

const acceptApplicationByCompany = (applicationId: string) => usePut<string, ApplicationDTO>(`applications/acceptByCompany/${applicationId}`, '');

export { useFetchApplication, createApplication, acceptApplicationByCompany };
