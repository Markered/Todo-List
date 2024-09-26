import { useEffect } from "react";

export default function Categories({ categories }) {
    useEffect(() => console.log(categories), []);
    return (
        <header>
            <div>
                <h1>Categories</h1>
            </div>
            <div>
                Total Categories: {categories.length}
                Total Tasks: {categories.reduce((acc, cat) => acc + cat.tasks.length, 0)}
            </div>
            
        </header>
    )
}