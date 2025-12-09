import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 bg-gray-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Mon Portfolio: To-Do List
        </h1>
        <TodoForm />
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
          <TodoList />
        </div>
      </div>
    </main>
  );
}