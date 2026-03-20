import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Blurred Content */}
      <div className="blur-sm">
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b">
          <ArrowLeft className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Cart</h1>
        </div>
      </div>

      {/* Loading Spinner */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    </div>
  );
}
