import LoginPageClientComponent from '@/components/login/LoginPage';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryParams = await searchParams;
  const message = queryParams.message as string;
  const session = await auth();
  const callbackUrl = '/authorized';

  if (session) {
    redirect(callbackUrl);
  } else {
    return <LoginPageClientComponent message={message} />;
  }
}
