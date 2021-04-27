import { API } from './api';
import { IPrams, IUser } from './interfaces';
import { getItem } from './util/storage';
import { checkIsStar } from './util/formatter';

import Component from './components/Core';
import Header from './components/Header';
import Search from './components/Search';
import User from './components/User';

export default class App extends Component {
  setup() {
    this.$state = {
      users: [],
      stars: getItem('starts') || [
        {
          id: 19729134,
          profile_image: 'https://avatars.githubusercontent.com/u/1410106?v=4',
          name: 'shinyuna',
          isStar: true,
        },
        {
          id: 19729117,
          profile_image: 'https://avatars.githubusercontent.com/u/1410106?v=4',
          name: '깡junho',
          isStar: true,
        },
        {
          id: 19729117,
          profile_image: 'https://avatars.githubusercontent.com/u/1410106?v=4',
          name: '신유나',
          isStar: true,
        },
        {
          id: 19729117,
          profile_image: 'https://avatars.githubusercontent.com/u/1410106?v=4',
          name: '김용현',
          isStar: true,
        },
        {
          id: 19729117,
          profile_image: 'https://avatars.githubusercontent.com/u/1410106?v=4',
          name: '박현정',
          isStar: true,
        },
        {
          id: 19729117,
          profile_image: 'https://avatars.githubusercontent.com/u/1410106?v=4',
          name: '신정원',
          isStar: true,
        },
        {
          id: 19729117,
          profile_image: 'https://avatars.githubusercontent.com/u/1410106?v=4',
          name: 'apple',
          isStar: true,
        },
      ],
      isSelected: 'github',
      isLoading: false,
    };
  }
  template() {
    return `
      <header data-component="item-header" class="header"></header>
      <main>
        <section data-component="item-search" class="search"></section>
        <section data-component="item-result" class="users"></section>
        <div data-component="item-loading"></div>
      </main>
    `;
  }
  mounted() {
    const { $state, selectItem, searchGithubUser, searchStarUser } = this;
    const $header = this.$target.querySelector('[data-component="item-header"]');
    const $search = this.$target.querySelector('[data-component="item-search"]');
    const $result = this.$target.querySelector('[data-component="item-result"]');
    const $loading = this.$target.querySelector('[data-component="item-loading"]');

    new Header(<HTMLElement>$header, {
      isSelected: $state.isSelected,
      selectItem: selectItem.bind(this),
    });
    new Search(<HTMLElement>$search, {
      type: $state.isSelected,
      searchGithubUser: searchGithubUser.bind(this),
      searchStarUser: searchStarUser.bind(this),
    });
    new User(<HTMLElement>$result, {
      type: $state.isSelected,
      users: $state.users,
      stars: $state.stars,
    });
  }

  selectItem(isSelected: string) {
    this.setState({ isSelected });
  }

  async searchGithubUser({ q, page = 1, per_page = 100 }: IPrams) {
    try {
      const { data } = await API.getGithubUser({
        q,
        page,
        per_page,
      });
      const starts = checkIsStar(data.items, this.$state.stars);
      this.setState({ users: starts });
    } catch (error) {
      console.error('🚨 error:', error);
    }
  }
  searchStarUser(user: string) {
    const regx = new RegExp(user);
    const search = this.$state.stars.filter((star: IUser) => regx.test(star.name));
    this.setState({ stars: search });
  }
}
