import useFetchMany from '../../generic/useFetchMany';

export default function useFetchWorkers() {
  return useFetchMany<Worker>('workers');
}
