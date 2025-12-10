import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default async function Home() {

  return (
    <main className="flex justify-center pt-10">
        <TodoForm />
        <div>
          <TodoList />
        </div>
    </main>
  );
}