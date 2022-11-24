import { Work } from './Work';

type WorkDTO = Omit<Work, 'workId'>;

export default WorkDTO;
