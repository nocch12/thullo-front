import useSWR from 'swr';
import { getMe } from '../api/user'

const useLoggedIn = () => {
  const { data, error } = useSWR('/user/me', getMe);
  console.log(data);
  
  return { data: error ? null : data };
}

export default useLoggedIn;
