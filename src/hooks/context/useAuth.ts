import React from 'react';
import UserContext from '../../context/user-context';

const useAuth = () => React.useContext(UserContext);
export default useAuth;
