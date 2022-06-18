import Block from '../../utils/Block';
import styles from '../../index.pcss';

interface Error500Props {}
export class Error500 extends Block {
  constructor(props: Error500Props) {
    super({
      ...props,
      styles,
    });
  }

  render() {
    return `
    <main>
      <div class="${styles.error__title}" class="error__title">500</div>
      <div class="${styles.error__text}" class="error__text">Ошибочка. Мы уже фиксим</div>
    </main>
    `;
  }
}
