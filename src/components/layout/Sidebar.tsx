import { FileText, LayoutDashboard, Mail } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-52 h-full bg-zinc-900 text-white p-4 border-r hidden lg:flex flex-col justify-between">
      <div>
        <h1 className="text-lg font-bold mb-8">Mano Bhav</h1>
        <nav className="flex flex-col gap-6 text-sm">
          <a href="#" className="flex items-center gap-3 hover:text-zinc-300">
            <LayoutDashboard size={18} />
            Model Details
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-zinc-300">
            <Mail size={18} />
            Contact Us
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-zinc-300">
            <FileText size={18} />
            Reports
          </a>
        </nav>
      </div>
      <div className="text-xs text-zinc-500">Mano Bhav</div>
    </aside>
  )
}
