import Component from './Core';

export default class Header extends Component {
  template() {
    const tabs = ['all', 'stars'];
    return `
      <h1 class="header__logo">Github Stars 🌟</h1>
      <div class="header__tab">
        ${tabs.map((tab) => `<button class="header__tab__button">${tab}</button>`).join('')}
      </div>
    `;
  }
}
