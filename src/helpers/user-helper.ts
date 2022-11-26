import saveTokenInLocalStorage from '../database/utils/local-storage';
import CompanyAuthenticated from '../types/company/CompanyAuthenticated';
import WorkerAuthenticated from '../types/worker/WorkerAuthenticated';

const onUserAuthenticated = (
  authenticatedCompany: CompanyAuthenticated | WorkerAuthenticated,
  setUserId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  setUserId(authenticatedCompany.id);
  saveTokenInLocalStorage(authenticatedCompany.authorizationToken);
  localStorage.setItem('id', authenticatedCompany.id);
};

const refreshUserInfoFromStorage = (
  setUserId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const id = localStorage.getItem('id');
  setUserId(id);
};

export { onUserAuthenticated, refreshUserInfoFromStorage };
