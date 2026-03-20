import Link from 'next/link';

export default async function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Oops, you&apos;re not a member.
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
          <p className="text-gray-600">
            It doesn&apos;t look like you&apos;re a member so we&apos;ve signed
            you out. Please message me on Whatsapp by clicking my number below.{' '}
            <a
              href="https://wa.me/447482400662"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              +447482400662
            </a>
          </p>

          <p className="text-gray-600">
            Once we have verified your membership, you&apos;ll be able to sign
            in and access the members portal.
          </p>

          <p className="text-gray-600">
            If you are a member and you ended up here, don&apos;t worry. Sign
            out and sign back in again.
          </p>

          <div className="flex flex-row gap-x-4">
            <Link
              href="/login?callbackUrl=/members-v2"
              className="inline-block w-full px-6 py-2 bg-forest text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="inline-block w-full px-6 py-2 bg-forest text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
