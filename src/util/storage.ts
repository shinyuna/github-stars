import { IUser } from '../interfaces';

function getItem(key: string): IUser[] | null {
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function setItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export { getItem, setItem };
