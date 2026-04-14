import { queryOptions } from '@tanstack/react-query';
import { fetchMe, kakaoLogin, logout } from './api';

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

  logout: () => ({
    mutationFn: logout,
  }),
};
