import { getTodos } from '@/actions/todoActions';
import DraggableTodoList from '../dnd/DraggableTodoList';

export default async function TodoList() {
  const { todos } = await getTodos();

  return (

    <div className="w-full max-w-2xl mt-6 space-y-4">
      <DraggableTodoList initialTodos={todos} />
    </div>
  );
}