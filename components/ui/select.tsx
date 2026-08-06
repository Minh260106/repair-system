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
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const borderState = error
      ? 'border-error text-foreground focus:ring-2 focus:ring-error focus:border-error'
      : 'border-border focus:ring-2 focus:ring-primary focus:border-primary';

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full rounded-xl bg-background border px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-200 cursor-pointer ${borderState} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="min-h-[16px]">
          {error && <p className="text-xs font-medium text-error animate-fade-in">{error}</p>}
          {!error && helperText && <p className="text-xs text-muted">{helperText}</p>}
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

