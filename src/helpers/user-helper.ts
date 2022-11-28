import saveTokenInLocalStorage from '../database/utils/local-storage';
import CompanyAuthenticated from '../types/company/CompanyAuthenticated';
import WorkerAuthenticated from '../types/worker/WorkerAuthenticated';

const onCompanyAuthenticated = (
  authenticatedCompany: CompanyAuthenticated,
  setCompanyId: React.Dispatch<React.SetStateAction<string | null>>,
  setWorkerId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  saveTokenInLocalStorage(authenticatedCompany.authorizationToken);
  setCompanyId(authenticatedCompany.id);
  localStorage.setItem('companyId', authenticatedCompany.id);

  setWorkerId(null);
  localStorage.removeItem('workerId');
};

const onWorkerAuthenticated = (
  authenticatedWorker: WorkerAuthenticated,
  setCompanyId: React.Dispatch<React.SetStateAction<string | null>>,
  setWorkerId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  setWorkerId(authenticatedWorker.id);
  saveTokenInLocalStorage(authenticatedWorker.authorizationToken);
  localStorage.setItem('workerId', authenticatedWorker.id);

  setCompanyId(null);
  localStorage.removeItem('companyId');
};

const refreshUserInfoFromStorage = (
  setWorkerId: React.Dispatch<React.SetStateAction<string | null>>,
  setCompanyId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const workerId = localStorage.getItem('workerId');
  if (workerId) {
    setWorkerId(workerId);
  }

  const companyId = localStorage.getItem('companyId');
  if (companyId) {
    setCompanyId(companyId);
  }
};

const removeAuthFromStorage = () => {
  localStorage.removeItem('companyId');
  localStorage.removeItem('workerId');
  localStorage.removeItem('token');
};

export {
  onCompanyAuthenticated, onWorkerAuthenticated, refreshUserInfoFromStorage, removeAuthFromStorage,
};
