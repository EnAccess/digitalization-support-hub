import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#E6E6E6] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <p className="text-gray-600 mb-4">Funded by:</p>
            <Image
              src="/GoodEnergiesFoundation.png"
              width={180}
              height={50}
              alt="Good Energies Foundation logo"
            />
          </div>
        </div>

        {/* Centered "Other supporters" section below Funded by */}
        <div className="flex flex-col items-center mb-12">
          <p className="text-gray-600 mb-4">Other supporters:</p>
          <div className="flex justify-center gap-8">
            <Image
              src="/supporter1.jpg"
              width={180}
              height={50}
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

        <div className="flex justify-center mb-8">
          <div className="bg-[#5E5E5E] px-6 py-2 rounded">
            <nav className="flex space-x-6">
              <Link href="#" className="text-white hover:text-gray-200">
                Contact Us
              </Link>
              <Link href="#" className="text-white hover:text-gray-200">
                Terms of Use
              </Link>
              <Link href="#" className="text-white hover:text-gray-200">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm mt-4">
          © {new Date().getFullYear()} Digitalization Support Hub. All rights
          reserved.
        </div>
      </div>
    </footer>
  )
}
