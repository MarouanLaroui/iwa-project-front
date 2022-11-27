import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route,
} from 'react-router-dom';
import SearchCompaniesPage from '../search-companies-page';
import LandingPage from '../landing-page';
import OfferDetailsPage from '../offer-details-page';
import {
  HOME_ROUTE, COMPANY_SEARCH_ROUTE, OFFER_CREATE_ROUTE,
  OFFER_DETAILS_ROUTE, OFFER_APPLY_ROUTE,
  OFFER_SEARCH_ROUTE, WORKER_LOGIN_ROUTE,
  WORKER_PROFILE_ROUTE, COMPANY_DETAILS_ROUTE,
  COMPANY_LOGIN_ROUTE, COMPANY_PROFILE_ROUTE, WORKER_SIGNUP_ROUTE, MY_OFFERS_ROUTE,
} from './routes';
import ApplyToOfferPage from '../apply-to-offer-page';
import CreateOfferPage from '../create-offer-page';
import CompanyDetailsPage from '../company-details-page';
import App from '../../App';
import SearchOfferPage from '../search-offer-page';
import WorkerProfilePage from '../worker-profile-page';
import CompanyProfilePage from '../company-profile-page';
import WorkerLoginRegisterPage from '../login-register-worker-page';
import CompanyLoginRegisterPage from '../login-register-company-page';
import WorkerSignupForm from '../../components/forms/worker/signup/worker-signup-form';
import MyOfferPage from '../my-offers-page';
import CompanyProtectedRoute from './company-route';
import WorkerProtectedRoute from './worker-route';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path={HOME_ROUTE} element={<App />}>
      <Route path={HOME_ROUTE} element={<LandingPage />} />

      {/* Auth */}
      <Route path={WORKER_LOGIN_ROUTE} element={<WorkerLoginRegisterPage />} />
      <Route path={COMPANY_LOGIN_ROUTE} element={<CompanyLoginRegisterPage />} />

      {/* Company */}
      <Route path={COMPANY_SEARCH_ROUTE} element={<SearchCompaniesPage />} />
      <Route path={COMPANY_DETAILS_ROUTE} element={<CompanyDetailsPage />} />
      <Route path={COMPANY_PROFILE_ROUTE} element={<CompanyProfilePage />} />

      {/* Offer */}
      <Route
        path={OFFER_CREATE_ROUTE}
        element={
          <CompanyProtectedRoute><CreateOfferPage /></CompanyProtectedRoute>
        }
      />
      <Route path={OFFER_DETAILS_ROUTE} element={<OfferDetailsPage />} />
      <Route
        path={OFFER_APPLY_ROUTE}
        element={(
          <WorkerProtectedRoute>
            <ApplyToOfferPage />
          </WorkerProtectedRoute>
        )}
      />
      <Route path={OFFER_SEARCH_ROUTE} element={<SearchOfferPage />} />
      <Route
        path={MY_OFFERS_ROUTE}
        element={
          <CompanyProtectedRoute><MyOfferPage /></CompanyProtectedRoute>
        }
      />

      {/* Worker */}
      <Route path={WORKER_SIGNUP_ROUTE} element={<WorkerSignupForm readonly />} />
      <Route
        path={WORKER_PROFILE_ROUTE}
        element={(
          <WorkerProtectedRoute>
            <WorkerProfilePage />
          </WorkerProtectedRoute>
      )}
      />

    </Route>,
  ]),
);

export default router;
