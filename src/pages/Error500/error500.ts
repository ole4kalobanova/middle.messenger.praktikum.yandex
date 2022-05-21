import { Block } from '../../utils/Block';
import styles from '../../index.pcss';

export class Error500 extends Block {
  constructor() {
    super({
      styles
    });
  }

  render() {
    return `
    <main>
      <div class="${styles.error__title}" class="error__title">500</div>
      <div class="${styles.error__text}" class="error__text">Ошибочка. Мы уже фиксим</div>
    </main>
    `
  }
}
