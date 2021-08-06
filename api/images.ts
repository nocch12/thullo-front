import axios from 'axios';
import { PixabayImage } from './types/pixabay';

export const searchImage = (q: string) => {
  return axios.get<{ hits: PixabayImage[] }>('https://pixabay.com/api/', {
    params: {
      q,
      image_type: 'photo',
      lang: 'ja',
      key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY,
    },
  });
};
