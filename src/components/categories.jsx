export default function Categories({ categories }) {
    return (
        <>
            {categories.map(category => (
                <article key={category.id} className="category-card">
                    <header className="category-card__header">
                        <h2 className="category-card__title">{category.name}</h2>
                        <div className="category-card__actions">
                            <button className="category-card__edit-button">EDIT</button>
                            <button className="category-card__delete-button">DELETE</button>
                        </div>
                    </header>
                    <div className="category-card__body">
                        <section className="category-card__progress-section">
                            <div className="circle-progress-bar">
                                <div className="circle-progress-bar__inner-circle">
                                    <span className="circle-progress-bar__percentage">0%</span>
                                </div>
                            </div>
                            <div className="category-card__task-info">
                                <p className="category-card__task-count">
                                    Total Tasks
                                    <span>
                                        {category.tasks.length}
                                    </span>
                                </p>
                                <p className="category-card__task-completed">
                                    Tasks Completed
                                    <span>
                                        {`${category.tasks.filter(task => task.isCompleted).length}/${category.tasks.length}`}
                                    </span>
                                </p>
                            </div>
                        </section>
                        <p className="category-card__description">DESCRIPTION</p>
                    </div>
                </article>            
            ))}
        </>
    )
}
