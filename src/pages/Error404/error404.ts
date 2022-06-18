import Block from '../../utils/Block';
import styles from '../../index.pcss';

interface Error404Props {}
export class Error404 extends Block {
  constructor(props: Error404Props) {
    super({
      ...props,
      styles,
    });
  }

  render() {
    return `
    <main>
      <div class="${styles.error__title}" class="error__title">404</div>
      <div class="${styles.error__text}" class="error__text">Ошибочка. Не туда попали</div>
    </main>
    `;
  }
}
