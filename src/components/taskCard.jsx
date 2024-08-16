export default function TaskCard({ taskDetails, category }) {
    const { name, description, dueDate, priority } = taskDetails;

    return (
        <a className="task-card-link">
            <article className="task-card">
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
                    </section>
                </header>
                <p className="task-card__description">
                    {description}
                </p>
            </article>
        </a>
    );
}