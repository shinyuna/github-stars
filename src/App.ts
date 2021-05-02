import { API } from './api';
import { SearchParams, User } from './interfaces';
import { getItem, setItem } from './util/storage';
import { checkIsStar } from './util/formatter';
import { STAR_LIST } from './util/constants';

import Component from './components/Core';
import HeaderComponent from './components/Header';
import SearchComponent from './components/Search';
import UserComponent from './components/User';

export default class App extends Component {
  setup() {
    this.$state = {
      users: [],
      stars: getItem(STAR_LIST),
      searchTerm: {
        github: '',
        stars: '',
      },
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
      </main>
    `;
  }
  mounted() {
    const { $state, selectItem, searchGithubUser, searchStarUser, controlStar } = this;
    const $header = this.$target.querySelector('[data-component="item-header"]');
    const $search = this.$target.querySelector('[data-component="item-search"]');
    const $result = this.$target.querySelector('[data-component="item-result"]');

    new HeaderComponent(<HTMLElement>$header, {
      isSelected: $state.isSelected,
      selectItem: selectItem.bind(this),
    });
    new SearchComponent(<HTMLElement>$search, {
      type: $state.isSelected,
      searchTerm: $state.searchTerm,
      isLoading: $state.isLoading,
      searchGithubUser: searchGithubUser.bind(this),
      searchStarUser: searchStarUser.bind(this),
    });
    new UserComponent(<HTMLElement>$result, {
      type: $state.isSelected,
      users: $state.users,
      stars: $state.stars,
      isLoading: $state.isLoading,
      controlStar: controlStar.bind(this),
    });
  }

  selectItem(isSelected: string) {
    this.setState({ isSelected });
  }

  async searchGithubUser({ q, page = 1, per_page = 100 }: SearchParams) {
    try {
      this.setState({ isLoading: true, searchTerm: { ...this.$state.searchTerm, github: q } });
      const { data } = await API.getGithubUser({
        q,
        page,
        per_page,
      });
      const starList = getItem(STAR_LIST) || this.$state.stars;
      const starts = checkIsStar(data.items, starList);
      this.setState({ users: starts, isLoading: false });
    } catch (error) {
      console.error('🚨 error:', error);
    }
  }
  searchStarUser(userName: string) {
    const regx = new RegExp(userName, 'i');
    const starList = getItem(STAR_LIST);
    const search = starList?.filter((star: User) => regx.test(star.name));
    this.setState({ stars: search, searchTerm: { ...this.$state.searchTerm, stars: userName } });
  }
  controlStar(user: User, check: boolean) {
    user.isStar = check;
    let starList = getItem(STAR_LIST) || this.$state.stars;
    if (check) {
      this.setState({ stars: [...starList, user], searchTerm: { ...this.$state.searchTerm, stars: '' } });
    } else {
      starList = starList.filter((a: User) => a.id !== user.id);
      this.setState({ stars: starList, searchTerm: { ...this.$state.searchTerm, stars: '' } });
    }
    setItem(STAR_LIST, this.$state.stars);
  }
}
