import Block from '../../utils/Block';
import styles from './avatar.pcss';

export class Avatar extends Block {
  constructor() {
    super({
      styles,
    });
  }

  render() {
    return ` 
    <div class="${styles.round}" name="avatar">Аватар</div>
    `;
  }
}
