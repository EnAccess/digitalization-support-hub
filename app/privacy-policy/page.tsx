"use client"

import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#F9FBFA] text-[#1E1F1E] py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-10">
        <h1 className="text-3xl font-extrabold mb-4">
          <span className="text-[#43BC80]">Privacy</span>{" "}
          <span className="text-[#0D261A]">Policy</span>
        </h1>

        <p className="mb-4 text-base text-gray-700">
          This Privacy Policy explains how Stichting EnAccess (“we”, “our”,
          “us”) collects, uses, and protects personal data through our website.
          We are committed to protecting your privacy and processing your data
          in accordance with the General Data Protection Regulation (GDPR) and
          the Dutch Data Protection Act (Uitvoeringswet AVG).
        </p>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Who We Are</h2>
          <p className="text-sm text-gray-700">Stichting EnAccess</p>
          <p className="text-sm text-gray-700">
            Website:{" "}
            <a
              href="https://digitalization-support-hub.org"
              className="text-[#0D6E4B] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://digitalization-support-hub.org
            </a>
          </p>
          <p className="text-sm text-gray-700">
            Email:{" "}
            <a
              href="mailto:info@enaccess.org"
              className="text-[#0D6E4B] underline"
            >
              info@enaccess.org
            </a>
          </p>
          <p className="text-sm text-gray-700">Registered in The Netherlands</p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">
            What Personal Data We Collect
          </h2>
          <p className="text-sm text-gray-700">
            We collect only the personal data necessary for our legitimate
            operations:
          </p>

          <p className="mt-2 text-sm text-gray-700">(a) Data you provide</p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            <li>Name and email address (if you contact us)</li>
            <li>
              Any additional details you voluntarily include in communications
            </li>
          </ul>

          <p className="mt-3 text-sm text-gray-700">
            (b) Automatically collected data
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            <li>Anonymized IP address</li>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Pages visited and time spent</li>
          </ul>
          <p className="mt-2 text-sm text-gray-700">
            This is gathered through analytics and cookies (see Cookies Policy).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">
            Why We Process Personal Data
          </h2>
          <div className="text-sm text-gray-700">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Purpose</th>
                  <th className="pb-2">Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pt-1">Responding to contact inquiries</td>
                  <td className="pt-1">
                    Legitimate interest (Art. 6(1)(f) GDPR)
                  </td>
                </tr>
                <tr>
                  <td className="pt-1">
                    Analyzing website usage (Google Analytics)
                  </td>
                  <td className="pt-1">Consent (Art. 6(1)(a) GDPR)</td>
                </tr>
                <tr>
                  <td className="pt-1">Displaying embedded YouTube videos</td>
                  <td className="pt-1">Consent (Art. 6(1)(a) GDPR)</td>
                </tr>
                <tr>
                  <td className="pt-1">
                    Maintaining website functionality and security
                  </td>
                  <td className="pt-1">
                    Legitimate interest (Art. 6(1)(f) GDPR)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-700">
            We do not use your data for marketing or advertising purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">How We Share Your Data</h2>
          <p className="text-sm text-gray-700 mb-4">
            We do not sell or trade personal data. However, some third-party
            services process limited data on our behalf or through embedded
            content:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Recipient</th>
                  <th className="pb-2">Purpose</th>
                  <th className="pb-2">Location</th>
                  <th className="pb-2">Safeguards</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 pr-4">
                    Google Ireland Ltd. / Google LLC (YouTube & Google
                    Analytics)
                  </td>
                  <td className="py-2 pr-4">Analytics and embedded media</td>
                  <td className="py-2 pr-4">EU / EEA / US</td>
                  <td className="py-2">Standard Contractual Clauses (SCCs)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-700">
            YouTube and Google act as independent controllers for data collected
            through embedded videos or analytics. For further details, see{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-[#0D6E4B] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://www.youtube.com/t/privacy"
              className="text-[#0D6E4B] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Data Retention</h2>
          <div className="text-sm text-gray-700 mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Data Type</th>
                  <th className="pb-2">Retention Period</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2">Contact form or email correspondence</td>
                  <td className="py-2">Up to 12 months after last contact</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-2">Analytics data (aggregated)</td>
                  <td className="py-2">Up to 26 months</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">Cookie consent records</td>
                  <td className="py-2">Up to 12 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-700">
            After these periods, personal data is securely deleted or
            anonymized.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">
            International Data Transfers
          </h2>
          <p className="text-sm text-gray-700">
            Where Google or YouTube transfers personal data outside the European
            Economic Area (EEA), these transfers are covered by Standard
            Contractual Clauses (SCCs) approved by the European Commission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Your Rights</h2>
          <p className="text-sm text-gray-700">
            Under the GDPR, you have the right to:
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            <li>Access, correct, or delete your personal data</li>
            <li>Restrict or object to processing</li>
            <li>Withdraw consent at any time</li>
            <li>Request data portability</li>
            <li>
              File a complaint with the{" "}
              <a
                href="https://autoriteitpersoonsgegevens.nl"
                className="text-[#0D6E4B] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Autoriteit Persoonsgegevens
              </a>
            </li>
          </ul>
          <p className="mt-2 text-sm text-gray-700">
            To exercise your rights, contact us at{" "}
            <a
              href="mailto:info@enaccess.org"
              className="text-[#0D6E4B] underline"
            >
              info@enaccess.org
            </a>
            . We will respond within 30 days.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Security Measures</h2>
          <p className="text-sm text-gray-700">
            We use HTTPS encryption, limited access controls, and regular
            security maintenance to protect your data. However, no online
            service can guarantee complete security.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Updates to This Policy</h2>
          <p className="text-sm text-gray-700">
            We may update this Privacy Policy to reflect changes in our
            practices or legal requirements. The latest version will always be
            available on this page.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Contact Us</h2>
          <div className="text-sm text-gray-700">
            <p>Stichting EnAccess</p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@enaccess.org"
                className="text-[#0D6E4B] underline"
              >
                info@enaccess.org
              </a>
            </p>
            <p>
              Website:{" "}
              <a
                href="https://digitalization-support-hub.org"
                className="text-[#0D6E4B] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://digitalization-support-hub.org
              </a>
            </p>
            <p>Registered in The Netherlands</p>
          </div>
        </section>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">Last updated: 8 October 2025</p>
          <Link href="/" className="text-[#17412C] underline">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
