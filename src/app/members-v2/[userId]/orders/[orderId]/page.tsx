import { getUserOrder } from '@/actions/members';
import OrderItemCard from '@/components/members-v2/OrderItemCard';
import { SignOut } from '@/components/navbar/ButtonSignOut';
import AutoSignOut from '@/components/shared/AutoSignOut';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { hasMinimumRole, ROLES, UserRole } from '@/lib/roles';
import { ArrowLeft, Coins } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ userId: string; orderId: string }>;
}) {
  const session = await auth();
  const { userId, orderId } = await params;

  if (!session) {
    redirect('/login');
  }

  const sessionRole: UserRole = session?.user.role as UserRole;
  if (!sessionRole) {
    redirect('/login');
  }

  if (!hasMinimumRole(sessionRole, ROLES.member)) {
    return <AutoSignOut redirect="/unauthorized" />;
  }

  // Fetch order details
  const orderResponse = await getUserOrder(userId, orderId);

  if (!orderResponse.success) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-forest rounded-md flex items-center justify-center">
              <Image
                src="/levenvale-logo.png"
                alt="Levenvale Farm"
                width={32}
                height={32}
              />
            </div>
            <span className="font-semibold">Levenvale Farm</span>
          </div>
          <SignOut />
        </div>
        <ErrorDisplay
          errorMsg={`Failed to load order: ${orderResponse.error}`}
        />
      </div>
    );
  }

  const { order } = orderResponse.value;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const itemsTotal = order.orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Top navbar */}
      <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href={`/members-v2/${userId}`}>
            <ArrowLeft className="text-gray-600" size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-forest rounded-md flex items-center justify-center">
              <Image
                src="/levenvale-logo.png"
                alt="Levenvale Farm"
                width={32}
                height={32}
              />
            </div>
            <span className="font-semibold">Levenvale Farm</span>
          </div>
        </div>
        <SignOut />
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order summary
            </h1>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
              <span className="text-gray-600 text-sm">
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          {order.orderItems.length} items in this order
        </p>

        {/* Order Items */}
        <div className="space-y-4 mb-8">
          {order.orderItems.map(item => (
            <OrderItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Order Details */}
        <div className="bg-green-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order details
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Items total</span>
              <div className="flex items-center gap-1">
                <Coins size={16} className="text-green-600" />
                <span>{itemsTotal.toFixed(2)}</span>
              </div>
            </div>

            {order.fees.map((fee: any) => (
              <div key={fee.id} className="flex justify-between text-gray-600">
                <span>{fee.feeName}</span>
                <div className="flex items-center gap-1">
                  <Coins size={16} className="text-green-600" />
                  <span>{fee.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}

            <hr className="border-gray-200" />

            <div className="flex justify-between font-semibold text-gray-900">
              <span>Order total</span>
              <div className="flex items-center gap-1">
                <Coins size={16} className="text-green-600" />
                <span>{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Delivery Address</h3>
            <div className="text-gray-600 text-sm">
              <p>
                {order.shippingFirstName} {order.shippingLastName}
              </p>
              <p>{order.shippingAddress1}</p>
              {order.shippingAddress2 && <p>{order.shippingAddress2}</p>}
              <p>
                {order.shippingCity}, {order.shippingState}{' '}
                {order.shippingPostcode}
              </p>
              <p>{order.shippingCountry}</p>
              {order.shippingPhone && <p>{order.shippingPhone}</p>}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order ID</span>
              <span className="font-mono text-sm text-gray-900">
                {order.referenceId || order.id.slice(0, 8)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
