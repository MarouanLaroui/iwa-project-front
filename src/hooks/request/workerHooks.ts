import LoginDTO from '../../types/company/LoginDTO';
import WorkerAuthenticated from '../../types/worker/WorkerAuthenticated';
import Worker from '../../types/worker/Worker';
import useFetchMany from '../generic/useFetchMany';
import useFetch from '../generic/useFetchOne';
import usePost from '../generic/usePost';
import usePut from '../generic/usePut';
import { WorkerCreateDTO, WorkerCreateDTOFileUploadDTO } from '../../types/worker/WorkerCreateDTO';
import { WorkerUpdateDTO, WorkerUpdateFileUploadDTO } from '../../types/worker/WorkerUpdateDTO';
import uploadFile from './fileHooks';

const useFetchWorker = (workerId: string) => useFetch<Worker>(`workers/${workerId}`);

const useFetchWorkers = () => useFetchMany<Worker>('workers/');

const registerWorker = async (workerToCreate: WorkerCreateDTOFileUploadDTO) => {
  const cvUrlPromise = workerToCreate.cvToUpload
    ? uploadFile(workerToCreate.cvToUpload)
    : undefined;

  const pictureUrlPromise = workerToCreate.cvToUpload
    ? uploadFile(workerToCreate.cvToUpload)
    : undefined;

  const result = await Promise.all([cvUrlPromise, pictureUrlPromise]);
  const worker:WorkerCreateDTO = {
    ...workerToCreate,
    cvLink: result[0]?.data.url,
    pictureUrl: result[1]?.data.url,
  };
  return usePost<WorkerCreateDTO, WorkerAuthenticated>('workers/register', worker);
};

const useLoginWorker = (loginDTO: LoginDTO) => usePost<LoginDTO, WorkerAuthenticated>('workers/login', loginDTO);

const useUpdateWorker = async (workerUpdateDTO: WorkerUpdateFileUploadDTO) => {
  const cvUrlPromise = workerUpdateDTO.cvToUpload
    ? uploadFile(workerUpdateDTO.cvToUpload)
    : undefined;

  const pictureUrlPromise = workerUpdateDTO.cvToUpload
    ? uploadFile(workerUpdateDTO.cvToUpload)
    : undefined;

  const result = await Promise.all([cvUrlPromise, pictureUrlPromise]);

  const worker: WorkerUpdateDTO = {
    ...workerUpdateDTO,
    cvLink: result[0]?.data.url,
    pictureUrl: result[1]?.data.url,
  };
  return usePut<WorkerUpdateDTO, Worker>('workers/', worker);
};

export {
  useFetchWorker, useFetchWorkers, registerWorker, useLoginWorker, useUpdateWorker,
};
