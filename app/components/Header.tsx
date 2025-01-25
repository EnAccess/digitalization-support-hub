import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800">Digitalization Support Hub</div>
          <div className="hidden md:flex space-x-4">
            <Link href="#" className="text-gray-800 hover:text-blue-600">
              Home
            </Link>
            <Link href="#" className="text-gray-800 hover:text-blue-600">
              About
            </Link>
            <Link href="#" className="text-gray-800 hover:text-blue-600">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

