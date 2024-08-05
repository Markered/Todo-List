import { useState, useEffect, useRef } from "react";
import AddIcon from '../assets/add-icon.svg';
export default function TaskCreationPrompt( {addTask }) {
    const dialogRef = useRef(null);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');
    const [subtasks, setSubtasks] = useState([]);

    const handleCancel = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    }
    return (
        <dialog className="task-prompt" ref={dialogRef} open>
            <h2 className="task-prompt__title">Add Task</h2>
            <form className="task-prompt__form" method="dialog">
                <section className="task-prompt__section">
                    <label className="task-prompt__label" htmlFor="task-name">Task Name <span className="task-prompt__label--required">required</span></label>
                    <input
                        id="task-name"
                        className="task-prompt__input"
                        type="text"
                        placeholder="Name your task"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </section>

                <section className="task-prompt__section">
                    <label className="task-prompt__label" htmlFor="task-description">Description <span className="task-prompt__label--optional">optional</span></label>
                    <textarea
                        id="task-description"
                        className="task-prompt__textarea"
                        placeholder="Describe your task"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </section>

                <section className="task-prompt__section">
                    <label className="task-prompt__label" htmlFor="due-date">Due Date <span className="task-prompt__label--required">required</span></label>
                    <input
                        id="due-date"
                        className="task-prompt__input"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </section>

                <section className="task-prompt__section">
                    <label className="task-prompt__label">Priority <span className="task-prompt__label--required">required</span></label>
                    <div className="task-prompt__priority">
                        <button
                            type="button"
                            className={`task-prompt__priority-button ${priority === 'High' ? 'selected' : ''}`}
                            onClick={() => setPriority('High')}
                        >
                            High
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
                            className={`task-prompt__priority-button ${priority === 'Low' ? 'selected' : ''}`}
                            onClick={() => setPriority('Low')}
                        >
                            Low
                        </button>
                    </div>
                </section>

                <section className="task-prompt__section">
                    <label className="task-prompt__label" htmlFor="subtasks">Subtasks <span className="task-prompt__label--optional">optional</span></label>
                    <div className="task-prompt__subtask-input-container">
                        <textarea
                            id="subtasks"
                            className="task-prompt__textarea"
                            name="subtasks-input"
                        />
                        <button className="task-prompt__add-subtask-button" type="button">
                            <img src={AddIcon} alt="Add Subtask" />
                        </button>
                    </div>
                    <ul className="task-prompt__subtask-list">
                        {subtasks.length > 0 ? subtasks.map(subtask => (
                            <li>
                                
                            </li>
                        )) : <p>No subtask</p>}
                    </ul>
                </section>

                <section className="task-prompt__actions">
                    <button className="task-prompt__submit-button" type="submit">
                        Add Task
                    </button>
                    <button className="task-prompt__cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </section>
                
            </form>
        </dialog>
    );
}    