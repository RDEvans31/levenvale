import { auth } from '@/lib/auth';
import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the current session
    const session = await auth();

    // Check if user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/update-member-role?email=${session.user.email}&role=co_owner`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Unable to upgrade to co-owner' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User role updated to co-owner successfully',
      user: {
        email: session.user.email,
        role: session.user.role,
      },
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 }
    );
  }
}
