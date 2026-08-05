'use client';

import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const borderState = error
      ? 'border-red-500 text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full rounded-xl bg-white border px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 resize-y min-h-[100px] ${borderState} ${className}`}
          {...props}
        />
        {error && <p className="text-xs font-medium text-red-600 animate-fadeIn">{error}</p>}
        {!error && helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
