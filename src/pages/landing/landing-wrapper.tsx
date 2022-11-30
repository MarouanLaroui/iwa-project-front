import React from 'react';
import useAuth from '../../hooks/context/useAuth';
import LandingPage from './landing-page';
import LandingPageWorker from './landing-page-worker';

export default function LandingWrapper() {
  const { workerId } = useAuth();

  if (workerId) return <LandingPageWorker />;
  return <LandingPage />;
}
