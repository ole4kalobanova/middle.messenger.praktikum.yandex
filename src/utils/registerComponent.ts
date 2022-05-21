import {Block} from './Block';
//import Handlebars, { HelperOptions } from 'handlebars';
import { HelperOptions } from 'handlebars';
// @ts-ignore
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import Handlebars from 'handlebars';

export function registerComponent(Component: typeof Block) {
  Handlebars.registerHelper(Component.name, ({ hash: {  ...hash }, data }: HelperOptions) => {
    if (!data.root.children) {
      data.root.children = {};
    }
    // if (!data.root.refs) {
    //   data.root.refs = {};
    // }
    const { children } = data.root;
    const component = new Component(hash);
    children[component.id] = component;
    // if (ref) {
    //   refs[ref] = component.getContent();
    // }
    return `<div data-id="id-${component.id}"></div>`;
  })
}
