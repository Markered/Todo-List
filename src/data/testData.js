import { Category, Task, Subtask, ToDoList } from "./models"

export const toDolist = new ToDoList([
    new Category('red', 'red', [
        new Task('test')
    ]),
    new Category('red', 'red', [
        new Task('test')
    ]),
    new Category('red', 'red', [
        new Task('test')
    ])
])

console.log(toDolist);