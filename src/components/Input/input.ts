import { Block } from '../../utils/Block';
import styles from './input.pcss';

interface InputProps {
  type: string,
  name: string,
  label: string,
  events?: {
    click: () => void
  }
}

export class Input extends Block {

  constructor({ type, name, label }: InputProps) {
    super({
      type,
      name,
      label,
      styles,
      events: {
        click: () => console.log('111111')
      }
    });
  }

  render() {
    return `
    <div>
      <div class="${styles.input__label}">{{label}}</div>
      <input type={{type}} class="${styles.input__field}" name={{name}}>
    </div>
    `
  }
}
