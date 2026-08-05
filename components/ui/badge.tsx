'use client';

import React from 'react';

export type BadgeVariant = 'warning' | 'info' | 'success' | 'danger' | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  statusText?: 'Đang kiểm tra' | 'Đang sửa' | 'Chờ giao' | 'Đã hoàn thành' | 'Đã hủy' | string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  statusText,
  children,
  className = '',
  ...props
}) => {
  // Determine variant automatically if statusText matches standard vehicle status
  let computedVariant: BadgeVariant = variant || 'neutral';
  
  if (!variant && statusText) {
    if (statusText === 'Đang kiểm tra') computedVariant = 'warning';
    else if (statusText === 'Đang sửa') computedVariant = 'info';
    else if (statusText === 'Chờ giao' || statusText === 'Đã hoàn thành') computedVariant = 'success';
    else if (statusText === 'Đã hủy') computedVariant = 'danger';
  }

  const variantStyles: Record<BadgeVariant, string> = {
    warning: 'text-yellow-600 bg-yellow-50 border border-yellow-200/60',
    info: 'text-blue-600 bg-blue-50 border border-blue-200/60',
    success: 'text-green-600 bg-green-50 border border-green-200/60',
    danger: 'text-red-600 bg-red-50 border border-red-200/60',
    neutral: 'text-gray-600 bg-gray-100 border border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors ${variantStyles[computedVariant]} ${className}`}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />
      {children || statusText}
    </span>
  );
};
