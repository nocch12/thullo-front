export type BoardUser = {
  id: number;
  name?: string;
  imagePath?: string;
};

export type Board = {
  id: number;
  boardName: string;
  description: string;
  published: boolean;
  imagePath?: string;
  createdAt: string;
  updatedAt: string;
  users: BoardUser[];
  author: BoardUser;
};

export type UpdateParams = Partial<
  Pick<Board, 'boardName' | 'description' | 'published'>
>;
