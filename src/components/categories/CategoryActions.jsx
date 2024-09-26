export default function CategoryActions({ onAdd, onDelete, categoryToDelete }) {
  return (
    <div>
      <button onClick={onAdd}>Add Category</button>
      <button onClick={() => onDelete(categoryToDelete)}>Delete Category</button>
    </div>
  );
}
