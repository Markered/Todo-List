import { Link } from 'react-router-dom';
import FolderIcon from '../icons/folder-icon.svg?react';
import HomeIcon from '../icons/home-icon.svg?react';

export default function Sidebar({ categories }) {
    return (
      <nav className="sidebar">
        <h1>TODOLIST</h1>
        <Link className="sidebar__button sidebar__button--home" to={'/home'}>
            <HomeIcon className="sidebar__button--icon" />
            Home
        </Link>
        
        <Link className="sidebar__button sidebar__button--categories" to={'/categories'}>  
            <FolderIcon className="sidebar__button--icon" />
            Categories
        </Link>
       
        {categories.map(category => (
          <Link to={`/categories/${category.name.toLowerCase()}`} className="sidebar__button sidebar__button--category" key={category.id}>
            <span className="sidebar__category-color" style={{backgroundColor: category.color}}></span>
            {category.name}
          </Link>
        ))}
      </nav>
    );
  }
  