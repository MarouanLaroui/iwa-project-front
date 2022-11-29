import Worker from './Worker';

export type WorkerUpdateDTO = Omit<Worker, 'id'>;

export type WorkerUpdateFileUploadDTO = Omit<WorkerUpdateDTO, 'cvLink'> & {
  cvToUpload?: File
};
