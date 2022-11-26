import { DefaultTFuncReturn } from 'i18next';
import { createContext } from 'react';

export interface AlertContextType {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | DefaultTFuncReturn>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | DefaultTFuncReturn>>;
}

const AlertContext = createContext<AlertContextType>({
  setErrorMessage: () => {},
  setSuccessMessage: () => {},
});

export default AlertContext;
