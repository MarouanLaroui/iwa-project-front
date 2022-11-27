import {
  HOME_ROUTE, OFFER_SEARCH_ROUTE, COMPANY_SEARCH_ROUTE, WORKER_LOGIN_ROUTE, COMPANY_LOGIN_ROUTE,
} from '../../../pages/routing/routes';

const basePages = [
  { nameKey: 'home', link: HOME_ROUTE },
  { nameKey: 'search-job', link: OFFER_SEARCH_ROUTE },
  { nameKey: 'search-company', link: COMPANY_SEARCH_ROUTE },
];

const baseAccountPages = [
  { nameKey: 'worker-login', link: WORKER_LOGIN_ROUTE },
  { nameKey: 'company-login', link: COMPANY_LOGIN_ROUTE },
];

export { basePages, baseAccountPages };
