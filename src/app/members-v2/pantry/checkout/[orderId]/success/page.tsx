import ClientSuccess from '@/components/pantry-v2/checkout/success/ClientSuccess';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const LF_API_URL = process.env.LF_API_URL;
const LF_API_KEY = process.env.LF_API_KEY;

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const session = await auth();
  const { orderId } = await params;
  const userId = session?.user.id;

  if (!userId) {
    redirect('/login');
  }

  if (!orderId) {
    return (
      <div className="flex flex-col">
        <ErrorDisplay errorMsg="No orderId." />
        <Link href="mailto:hello@bellobeef.com.au" className="text-blue">
          Contact support
        </Link>
      </div>
    );
  }

  if (!LF_API_URL || !LF_API_KEY) {
    return <ErrorDisplay errorMsg="API configuration missing" />;
  }

  try {
    const response = await fetch(
      `${LF_API_URL}/orders/${orderId}/confirmation`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LF_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch order: ${text}`);
    }

    const orderData = await response.json();

    return <ClientSuccess orderData={orderData} />;
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error fetching order confirmation:', errorMessage);
    return (
      <div className="flex flex-col">
        <ErrorDisplay
          errorMsg={`Failed to load order confirmation: ${errorMessage}`}
        />
      </div>
    );
  }
}
