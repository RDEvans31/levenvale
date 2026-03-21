import { refreshUserBalance } from '@/actions/members/balance';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const membershipId = (await params).id;

    if (!membershipId) {
      return Response.json(
        { success: false, error: 'Membership ID is required' },
        { status: 400 }
      );
    }

    await refreshUserBalance(membershipId);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error revalidating user balance:', error);
    return Response.json(
      { success: false, error: 'Failed to revalidate balance' },
      { status: 500 }
    );
  }
}
