import saveTokenInLocalStorage from '../database/utils/local-storage';
import CompanyAuthenticated from '../types/company/CompanyAuthenticated';
import WorkerAuthenticated from '../types/worker/WorkerAuthenticated';

const onCompanyAuthenticated = (
  authenticatedCompany: CompanyAuthenticated,
  setCompanyId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  setCompanyId(authenticatedCompany.id);
  saveTokenInLocalStorage(authenticatedCompany.authorizationToken);
  localStorage.setItem('companyId', authenticatedCompany.id);
};

const onWorkerAuthenticated = (
  authenticatedWorker: WorkerAuthenticated,
  setWorkerId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  setWorkerId(authenticatedWorker.id);
  saveTokenInLocalStorage(authenticatedWorker.authorizationToken);
  localStorage.setItem('workerId', authenticatedWorker.id);
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

export { onCompanyAuthenticated, onWorkerAuthenticated, refreshUserInfoFromStorage };
