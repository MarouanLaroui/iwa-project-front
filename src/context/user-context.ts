import { createContext } from 'react';

export interface UserContextType {
  workerId: string | null,
  companyId: string | null,
  setWorkerId: React.Dispatch<React.SetStateAction<string | null>>;
  setCompanyId: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType>({
  workerId: null,
  companyId: null,
  setWorkerId: () => { },
  setCompanyId: () => { },
});

export default UserContext;
