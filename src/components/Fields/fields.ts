import Block from '../../utils/Block';
import * as styles from './fields.pcss';
import validateValue from '../../utils/validation';

interface InputProps {
  type: string,
  name: string,
  label: string,
  error?: string,
  value: string
}
export class Fields extends Block {
  constructor({
    type, name, label, error, value,
  }: InputProps) {
    super({
      styles,
      type,
      name,
      label,
      error,
      value,
    });

    this.setProps({
      onBlur: this.validation.bind(this),
      onInput: this.validation.bind(this),
      onFocus: this.validation.bind(this),
    });
  }

  validation(e: Event) {
    const input = e.target as HTMLInputElement;
    const { value, name } = input;
    const errorText = validateValue(name, value);
    this.refs.error.setProps({ text: errorText });
  }

  static nameComponent = 'Fields';

  render() {
    return `
    <div>
      <div class="${styles.input__label}">
        {{label}}
      </div>
      {{{Input 
          type=type 
          name=name 
          onFocus=onFocus
          onBlur=onBlur 
          onInput=onInput
          value=value
      }}}
      {{{ErrorMes text=error ref="error"}}}
    </div>
    `;
  }
}
