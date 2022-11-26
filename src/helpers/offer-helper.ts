import { Offer, OfferFilters } from '../types/offer/Offer';

const filterOfferByFilter = (offers:Offer[], filters: OfferFilters) => offers.filter((offer) => {
  if (filters.contractType && filters.contractType !== offer.contractType) return false;
  if (filters.jobType && filters.jobType !== offer.jobType) return false;
  if (
    filters.title
    && !offer.title.toLowerCase().trim().startsWith(filters.title.toLowerCase())) {
    return false;
  }
  return true;
});

export default filterOfferByFilter;
