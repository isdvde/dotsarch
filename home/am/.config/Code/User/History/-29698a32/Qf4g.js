import { TodoList } from './components/todo-list';
import { XInput } from './components/x-xinput';

let $root = document.querySelector('#root');
let $todo_list = new TodoList();
let $input = new XInput();

$root.append($input);
$root.append($todo_list);
