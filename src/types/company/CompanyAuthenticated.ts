import { Company } from './Company';

type CompanyAuthenticated = Company & {
  authorizationToken: string;
};

export default CompanyAuthenticated;
