interface SearchParams {
  q: string;
  page: number;
  per_page: number;
}

interface User {
  id: number;
  profile_image: string;
  name: string;
  isStar: boolean;
}

export { SearchParams, User };
