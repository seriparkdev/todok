import { logout } from '../api/auth';

export const homeQueryOptions = {
  logout: () => ({
    mutationFn: logout,
  }),
};
