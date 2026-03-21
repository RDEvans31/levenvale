import { getUserTokenBalance } from '@/actions/members/balance';
import { Coins, PlusIcon, ScrollText, Send } from 'lucide-react';
import Link from 'next/link';
import AutoSignOut from '../shared/AutoSignOut';

interface TokenBalanceProps {
  userId: string;
  membershipId: string;
}

export default async function TokenBalance({ userId, membershipId }: TokenBalanceProps) {
  const balanceResult = await getUserTokenBalance(membershipId);
  if (!balanceResult.success) {
    return (
      <AutoSignOut redirect="/login?message=Oops! Something went wrong fetching your balance" />
    );
  }
  const { balance } = balanceResult.value;

  // Format balance with token icon
  const formattedBalance = balance.toFixed(2);

  return (
    <div className="h-full">
      <div className="bg-gradient-to-br from-green-200 to-beige  rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center border border-gray-100 relative overflow-hidden h-full">
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <p className="text-forest text-sm mb-4 font-medium">Your Balance</p>
          <div className="flex items-center justify-center mb-8">
            <Coins size={32} className="text-forest mr-3" />
            <h2 className="text-forest text-4xl font-bold">
              {formattedBalance}
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            {/* Top Up button */}
            <div className="flex flex-col items-center">
              <Link href={`/members-v2/${userId}/credits`}>
                <button className="flex flex-col items-center justify-center w-16 h-16 bg-forest bg-opacity-10 rounded-full hover:bg-opacity-30 transition-colors group">
                  <PlusIcon size={24} className="text-forest" />
                </button>
              </Link>
              <span className="text-forest text-xs font-medium mt-2">
                Top Up
              </span>
            </div>

            {/* Send button */}
            <div className="flex flex-col items-center">
              <Link href={`/members-v2/${userId}/credits/transfer`}>
                <button className="flex flex-col items-center justify-center w-16 h-16 bg-forest bg-opacity-10 rounded-full hover:bg-opacity-30 transition-colors group">
                  <Send size={24} className="text-forest" />
                </button>
              </Link>
              <span className="text-forest text-xs font-medium mt-2">Send</span>
            </div>

            {/* History button */}
            <div className="flex flex-col items-center">
              <Link href={`/members-v2/${userId}/credits/history`}>
                <button className="flex flex-col items-center justify-center w-16 h-16 bg-forest bg-opacity-10 rounded-full hover:bg-opacity-30 transition-colors group">
                  <ScrollText size={24} className="text-forest" />
                </button>
              </Link>
              <span className="text-forest text-xs font-medium mt-2">
                History
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
