import useFetchMany from '../../generic/useFetchMany';

export default function useFetchCompany(id: string) {
  return useFetchMany<Worker>(`offers/${id}`);
}
