import { createTodo } from "@/actions/todoActions";

export default function TodoForm() {

    return (
        <form action={createTodo} className="w-full max-w-md flex gap-2 mb-8">
            <input
                type="text"
                name="title"
                placeholder="Nouvelle tâche..."
                className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Ajouter
            </button>
        </form>
    )
}