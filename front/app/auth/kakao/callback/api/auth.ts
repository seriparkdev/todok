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
