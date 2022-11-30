import { Company } from '../company/Company';
import { Work } from './Work';

type Employer = Omit<Work, 'companyId'> & {
  company: Company
};

export default Employer;
