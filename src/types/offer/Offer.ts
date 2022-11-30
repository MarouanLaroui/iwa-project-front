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
  companyId: string
  title: string
  description: string
  location: string
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
