import { User } from '../interfaces';
import { groypByFirst } from '../util/formatter';

import Component from './Core';

export default class UserComponent extends Component {
  template() {
    const { type, users, stars, isLoading } = this.$props;
    const { keys, group } = type === 'github' ? groypByFirst(users) : groypByFirst(stars);
    const message = type === 'github' ? 'No people. Please search :)' : 'No favorite people. Please add it :)';

    if (isLoading) return `<p class="text-message">Searching for users...🏃‍♀️</p>`;
    return `${
      keys.length === 0
        ? `<p class="text-message">${message}</p>`
        : keys
            .map(
              (key) => `
            <div class="group">
              <p class="group__title">${key}</p>
              ${group[key]
                .map(
                  (user: User) =>
                    `
                  <div class="user" id="${user.id}">
                    <div class="user__profile">
                      <img src="${user.profile_image}" alt="${user.name}"/>
                    </div>
                    <p class="user__name">${user.name}</p>
                    <button class="user__starbtn">${user.isStar ? '⭐️' : '✩'}</button>
                  </div>`,
                )
                .join('')}
            </div>`,
            )
            .join('')
    }`;
  }

  setEvent() {
    const { type, users, stars, controlStar } = this.$props;
    const userList = type === 'github' ? users : stars;

    this.$target.addEventListener('click', (e: MouseEvent) => {
      const target: HTMLElement = <HTMLElement>e.target;
      if (target.tagName === 'BUTTON') {
        const id: string = <string>target.parentElement?.id;
        const user: User = userList.find((user: User) => user.id === +id);
        return !user.isStar ? controlStar(user, true) : controlStar(user, false);
      }
    });
  }
}
