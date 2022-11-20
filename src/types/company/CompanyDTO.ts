import Company from './Company';

type CompanyDTO = Omit<Company, 'id'>;

export default CompanyDTO;
