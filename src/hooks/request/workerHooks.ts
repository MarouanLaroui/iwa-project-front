import LoginDTO from '../../types/company/LoginDTO';
import WorkerAuthenticated from '../../types/worker/WorkerAuthenticated';
import WorkerDTO from '../../types/worker/WorkerDTO';
import useFetchMany from '../generic/useFetchMany';
import usePost from '../generic/usePost';

const useFetchWorker = (workerId: string) => useFetchMany<Worker>(`workers/${workerId}`);

const useFetchWorkers = () => useFetchMany<Worker>('workers/');

const registerWorker = (workerToCreate: WorkerDTO) => usePost<WorkerDTO, WorkerAuthenticated>('workers/register', workerToCreate);

const useLoginWorker = (loginDTO: LoginDTO) => usePost<LoginDTO, WorkerAuthenticated>('workers/login', loginDTO);

export {
  useFetchWorker, useFetchWorkers, registerWorker, useLoginWorker,
};
