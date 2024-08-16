class Category {
    constructor(name, color, tasks = []) {
        this.name = name;
        this.color = color;
        this.tasks = tasks.map(task => new Task(task.name, task.description, task.dueDate, task.priority, task.subtasks, task.isCompleted, task.creationDate));
    }

    addTask(task) {
        this.tasks.push(new Task(task.name, task.description, task.dueDate, task.priority, task.subtasks, task.isCompleted, task.creationDate));
    }

    deleteTask(taskName) {
        this.tasks = this.tasks.filter(task => task.name !== taskName);
    }
}

class Task {
    constructor(name, description, dueDate, priority, subtasks = [], isCompleted = false, creationDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.subtasks = subtasks ? subtasks.map(subtask => new Subtask(subtask.name, subtask.isCompleted)) : null;
        this.isCompleted = isCompleted;
        this.creationDate = creationDate;
    }

    deleteSubtask(subtaskName) {
        this.subtasks = this.subtasks.filter(subtask => subtask.name !== subtaskName);
    }
}

class Subtask {
    constructor(name, isCompleted = false) {
        this.name = name;
        this.isCompleted = isCompleted;
    }
}

class ToDoList {
    constructor(categories = []) {
        this.categories = categories.map(category => new Category(category.name, category.color, category.tasks));
    }

    addCategory(name, color) {
        if (!this.categories.find(cat => cat.name === name)) {
            this.categories.push(new Category(name, color));
            this.saveToLocalStorage();
        }
    }

    deleteCategory(categoryName) {
        this.categories = this.categories.filter(category => category.name !== categoryName);
        this.saveToLocalStorage();
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