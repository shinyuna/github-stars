import { API } from './api';
import { IPrams, IUser } from './interfaces';
import { getItem, setItem } from './util/storage';
import { checkIsStar } from './util/formatter';
import { STAR_LIST } from './util/constants';

import Component from './components/Core';
import Header from './components/Header';
import Search from './components/Search';
import User from './components/User';

export default class App extends Component {
  setup() {
    this.$state = {
      users: [],
      stars: getItem(STAR_LIST),
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
    const { $state, selectItem, searchGithubUser, searchStarUser, insertStar, deleteStar } = this;
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
      insertStar: insertStar.bind(this),
      deleteStar: deleteStar.bind(this),
    });
  }

  selectItem(isSelected: string) {
    this.setState({ isSelected });
  }

  async searchGithubUser({ q, page = 1, per_page = 100 }: IPrams) {
    try {
      this.setState({ isLoading: true });
      const { data } = await API.getGithubUser({
        q,
        page,
        per_page,
      });
      const starts = checkIsStar(data.items, this.$state.stars);
      this.setState({ users: starts, isLoading: false });
    } catch (error) {
      console.error('🚨 error:', error);
    }
  }
  searchStarUser(user: string) {
    const regx = new RegExp(user);
    const starList = getItem(STAR_LIST);
    const search = starList?.filter((star: IUser) => regx.test(star.name));
    this.setState({ stars: search });
  }
  insertStar(addUser: IUser) {
    addUser.isStar = true;
    this.setState({ stars: [...this.$state.stars, addUser] });
    setItem(STAR_LIST, this.$state.stars);
  }
  deleteStar(deleteUser: IUser) {
    deleteUser.isStar = false;
    const starList = this.$state.stars.filter((user: IUser) => user.id !== deleteUser.id);
    this.setState({ stars: starList });
    setItem(STAR_LIST, this.$state.stars);
  }
}
