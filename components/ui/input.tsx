'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  isPhone?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, isPhone, className = '', id, type, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const borderState = error
      ? 'border-rose-500 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500'
      : 'border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-500';

    const isPhoneInput =
      isPhone ||
      type === 'tel' ||
      (label && (label.toLowerCase().includes('điện thoại') || label.toLowerCase().includes('sđt')));

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {/* Phone Country Code Badge Prefix */}
          {isPhoneInput ? (
            <div className="absolute left-3.5 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 pointer-events-none select-none border-r border-slate-200 dark:border-slate-700 pr-3 z-10">
              <span className="text-sm leading-none">🇻🇳</span>
              <span className="font-mono text-[13px] text-blue-600 dark:text-blue-400 font-extrabold">+84</span>
            </div>
          ) : leftIcon ? (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            type={type}
            className={`w-full rounded-2xl bg-white dark:bg-slate-900 border px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all duration-200 shadow-xs ${
              isPhoneInput ? 'pl-[92px] font-mono tracking-widest text-sm text-blue-700 dark:text-blue-300' : leftIcon ? 'pl-11' : ''
            } ${borderState} ${className}`}
            {...props}
          />
        </div>

        <div className="min-h-[16px]">
          {error && <p className="text-[11px] font-bold text-rose-500 animate-fadeIn">{error}</p>}
          {!error && helperText && <p className="text-[11px] text-slate-400">{helperText}</p>}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

