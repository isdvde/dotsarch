import './style.css'

class Editor extends HTMLElement {
  constructor() {
    super();
  }

}

customElements.define('x-editor', Editor, {extends: 'textarea'});