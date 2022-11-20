export type ContractType = 'CDI' | 'CDD';
export type JobType = 'FULL_TIME' | 'PARTIAL_TIME';

export type Offer = {
  startingDate: Date
  endDate: Date
  description: String
  contractType: ContractType
  jobType: JobType
  salary: number
  hasCompanyCar: boolean
  needDrivingLicense: boolean
  ledToJob: boolean
  creationDate: Date
};
