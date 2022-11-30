import {
  COMPANY_SEARCH_ROUTE, HOME_ROUTE,
  OFFER_SEARCH_ROUTE, WORKER_APPLICATIONS_ROUTE, WORKER_EMPLOYERS_ROUTE, WORKER_PROFILE_BASE_ROUTE,
} from '../../../pages/routing/routes';

const workerPages = [
  { nameKey: 'home', link: HOME_ROUTE },
  { nameKey: 'search-job', link: OFFER_SEARCH_ROUTE },
  { nameKey: 'search-company', link: COMPANY_SEARCH_ROUTE },
  { nameKey: 'applications', link: WORKER_APPLICATIONS_ROUTE },
  { nameKey: 'employers', link: WORKER_EMPLOYERS_ROUTE },
];

const workerAccountPages = [
  { nameKey: 'my-account', link: WORKER_PROFILE_BASE_ROUTE },
];

export { workerPages, workerAccountPages };
