import { getUserTokenBalance } from '@/actions/members/balance';
import { Coins, PlusIcon, ScrollText, Send } from 'lucide-react';
import Link from 'next/link';
import AutoSignOut from '../shared/AutoSignOut';

interface TokenBalanceProps {
  userId: string;
}

export default async function TokenBalance({ userId }: TokenBalanceProps) {
  const balanceResult = await getUserTokenBalance(userId);
  if (!balanceResult.success) {
    return (
      <AutoSignOut redirect="/login?message=Oops! Something went wrong fetching your balance" />
    );
  }
  const { balance } = balanceResult.value;

  // Format balance with token icon
  const formattedBalance = balance.toFixed(2);

  return (
    <div>
      <div className="bg-gradient-to-br from-green-600 to-forest rounded-2xl shadow-md p-8 flex flex-col items-center text-center max-w-sm mx-auto border border-gray-100 relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <p className="text-white text-sm mb-4 font-medium">Your Balance</p>
          <div className="flex items-center justify-center mb-8">
            <Coins size={32} className="text-white mr-3" />
            <h2 className="text-white text-4xl font-bold">
              {formattedBalance}
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            {/* Top Up button */}
            <div className="flex flex-col items-center">
              <Link href={`/members-v2/${userId}/credits`}>
                <button className="flex flex-col items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors group">
                  <PlusIcon size={24} className="text-white" />
                </button>
              </Link>
              <span className="text-white text-xs font-medium mt-2">
                Top Up
              </span>
            </div>

            {/* Send button */}
            <div className="flex flex-col items-center">
              <Link href={`/members-v2/${userId}/credits/transfer`}>
                <button className="flex flex-col items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors group">
                  <Send size={24} className="text-white" />
                </button>
              </Link>
              <span className="text-white text-xs font-medium mt-2">Send</span>
            </div>

            {/* History button */}
            <div className="flex flex-col items-center">
              <Link href={`/members-v2/${userId}/credits/history`}>
                <button className="flex flex-col items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors group">
                  <ScrollText size={24} className="text-white" />
                </button>
              </Link>
              <span className="text-white text-xs font-medium mt-2">
                History
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
