import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed top-24 right-4 z-50 animate-bounce sm:animate-none transition-all duration-300 flex items-center gap-2.5 bg-[#222226] border border-[#f59e0b]/40 text-[#f4f4f5] px-4 py-2.5 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-md">
      <CheckCircle2 className="w-4 h-4 text-[#f59e0b] shrink-0" />
      <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-medium">
        {message}
      </span>
    </div>
  );
};
