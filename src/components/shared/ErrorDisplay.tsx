import React from 'react';

interface ErrorDisplayProps {
  errorMsg: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMsg }) => (
  <div className="bg-gray-50">
    <div className="p-4 flex justify-center items-center">
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
        {errorMsg}
      </div>
    </div>
  </div>
);

export default ErrorDisplay;
