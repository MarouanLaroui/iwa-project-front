import Company from './Company';

type CompanyDTO = Omit<Company, 'id'> & {
  password: string
};

export default CompanyDTO;
