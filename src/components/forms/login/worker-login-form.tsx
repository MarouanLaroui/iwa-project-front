import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/user-context';
import { onUserAuthenticated } from '../../../helpers/user-helper';
import { useLoginWorker } from '../../../hooks/request/workerHooks';
import { WORKER_PROFILE_BASE_ROUTE } from '../../../pages/routing/routes';
import LoginDTO from '../../../types/company/LoginDTO';
import LoginForm from './login-form';

export default function WorkerLoginForm() {
  const navigate = useNavigate();
  const { setWorkerId } = useContext(UserContext);

  const onSubmit = async (
    loginDTO: LoginDTO,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    useLoginWorker(loginDTO)
      .then((response) => {
        onUserAuthenticated(response.data, setWorkerId);
        navigate(`${WORKER_PROFILE_BASE_ROUTE}/${response.data.id}`);
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
      });
  };

  return (
    <LoginForm onSubmit={onSubmit} />
  );
}
