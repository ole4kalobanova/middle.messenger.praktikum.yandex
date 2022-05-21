import { Block } from '../../utils/Block';
import styles from '../../index.pcss';

export class ChangePassword extends Block {
  constructor() {
    super({ styles });
  }

  render() {
    return `
    <main>
      <div class="${styles["login-form__container"]}">
        <div class="${styles["login-form__title"]}">
          Изменить пароль
        </div>
        <div class="${styles["login-form__fields"]}">
          {{{Input type="password" label="Старый пароль" name="oldPassword"}}}
          {{{Input type="password" label="Новый пароль" name="newPassword"}}}
          {{{Input type="password" label="Повторите новый пароль" name="repeatPassword"}}}
        </div>
        <div class="${styles["login-form__actions"]}">
          {{{Button text="Сохранить" id="button__primary" link="./user.hbs"}}}
        </div>
      </div>
    </main>
    `
  }
}
