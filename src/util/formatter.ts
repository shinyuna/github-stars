import { User } from '../interfaces';

interface IRegx {
  [key: string]: RegExp;
}
const regx: IRegx = {
  kr: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
  en: /[A-Za-z]/,
  uq: /[0-9~!@#$%^&*()_+|<>?:{}]/,
};

/**
 *
 * @param data - github api에서 받은 data
 * @description github data를 해당 서비스에서 활용할 모양의 데이터로 가공 후 리턴
 */
function formatData(data: any[]) {
  return data.map((item) => ({
    id: item.id,
    profile_image: item.avatar_url,
    name: item.login,
    isStar: false,
  }));
}

/**
 *
 * @param data - formatData 함수로 가공된 github 데이터
 * @param stars - 즐겨찾기에 추가된 유저 리스트
 * @description github에서 검색한 유저 중 즐겨찾기 된 유저를 찾고 isStar 값 변경
 */
function checkIsStar(data: User[], stars: User[]) {
  return data.map((item) => {
    const isStart = stars.find((start) => start.id === item.id);
    if (isStart) {
      item.isStar = true;
    }
    return item;
  });
}

/**
 *
 * @param data - formatData 함수로 가공된 github 데이터
 * @description 한글 - 영어 순으로 정렬
 */
function sortStr(data: User[]) {
  return data.sort((a: User, b: User) => a.name.localeCompare(b.name, 'ko-KR'));
}

/**
 *
 * @param array 문자열, 숫자 등이 들어있는 배열
 * @returns 문자열 - 숫자 순으로 배열 리턴
 */
function sortStringNumber(array: any[]) {
  const str: string[] = [];
  const uniq: number[] = [];
  array.forEach((item) => {
    regx['uq'].test(item) ? uniq.push(item) : str.push(item);
  });
  return [...str, ...uniq];
}

/**
 *
 * @param data - formatData 함수로 가공된 github 데이터
 * @description 초성 & 알파벳.. 그룹으로 분리한 유저 데이터
 */
function groypByFirst(data: User[]) {
  const group = sortStr(data).reduce((acc, user) => {
    let first;
    regx['kr'].test(user.name) ? (first = getKorean(user.name)) : (first = user.name.charAt(0).toUpperCase());
    if (!acc[first]) {
      acc[first] = [];
    }
    acc[first].push(user);
    return acc;
  }, <Record<string, User[]>>{});

  const keys = sortStringNumber(Object.keys(group));

  return { keys, group };
}

/**
 *
 * @param kor - korean name
 * @description 문자열의 첫 글자의 초성 리턴
 */
function getKorean(kor: string) {
  const f = [
    'ㄱ',
    'ㄱ', //ㄲ
    'ㄴ',
    'ㄷ',
    'ㄷ', // ㄸ
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅂ', // ㅃ
    'ㅅ',
    'ㅅ', // ㅆ
    'ㅇ',
    'ㅈ',
    'ㅉ', // ㅉ
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const ga = 44032;
  let uni: number = kor.charCodeAt(0);

  uni = uni - ga;

  const fn = Math.floor(uni / 588);

  return f[fn];
}

export { formatData, checkIsStar, groypByFirst };
