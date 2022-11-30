import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route,
} from 'react-router-dom';
import SearchCompaniesPage from '../search-companies-page';
// import LandingPage from '../landing/landing-page';
import OfferDetailsPage from '../offer-details-page';
import {
  HOME_ROUTE, COMPANY_SEARCH_ROUTE,
  OFFER_DETAILS_ROUTE, OFFER_APPLY_ROUTE,
  OFFER_SEARCH_ROUTE, WORKER_LOGIN_ROUTE,
  COMPANY_PROFILE_BASE_ROUTE,
  MY_OFFERS_ROUTE, WORKER_PROFILE_BASE_ROUTE, COMPANY_DETAILS_ROUTE,
  COMPANY_LOGIN_ROUTE, WORKER_SIGNUP_ROUTE,
  MY_OFFER_DETAILS_ROUTE,
  WORKER_APPLICATIONS_ROUTE,
  COMPANY_EMPLOYEES_ROUTE,
  WORKER_EMPLOYERS_ROUTE,
} from './routes';
import ApplyToOfferPage from '../apply-to-offer-page';
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
import MyOfferDetailsPage from '../my-offer-details-page';
import WorkerApplicationPage from '../worker-application-page';
import CompanyEmployeesList from '../../components/works/company-employees-list';
import LandingWrapper from '../landing/landing-wrapper';
import WorkerEmployersList from '../../components/works/worker-employers-list';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path={HOME_ROUTE} element={<App />}>
      {/* Keep this route above the public */}
      <Route path={HOME_ROUTE} element={<LandingWrapper />} />

      {/* Auth */}
      <Route path={WORKER_LOGIN_ROUTE} element={<WorkerLoginRegisterPage />} />
      <Route path={COMPANY_LOGIN_ROUTE} element={<CompanyLoginRegisterPage />} />

      {/* Company */}
      <Route path={COMPANY_SEARCH_ROUTE} element={<SearchCompaniesPage />} />
      <Route path={COMPANY_DETAILS_ROUTE} element={<CompanyDetailsPage />} />
      <Route path={COMPANY_PROFILE_BASE_ROUTE} element={<CompanyProfilePage />} />
      <Route
        path={COMPANY_EMPLOYEES_ROUTE}
        element={(
          <CompanyProtectedRoute>
            <CompanyEmployeesList />
          </CompanyProtectedRoute>
)}
      />

      {/* Offer */}
      <Route
        path={MY_OFFER_DETAILS_ROUTE}
        element={(
          <CompanyProtectedRoute>
            <MyOfferDetailsPage />
          </CompanyProtectedRoute>
        )}
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
        path={WORKER_PROFILE_BASE_ROUTE}
        element={(
          <WorkerProtectedRoute>
            <WorkerProfilePage />
          </WorkerProtectedRoute>
      )}
      />
      <Route
        path={WORKER_APPLICATIONS_ROUTE}
        element={(
          <WorkerProtectedRoute>
            <WorkerApplicationPage />
          </WorkerProtectedRoute>
        )}
      />
      <Route
        path={WORKER_EMPLOYERS_ROUTE}
        element={(
          <WorkerProtectedRoute>
            <WorkerEmployersList />
          </WorkerProtectedRoute>
        )}
      />

    </Route>,
  ]),
);

export default router;
