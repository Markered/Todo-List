import React from 'react';

export default function CategorySelector({ categories, onSelect }) {
  return (
    <select onChange={onSelect}>
      <option value="">Select a category</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
