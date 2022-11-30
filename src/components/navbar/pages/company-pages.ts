import {
  COMPANY_EMPLOYEES_ROUTE,
  COMPANY_PROFILE_BASE_ROUTE,
  COMPANY_SEARCH_ROUTE, HOME_ROUTE, MY_OFFERS_ROUTE, OFFER_SEARCH_ROUTE,
} from '../../../pages/routing/routes';

const companyPages = [
  { nameKey: 'home', link: HOME_ROUTE },
  { nameKey: 'your-offers-short', link: MY_OFFERS_ROUTE },
  { nameKey: 'search-job', link: OFFER_SEARCH_ROUTE },
  { nameKey: 'search-company', link: COMPANY_SEARCH_ROUTE },
  { nameKey: 'employees', link: COMPANY_EMPLOYEES_ROUTE },
];

const companyAccountPages = [
  { nameKey: 'my-account', link: COMPANY_PROFILE_BASE_ROUTE },
];

export { companyPages, companyAccountPages };
