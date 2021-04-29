import Component from './Core';

export default class Search extends Component {
  template() {
    const { type, searchTerm } = this.$props;

    return `
      <form class="search__form">
        <button type="submit" class="search__form__btn">🔎</button>
        <input type="text" class="search__form__input" value="${searchTerm[type]}" placeholder="${
      type === 'github' ? 'Search Github user name' : 'Search Stars user name'
    }" autofocus/>
      </form>
    `;
  }

  setEvent() {
    const { type, searchGithubUser, searchStarUser } = this.$props;
    const input: HTMLInputElement = <HTMLInputElement>this.$target.querySelector('.search__form__input');

    this.$target.querySelector('.search__form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (type === 'github' && !input.value) return alert('Enter user name!');

      const keyword = input.value.trim();

      type === 'github' ? searchGithubUser({ q: keyword }) : searchStarUser(keyword);
    });
  }
}
