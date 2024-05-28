export default function Main({ children }) {
  return (
    <main className="w-full glass relative overflow-hidden transition-all duration-1000 h-[596px] rounded-sm max-w-96 text-neutral-300 py-8 pb-4 flex flex-col">
      {children}
    </main>
  )
}
