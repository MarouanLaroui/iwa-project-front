import Worker from './Worker';

type WorkerCreateDTO = Omit<Worker, 'id'> & {
  password: string
};

export default WorkerCreateDTO;
