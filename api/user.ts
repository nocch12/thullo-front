import { axios } from '../libs/axios';
import {User} from './types/user'

export const login = (email: string, password: string) => {
  return axios.post<{user: User}>('/user/login', {
    email,
    password,
  });
};

export const getMe = () => {
  return axios.get<{user: User}>('/user/me');
};

export const logout = () => {
  return axios.get('/user/logout');
};
