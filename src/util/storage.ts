import { User } from '../interfaces';

function getItem(key: string): User[] {
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function setItem(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export { getItem, setItem };
