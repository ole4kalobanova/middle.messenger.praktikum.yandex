import LoginPage from './pages/Login';
import renderDOM from './utils/renderDOM';
import Button from './components/Button';
import Input from './components/Input';
import registerComponent from './utils/registerComponent';
import Avatar from './components/Avatar';
import Error404 from './pages/Error404';
import Chats from './pages/Chats';
import ChangeUser from './pages/User';
import RegistrationPage from './pages/Registration';
import Error500 from './pages/Error500';
import ChangePassword from './pages/Password';
import ErrorMes from './components/Error';
import Fields from './components/Fields';

registerComponent(Button);
registerComponent(Input);
registerComponent(Avatar);
registerComponent(ErrorMes);
registerComponent(Fields);

document.addEventListener('DOMContentLoaded', () => {
  let renderPage = new Error404({});
  console.log(window.location, 'window.location')
  console.log(window.location.pathname, 'window.location.pathname')
  switch (window.location.pathname) {
    case '/':
      renderPage = new LoginPage({});
      break;
    case '/chats':
      renderPage = new Chats({});
      break;
    case '/profile':
      renderPage = new ChangeUser({});
      break;
    case '/login':
      renderPage = new LoginPage({});
      break;
    case '/registration':
      renderPage = new RegistrationPage({});
      break;
    case '/password':
      renderPage = new ChangePassword({});
      break;
    case '/404':
      renderPage = new Error404({});
      break;
    case '/500':
      renderPage = new Error500({});
      break;
    default:
      renderPage = new Error404({});
      break;
  }
  renderDOM(renderPage);
});
