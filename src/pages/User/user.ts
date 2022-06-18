import validateValue from 'utils/validation';
import Block from '../../utils/Block';
import styles from '../../index.pcss';

interface ChangeUserProps { }
export class ChangeUser extends Block {
  constructor(props: ChangeUserProps) {
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
            .map((checkedInput) => this.validationRequiredField(checkedInput as HTMLInputElement))
            .some((input) => input);
          if (!inputsData) { // Если ошибка - то прерываем переход на страницу
            window.location.href = 'chats';
          }
        },
      },
    });
  }

  // Как вынести данную функцию в utils чтобы ее можно было переиспользовать во всех компонентах?
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
    <form>
      <div class="${styles['login-form__container']}">
        <div class="${styles['login-form__title']}">
          Мой профиль
        </div>
        <div class="${styles['login-form__fields']}">
          {{{Avatar}}}
          {{{Button text="Изменить аватар" id="button__secondary"}}}
          {{{Fields 
            type="text" 
            label="Почта" 
            name="email"
            ref="email"
          }}}
          {{{Fields 
            type="text" 
            label="Логин"
            name="login"
            ref="login"
          }}}
          {{{Fields 
            type="text" 
            label="Имя" 
            name="first_name"
            ref="first_name"
          }}} 
          {{{Fields 
            type="text" 
            label="Фамилия"
            name="second_name"
            ref="second_name"
          }}}
          {{{Fields 
            type="text" 
            label="Телефон" 
            name="phone"
            ref="phone"
          }}}
        </div>
        <div class="${styles['login-form__actions']}">
          {{{Button text="Изменить пароль" id="button__secondary" link="./password"}}}
          {{{Button text="Сохранить изменения" id="button__primary" type="submit"}}}
          {{{Button text="Выйти" id="button__error" link="./"}}}
        </div>
      </div>
    </form>
    `;
  }
}
