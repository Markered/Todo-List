import { Outlet, useLoaderData } from 'react-router-dom';
import Sidebar from './Sidebar';
export default function Layout() {
    const { toDoList } = useLoaderData();
    return (
        <>
            <Sidebar categories={toDoList.categories} />
            <main>
                <Outlet />
            </main>
        </>
    );
}