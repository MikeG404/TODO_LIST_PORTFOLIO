import { createTodo } from "@/actions/todoActions";

export default async function Home() {  
  
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 bg-gray-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Mon Portfolio: To-Do List
        </h1>
        
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

        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
           <p className="text-gray-400 text-center italic">La liste s'affichera ici...</p>
        </div>
      </div>
    </main>
  );
}