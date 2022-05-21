import { Block } from '../../utils/Block';
import template from './button.hbs'
interface ButtonProps {
  text: string,
  events?: {
    click?: () => void
  }
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    // Создаём враппер дом-элемент button
    super(props);
  }

  render() {
    // В проект должен быть ваш собственный шаблонизатор
    // return `<div>sgdsfg${this.props.text}</div>`;
    return this.compile(template, {...this.props});
  }
}
