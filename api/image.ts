import axios from 'axios';

export type TPixabayImage = {
  largeImageURL: string;
  previewURL: string;
}

export const searchImage = (q: string) => {
  return axios.get<{ hits: TPixabayImage[] }>('https://pixabay.com/api/', {
    params: {
      q,
      image_type: 'photo',
      lang: 'ja',
      key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY,
    },
  });
};
