import { IUser } from '../interfaces';

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
function checkIsStar(data: IUser[], stars: IUser[]) {
  return data.map((item) => {
    const isStart = stars.find((start) => start.id === item.id);
    if (isStart) {
      item.isStar = true;
    }
    return item;
  });
}

/**
 * 특수문자 숫자 쪽 정렬해줘야함.. 지금은 숫자 - 한글 - 영어
 * @param data - formatData 함수로 가공된 github 데이터
 * @description 한글 - 영어 - 특수문자 - 숫자 순으로 정렬
 */
function sortStr(data: IUser[]) {
  return data.sort((a: IUser, b: IUser) => a.name.localeCompare(b.name, 'ko-KR'));
}

/**
 *
 * @param data - formatData 함수로 가공된 github 데이터
 * @description 한글 - 영어 이름순으로 유저 정렬
 */
function sortUser(data: IUser[]) {
  const koreanRegx = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const group = sortStr(data).reduce((acc, user) => {
    let first;
    koreanRegx.test(user.name) ? (first = getKorean(user.name)) : (first = user.name.charAt(0).toUpperCase());
    if (!acc[first]) {
      acc[first] = [];
    }
    acc[first].push(user);
    return acc;
  }, <Record<string, IUser[]>>{});

  const keys = Object.keys(group);

  return { keys, group };
}

/**
 *
 * @param kor - korean name
 * @description 이름 첫 글자의 초성 리턴
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
  const ga: number = 44032;
  let uni: number = kor.charCodeAt(0);

  uni = uni - ga;

  let fn = Math.floor(uni / 588);

  return f[fn];
}

export { formatData, checkIsStar, sortUser };
