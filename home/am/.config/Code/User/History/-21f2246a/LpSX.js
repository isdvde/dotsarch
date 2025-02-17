import './style.css'

class Editor extends HTMLElement {

}

customElements.define('x-editor', Editor, {extends: 'textarea'});