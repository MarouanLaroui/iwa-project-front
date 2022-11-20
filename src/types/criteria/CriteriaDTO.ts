import { Criteria } from './Criteria';

type CriteriaDTO = Omit<Criteria, 'criteriaId'>;

export default CriteriaDTO;
