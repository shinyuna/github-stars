import axios from 'axios';

import { IPrams } from '../interfaces';
import { formatData } from '../util/formatter';

const TARGET_URL = 'https://api.github.com';

const github = axios.create({
  baseURL: TARGET_URL,
  timeout: 100000,
});
const API: any = {};

github.interceptors.response.use(
  (response) => {
    response.data.items = formatData(response.data.items);
    return response;
  },
  (error) => console.error(error),
);

API.getGithubUser = (params: IPrams) => github.get('/search/users', { params: params });

export { API };
