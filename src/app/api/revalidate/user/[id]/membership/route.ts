import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = (await params).id;

    if (!userId) {
      return Response.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    revalidateTag(`membershipId-${userId}`);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error revalidating membership:', error);
    return Response.json(
      { success: false, error: 'Failed to revalidate membership' },
      { status: 500 }
    );
  }
}
