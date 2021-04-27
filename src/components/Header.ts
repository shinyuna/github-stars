import Component from './Core';

export default class Header extends Component {
  template() {
    const tabs = ['github', 'stars'];
    const { isSelected } = this.$props;
    return `
      <h1 class="header__logo">Github Stars.</h1>
      <div class="header__tab">
        ${tabs
          .map(
            (tab) =>
              `<button id="${tab}" class="header__tab__button ${
                tab === isSelected ? 'header__tab__button--active' : ''
              }">${tab}</button>`,
          )
          .join('')}
      </div>
    `;
  }

  setEvent() {
    const { selectItem } = this.$props;

    this.$target.querySelector('.header__tab')?.addEventListener('click', (e) => {
      const target: HTMLElement = <HTMLElement>e.target;
      if (target.nodeName === 'BUTTON') {
        selectItem(target.id);
      }
    });
  }
}
