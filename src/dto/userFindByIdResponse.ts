interface Books {
  past: { name: string; userScore: number }[];
  present: {
    name: string;
  }[];
}

export interface UserFindByIdResponse {
  id: number;
  name: string;
  books: Books;
}
