'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    // States:
    // Default: border-gray-300
    // Focus: ring-2 ring-blue-500 border-blue-500
    // Error: border-red-500 text-red-900 ring-red-500
    const borderState = error
      ? 'border-red-500 text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-gray-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-xl bg-white border px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 ${
              leftIcon ? 'pl-10' : ''
            } ${borderState} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs font-medium text-red-600 animate-fadeIn">{error}</p>}
        {!error && helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
