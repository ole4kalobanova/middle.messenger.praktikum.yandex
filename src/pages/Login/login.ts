//import Button from '../../components/Button';
import { Block } from '../../utils/Block';
import styles from '../../index.pcss';
//import template from './index.hbs'

export class LoginPage extends Block {
  constructor(props: { buttonText: string }) {
    super({ ...props, styles, onClick: () => console.log('click') });
  }

  // protected initChildren() {
  //   //this.children.button = new Button({ text: this.props.buttonText, events: { click: () => console.log(11111) } })
  // }

  // Дети жестко определены при создании компонента и не являются props
  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps.buttonText !== newProps.buttonText) {
      this.children.button.setProps({
        text: newProps.buttonText
      })
    }
    return true;
  }

  render() {
    //const button = new Button({ text: 'Login page' })
    //return this.compile(template, {  });
    // language hbs
    // return `
    // <div class="login-form__container">
    //   {{{Button text="1111" onClick=onClick}}}
    // </div>
    // `
    return `
    <main>
      <div class="${styles["login-form__container"]}">
        <div class="${styles["login-form__title"]}">Вход</div>
        <div class="${styles["login-form__fields"]}">
          {{{Input type="text" label="Логин" name="login"}}}
          {{{Input type="password" label="Пароль" name="password"}}}
        </div>
        <div class="${styles["login-form__actions"]}">
          {{{Button text="Войти" id="button__primary" link="./chats.hbs"}}}
          {{{Button text="Еще не зарегистрированы?" id="button__secondary" link="./registration.hbs"}}}
          <a href="./404.hbs">404</a>
          <a href="./500.hbs">500</a>
        </div>
      </div>
    </main>
    `
  }
}
