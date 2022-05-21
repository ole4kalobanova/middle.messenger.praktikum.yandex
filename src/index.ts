import { Button } from './components/Button/button.ts'
import LoginPage from './pages/Login';
import { renderDOM } from "./utils/renderDom";

document.addEventListener('DOMContentLoaded', () => {
  //console.log('11111')
  const loginPage = new LoginPage({
    buttonText: 'Тык'
    //{ 
    // text: "Тык",
    // events: {
    //   //click: ()=>console.log('ТЫКТЫКТЫК')
    // } 
    //}
  });
  console.log('DOMContentLoaded')
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
