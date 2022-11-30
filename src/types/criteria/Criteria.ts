import { SectorType } from '../company/Company';
import { ContractType, JobType } from '../offer/Offer';

export type Criteria = {
  criteriaId: string
  workerId: string
  contractType: ContractType
  jobType: JobType
  sector: SectorType
  salaryExpectation: number
  startingDate: Date
  endDate: Date
  location: string
};
