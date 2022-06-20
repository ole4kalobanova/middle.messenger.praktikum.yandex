import Block from 'utils/Block';
import validateValue from 'utils/validation';
import * as styles from '../../index.pcss';

interface LoginPageProps { }
export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      styles,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const onlyInputs = document.querySelectorAll('form input');
          const arrayInputs = Array.from(onlyInputs);
          // Выводим все значения формы на консоль
          const allFormInputsData: Record<string, string> = {};
          arrayInputs.forEach((input) => {
            const { name, value } = input as HTMLInputElement;
            allFormInputsData[name] = value;
          });
          // eslint-disable-next-line
          console.log(allFormInputsData, 'allFormInputsData');
          // Проверяем валидность значений
          const inputsData = arrayInputs
            .map((input) => this.validationRequiredField(input as HTMLInputElement))
            .some((input) => input);
          if (!inputsData) { // Если ошибка - то прерываем переход на страницу
            window.location.href = 'chats';
          }
        },
      },
    });
  }

  // Как вынести данную функцию в validation.ts чтобы ее можно было переиспользовать
  // во всех компонентах?
  validationRequiredField(input: HTMLInputElement) {
    const { value, name } = input;
    const requiredFieldMessage = 'Это поле обязательное для заполнения';
    const errorText = !value ? requiredFieldMessage : validateValue(name, value);
    // Чтобы мы могли каждый раз обращаться с ref страницы?
    this.refs[name].setProps({ error: errorText, value });
    return errorText;
  }

  render() {
    return `
      <form class="${styles['login-form__container']}">
        <div class="${styles['login-form__title']}">Вход</div>
        <div class="${styles['login-form__fields']}">
          {{{Fields 
              type="text" 
              label="Логин" 
              name="login"
              ref="login"
          }}}
          {{{Fields 
              type="password" 
              label="Пароль" 
              name="password"
              ref="password"
          }}}
        </div>
        <div class="${styles['login-form__actions']}" >
          {{{Button type="submit" text="Войти" id="button__primary" onClick=onClickButton}}}
          {{{Button text="Еще не зарегистрированы?" id="button__secondary" link="./registration"}}}
          <a href="./404">404</a>
          <a href="./500">500</a>
        </div>
      </form>
    `;
  }
}
