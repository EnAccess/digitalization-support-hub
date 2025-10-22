"use client"

import Link from "next/link"

export default function CookiesPolicy() {
  return (
    <main className="min-h-screen bg-[#F9FBFA] text-[#1E1F1E] py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-10">
        <h1 className="text-3xl font-extrabold mb-4">
          <span className="text-[#43BC80]">Cookies</span>{" "}
          <span className="text-[#0D261A]">Policy</span>
        </h1>

        <p className="mb-4 text-base text-gray-700">
          This Cookies Policy explains how Stichting EnAccess (“we”, “our”,
          “us”) uses cookies and similar technologies on the website{" "}
          <a
            href="https://digitalization-support-hub.org"
            className="text-[#0D6E4B] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://digitalization-support-hub.org/
          </a>{" "}
          (the “Website”). We use cookies to ensure the proper functioning of
          our Website, to analyze website traffic, and to improve your browsing
          experience. This policy should be read together with our Privacy
          Policy which explains how we process personal data.
        </p>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">What are Cookies?</h2>
          <p className="text-sm text-gray-700">
            Cookies are small text files that are placed on your computer,
            smartphone, or other device when you visit a website. They help the
            website recognize your device and store certain information about
            your preferences or past actions.
          </p>
          <p className="mt-3 text-sm text-gray-700">
            There are different types of cookies:
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            <li>
              Necessary cookies: essential for the operation of the Website.
            </li>
            <li>
              Analytical cookies: help us understand how visitors use the
              Website.
            </li>
            <li>
              Functional cookies: improve usability by remembering your
              preferences.
            </li>
            <li>
              Third-party cookies: placed by external services such as social
              media platforms.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">
            Types of Cookies We Use
          </h2>
          <p className="text-sm text-gray-700 mb-3">
            We use only a limited set of cookies for analytics and embedded
            video functionality. The table below lists all cookies detected on
            our website.
          </p>

          <div className="overflow-auto rounded border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-3 text-left">Cookie</th>
                  <th className="py-2 px-3 text-left">Domain</th>
                  <th className="py-2 px-3 text-left">Purpose</th>
                  <th className="py-2 px-3 text-left">Duration</th>
                  <th className="py-2 px-3 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2 px-3">_ga</td>
                  <td className="py-2 px-3">digitalization-support-hub.org</td>
                  <td className="py-2 px-3">
                    Installed by Google Analytics to distinguish users and track
                    website statistics.
                  </td>
                  <td className="py-2 px-3">1 year 1 month 4 days</td>
                  <td className="py-2 px-3">Analytics</td>
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="py-2 px-3">_ga_*</td>
                  <td className="py-2 px-3">digitalization-support-hub.org</td>
                  <td className="py-2 px-3">
                    Used by Google Analytics to maintain session state.
                  </td>
                  <td className="py-2 px-3">1 year 1 month 4 days</td>
                  <td className="py-2 px-3">Analytics</td>
                </tr>

                <tr className="border-t">
                  <td className="py-2 px-3">YSC</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Tracks views of embedded YouTube videos.
                  </td>
                  <td className="py-2 px-3">Session</td>
                  <td className="py-2 px-3">Analytics</td>
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="py-2 px-3">VISITOR_INFO1_LIVE</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Measures bandwidth to determine video interface.
                  </td>
                  <td className="py-2 px-3">6 months</td>
                  <td className="py-2 px-3">Functional</td>
                </tr>

                <tr className="border-t">
                  <td className="py-2 px-3">VISITOR_PRIVACY_METADATA</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Stores YouTube user&apos;s consent state.
                  </td>
                  <td className="py-2 px-3">6 months</td>
                  <td className="py-2 px-3">Necessary</td>
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="py-2 px-3">__Secure-ROLLBACK_TOKEN</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Used by YouTube for player security and performance.
                  </td>
                  <td className="py-2 px-3">6 months</td>
                  <td className="py-2 px-3">Other</td>
                </tr>

                <tr className="border-t">
                  <td className="py-2 px-3">yt.innertube::nextId</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Registers a unique ID to track watched videos.
                  </td>
                  <td className="py-2 px-3">Persistent</td>
                  <td className="py-2 px-3">Advertising</td>
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="py-2 px-3">yt.innertube::requests</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Registers a unique ID to store data on what videos from
                    YouTube the user has seen.
                  </td>
                  <td className="py-2 px-3">never</td>
                  <td className="py-2 px-3">Advertisement</td>
                </tr>

                <tr className="border-t">
                  <td className="py-2 px-3">ytidb::LAST_RESULT_ENTRY_KEY</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Used by YouTube to store the last search result entry that
                    was clicked by the user to improve search relevance.
                  </td>
                  <td className="py-2 px-3">never</td>
                  <td className="py-2 px-3">Functional</td>
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="py-2 px-3">yt-remote-connected-devices</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Stores user&apos;s video preferences.
                  </td>
                  <td className="py-2 px-3">Persistent</td>
                  <td className="py-2 px-3">Functional</td>
                </tr>

                <tr className="border-t">
                  <td className="py-2 px-3">yt-remote-device-id</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    YouTube sets this cookie to store the video preferences of
                    the user using embedded YouTube video.
                  </td>
                  <td className="py-2 px-3">never</td>
                  <td className="py-2 px-3">Functional</td>
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="py-2 px-3">yt-remote-session-name</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Used by YouTube to store the user&apos;s video player
                    preferences.
                  </td>
                  <td className="py-2 px-3">session</td>
                  <td className="py-2 px-3">Functional</td>
                </tr>

                <tr className="border-t">
                  <td className="py-2 px-3">yt-remote-fast-check-period</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Used to store the user&apos;s video player preferences for
                    embedded YouTube videos.
                  </td>
                  <td className="py-2 px-3">session</td>
                  <td className="py-2 px-3">Functional</td>
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="py-2 px-3">yt-remote-session-app</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Used to store user preferences and information about the
                    interface of the embedded YouTube video player.
                  </td>
                  <td className="py-2 px-3">session</td>
                  <td className="py-2 px-3">Functional</td>
                </tr>

                <tr className="border-t">
                  <td className="py-2 px-3">yt-remote-cast-available</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Used to store the user's preferences regarding whether
                    casting is available on their YouTube video player.
                  </td>
                  <td className="py-2 px-3">session</td>
                  <td className="py-2 px-3">Functional</td>
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="py-2 px-3">yt-remote-cast-installed</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Used to store the user's video player preferences using
                    embedded YouTube video.
                  </td>
                  <td className="py-2 px-3">session</td>
                  <td className="py-2 px-3">Functional</td>
                </tr>

                <tr className="border-t">
                  <td className="py-2 px-3">__Secure-YEC</td>
                  <td className="py-2 px-3">youtube.com</td>
                  <td className="py-2 px-3">
                    Security token for YouTube embed services.
                  </td>
                  <td className="py-2 px-3">Persistent</td>
                  <td className="py-2 px-3">Other</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Managing Your Cookies</h2>
          <p className="text-sm text-gray-700">
            You can control or delete cookies through:
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            <li>The cookie consent banner on our website; or</li>
            <li>Your browser settings (to delete or block cookies).</li>
          </ul>
          <p className="mt-2 text-sm text-gray-700">
            Note: Blocking YouTube cookies may prevent embedded videos from
            playing correctly.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Third-Party Cookies</h2>
          <p className="text-sm text-gray-700">
            YouTube cookies are placed when you view embedded videos. These
            cookies allow YouTube (Google LLC) to collect data about video
            interactions. We do not control how these third parties use your
            data. For more information:
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            <li>
              <a
                href="https://www.youtube.com/t/privacy"
                className="text-[#0D6E4B] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://policies.google.com/privacy"
                className="text-[#0D6E4B] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Legal Basis</h2>
          <p className="text-sm text-gray-700">
            We only use non-essential cookies (Analytics, Functional, and
            Advertising) after obtaining your consent (Art. 6(1)(a) GDPR, Art.
            11.7a Telecommunicatiewet). Necessary cookies may be used without
            consent, as they are essential for maintaining user consent state.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Updates</h2>
          <p className="text-sm text-gray-700">
            We may update this Cookies Policy periodically to reflect new
            cookies, legal requirements, or website changes. Please revisit this
            page regularly for the latest version.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Contact</h2>
          <div className="text-sm text-gray-700">
            <p>
              For any questions regarding cookies or personal data, contact us
              at:
            </p>
            <p className="mt-2">Stichting EnAccess</p>
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
