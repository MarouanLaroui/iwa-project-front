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
import FindCompaniesPage from '../pages/find-companies-page';
import LandingPage from '../pages/landing-page';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="find" element={<FindCompaniesPage />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="offer/create" element={<JobOfferForm />} />
      <Route path="offer/apply" element={<ApplicationForm offerId={1} />} />
      <Route path="worker/signup" element={<WorkerForm />} />
      <Route path="company/signup" element={<CompanyForm />} />
    </Route>,
  ]),
);

export default router;
