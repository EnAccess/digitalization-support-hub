import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Link
          href="/"
          className="text-4xl font-bold text-[#1B75BA] text-center mb-4"
        >
          Digitalization Support Hub
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="#" className="text-gray-700 hover:text-[#1B75BA]">
            About
          </Link>
          <Link href="#" className="text-gray-700 hover:text-[#1B75BA]">
            Services
          </Link>
          <Link href="#" className="text-gray-700 hover:text-[#1B75BA]">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
