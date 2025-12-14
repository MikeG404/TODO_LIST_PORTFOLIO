import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { logoutUser } from "@/actions/authActions";

export default async function Home() {

  return (
    <main className="flex flex-col items-center p-6">
      <div className="w-full max-w-md flex justify-end mb-4">
        <form action={logoutUser}>
          <button type="submit" className=" cursor-pointer text-sm text-red-500 hover:text-red-700">
            Se déconnecter
          </button>
        </form>
      </div>
      <TodoForm />
      <TodoList />
    </main>
  );
}