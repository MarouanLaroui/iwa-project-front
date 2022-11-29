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
  const fileUploadedUrl: string | undefined = workerToCreate.cvToUpload
    ? (await uploadFile(workerToCreate.cvToUpload)).data.url
    : undefined;

  const worker:WorkerCreateDTO = {
    ...workerToCreate,
    cvLink: fileUploadedUrl,
  };
  return usePost<WorkerCreateDTO, WorkerAuthenticated>('workers/register', worker);
};

const useLoginWorker = (loginDTO: LoginDTO) => usePost<LoginDTO, WorkerAuthenticated>('workers/login', loginDTO);

const useUpdateWorker = async (workerUpdateDTO: WorkerUpdateFileUploadDTO) => {
  const fileUploadedUrl: string | undefined = workerUpdateDTO.cvToUpload
    ? (await uploadFile(workerUpdateDTO.cvToUpload)).data.url
    : undefined;

  const worker: WorkerUpdateDTO = {
    ...workerUpdateDTO,
    cvLink: fileUploadedUrl,
  };
  usePut<WorkerUpdateDTO, Worker>('workers/', worker);
};

export {
  useFetchWorker, useFetchWorkers, registerWorker, useLoginWorker, useUpdateWorker,
};
