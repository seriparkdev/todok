import { queryOptions } from '@tanstack/react-query';
import { fetchMe, kakaoLogin } from '../api/auth';

export const authQueryOptions = {
  all: () => ['auth'] as const,

  me: () =>
    queryOptions({
      queryKey: [...authQueryOptions.all(), 'me'] as const,
      queryFn: fetchMe,
      retry: false,
    }),

  kakaoLogin: () => ({
    mutationFn: (code: string) => kakaoLogin(code),
  }),
};
