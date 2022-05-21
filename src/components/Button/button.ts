import { Block } from '../../utils/Block';
import styles from './button.pcss'
//import template from './button.hbs'
interface ButtonProps {
  text: string,
  id: string,
  link:string
  // events?: {
  //   click?: () => void
  // }
  //onClick?: () => void
}

export class Button extends Block {
  // constructor(props: ButtonProps) {
  //   // Создаём враппер дом-элемент button
  //   super(props);
  // }

  constructor({ id, text, link }: ButtonProps) {
    // Создаём враппер дом-элемент button
    super({
      id,
      text,
      link,
      // events: {
      //   click: onClick
      // },
      styles
    });
  }

  render() {
    // В проект должен быть ваш собственный шаблонизатор
    // return `<div>sgdsfg${this.props.text}</div>`;
    //return this.compile(template, {...this.props});
    //language hbs
    return ` 
    <a href={{link}}>
      <button class="${styles[this.props.id]}" type='button'>
        {{text}}
      </button>
    </a>
    `
  }
}
