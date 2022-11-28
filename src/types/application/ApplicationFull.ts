import Worker from '../worker/Worker';
import Application from './Application';

type ApplicationFull = Omit<Application, 'workerId'> & {
  worker: Worker;
};

export default ApplicationFull;
