import Block from '../../utils/Block';
import styles from '../../index.pcss';
import { validateValue } from 'utils/validation';

interface ChangePasswordProps { };
export class ChangePassword extends Block {
  constructor(props: ChangePasswordProps) {
    super({
      ...props,
      styles,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const onlyInputs = document.querySelectorAll("form input");
          const arrayInputs = Array.from(onlyInputs);
          // Выводим все значения формы на консоль
          let allFormInputsData: Record<string, string> = {};
          arrayInputs.forEach(e => {
            const { name, value } = e as HTMLInputElement;
            allFormInputsData[name] = value;
          })
          console.log(allFormInputsData, 'allFormInputsData');
          // Проверяем валидность значений
          const inputsData = arrayInputs.map(e => this.validationRequiredField(e as HTMLInputElement)).some(e => e);
          if (!inputsData) { // Если ошибка - то прерываем переход на страницу
            window.location.href = 'chats'
          }
        }
      }
    });
  }

  // Как вынести данную функцию в utils чтобы ее можно было переиспользовать во всех компонентах? 
  validationRequiredField(input: HTMLInputElement) {
    const { value, name } = input;
    const requiredFieldMessage = 'Это поле обязательное для заполнения';
    const errorText = !value ? requiredFieldMessage : validateValue(name, value);
    this.refs[name].setProps({ error: errorText, value }); // Чтобы мы могли каждый раз обращаться с ref страницы?
    return errorText;
  }

  render() {
    return `
    <form>
      <div class="${styles["login-form__container"]}">
        <div class="${styles["login-form__title"]}">
          Изменить пароль
        </div>
        <div class="${styles["login-form__fields"]}">
          {{{Fields 
            type="password"
            label="Старый пароль" 
            name="oldPassword"
            ref="oldPassword"
          }}}
          {{{Fields 
            type="password"
            label="Новый пароль" 
            name="password"
            ref="password"
          }}}
          {{{Fields 
            type="password" 
            label="Повторите новый пароль" 
            name="repeatPassword"
            ref="repeatPassword"
          }}}
        </div>
        <div class="${styles["login-form__actions"]}">
          {{{Button text="Сохранить" id="button__primary" type="submit"}}}
        </div>
      </div>
    </form>
    `
  }
}
