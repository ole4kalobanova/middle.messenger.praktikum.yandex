import LoginPage from './pages/Login';
import { renderDOM } from './utils/renderDOM';
import Button from './components/Button';
import Input from './components/Input';
import { registerComponent } from './utils/registerComponent';
//import styles from './style.pcss'

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);
  registerComponent(Input);
  const loginPage = new LoginPage({
    buttonText: 'Тык'
    //{ 
    // text: "Тык",
    // events: {
    //   //click: ()=>console.log('ТЫКТЫКТЫК')
    // } 
    //}
  });
  renderDOM('#app', loginPage)
  //render(".app", button);

  // Через секунду контент изменится сам, достаточно обновить пропсы
  // setTimeout(() => {
  //   button.setProps({
  //     text: 'Click me, please',
  //     events:{ 
  //       click: () => console.log('222222222222')
  //     }
  //   });
  // }, 1000);
})
