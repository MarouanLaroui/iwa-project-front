type WorkerAuthenticated = Worker & {
  authorizationToken: string;
};

export default WorkerAuthenticated;
