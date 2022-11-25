import { Offer, ContractType, JobType } from '../../types/offer/Offer';

const mockOffer: Offer = {
  offerId: '',
  companyId: '',
  title: 'Développeur fullstack',
  description: '',
  location: 'Montpellier',
  creationDate: new Date(),
  startingDate: new Date(),
  endDate: new Date(),
  contractType: ContractType.CDD,
  jobType: JobType.PARTIAL_TIME,
  salary: 3000,
  needDrivingLicense: true,
  ledToJob: false,
};

export default mockOffer;
