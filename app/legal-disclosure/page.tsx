"use client"

import Link from "next/link"

export default function LegalDisclosure() {
  return (
    <main className="min-h-screen bg-[#F9FBFA] text-[#1E1F1E] py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-10">
        <h1 className="text-3xl font-extrabold mb-4">
          <span className="text-[#43BC80]">Legal</span>{" "}
          <span className="text-[#43BC80]">disclosure</span>
        </h1>

        <section className="space-y-3 mb-6">
          <p className="font-semibold text-sm text-gray-700">
            Organization name
          </p>
          <p className="text-base">Stichting EnAccess</p>
        </section>

        <section className="space-y-3 mb-6">
          <p className="font-semibold text-sm text-gray-700">Legal form</p>
          <p>Non-profit foundation (Stichting)</p>

          <p className="font-semibold text-sm text-gray-700">
            Registered address
          </p>
          <p>
            Industrieweg 9<br />
            2254AE Voorschoten
            <br />
            The Netherlands
          </p>

          <p className="font-semibold text-sm text-gray-700">
            Contact information
          </p>
          <p>
            <a
              href="mailto:info@enaccess.org"
              className="text-[#0D6E4B] underline"
            >
              info@enaccess.org
            </a>
          </p>

          <p className="font-semibold text-sm text-gray-700">
            Chamber of Commerce (KvK)
          </p>
          <p>69412626</p>

          <p className="font-semibold text-sm text-gray-700">
            RSIN (Tax Identification Number)
          </p>
          <p>857865274</p>

          <p className="font-semibold text-sm text-gray-700">VAT number</p>
          <p>NL857865274B01</p>

          <p className="font-semibold text-sm text-gray-700">
            Authorized representatives
          </p>
          <p>Fabio de Pascale, Vivien Barnier, Stewart Craine</p>

          <p className="font-semibold text-sm text-gray-700">
            Purpose of the foundation
          </p>
          <p>
            EnAccess is a non-profit organization dedicated to accelerating
            progress toward sustainable universal energy access through
            co-created (Open Source) tools.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <p className="font-semibold text-sm text-gray-700">Disclaimer</p>
          <p className="text-sm text-gray-700">
            The content of this website has been prepared with the greatest
            possible care. However, EnAccess does not guarantee the accuracy,
            completeness, or timeliness of the information provided. We are not
            liable for any damages resulting from the use of this website or its
            contents.
          </p>

          <p className="font-semibold text-sm text-gray-700">
            Copyright notice
          </p>
          <p className="text-sm text-gray-700">
            All content on this website, including text, images, and graphics,
            is the property of EnAccess unless otherwise stated. Reproduction or
            distribution requires prior written consent.
          </p>
        </section>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">Last updated: 8 October 2025</p>
          <Link href="/" className="text-[#17412C] underline">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
