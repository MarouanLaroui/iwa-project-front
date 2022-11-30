import Worker from '../worker/Worker';
import { Work } from './Work';

type Employee = Omit<Work, 'workerId'> & {
  worker: Worker
};

export default Employee;
