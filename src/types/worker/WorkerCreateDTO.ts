import Worker from './Worker';

export type WorkerCreateDTO = Omit<Worker, 'id'> & {
  password: string,
};

export type WorkerCreateDTOFileUploadDTO = Omit<WorkerCreateDTO, 'cvLink'> & {
  cvToUpload?: File
};
