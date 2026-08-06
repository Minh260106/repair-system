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
      ? 'border-error text-foreground focus:ring-2 focus:ring-error focus:border-error'
      : 'border-border focus:ring-2 focus:ring-primary focus:border-primary';

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full rounded-xl bg-background border px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-all duration-200 resize-y min-h-[100px] ${borderState} ${className}`}
          {...props}
        />
        <div className="min-h-[16px]">
          {error && <p className="text-xs font-medium text-error animate-fade-in">{error}</p>}
          {!error && helperText && <p className="text-xs text-muted">{helperText}</p>}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

