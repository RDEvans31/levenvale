import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner />
        <p className="text-gray-600 font-medium">Processing subscription...</p>
      </div>
    </div>
  );
}
