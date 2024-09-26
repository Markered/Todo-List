import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTaskIcon from '../../icons/addTask-icon.svg?react';

export default function TaskCreationPrompt({ dialogRef, addTask, categoryId }) {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const [date, setDate] = useState(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = (currentDate.getDate() + 1).toString().padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      });
      
    const [time, setTime] = useState('11:59 PM');
    const [dueDate, setDueDate] = useState(Date.parse(`${date} ${time}`));

    const [priority, setPriority] = useState('Low');
    const [subtasks, setSubtasks] = useState([]);
    const [newSubtask, setNewSubtask] = useState('');

    
    useEffect(() => {
        flatpickr('.task-prompt__input__date', {
            minDate: 'today',
            enableTime: false,
            dateFormat: "Y-m-d",
            altInput: true,
            altFormat: "F j, Y",
            defaultDate: date,
            onChange: (_, dateStr) => {
                setDate(dateStr);
            }
        });

        flatpickr('.task-prompt__input__time', {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'h:i K',
            time_24hr: false,
            defaultDate: time,
            onChange: (_, timeStr) => {
                setTime(timeStr);
            }
        });
    }, []);

    useEffect(() => {
        setDueDate(Date.parse(`${date} ${time}`));
    }, [date, time])

    const handleAddSubtask = () => {
        if (newSubtask.trim() !== '') {
            setSubtasks([...subtasks, { id: uuidv4(), name: newSubtask, isCompleted: false }]);
            setNewSubtask('');
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (taskName && dueDate) {
            addTask(categoryId, {
                id: uuidv4(),
                name: taskName,
                description: description,
                dueDate: new Date(dueDate),
                priority: priority,
                status: 'To Do',
                subtasks: subtasks,
                isCompleted: false,
            });
            handleCancel();
        }
    };

    const handleCancel = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    return (
        <>
            <dialog className="task-prompt" ref={dialogRef} open>
                
                <header className="task-prompt__header">
                    <AddTaskIcon className="task-prompt__header__icon" />
                    <h2 className="task-prompt__header__title">Add Task</h2>
                </header>
                
                <form className="task-prompt__form">
                    <fieldset className="task-prompt__section">
                        <label htmlFor="task-description">Task Name</label>
                        <input
                            id="task-name"
                            className="task-prompt__input"
                            type="text"
                            placeholder="Add task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />
                    </fieldset>

                    <fieldset className="task-prompt__section">
                        <label htmlFor="task-description">Description</label>
                        <textarea
                            id="task-description"
                            className="task-prompt__textarea"
                            placeholder="Add description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </fieldset>

                    <section className="task-prompt__section task-prompt__section__due-date">
                        <label htmlFor="task-prompt__input__date-id task-prompt__input-container--date">
                            Due Date
                        </label>
                        <input
                        id="task-prompt__input__date-id"
                        className="task-prompt__input task-prompt__input__date"
                        placeholder="Select Date"
                        />
                        
                        <label htmlFor="task-prompt__input__time-id">
                            Due Time
                        </label>
                        <input
                            id="task-prompt__input__time-id"
                            className="task-prompt__input task-prompt__input__time"
                            placeholder="Select Time"
                        />
                    </section>
                    
                    <fieldset className="task-prompt__section task-prompt__section__priority">
                        <label className="task-prompt__label">Priority</label>
                        <div className="task-prompt__priority">
                            <button
                                type="button"
                                className={`task-prompt__priority-button ${priority === 'Low' ? 'selected' : ''}`}
                                onClick={() => setPriority('Low')}
                            >
                                Low
                            </button>
                            
                            <button
                                type="button"
                                className={`task-prompt__priority-button ${priority === 'Medium' ? 'selected' : ''}`}
                                onClick={() => setPriority('Medium')}
                            >
                                Medium
                            </button>
                            <button
                                type="button"
                                className={`task-prompt__priority-button ${priority === 'High' ? 'selected' : ''}`}
                                onClick={() => setPriority('High')}
                            >
                                High
                            </button>
                        </div>
                    </fieldset>

                    <section className="task-prompt__actions">
                        <button className="task-prompt__submit-button" type="button" onClick={handleClick}>
                            Add Task
                        </button>
                        <button className="task-prompt__cancel-button" type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </section>
                </form>
            </dialog>
        </>
    );
}