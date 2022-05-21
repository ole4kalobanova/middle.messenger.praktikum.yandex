import Button from '../../components/Button';
import {Block} from '../../utils/Block';
import template from './index.hbs'

export class LoginPage extends Block {
  constructor(props:{buttonText:string}){
    super(props);
  }

  protected initChildren(){
    this.children.button = new Button({ text: this.props.buttonText, events:{click:()=>console.log(11111)} })
  }

  // Дети жестко определены при создании компонента и не являются props
  componentDidUpdate(oldProps:any, newProps:any){
    if(oldProps.buttonText !== newProps.buttonText){
      this.children.button.setProps({
        text: newProps.buttonText
      })
    }
    return true;
  }

  render() {
    //const button = new Button({ text: 'Login page' })
    return this.compile(template, {  });
  }
}
