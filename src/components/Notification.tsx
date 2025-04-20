import React from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export default function Notification({ type, message, onClose }: NotificationProps) {
  return (
    <div className={`fixed top-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
    }`}>
      {type === 'success' ? (
        <CheckCircle2 className="h-5 w-5" />
      ) : (
        <XCircle className="h-5 w-5" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-500"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
} 