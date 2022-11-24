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
  title: String
  description: String
  location: String
  creationDate: Date
  startingDate: Date
  endDate: Date
  contractType: ContractType
  jobType: JobType
  salary: number
  needDrivingLicense: boolean
  ledToJob: boolean
};

export type OfferFilters = {
  contractType?: ContractType
  jobType?: JobType
};
