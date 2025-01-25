import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2023 Digitalization Support Hub. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-blue-400">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-blue-400">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

