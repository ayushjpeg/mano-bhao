// src/components/layout/Layout.tsx

import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen dark bg-zinc-950 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
