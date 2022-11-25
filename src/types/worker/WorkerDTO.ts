import Worker from './Worker';

type WorkerDTO = Omit<Worker, 'id'> & {
  password: string
};

export default WorkerDTO;
