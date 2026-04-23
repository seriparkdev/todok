import { queryOptions } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { ENDPOINTS } from '@/constants/style/endpoints';

export interface User {
  id: number;
  nickname: string | null;
  profileImage: string | null;
}

export const fetchMe = async () => {
  const { data } = await axiosInstance.get<User>(ENDPOINTS.AUTH.ME);
  return data;
};

export const kakaoLogin = async (code: string) => {
  const { data } = await axiosInstance.post<{ user: User }>(ENDPOINTS.AUTH.KAKAO, { code });
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
  return data;
};

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
