'use client';

import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const borderState = error
      ? 'border-red-500 text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full rounded-xl bg-white border px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 cursor-pointer ${borderState} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
