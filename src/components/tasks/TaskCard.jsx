import { useState } from "react";
import EllipsisIcon from '../../icons/ellipsis-icon.svg?react';
export default function TaskCard({ key, taskDetails, category, deleteTask, openMenuId, setOpenMenuId }) {
    const { id, name, description, dueDate, priority } = taskDetails;

    const handleMoreOptionsClick = () => {
        if (openMenuId === id) {
            setOpenMenuId(null);
        } else {
            setOpenMenuId(id);
        }
    };

    const handleDeleteTask = () => {
        deleteTask(category.id, id);
        setOpenMenuId(null);
    };

    return (
        <a className="task-card-link" key={key}>
            <article className="task-card" style={{ borderLeft: `5px ${category.color} solid` }}>
                <header className="task-card__header">
                    <section className="task-card__info">
                        <h1 className="task-card__name">{name}</h1>
                        <span className="task-card__due-date">Due {new Date(dueDate).toLocaleDateString()}</span>
                    </section>
                    <section className="task-card__details">
                        <span className={`task-card__priority task-card__badge task-card__badge__priority--${priority.toLowerCase()}`}>
                            {priority}
                        </span>
                        <span className="task-card__category task-card__badge" style={{ backgroundColor: category.color }}>
                            {category.name}
                        </span>
                        <button className="task-card__more-options-button" onClick={handleMoreOptionsClick}>
                            <EllipsisIcon className="task-card__more-options-icon" />
                        </button>
                        {openMenuId === id && (
                            <div className="task-card__more-options-menu">
                                <ol>
                                    <li><button onClick={handleDeleteTask}>Remove Task</button></li>
                                </ol>
                            </div>
                        )}
                    </section>
                </header>
                <p className="task-card__description">
                    {description}
                </p>
            </article>
        </a>
    );
}