import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/user-context';
import { onCompanyAuthenticated } from '../../../helpers/user-helper';
import useAlert from '../../../hooks/context/useAlert';
import { useLoginCompany } from '../../../hooks/request/companyHooks';
import { COMPANY_PROFILE_BASE_ROUTE } from '../../../pages/routing/routes';
import LoginDTO from '../../../types/company/LoginDTO';
import LoginForm from './login-form';

export default function CompanyLoginForm() {
  const navigate = useNavigate();
  const { setCompanyId, setWorkerId } = useContext(UserContext);

  const onSubmit = async (
    loginDTO: LoginDTO,
  ) => {
    const { setError } = useAlert();
    useLoginCompany(loginDTO)
      .then((response) => {
        onCompanyAuthenticated(response.data, setCompanyId, setWorkerId);
        navigate(`${COMPANY_PROFILE_BASE_ROUTE}/${response.data.id}`);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <LoginForm onSubmit={onSubmit} />
  );
}
