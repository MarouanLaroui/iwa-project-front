import LoginDTO from '../../types/company/LoginDTO';
import WorkerAuthenticated from '../../types/worker/WorkerAuthenticated';
import Worker from '../../types/worker/Worker';
import useFetchMany from '../generic/useFetchMany';
import useFetch from '../generic/useFetchOne';
import usePost from '../generic/usePost';
import usePut from '../generic/usePut';
import WorkerCreateDTO from '../../types/worker/WorkerCreateDTO';
import WorkerUpdateDTO from '../../types/worker/WorkerUpdateDTO';

const useFetchWorker = (workerId: string) => useFetch<Worker>(`workers/${workerId}`);

const useFetchWorkers = () => useFetchMany<Worker>('workers/');

const registerWorker = (workerToCreate: WorkerCreateDTO) => usePost<WorkerCreateDTO, WorkerAuthenticated>('workers/register', workerToCreate);

const useLoginWorker = (loginDTO: LoginDTO) => usePost<LoginDTO, WorkerAuthenticated>('workers/login', loginDTO);

const useUpdateWorker = (workerUpdateDTO: WorkerUpdateDTO) => usePut<WorkerUpdateDTO, Worker>('workers/', workerUpdateDTO);

export {
  useFetchWorker, useFetchWorkers, registerWorker, useLoginWorker, useUpdateWorker,
};
