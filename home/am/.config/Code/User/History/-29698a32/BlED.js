import { XTodoList } from './components/x-todo-list';
import { XInput } from './components/x-xinput';
import './main.css';

let $root = document.querySelector('#root');

let $todo_list = document.querySelector('x-todo-list');
let $todo_input = document.querySelector('x-input');

function add_item() {
  let value = $todo_input.value;
  $todo_input.clean();
  if(value) {
    $todo_input.clean();
    $todo_list.add_item(value);
  }
}

$todo_input.$button.onclick = function(e) {
  add_item();
}

$todo_input.$input.onkeyup = function(e) {
  if(e.key === "Enter") {
    add_item();
  }

}

$todo_list.create_item();
