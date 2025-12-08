export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Mon Portfolio: To-Do List
        </h1>
      </div>
      
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
        <p className="text-gray-500 text-center">Le chargement des tâches arrivera bientôt...</p>
      </div>
    </main>
  );
}