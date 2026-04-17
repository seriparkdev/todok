import axiosInstance from '@/lib/axiosInstance';
import { ENDPOINTS } from '@/constants/style/endpoints';

export const logout = async () => {
  const { data } = await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
  return data;
};
