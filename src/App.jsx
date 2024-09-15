import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToDoList } from './data/models';
import TaskCreationPrompt from './components/TaskCreationPrompt';
import TaskList from './components/taskList';

import Layout from './components/layout';
import Home from './components/home';
import Categories from './components/categories';

function App() {
    const [toDoList, setToDoList] = useState(ToDoList.loadFromLocalStorage());
    const dialogRef = useRef(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState('#756b6b');
    const [categoryToDelete, setCategoryToDelete] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    console.log(toDoList);
    useEffect(() => {
        toDoList.saveToLocalStorage();
    }, [toDoList]);

    const addCategory = (name, color) => {
        if (name && name !== 'All' && color) {
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
    const handleAddTask = () => {
        if (dialogRef.current) {
            dialogRef.current.show()
        }
    }
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout categories={toDoList.categories}/>}>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/categories' element={<Categories categories={toDoList.categories} />} />
                </Route>
            </Routes>
        </Router>
        // <>
        //     <Layout categories={toDoList.categories} />
        //     <main>
        //         <div>
        //             <button onClick={() => addCategory(categoryName, categoryColor)}>Add Category</button>
        //             <input 
        //                 type="text" 
        //                 placeholder='Category Name' 
        //                 value={categoryName} 
        //                 onChange={(e) => setCategoryName(e.target.value)} 
        //             />
        //             <input 
        //                 type="color" 
        //                 value={categoryColor} 
        //                 onChange={(e) => setCategoryColor(e.target.value)} 
        //             />
        //         </div>

        //         <div>
        //             <button onClick={() => deleteCategory(categoryToDelete)}>Delete Category</button>
        //             <select 
        //                 name='Categories' 
        //                 onChange={handleCategorySelect} 
        //                 value={selectedCategory ? selectedCategory.id : ''}
        //             >
        //                 <option value="">Select a category</option>
        //                 {toDoList.categories.map((category) => (
        //                     <option key={category.id} value={category.id}>{category.name}</option>
        //                 ))}
        //             </select>
        //             <input type="hidden" value={categoryToDelete} />
        //         </div>
        //         <button onClick={handleAddTask}>ADD TASK</button>
        //         <ul>
        //             <TaskList 
        //                 category={'All'} 
        //                 toDoList={toDoList.categories} 
        //                 deleteTask={deleteTask} 
        //                 openMenuId={openMenuId} 
        //                 setOpenMenuId={setOpenMenuId} 
        //             />
        //         </ul>

        //         {selectedCategory && <TaskCreationPrompt dialogRef={dialogRef} categoryId={selectedCategory.id} addTask={addTask} />}
        //     </main>
        // </>
    );
}

export default App;
