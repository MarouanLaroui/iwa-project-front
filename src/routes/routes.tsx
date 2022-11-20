import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route,
} from 'react-router-dom';
import App from '../App';
import ApplicationForm from '../components/forms/application/application-form';
import CompanyForm from '../components/forms/company/company-form';
import JobOfferForm from '../components/forms/job-offer/job-offer-form';
import LoginForm from '../components/forms/login/login-form';
import WorkerForm from '../components/forms/worker/worker-form';
import SearchCompaniesPage from '../pages/search-companies-page';
import LandingPage from '../pages/landing-page';
import OfferDetailsPage from '../pages/offer-details-page';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="company/search" element={<SearchCompaniesPage />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="offer/create" element={<JobOfferForm />} />
      <Route path="offer/details/:offerId" element={<OfferDetailsPage />} />
      <Route path="offer/apply" element={<ApplicationForm offerId={1} />} />
      <Route path="worker/signup" element={<WorkerForm />} />
      <Route path="company/signup" element={<CompanyForm />} />
    </Route>,
  ]),
);

export const HOME_ROUTE: '/' = '/';
export const WORKER_LOGIN_ROUTE: 'worker/login' = 'worker/login';
export const WORKER_SIGNUP_ROUTE: 'worker/signup' = 'worker/signup';
export const COMPANY_LOGIN_ROUTE: 'company/login' = 'company/login';
export const COMPANY_SIGNUP_ROUTE: 'company/signup' = 'company/signup';
export const COMPANY_SEARCH_ROUTE: 'company/search' = 'company/search';
export const OFFER_SEARCH_ROUTE: 'offer/search' = 'offer/search';
export const OFFER_CREATE: 'offer/create' = 'offer/create';

export type AppRoute = typeof HOME_ROUTE
  | typeof WORKER_LOGIN_ROUTE
  | typeof WORKER_SIGNUP_ROUTE
  | typeof COMPANY_LOGIN_ROUTE
  | typeof COMPANY_SIGNUP_ROUTE
  | typeof COMPANY_SEARCH_ROUTE
  | typeof OFFER_SEARCH_ROUTE
  | typeof OFFER_CREATE;

export default router;
