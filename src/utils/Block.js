import { EventBus } from './EventBus'
import { nanoid } from 'nanoid'; ///?????

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  id = nanoid(6);
  _element = null;
  _meta = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsAndChildren = {}) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildren(propsAndChildren);
    this.children = children;


    this._meta = {
      props
    };

    this.props = this._makePropsProxy(props);
    this.initChildren();


    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  getChildren(propsAndChildren) {
    const children = {};
    const props = {};
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

  _registerEvents(eventBus) {
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
  componentDidMount(oldProps) { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild;
    if (this.element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
    return new DocumentFragment()
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU,oldProps , target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  _addEvents() {
    const events = this.props.events;
    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.addEventListener(event, listener)
    })
  }

  _removeEvents() {
    const events = this.props.events;
    if (!events || !this.element) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element.removeEventListener(event, listener)
    })
  }

  show() {
    this.getContent().style.display = "block"; //add
  }

  hide() {
    this.getContent().style.display = "none"; //add
  }

  compile(template, context) {
    const fragment = this._createDocumentElement('template');

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map(ch => `<div data-id="id-${ch.id}"></div>`);
        return;
      }
      context[key] = `<div data-id="id-${child.id}"></div>`
    })
    const htmlString = template(context); // Из шаблона получаем html строку
    fragment.innerHTML = htmlString;
    Object.entries(this.children).forEach(([key, child]) => {
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

  initChildren(){

  }
}
