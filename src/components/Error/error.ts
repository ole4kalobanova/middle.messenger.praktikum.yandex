import Block from '../../utils/Block';
import styles from './error.pcss';

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

  render() {
    return `
      <div class="${styles.error}">
        {{#if text}}
          {{text}}
        {{/if}}
      </div>
    `
  }
}
