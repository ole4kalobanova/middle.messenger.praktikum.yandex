import Block from '../../utils/Block';
import * as styles from './button.pcss';
// import template from './button.hbs'
interface ButtonProps {
  //name: 'Button',
  text: string,
  id: string,
  link: string
  type: string,
  onClick?: () => void
}

export class Button extends Block {
  constructor({
    id, text, link, type, onClick,
  }: ButtonProps) {
    // Создаём враппер дом-элемент button
    super({
      id,
      text,
      link,
      type: type || 'button',
      events: {
        click: onClick,
      },
      styles,
    });
    
  }
  
  static nameComponent = 'Button';

  render() {
    return ` 
    <a href={{link}}>
      <button class="${styles[this.props.id]}" type={{type}}>
        {{text}}
      </button>
    </a>
    `;
  }
}
