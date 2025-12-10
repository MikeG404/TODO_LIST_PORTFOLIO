import Todo from "./Todo";
import { getTodos } from "@/actions/todoActions";

export default async function TodoList() {

    const { todos } = await getTodos();

    return (
        <div className="w-full max-w-2xl mt-6 space-y-4">
            {todos?.map(todo => {
                return <Todo key={todo._id} todo={todo} />
            })}
        </div>
    )
}