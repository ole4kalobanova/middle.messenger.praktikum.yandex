import Block from '../../utils/Block';
import * as styles from './error.pcss';

interface ErrorProps {
  text: string
}
export class ErrorMes extends Block {
  constructor(props: ErrorProps) {
    super({
      ...props,
      styles,
    });
  }

  static nameComponent = 'ErrorMes';

  render() {
    return `
      <div class="${styles.error}">
        {{#if text}}
          {{text}}
        {{/if}}
      </div>
    `;
  }
}
