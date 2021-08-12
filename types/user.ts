export type TSimpleUser = {
  id: number;
  name?: string;
  imagePath?: string;
};

export type TUser = TSimpleUser & {
  email: string;
  createdAt: string;
};
