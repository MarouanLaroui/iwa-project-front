import { ContractType, JobType } from '../offer/Offer';

export type Criteria = {
  criteriaId: String
  workerId: String
  contractType: ContractType
  jobType: JobType
  sector: String
  salaryExpectation: number
  startingDate: Date
  endDate: Date
  location: String
};
