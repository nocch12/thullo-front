import { atom } from 'recoil';

type User = undefined | null | {
  id: number;
  name: string;
};

export const authInitState = atom({
  key: "auth/init",
  default: false,
});

export const userState = atom<User>({
  key: "auth/user",
  default: undefined,
});
