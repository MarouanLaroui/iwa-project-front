import Worker from './Worker';

type WorkerAuthenticated = Worker & {
  authorizationToken: string;
};

export default WorkerAuthenticated;
