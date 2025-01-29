import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Link
          href="/"
          className="text-4xl font-bold text-[#009563] text-center mb-4"
        >
          Digitalization Support Hub
        </Link>
      </div>
    </header>
  )
}
