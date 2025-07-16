export interface CreateBookDto {
  title: string;
  author: string;
  description: string;
  genre: string;
  published_year: string;
}

export interface QueryBookDto {
  genre?: string;
  author?: string;
  title?: string;
  page: number,
  limit: number
}
