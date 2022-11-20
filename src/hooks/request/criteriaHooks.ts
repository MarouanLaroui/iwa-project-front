/* eslint-disable import/prefer-default-export */
import { Criteria } from '../../types/criteria/Criteria';
import useFetch from '../generic/useFetchOne';

const useFetchCriterias = (userId: string) => useFetch<Criteria>(`criterias/${userId}`);

export { useFetchCriterias };
