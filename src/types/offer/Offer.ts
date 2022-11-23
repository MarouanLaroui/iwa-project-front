export enum ContractType {
  CDI = 'CDI',
  CDD = 'CDD',
}
export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PARTIAL_TIME = 'PARTIAL_TIME',
}

export type Offer = {
  offerId: String
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

export type OfferFilters = {
  contractType?: ContractType
  jobType?: JobType
};
