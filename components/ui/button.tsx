'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles according to design system tokens
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 select-none cursor-pointer';

    // Variant styles
    const variantStyles = {
      primary:
        'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow-md border border-transparent',
      secondary:
        'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow-sm hover:shadow-md border border-transparent',
      outline:
        'bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 shadow-sm',
      ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 border border-transparent',
      danger:
        'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm hover:shadow-md border border-transparent',
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    };

    const disabledStyles = disabled || isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
