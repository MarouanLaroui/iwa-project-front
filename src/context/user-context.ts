import { createContext } from 'react';

export interface UserContextType {
  userId: string | null,
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => { },
});

export default UserContext;
