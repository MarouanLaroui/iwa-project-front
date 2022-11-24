import React from 'react';
import saveTokenInLocalStorage from '../../../database/utils/local-storage';
import { useLoginWorker } from '../../../hooks/request/workerHooks';
import LoginDTO from '../../../types/company/LoginDTO';
import LoginForm from './login-form';

export default function WorkerLoginForm() {
  const onSubmit = async (
    loginDTO: LoginDTO,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    useLoginWorker(loginDTO)
      .then((response) => {
        saveTokenInLocalStorage(response.data.authorizationToken);
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
      });
  };

  return (
    <LoginForm onSubmit={onSubmit} />
  );
}
