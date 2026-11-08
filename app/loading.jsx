export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center">
      <header className="w-full h-16 shadow-md shadow-zinc-500 flex justify-between items-center px-4 sm:px-8">
        <h1 className="text-2xl font-bold text-white">Confessions</h1>
        <div className="border w-10 h-10 text-black bg-white text-2xl font-bold rounded-full flex items-center justify-center opacity-70">
          +
        </div>
      </header>

      <div className="p-4 sm:p-10 gap-8 flex-1 overflow-y-auto w-full sm:w-4/5 md:w-3/5 flex flex-col items-center">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full border border-white/10 bg-black/30 rounded-md p-6 sm:p-8 flex flex-col gap-6 animate-pulse"
          >
            <div className="h-4 bg-white/20 rounded w-4/5" />
            <div className="h-4 bg-white/10 rounded w-3/5" />
            <div className="h-3 bg-white/10 rounded w-1/4 mt-2" />
          </div>
        ))}
      </div>
    </div>
  )
}

