import { MailCheck } from 'lucide-react';

export default function CheckEmailPage() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="overflow-hidden w-full sm:w-1/2 max-w-[1200px] flex">
        <div className="w-full p-8 sm:p-12 flex flex-col items-center justify-center text-center">
          <div className="max-w-md mx-auto flex flex-col items-center justify-center text-center">
            <div className="flex mb-16 items-center justify-center w-full">
              <MailCheck color="#000000" size={200} className="mx-auto" />
            </div>
            <h1 className="text-3xl font-bold mb-8 text-center">
              Check your email
            </h1>
            <p className="text-black mb-8 text-center">
              Your login link is on its way!
            </p>
            <p className="text-black mb-8 text-center">
              If you don&apos;t see it after 10 seconds, check your spam folder
              or try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
