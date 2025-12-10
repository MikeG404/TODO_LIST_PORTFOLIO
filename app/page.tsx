import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default async function Home() {

  return (
    <main className="flex flex-col items-center p-6">
        <TodoForm />
        <TodoList />
    </main>
  );
}