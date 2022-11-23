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
  companyId: String
  startingDate: Date
  endDate: Date
  title: String
  description: String
  contractType: ContractType
  jobType: JobType
  salary: number
  hasCompanyCar: boolean
  needDrivingLicense: boolean
  location: String
  ledToJob: boolean
  creationDate: Date
};

export type OfferFilters = {
  contractType?: ContractType
  jobType?: JobType
};
