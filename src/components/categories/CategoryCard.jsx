import EllipsisIcon from '../../icons/ellipsis-icon.svg?react';

export default function CategorieCards({ categories, deleteCategory }) {
    return (
        <>
            {categories.map(category => (
                <article key={category.id} className="category-card">
                    <header className="category-card__header" style={{backgroundColor: category.color}}>
                        <div className='category-card__header-overlay'>
                            <div>
                                <h2 className="category-card__title">{category.name}</h2>
                                <p>{`0% - ${category.tasks.filter(task => task.isCompleted).length}/${category.tasks.length}`}</p>
                            </div>
                            
                            <div className="category-card__actions">
                                <EllipsisIcon className="category-card__icon" />
                                <ul className='category-card__menu'>
                                    <li>
                                        <button>Edit</button>
                                    </li>
                                    <li>
                                        <button onClick={() => deleteCategory(category.id)}>Delete</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>
                    <div className="category-card__body">
                        <p className="category-card__description">{category.description || 'No Description'}</p>
                        <span className="category-card__due-badge">
                            {`Due: ${category.tasks.filter(task => !task.isCompleted && task.dueDate).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.dueDate || 'No upcoming tasks'}`}
                        </span>
                    </div>
                </article>            
            ))}
        </>
    )
}
