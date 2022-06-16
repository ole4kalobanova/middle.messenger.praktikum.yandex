import Block from '../../utils/Block';
import styles from './button.pcss'
//import template from './button.hbs'
interface ButtonProps {
  text: string,
  id: string,
  link: string
  type: string,
  onClick?: () => void
}

export class Button extends Block {
  constructor({ id, text, link, type, onClick }: ButtonProps) {
    // Создаём враппер дом-элемент button
    super({
      id,
      text,
      link,
      type: type || 'button',
      events: {
        click: onClick
      },
      styles
    });
  }

  render() {
    return ` 
    <a href={{link}}>
      <button class="${styles[this.props.id]}" type={{type}}>
        {{text}}
      </button>
    </a>
    `
  }
}
