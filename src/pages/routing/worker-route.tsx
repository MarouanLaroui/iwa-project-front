import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/context/useAuth';

type Props = {
  children: JSX.Element;
};

export default function WorkerProtectedRoute({ children }: Props) {
  const { workerId } = useAuth();

  if (!workerId) {
    return <Navigate to="/" replace />;
  }

  return children;
}
