interface IPrams {
  q: string;
  page: number;
  per_page: number;
}

interface IUser {
  id: number;
  profile_image: string;
  name: string;
  isStar: boolean;
}

export { IPrams, IUser };
