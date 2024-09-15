import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
export default function Layout({ categories }) {
    return (
        <>
            <Sidebar categories={categories}/>
            <main>
                <Outlet />
            </main>
        </>
    );
}