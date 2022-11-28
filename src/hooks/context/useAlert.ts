import React from 'react';
import AlertContext from '../../context/alert-context';

const useAlert = () => React.useContext(AlertContext);
export default useAlert;
