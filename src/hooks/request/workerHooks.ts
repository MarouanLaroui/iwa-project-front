import useFetchMany from '../generic/useFetchMany';

const useFetchWorker = (workerId: string) => useFetchMany<Worker>(`workers/${workerId}`);

const useFetchWorkers = () => useFetchMany<Worker>('workers');

export { useFetchWorker, useFetchWorkers };
