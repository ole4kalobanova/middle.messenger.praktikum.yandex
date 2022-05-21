import EventBus from './EventBus'
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6);
  private _element: any = null; //HTMLElement | null
  protected props: any;
  protected children: Record<string, Block>;
  private eventBus: () => EventBus;

  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(propsAndChildren);
    this.children = children;
    this.props = this._makePropsProxy(props);
    this.initChildren();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};
    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every(v => v instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    })
    return { props, children };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(_oldProps: any, _newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _render() {
    // const fragment = this.render();
    const tempateString = this.render();
    const fragment = this.compile(tempateString, { ...this.props });
    const newElement = fragment.firstElementChild as HTMLElement;
    if (this.element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): string {
    // return new DocumentFragment()
    return '';
  }

  getContent(): any { // HTMLElement | null ?
    return this.element;
  }

  _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.addEventListener(event, listener)
    })
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events || !this.element) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element.removeEventListener(event, listener)
    })
  }

  // show() {
  //   this.getContent().style.display = "block"; //add
  // }

  // hide() {
  //   this.getContent().style.display = "none"; //add
  // }

  compile(templateString: string, context: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    // Object.entries(this.children).forEach(([key, child]) => {
    //   if (Array.isArray(child)) {
    //     context[key] = child.map(ch => `<div data-id="id-${ch.id}"></div>`);
    //     return;
    //   }
    //   context[key] = `<div data-id="id-${child.id}"></div>`
    // }); 
    // const htmlString = template(context); // Из шаблона получаем html строку
    const template = Handlebars.compile(templateString);
    const htmlString = template({ ...context, children: this.children }); // Из шаблона получаем html строку
    fragment.innerHTML = htmlString;
    Object.entries(this.children).forEach(([, child]) => {
      //   // if (Array.isArray(child)) {
      //   //   context[key] = child.map(ch => `<div data-id="id-${child.id}"></div>`);
      //   //   return;
      //   // }
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent())
    })
    return fragment.content;
  }

  initChildren() { }
}
