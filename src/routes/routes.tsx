import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route,
} from 'react-router-dom';
import App from '../App';
import FindCompaniesPage from '../pages/find-companies-page';
import LandingPage from '../pages/landing-page';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/find" element={<FindCompaniesPage />} />
    </Route>,
  ]),
);

export default router;
