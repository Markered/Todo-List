import React, { useState, useEffect } from 'react';
import { ToDoList } from './data/models';
import TaskCreationPrompt from './components/TaskCreationPrompt';
import TaskCard from './components/taskCard';

function App() {
    const [toDoList, setToDoList] = useState(ToDoList.loadFromLocalStorage());
    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState('#756b6b');
    const [categoryToDelete, setCategoryToDelete] = useState('');
    const [taskName, setTaskName] = useState('');

    useEffect(() => {
        toDoList.saveToLocalStorage();
    }, [toDoList]);

    const addCategory = (name, color) => {
        toDoList.addCategory(name, color);
        setToDoList(new ToDoList([...toDoList.categories]));
    };

    const deleteCategory = (name) => {
        toDoList.deleteCategory(name);
        setToDoList(new ToDoList([...toDoList.categories]));
    };

    const addTask = (categoryName, task) => {
        const category = toDoList.categories.find(cat => cat.name === categoryName);
        if (category) {
            category.addTask(task);
            setToDoList(new ToDoList([...toDoList.categories]));
        }
    };

    const deleteTask = (categoryName, taskName) => {
        const category = toDoList.categories.find(cat => cat.name === categoryName);
        if (category) {
            category.deleteTask(taskName);
            setToDoList(new ToDoList([...toDoList.categories]));
        }
    };

    return (
        <main>
            <h1>To-Do List</h1>
            <div>
              <button onClick={() => addCategory(categoryName, categoryColor)}>Add Category</button>
              <input type="text" placeholder='Category Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
              <input type="color" placeholder='Category Color' value={categoryColor} onChange={(e) => setCategoryColor(e.target.value)}/>
            </div>
            
            <div>
              <button onClick={() => deleteCategory(categoryToDelete)}>Delete Category</button>
              <select name='Categories' onClick={(e) => setCategoryToDelete(e.target.value)}>
                    <option value="">Select a category</option>
                    {toDoList.categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
                <TaskCreationPrompt addTask={addTask}/>
            <div>
                
            </div>
            <button onClick={() => deleteTask('Work', 'Task 1')}>Delete Task from Work</button>
            
            <ul>
                {toDoList.categories.map(category => (
                    <li key={category.name}>
                        {category.name} - {category.color}
                        <ul className="todoListContainer">
                            {category.tasks.map((task, index) => (
                                <li key={index}>
                                    <TaskCard taskDetails={task} category={category}/>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default App;
