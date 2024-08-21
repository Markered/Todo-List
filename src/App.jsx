import React, { useState, useEffect } from 'react';
import { ToDoList } from './data/models';
import TaskCreationPrompt from './components/TaskCreationPrompt';
import TaskCard from './components/taskCard';

function App() {
    const [toDoList, setToDoList] = useState(ToDoList.loadFromLocalStorage());
    const [openMenuId, setOpenMenuId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState('#756b6b');
    const [categoryToDelete, setCategoryToDelete] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        toDoList.saveToLocalStorage();
    }, [toDoList]);

    const addCategory = (name, color) => {
        if (name && color) {
            toDoList.addCategory(name, color);
            setToDoList(new ToDoList(toDoList.categories));
        }
    };

    const deleteCategory = (categoryId) => {
        if (categoryId) {
            toDoList.deleteCategory(categoryId);
            setToDoList(new ToDoList(toDoList.categories));
            setCategoryToDelete('');
        }
    };

    const addTask = (categoryId, task) => {
        const category = toDoList.categories.find(cat => cat.id === categoryId);
        if (category) {
            category.addTask(task);
            setToDoList(new ToDoList(toDoList.categories)); 
        }
    };

    const deleteTask = (categoryId, taskId) => {
        const category = toDoList.categories.find(cat => cat.id === categoryId);
        if (category) {
            category.deleteTask(taskId);
            setToDoList(new ToDoList(toDoList.categories));
        }
    };

    const handleCategorySelect = (e) => {
        const selectedId = e.target.value;
        const selected = toDoList.categories.find(cat => cat.id === selectedId);
        setSelectedCategory(selected || null);
        setCategoryToDelete('');
    };

    return (
        <main>
            <h1>To-Do List</h1>
            <div>
                <button onClick={() => addCategory(categoryName, categoryColor)}>Add Category</button>
                <input 
                    type="text" 
                    placeholder='Category Name' 
                    value={categoryName} 
                    onChange={(e) => setCategoryName(e.target.value)} 
                />
                <input 
                    type="color" 
                    value={categoryColor} 
                    onChange={(e) => setCategoryColor(e.target.value)} 
                />
            </div>

            <div>
                <button onClick={() => deleteCategory(categoryToDelete)}>Delete Category</button>
                <select 
                    name='Categories' 
                    onChange={handleCategorySelect} 
                    value={selectedCategory ? selectedCategory.id : ''}
                >
                    <option value="">Select a category</option>
                    {toDoList.categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <input type="hidden" value={categoryToDelete} />
            </div>

            {selectedCategory && <TaskCreationPrompt categoryId={selectedCategory.id} addTask={addTask} />}

            <ul>
                {toDoList.categories.map(category => (
                    <li key={category.id}>
                        {category.name} - {category.color}
                        <ul className="todoListContainer">
                            {category.tasks.map(task => (
                                <li key={task.id}>
                                    <TaskCard 
                                        taskDetails={task} 
                                        category={category} 
                                        deleteTask={deleteTask} 
                                        openMenuId={openMenuId} 
                                        setOpenMenuId={setOpenMenuId} 
                                    />
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
