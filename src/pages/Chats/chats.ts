import Block from '../../utils/Block';
import styles from '../../index.pcss';

interface ChatsProps {
  sendMessage?: () => void,
  message?: string
}
export class Chats extends Block {
  constructor(props: ChatsProps) {
    super({
      ...props,
      styles,
    });

    this.setProps({
      sendMessage: (e: Event) => {
        e.preventDefault();
        const userMessage = document.getElementById('message') as HTMLInputElement;
        if (userMessage.value) {
          const newMessageDiv = document.createElement('div');
          const text = document.createTextNode(userMessage.value);
          newMessageDiv.appendChild(text);
          const element = document.getElementById('chats');
          const idNonoidPage = element?.className?.split('_') || '';
          newMessageDiv.classList.add(`chat__chats_message_user_${idNonoidPage[idNonoidPage.length - 1]}`);
          element?.appendChild(newMessageDiv);
          userMessage.value = '';
        }
      },
    });
  }

  render() {
    return `
     <div class="${styles.chat}">
      <div class="${styles.chat__list}">
        <div class="${styles.chat__user}">
          {{{Avatar}}}
          {{{Button text="Изменить профиль" id="button__secondary" link="./profile"}}}
        </div>
        <div class="${styles.chat__friends}">
          <div class="${styles.chat__friends_chats}">
            Первый чат
          </div>
          <div class="${styles.chat__friends_chats}">
            Второй чат
          </div>
        </div>
      </div>
      <div class="${styles.chat__window}">
        <div class="${styles.chat__chats}" id="chats">
          <div class="${styles.chat__chats_message_user}">
            Какое-то сообщение
          </div>
          <div class="${styles.chat__chats_message_friends}">
            Ответ на сообщение
          </div>
        </div>
        <div class="${styles.chat__message_field}">
          <input id="message" type="text" class="${styles.chat__message}">
          {{{Button type="button" text="YAP!" id="button__send" onClick=sendMessage}}}
        </div>
      </div>
    </div>
    `;
  }
}
