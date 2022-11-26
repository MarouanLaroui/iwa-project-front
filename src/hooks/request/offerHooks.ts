import { Offer } from '../../types/offer/Offer';
import OfferDTO from '../../types/offer/OfferDTO';
import useFetchMany from '../generic/useFetchMany';
import usePost from '../generic/usePost';
import useFetch from '../generic/useFetchOne';
import { Company } from '../../types/company/Company';

const useFetchOffer = (id: string) => useFetch<Offer>(`offers/${id}`);

const useFetchOffers = () => useFetchMany<Offer>('offers/');

const useFetchOffersByCompany = (companyData: Pick<Company, 'id'>) => useFetchMany<Offer>(`offers/findByCompanyId/${companyData.id}`);

const createOffer = (offerToPost:OfferDTO) => usePost<OfferDTO, Offer>('offers/', offerToPost);

export {
  useFetchOffer, useFetchOffers, useFetchOffersByCompany, createOffer,
};
