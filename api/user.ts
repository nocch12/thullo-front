import { axios } from '../libs/axios';
import { TSimpleUser } from '../types/user';

export type TUser = {
  id: number;
  email: string;
  name: string;
  gid?: string;
};

export const register = (email: string, password: string) => {
  return axios.post<{ user: TUser }>('/user/register', {
    email,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axios.post<{ user: TUser }>('/user/login', {
    email,
    password,
  });
};

export const getMe = () => {
  return axios.get<{ user: TUser }>('/user/me');
};

export const logout = () => {
  return axios.get('/user/logout');
};

export const searchUser = (q: string, excludeIds: TSimpleUser['id'][]) => {
  return axios.get<TSimpleUser[]>('/user', {
    params: { q, excludeIds },
  });
};
