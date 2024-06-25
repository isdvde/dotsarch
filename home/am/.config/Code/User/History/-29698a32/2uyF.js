import { XTodoList } from './components/x-todo-list';
import { XInput } from './components/x-xinput';
import './main.css';

let $root = document.querySelector('#root');

let $todo_list = document.querySelector('x-todo-list');
let $todo_input = document.querySelector('x-input');

$todo_input.$button.onclick = function(e) {
  let value = $todo_input.$input.value;


}

$todo_list.create_item();
