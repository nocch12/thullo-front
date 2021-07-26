import { axios } from '../libs/axios';
export const getCsrf = () => axios.get<{csrfToken: string}>('/csrf-token');
