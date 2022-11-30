import { Work } from '../../types/work/Work';
import useFetchMany from '../generic/useFetchMany';

const useFetchWorksByToken = () => useFetchMany<Work>('/works/');

// eslint-disable-next-line import/prefer-default-export
export { useFetchWorksByToken };
