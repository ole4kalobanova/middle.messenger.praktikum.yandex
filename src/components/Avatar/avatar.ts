import Block from '../../utils/Block';
import * as styles from './avatar.pcss';

export class Avatar extends Block {
  constructor() {
    super({
      styles,
    });
  }

  static nameComponent = 'Avatar';

  render() {
    return ` 
    <div class="${styles.round}" name="avatar">Аватар</div>
    `;
  }
}
