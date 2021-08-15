import { errorState } from '../store/error';
import { TErrorState } from '../types/error';
import { useRecoilState } from 'recoil';

const useError = () => {
  const [error, setError] = useRecoilState(errorState);

  const setErrorCode = (statusCode: TErrorState['statusCode']) => {
    setError({ statusCode });
  };

  return { error, setErrorCode };
};

export default useError;
