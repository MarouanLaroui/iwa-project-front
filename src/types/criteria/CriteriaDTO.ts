import { Criteria } from './Criteria';

type CriteriaDTO = Omit<Criteria, 'criteriaId' | 'workerId'>;

export default CriteriaDTO;
