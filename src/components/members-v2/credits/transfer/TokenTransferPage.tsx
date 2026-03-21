'use client';
import {
  TransferDto,
  transferTokens,
} from '@/app/members-v2/[userId]/credits/transfer/actions';
import { ChevronDown, Coins, Send, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const successMessageTemplates = [
  {
    icon: '🌱',
    h1: 'All done!',
    h2: 'Awesome stuff',
    p: 'You sent {amount} tokens to {firstName}.',
    boldSubheading:
      'Your generosity plants the seeds <br> for a more resilient community',
    finalP: "- that can't be controlled by the government 😉",
  },
  {
    icon: '🙌',
    h1: 'Tokens sent!',
    h2: '',
    p: '{firstName} has received your {amount} tokens.',
    boldSubheading:
      "That's {amount} tokens towards their food security <br> 🥩",
    finalP: 'Every exchange makes you both stronger.',
  },
  {
    icon: '🎁',
    h1: 'A gift, sent!',
    h2: '',
    p: '{firstName} just received {amount} tokens from you.',
    boldSubheading:
      "That's {amount} tokens invested in them<br> and their family's health <br> 🙌",
    finalP:
      "Generosity is contagious. You've just made our community a little healthier and more connected.",
  },
];

type Status = 'new' | 'pending' | 'success';

interface Member {
  membershipId: string;
  name: string;
  email: string;
}

export default function TokenTransferPage({
  userId,
  membershipId,
  creditBalance,
  returnUrl,
  members,
}: {
  userId: string;
  membershipId: string;
  creditBalance: number;
  returnUrl?: string;
  members: Member[];
}) {
  const [status, setStatus] = useState<Status>('new');
  const [amount, setAmount] = useState<number>(0);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');
  console.log(returnUrl);
  console.log(members);

  // Filter members based on search query, excluding current member
  const filteredMembers = members.filter(
    member =>
      member.membershipId !== membershipId &&
      member.email.toLowerCase() === searchQuery.toLowerCase()
  );

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
    setSearchQuery(member.name);
    setIsDropdownOpen(false);
    setAmount(0); // Reset amount when selecting new member
  };

  const firstName = selectedMember
    ? selectedMember.name.split(' ')[0]
    : undefined;

  const handleSend = async () => {
    setStatus('pending');
    const transferData: TransferDto = {
      fromMembershipId: membershipId,
      toMembershipId: selectedMember?.membershipId || '',
      total: amount,
      description: description,
    };

    const result = await transferTokens(transferData);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('new');
      setError(result.error);
    }
  };

  const getRandomSuccessMessage = () => {
    const randomIndex = Math.floor(
      Math.random() * successMessageTemplates.length
    );
    const template = successMessageTemplates[randomIndex];

    return {
      icon: template.icon,
      h1: template.h1,
      h2: template.h2,
      p: template.p
        .replace('{amount}', amount.toString())
        .replace('{firstName}', firstName || ''),
      boldSubheading: template.boldSubheading
        .replace('{amount}', amount.toString())
        .replace('{firstName}', firstName || ''),
      finalP: template.finalP,
    };
  };

  if (status === 'success') {
    const message = getRandomSuccessMessage();

    return (
      <>
        <style jsx>{`
          @keyframes bounceOnce {
            0%,
            20%,
            53%,
            80%,
            to {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
              transform: translate3d(0, 0, 0);
            }
            40%,
            43% {
              animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
              transform: translate3d(0, -30px, 0);
            }
            70% {
              animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
              transform: translate3d(0, -15px, 0);
            }
            90% {
              transform: translate3d(0, -4px, 0);
            }
          }
          .animate-bounce-once {
            animation: bounceOnce 1s ease-in-out;
          }
        `}</style>
        <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-700 px-4 py-8 flex flex-col">
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            {/* Success Icon and Messages */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full animate-bounce-once mb-6">
              <span className="text-8xl" role="img" aria-label="celebration">
                {message.icon}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {message.h1}
            </h1>

            {message.h2 && (
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {message.h2}
              </h2>
            )}

            <p className="text-gray-700 text-lg mb-8">{message.p}</p>

            <h2
              className="text-l font-semibold text-gray-900 mb-2"
              dangerouslySetInnerHTML={{ __html: message.boldSubheading }}
            />

            <p className="text-sm text-gray-700 leading-relaxed max-w-sm">
              {message.finalP}
            </p>
          </div>

          {/* CTA Buttons at Bottom */}
          <div className="max-w-md mx-auto w-full space-y-3">
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
      </>
    );
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-700 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full animate-bounce">
            <Send className="w-12 h-12 text-black" />
          </div>
          <p className="text-black font-medium">Sending tokens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Form content */}
      <div className="flex-1">
        <div className="mx-auto max-w-sm w-full">
          <div className="bg-white rounded-lg">
            <div className="mx-auto max-w-sm w-full px-6">
              <h1 className="font-bold text-gray-600">
                Send tokens to other members:
              </h1>
            </div>
            <div className="rounded-xl mx-auto pb-10 pt-6 px-6 w-full">
              {/* Member selection dropdown */}
              <div className="mb-6 relative">
                <div className="flex items-center bg-gray-100 rounded-lg py-4 focus-within:ring-2 focus-within:ring-black focus-within:ring-inset w-full">
                  <User size={20} className="text-gray-500 mx-2" />
                  <input
                    type="text"
                    placeholder="Enter the members email..."
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                      if (e.target.value === '') {
                        setSelectedMember(undefined);
                      }
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="flex-1 bg-gray-100 border-none outline-none text-base font-medium text-black placeholder:text-gray-400 focus:ring-0 p-0"
                  />
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 mx-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </div>

                {/* Dropdown results */}
                {isDropdownOpen && searchQuery && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map(member => (
                        <button
                          key={member.membershipId}
                          onClick={() => handleMemberSelect(member)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                        >
                          <div className="font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.email}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500">
                        No members found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Amount input - only show when member is selected */}
              {selectedMember && (
                <>
                  <div className="flex items-center bg-gray-100 rounded-lg py-4 focus-within:ring-2 focus-within:ring-black focus-within:ring-inset w-full">
                    <span className="text-base text-black mx-2">
                      <Coins />
                    </span>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={amount === 0 ? '' : amount}
                      onChange={e => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          const numericAmount = Number(value);
                          if (numericAmount > creditBalance) {
                            setError("Sorry! You don't have enough tokens.");
                          } else {
                            setError('');
                            setAmount(value === '' ? 0 : numericAmount);
                          }
                        }
                      }}
                      className={`w-1/2 max-w-sm bg-gray-100 border-none outline-none text-2xl font-medium ${
                        amount > 0 ? 'text-black' : 'text-gray-400'
                      } placeholder:text-gray-300 focus:ring-0 p-0`}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      You have {creditBalance} Tokens.
                    </p>
                    {amount > 0 && (
                      <p className="text-sm text-green-500">
                        Sending {amount} tokens to {firstName}.
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Optional description field - only show when amount > 0 */}
              {amount > 0 && error === '' && (
                <div className="mt-4">
                  <textarea
                    placeholder="Add a description (optional)..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-gray-100 rounded-lg p-3 border-none outline-none text-base font-medium text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-inset resize-none"
                    rows={3}
                  />
                </div>
              )}

              {/* Error display */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons fixed at bottom */}
      <div>
        <div className="mx-auto max-w-sm w-full">
          {/* Send button - only show when both amount and member are set */}
          {amount > 0 && selectedMember && error === '' && (
            <button
              onClick={handleSend}
              className="w-full bg-forest text-white py-4 px-6 mb-4 rounded-lg font-semibold text-lg hover:bg-forestDark transition-colors flex items-center justify-center gap-2"
            >
              Send <Send size={18} />
            </button>
          )}

          {/* Cancel button - always visible */}
          <Link href={`/members-v2/${userId}`}>
            <button className="w-full text-gray-600 hover:text-gray-800 transition-colors text-center">
              <span className="underline">Back to dashboard</span>
              {selectedMember && <p>(Sorry {firstName}!)</p>}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
