import Application from '../../types/application/Application';
import ApplicationFull from '../../types/application/ApplicationFull';
import mockOffer from './mockOffer';
import mockWorker from './mockWorker';

const mockApplication: Application = {
  applicationId: 'abc-123-def',
  workerId: 'abc-123-def',
  offer: mockOffer,
  message: 'Je veux un travail dans votre entreprise svp',
  isValidatedByCompany: false,
  isValidatedByWorker: false,
};

const mockApplicationFull: ApplicationFull = {
  applicationId: 'abc-123-def',
  worker: mockWorker,
  offer: mockOffer,
  message: 'Je veux un travail dans votre entreprise svp',
  isValidatedByCompany: false,
  isValidatedByWorker: false,
};

const mockApplicationList = [mockApplicationFull, mockApplicationFull, mockApplicationFull];

export { mockApplication, mockApplicationFull, mockApplicationList };
