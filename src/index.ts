import LoginPage from './pages/Login';
import { renderDOM } from './utils/renderDOM';
import Button from './components/Button';
import Input from './components/Input';
import { registerComponent } from './utils/registerComponent';
import Avatar from './components/Avatar';
import Error404 from './pages/Error404';
import Chats from './pages/Chats';
import ChangeUser from './pages/User';
import RegistrationPage from './pages/Registration';
import Error500 from './pages/Error500';
import ChangePassword from './pages/Password'

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);
  registerComponent(Input);
  registerComponent(Avatar);
  // const loginPage = new LoginPage({
  //   buttonText: 'Тык'
  //   //{ 
  //   // text: "Тык",
  //   // events: {
  //   //   //click: ()=>console.log('ТЫКТЫКТЫК')
  //   // } 
  //   //}
  // });
  let renderPage = new Error404;
  switch (location.pathname) {
    case '/':
      renderPage = new LoginPage
      break
    case '/chats':
      renderPage = new Chats
      break
    case '/profile':
      renderPage = new ChangeUser
      break
    case '/login':
      renderPage = new LoginPage
      break
    case '/registration':
      renderPage = new RegistrationPage
      break
      case '/password':
      renderPage = new ChangePassword
      break
    case '/404':
      renderPage = new Error404
      break
    case '/500':
      renderPage = new Error500
      break
  }
  renderDOM('#app', renderPage);

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
