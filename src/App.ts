import Component from './components/Core';
import Header from './components/Header';

export default class App extends Component {
  setup() {
    this.$state = {
      users: [],
      stars: [],
      page: {
        current: 1,
        limit: 100,
      },
      isLoading: false,
    };
  }
  template() {
    return `
      <header data-component="item-header" class="header"></header>
      <main>
        <div data-component="item-search"></div>
        <div data-component="items"></div>
        <div data-component="item-loading"></div>
      </main>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('[data-component="item-header"]');
    const $search = this.$target.querySelector('[data-component="item-search"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $loading = this.$target.querySelector('[data-component="item-loading"]');

    new Header($header);
  }
}
