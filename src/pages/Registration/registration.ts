import { Block } from '../../utils/Block';
import styles from '../../index.pcss';

export class RegistrationPage extends Block {
  constructor() {
    super({ styles });
  }

  render() {
    return `
    <main>
      <div class="${styles["login-form__container"]}">
        <div class="${styles["login-form__title"]}">
          Регистрация
        </div>
        <div class="${styles["login-form__fields"]}">
          {{{Input type="text" label="Почта" name="email"}}}
          {{{Input type="text" label="Логин" name="login"}}}
          {{{Input type="text" label="Имя" name="first_name"}}}
          {{{Input type="text" label="Фамилия" name="second_name"}}}
          {{{Input type="text" label="Телефон" name="phone"}}}
          {{{Input type="password" label="Пароль" name="password"}}}
          {{{Input type="password" label="Пароль еще раз" name="repeatPassword"}}}
        </div>
        <div class="${styles["login-form__actions"]}">
          {{{Button text="Создать аккаунт" id="button__primary" link="./chats.hbs"}}}
          {{{Button text="Войти" id="button__secondary" link="./index.hbs"}}}
        </div>
      </div>
    </main>
    `
  }
}
