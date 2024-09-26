import { Routes, Route, useLoaderData } from 'react-router-dom';
import Categories from '../components/categories/Categories';
import CategoryDetail from '../components/categories/CategoryDetail';

export default function CategoryRoutes() {
    const { categories } = useLoaderData();

    return (
        <Routes>
          <Route path='/' element={<Categories categories={categories} />} />
          <Route path='/:categoryId' element={<CategoryDetail categories={categories} />} />
        </Routes>
    );
}
