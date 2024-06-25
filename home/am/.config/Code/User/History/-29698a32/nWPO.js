import { TodoList } from './components/todo-list';

let $root = document.querySelector('#root');
let $todo_list = new TodoList();

$root.append($todo_list);