import TaskCard from "./taskCard"

export default function TaskList({ category, toDoList, deleteTask, openMenuId, setOpenMenuId }) {
    return (
        <ul>
            {category === 'All' ? (
                toDoList.map(category =>
                    category.tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            taskDetails={task}
                            category={category}
                            deleteTask={deleteTask}
                            openMenuId={openMenuId}
                            setOpenMenuId={setOpenMenuId}
                        />
                    ))
                )
            ) : (
                toDoList
                    .filter(cat => cat.name === category)
                    .map(cat =>
                        cat.tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                taskDetails={task}
                                category={cat}
                                deleteTask={deleteTask}
                                openMenuId={openMenuId}
                                setOpenMenuId={setOpenMenuId}
                            />
                        ))
                    )
            )}
        </ul>
    )
}