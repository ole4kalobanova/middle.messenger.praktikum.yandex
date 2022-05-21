import { Block } from './Block';

export function renderDOM(query, block) {
  const root = document.querySelector(query);
  if(!root){
    throw new Error('Root not found');
  }
  block.dispatchComponentDidMount();//  Зачем??
  root.innerHTML = '';
  root.append(block.getContent())
  // root.appendChild(block.getContent());
  // return root;
}
