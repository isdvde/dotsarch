import { XTodoList } from './components/x-todo-list';
import { XInput } from './components/x-xinput';
import './main.css';

let $root = document.querySelector('#root');

let $todo_list = document.querySelector('x-todo-list');
let $todo_input = document.querySelector('x-input');

function add_item() {
  let value = $todo_input.value;
  if(value) {
    $todo_input.clean();
    $todo_list.add_item(value);
  }
}

$todo_input.$button.onclick = function(e) {
}

$todo_input.$input.onkeyup = function(e) {
  if(e.key === "Enter") {
    let value = $todo_input.value;
    $todo_input.clean();
    $todo_list.add_item(value);
  }

}

$todo_list.create_item();
