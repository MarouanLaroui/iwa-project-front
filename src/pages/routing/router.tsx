import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route,
} from 'react-router-dom';
import ApplicationForm from '../../components/forms/application/application-form';
import CompanySignupForm from '../../components/forms/company/company-signup-form';
import JobOfferForm from '../../components/forms/job-offer/job-offer-form';
import LoginForm from '../../components/forms/login/login-form';
import WorkerSignupForm from '../../components/forms/worker/worker-signup-form';
import SearchCompaniesPage from '../search-companies-page';
import LandingPage from '../landing-page';
import OfferDetailsPage from '../offer-details-page';
import {
  HOME_ROUTE, COMPANY_SEARCH_ROUTE, OFFER_CREATE_ROUTE,
  OFFER_DETAILS_ROUTE, OFFER_APPLY_ROUTE, WORKER_SIGNUP_ROUTE,
  COMPANY_SIGNUP_ROUTE, COMPANY_LOGIN_ROUTE, WORKER_LOGIN_ROUTE, OFFER_SEARCH_ROUTE,
} from './routes';
import App from '../../App';
import SearchOfferPage from '../search-offer-page';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path={HOME_ROUTE} element={<App />}>
      <Route path={HOME_ROUTE} element={<LandingPage />} />
      <Route path={COMPANY_SEARCH_ROUTE} element={<SearchCompaniesPage />} />
      {/* TODO: separate login form */}
      <Route path={COMPANY_LOGIN_ROUTE} element={<LoginForm />} />
      <Route path={WORKER_LOGIN_ROUTE} element={<LoginForm />} />
      <Route path={OFFER_CREATE_ROUTE} element={<JobOfferForm />} />
      <Route path={OFFER_DETAILS_ROUTE} element={<OfferDetailsPage />} />
      <Route path={OFFER_APPLY_ROUTE} element={<ApplicationForm offerId={1} />} />
      <Route path={OFFER_SEARCH_ROUTE} element={<SearchOfferPage />} />
      <Route path={WORKER_SIGNUP_ROUTE} element={<WorkerSignupForm />} />
      <Route path={COMPANY_SIGNUP_ROUTE} element={<CompanySignupForm />} />
    </Route>,
  ]),
);

export default router;
