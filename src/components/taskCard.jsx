import { useState, useEffect } from "react";

export default function TaskCard({ taskDetails, category, deleteTask, openMenuId, setOpenMenuId }) {
    const { id, name, description, dueDate, priority } = taskDetails;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(openMenuId === id);
    }, [openMenuId, id]);

    const handleMoreOptionsClick = () => {
        if (openMenuId === id) {
            setIsMenuOpen(false);
            setOpenMenuId(null);
        } else {
            setIsMenuOpen(true);
            setOpenMenuId(id);
        }
    }

    const handleDeleteTask = () => {
        deleteTask(category.id, id);
        setIsMenuOpen(false);
        setOpenMenuId(null);
    }

    return (
        <a className="task-card-link">
            <article className="task-card" style={{ borderLeft: `5px ${category.color} solid` }}>
                <header className="task-card__header">
                    <section className="task-card__info">
                        <h1 className="task-card__name">{name}</h1>
                        <span className={`task-card__due-date`}>Due {new Date(dueDate).toLocaleDateString()}</span>
                    </section>
                    <section className="task-card__details">
                        <span className={`task-card__priority task-card__badge task-card__priority--${priority.toLowerCase()}`}>
                            {priority}
                        </span>
                        <span className="task-card__category task-card__badge" style={{ backgroundColor: category.color }}>
                            {category.name}
                        </span>
                        <button className="task-card__more-options-button" onClick={handleMoreOptionsClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="task-card__more-options-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </button>
                        {isMenuOpen && (
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