import Block from '../../utils/Block';
import styles from '../../index.pcss';

interface ChatsProps {
  sendMessage?: () => void,
  message?: string
};
export class Chats extends Block {
  constructor(props: ChatsProps) {
    super({
      ...props,
      styles,
    });

    this.setProps({
      sendMessage: (e: Event) => {
        e.preventDefault();
        var userMessage = document.getElementById("message") as HTMLInputElement;
        if (userMessage.value) {
          var newMessageDiv = document.createElement("div");
          var text = document.createTextNode(userMessage.value);
          newMessageDiv.appendChild(text);
          var element = document.getElementById("chats");
          newMessageDiv.classList.add(`chat__chats_message_user_${element?.className.split('_')[element?.className.split('_').length - 1]}`);
          element?.appendChild(newMessageDiv);
          userMessage.value = "";
        }
      },
    })
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
    `
  }
}
