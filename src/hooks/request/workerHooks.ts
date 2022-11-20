import WorkerDTO from '../../types/worker/WorkerDTO';
import useFetchMany from '../generic/useFetchMany';
import usePost from '../generic/usePost';

const useFetchWorker = (workerId: string) => useFetchMany<Worker>(`workers/${workerId}`);

const useFetchWorkers = () => useFetchMany<Worker>('workers');

const createWorker = (workerToCreate: WorkerDTO) => usePost<WorkerDTO, Worker>('workers', workerToCreate);

export { useFetchWorker, useFetchWorkers, createWorker };
