import Todo from "./Todo";
import { getTodos } from "@/actions/todoActions";

export default async function TodoList() {

    const { todos } = await getTodos();

    return (
        <div>
            {todos?.map(todo => {
                return <Todo key={todo._id} todo={todo} />
            })}
        </div>
    )
}