import { v4 as uuidv4 } from 'uuid';

class Subtask {
    constructor(name, isCompleted = false) {
        this.name = name;
        this.isCompleted = isCompleted;
    }
}

class Task {
    constructor(id, name, description, dueDate, status, priority, subtasks = [], isCompleted = false, creationDate = new Date()) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.subtasks = subtasks.map(subtask => new Subtask(subtask.name, subtask.isCompleted));
        this.isCompleted = isCompleted;
        this.creationDate = creationDate;
    }

    deleteSubtask(subtaskName) {
        this.subtasks = this.subtasks.filter(subtask => subtask.name !== subtaskName);
    }
}

class Category {
    constructor(id = uuidv4(), name, description, color, tasks = [], creationDate = new Date()) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.color = color;
        this.tasks = tasks.map(task => new Task(task.id, task.name, task.description, task.dueDate, task.priority, task.subtasks, task.isCompleted, task.creationDate));
        this.totalTasks = this.tasks.length;
        this.dueTasks = this.tasks.filter(task => task.dueDate < new Date());
        this.creationDate = creationDate;
    }

    addTask(task) {
        this.tasks.push(new Task(task.id, task.name, task.description, task.dueDate, task.priority, task.subtasks, task.isCompleted, task.creationDate));
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}

class ToDoList {
    constructor(categories = []) {
        this.categories = categories.map(category => new Category(category.id, category.name, category.color, category.tasks));
    }

    addCategory(name, color) {
        if (!this.categories.find(cat => cat.name === name)) {
            this.categories.push(new Category(uuidv4(), name, color));
            this.saveToLocalStorage();
        }
    }

    deleteCategory(categoryId) {
        this.categories = this.categories.filter(category => category.id !== categoryId);
        this.saveToLocalStorage();
    }

    addTask(categoryId, task) {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (category) {
            category.addTask(task);
            this.saveToLocalStorage();
        }
    }

    deleteTask(categoryId, taskId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (category) {
            category.deleteTask(taskId);
            this.saveToLocalStorage();
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('toDoList', JSON.stringify(this.categories));
    }

    static loadFromLocalStorage() {
        const data = localStorage.getItem('toDoList');
        if (data) {
            const parsedData = JSON.parse(data);
            return new ToDoList(parsedData);
        }
        return new ToDoList();
    }
}

export { Category, Task, Subtask, ToDoList };