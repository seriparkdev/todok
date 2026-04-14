import axios from 'axios';
import { ENDPOINTS } from '../constants/style/endpoints';
import { queryClient } from '@/lib/queryClient';
import { HTTP_STATUS } from '@/constants/httpStatus';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // access_token, refresh_token 쿠키 자동 포함
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401 응답 시 → /auth/refresh로 access_token 쿠키 갱신 후 재시도
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(`${BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, {}, { withCredentials: true });
        return axiosInstance(originalRequest); // 쿠키 갱신 후 원래 요청 재시도
      } catch {
        // refresh 실패 = 완전히 만료 → React Query 캐시에서 유저 정보 제거
        queryClient.removeQueries({ queryKey: ['auth'] });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
