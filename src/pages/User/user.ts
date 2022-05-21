import { Block } from '../../utils/Block';
import styles from '../../index.pcss';

export class ChangeUser extends Block {
  constructor() {
    super({ styles });
  }

  render() {
    return `
    <main>
      <div class="${styles["login-form__container"]}">
        <div class="${styles["login-form__title"]}">
          Мой профиль
        </div>
        <div class="${styles["login-form__fields"]}">
          {{{Avatar}}}
          {{{Button text="Изменить аватар" id="button__secondary"}}}
          {{{Input type="text" label="Почта" name="email"}}}
          {{{Input type="text" label="Логин" name="login"}}}
          {{{Input type="text" label="Имя" name="first_name"}}}
          {{{Input type="text" label="Фамилия" name="second_name"}}}
          {{{Input type="text" label="Телефон" name="phone"}}}
        </div>
        <div class="${styles["login-form__actions"]}">
          {{{Button text="Изменить пароль" id="button__secondary" link="./password.hbs"}}}
          {{{Button text="Сохранить изменения" id="button__primary" link="./chats.hbs"}}}
          {{{Button text="Выйти" id="button__error" link="./index.hbs"}}}
        </div>
      </div>
    </main>
    `
  }
}
