import { IUser } from '../interfaces';
import { sortUser } from '../util/formatter';

import Component from './Core';

export default class User extends Component {
  template() {
    const { type, users, stars } = this.$props;
    const { keys, group } = type === 'github' ? sortUser(users) : sortUser(stars);

    return `${
      keys.length === 0
        ? `<p class="text-message">${'User not found :('}</p>`
        : keys
            .map(
              (key) => `
            <div class="group">
              <p class="group__title">${key}</p>
              ${group[key]
                .map(
                  (user: IUser) =>
                    `
                  <div class="user">
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
}
