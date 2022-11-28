import { AxiosError } from 'axios';
import { DefaultTFuncReturn } from 'i18next';
import { createContext } from 'react';

export interface AlertContextType {
  setError: React.Dispatch<React.SetStateAction<AxiosError<unknown, any> | null>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | DefaultTFuncReturn>>;
}

const AlertContext = createContext<AlertContextType>({
  setError: () => {},
  setSuccessMessage: () => {},
});

export default AlertContext;
