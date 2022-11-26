import { SectorType } from '../../types/company/Company';
import { Criteria } from '../../types/criteria/Criteria';
import { ContractType, JobType } from '../../types/offer/Offer';

const mockCriteria: Criteria = {
  criteriaId: 'abc-123',
  workerId: 'abc-123',
  contractType: ContractType.CDD,
  jobType: JobType.FULL_TIME,
  sector: SectorType.ARTS,
  salaryExpectation: 1200,
  startingDate: new Date('2022-12-10'),
  endDate: new Date('2023-01-10'),
  location: 'Montpellier',
};

export default mockCriteria;
