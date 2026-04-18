import { useQuery } from '@tanstack/vue-query';
import type { Work } from '@/types/works';
import { WORKS } from '@/data/works';

export const useGetPosts = () => {
	return useQuery<Work[], Error>({
		queryKey: ['works'],
		queryFn: () => Promise.resolve([...WORKS]),
		staleTime: Infinity,
	});
};
