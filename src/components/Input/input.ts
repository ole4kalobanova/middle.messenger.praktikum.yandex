import Block from '../../utils/Block';
import styles from './input.pcss';

interface InputProps {
  type: string,
  name: string,
  label: string,
  value: string,
  onFocus: () => void,
  onBlur: () => void,
  onInput: () => void
}

export class Input extends Block {
  constructor({ onFocus, onBlur, onInput, type, name, label, value }: InputProps) {
    super({
      type,
      name,
      label,
      value,
      events: {
        input: onInput,
        focus: onFocus,
        blur: onBlur
      }
    });
  }

  render() {
    return `
      <input
        autocomplete="off" 
        type={{type}} 
        class="${styles.input__field}" 
        name={{name}} 
        value={{value}}
       >
    `
  }
}
