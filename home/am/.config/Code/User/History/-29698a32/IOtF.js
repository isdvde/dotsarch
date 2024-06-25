import { XTodoList } from './components/x-todo-list';
import { XInput } from './components/x-xinput';
import './main.css';

let $root = document.querySelector('#root');

let $todo_list = document.querySelector('x-todo-list');
let $todo_input = document.querySelector('x-input');

$todo_input.$button.onclick = function(e) {
  let value = $todo_input.value;
  $todo_input.clean();
  $todo_list.add_item(value);


}

$todo_list.create_item();
