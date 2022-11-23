/* eslint-disable import/prefer-default-export */
import { Criteria } from '../../types/criteria/Criteria';
import CriteriaDTO from '../../types/criteria/CriteriaDTO';
import useFetch from '../generic/useFetchOne';
import usePost from '../generic/usePost';

const useFetchCriterias = (userId: string) => useFetch<Criteria>(`criterias/${userId}`);

const createCriterias = (criteriaToCreate: CriteriaDTO) => usePost<CriteriaDTO, Criteria>('criterias/', criteriaToCreate);

export { useFetchCriterias, createCriterias };
