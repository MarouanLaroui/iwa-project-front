/* eslint-disable import/prefer-default-export */
import { Criteria } from '../../types/criteria/Criteria';
import CriteriaDTO from '../../types/criteria/CriteriaDTO';
import useFetch from '../generic/useFetchOne';
import usePost from '../generic/usePost';
import usePut from '../generic/usePut';

const useFetchCriterias = () => useFetch<Criteria>('criterias/');

const createCriterias = (criteriaToCreate: CriteriaDTO) => usePost<CriteriaDTO, Criteria>('criterias/', criteriaToCreate);

const updateCriterias = (criteriaToCreate: CriteriaDTO) => usePut<CriteriaDTO, Criteria>('criterias/', criteriaToCreate);

export { useFetchCriterias, createCriterias, updateCriterias };
