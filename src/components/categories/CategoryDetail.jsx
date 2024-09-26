import { useParams } from 'react-router-dom';

export default function CategoryDetail({ categories }) {
    const { categoryId } = useParams(); 
    const category = categories.find(cat => cat.id === categoryId);

    if (!category) {
        return <h1>Category not found!</h1>;
    }

    return (
        <header>
            <div style={{backgroundColor: category.color}}>
                <h1>{category.name}</h1>
            </div>
            <div>
                <div>Total Tasks{category.totalTasks}</div>
                <div>Due Tasks: {category.dueTasks.length}</div>
            </div>
        </header>
    );
}
