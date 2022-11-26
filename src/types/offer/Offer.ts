export enum ContractType {
  CDI = 'CDI',
  CDD = 'CDD',
}
export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PARTIAL_TIME = 'PARTIAL_TIME',
}

export type Offer = {
  offerId: string
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
  needDrivingLicence: boolean
  ledToJob: boolean
};

export type OfferFilters = {
  title?: string,
  contractType?: ContractType
  jobType?: JobType
};
