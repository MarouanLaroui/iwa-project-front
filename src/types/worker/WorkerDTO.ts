import { Worker } from './Worker';

type WorkerDTO = Omit<Worker, 'id'>;

export default WorkerDTO;
