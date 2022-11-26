import LoginDTO from '../../types/company/LoginDTO';
import WorkerAuthenticated from '../../types/worker/WorkerAuthenticated';
import WorkerDTO from '../../types/worker/WorkerDTO';
import Worker from '../../types/worker/Worker';
import useFetchMany from '../generic/useFetchMany';
import useFetch from '../generic/useFetchOne';
import usePost from '../generic/usePost';
import usePut from '../generic/usePut';

const useFetchWorker = (workerId: string) => useFetch<Worker>(`workers/${workerId}`);

const useFetchWorkers = () => useFetchMany<Worker>('workers/');

const registerWorker = (workerToCreate: WorkerDTO) => usePost<WorkerDTO, WorkerAuthenticated>('workers/register', workerToCreate);

const useLoginWorker = (loginDTO: LoginDTO) => usePost<LoginDTO, WorkerAuthenticated>('workers/login', loginDTO);

const useUpdateWorker = (workerDTO: WorkerDTO) => usePut<WorkerDTO, Worker>('workers/', workerDTO);

export {
  useFetchWorker, useFetchWorkers, registerWorker, useLoginWorker, useUpdateWorker,
};
