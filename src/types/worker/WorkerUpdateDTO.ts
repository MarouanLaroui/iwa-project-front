import Worker from './Worker';

type WorkerUpdateDTO = Omit<Worker, 'id'>;

export default WorkerUpdateDTO;
