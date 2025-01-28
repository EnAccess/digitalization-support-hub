import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center mb-12">
          <Link href="/" className="text-xl font-bold text-[#1B75BA]">
            Digitalization Support Hub
          </Link>
          <nav className="flex space-x-6">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-gray-600 mb-4">Made by:</p>
            <div className="flex items-center gap-8">
              <Image
                src="/supporter1.png"
                width={120}
                height={40}
                alt="EnAccess logo"
              />
              <Image
                src="/supporter1.png"
                width={120}
                height={40}
                alt="GET.invest logo"
              />
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <p className="text-gray-600 mb-4">Funded by:</p>
            <Image
              src="/supporter1.png"
              width={180}
              height={50}
              alt="Good Energies Foundation logo"
            />
          </div>
        </div>

        <div className="mb-12">
          <p className="text-gray-600 mb-4">Other supporters:</p>
          <div className="flex justify-center gap-8">
            <Image
              src="/supporter1.png"
              width={100}
              height={30}
              alt="Supporter 1 logo"
            />
            <Image
              src="/supporter1.png"
              width={100}
              height={30}
              alt="Supporter 2 logo"
            />
            <Image
              src="/supporter1.png"
              width={100}
              height={30}
              alt="Supporter 3 logo"
            />
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Digitalization Support Hub. All rights
          reserved.
        </div>
      </div>
    </footer>
  )
}
