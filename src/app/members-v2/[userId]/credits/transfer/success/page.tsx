import { auth } from '@/lib/auth';
import { CheckCircle, Send } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { SignOut } from '@/components/navbar/ButtonSignOut';

export default async function TransferSuccessPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ userId: string }>;
}) {
  const session = await auth();
  const { userId: id } = await params;
  const userId = session?.user.id == id && id;

  // Get transfer details from search params
  const recipientName = (await searchParams)['recipientName'] as string;
  const amount = (await searchParams)['amount'] as string;
  const newBalance = (await searchParams)['newBalance'] as string;
  const returnUrl = (await searchParams)['returnUrl'] as string | undefined;

  if (!userId) {
    return (
      <div className="bg-gray-50">
        <ErrorDisplay errorMsg="No user found in database. Please contact support." />
        <SignOut />
      </div>
    );
  }

  if (!recipientName || !amount || !newBalance) {
    return (
      <ErrorDisplay errorMsg="Missing transfer details. Please contact support if tokens were transferred." />
    );
  }

  if (returnUrl) {
    return redirect(returnUrl);
  }

  const firstName = recipientName.split(' ')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-700 px-4 py-8">
      <div className="max-w-md mx-auto space-y-8">
        {/* Success Icon */}
        <div className="text-center pt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Transfer complete!
          </h1>
          <p className="text-gray-700 text-lg">
            You sent {amount} tokens to {firstName}
          </p>
        </div>

        {/* Transfer Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Transfer Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Sent to:</span>
                  <span className="font-medium text-gray-900">
                    {recipientName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Amount:</span>
                  <span className="font-medium text-gray-900">
                    {amount} tokens
                  </span>
                </div>
                <div className="flex justify-between items-center border-t pt-2 mt-3">
                  <span>Your new balance:</span>
                  <span className="font-bold text-green-600">
                    {newBalance} tokens
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Encouragement Message */}
        <div className="text-center mb-6 px-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Thank you for sharing!
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Your generosity helps build a stronger
            <br />
            community and food security for everyone
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="px-4 space-y-3">
          <Link
            href="/members-v2/pantry"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-lg text-center transition-colors block"
          >
            Access the pantry now
          </Link>

          <Link
            href={`/members-v2/${userId}`}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 rounded-lg text-center transition-colors block border border-gray-200"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
