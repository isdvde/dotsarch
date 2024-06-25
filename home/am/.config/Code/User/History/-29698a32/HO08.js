import { TodoList } from './components/todo-list';

let $root = document.querySelector('#root');
let $todo_list = new TodoList();

$root.append($todo_list);

$todo_list.add_item({name: 'prueba1'});
$todo_list.add_item({name: 'prueba2'});