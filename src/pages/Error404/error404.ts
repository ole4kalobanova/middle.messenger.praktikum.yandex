import { Block } from '../../utils/Block';
import styles from '../../index.pcss';

export class Error404 extends Block {
  constructor() {
    super({
      styles
    });
  }

  render() {
    return `
    <main>
      <div class="${styles.error__title}" class="error__title">404</div>
      <div class="${styles.error__text}" class="error__text">Ошибочка. Не туда попали</div>
    </main>
    `
  }
}
