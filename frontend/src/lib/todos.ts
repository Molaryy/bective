import { TodoList } from '../types.ts';

class Todos {
  private todos: TodoList[] = [];

  public addTodo(todo: TodoList) {
    this.todos.push(todo);
  }

  public getTodos() {
    return this.todos;
  }
}

export default Todos;
