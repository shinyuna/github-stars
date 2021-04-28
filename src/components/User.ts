import { IUser } from '../interfaces';
import { sortUser } from '../util/formatter';

import Component from './Core';

export default class User extends Component {
  template() {
    const { type, users, stars, isLoading } = this.$props;
    const { keys, group } = type === 'github' ? sortUser(users) : sortUser(stars);
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
                  (user: IUser) =>
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
    const { type, users, stars, insertStar, deleteStar } = this.$props;
    const userList = type === 'github' ? users : stars;

    this.$target.addEventListener('click', (e: MouseEvent) => {
      const target: HTMLElement = <HTMLElement>e.target;
      if (target.tagName === 'BUTTON') {
        const user: IUser = userList.find((user: IUser) => user.id === +target.parentElement?.id);
        !user.isStar ? insertStar(user) : deleteStar(user);
      }
    });
  }
}
