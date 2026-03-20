import CompleteProfileClientPage from '@/components/onboarding/complete-profile/CompleteProfileClientPage';
import { auth } from '@/lib/auth';
import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';
import { redirect } from 'next/navigation';

export default async function CompleteProfile() {
  const session = await auth();
  if (!session?.user.email || !session?.user.id) {
    redirect('/login');
  }

  if (session.user.name) {
    redirect('/members-v2');
  }

  async function updateName(name: string): Promise<Result<string>> {
    'use server';
    try {
      if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
        return { success: false, error: 'API configuration missing' };
      }

      const response = await fetch(
        `${LF_API_URL}/${ORG_ID}/${session?.user.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${LF_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email: session?.user.email as string,
          }),
        }
      );

      if (response.status === 400) {
        return {
          success: false,
          error: 'Bad Request: name and email are required',
        };
      }
      if (response.status === 401) {
        return { success: false, error: 'Unauthorized' };
      }
      if (response.status === 404) {
        return { success: false, error: 'User not found' };
      }
      if (!response.ok) {
        return { success: false, error: 'Failed to update user' };
      }

      const data = await response.json();
      return {
        success: true,
        value: data.user.name as string,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      };
    }
  }

  return <CompleteProfileClientPage updateName={updateName} />;
}
