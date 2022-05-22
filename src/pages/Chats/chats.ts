import { Block } from '../../utils/Block';
import styles from '../../index.pcss';

export class Chats extends Block {
  constructor() {
    super({ styles });
  }

  render() {
    return `
     <div class="${styles.chat}">
      <div class="${styles.chat__list}">
        <div class="${styles.chat__user}">
          {{{Avatar}}}
          {{{Button text="Изменить профиль" id="button__secondary" link="./profile"}}}
        </div>
      </div>
      <div class="${styles.chat__window}">
      </div>
    </div>
    `
  }
}
