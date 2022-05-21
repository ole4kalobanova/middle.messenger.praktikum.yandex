import { Block } from '../../utils/Block';
import styles from './input.pcss';

interface InputProps {
  type: string,
  name: string,
  label: string
  //onClick?: () => void
}

export class Input extends Block {

  constructor({ type, name, label }: InputProps) {
    super({
      type,
      name,
      label,
      styles
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
