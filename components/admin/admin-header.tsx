'use client';

import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

import { Input } from '../ui/input';
import { NotificationBell } from '../shared/notification-bell';
import { ThemeToggle } from '../shared/theme-toggle';
import { useAuth } from '../../store/auth-context';

export const AdminHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'admin': return 'Admin Garage';
      case 'manager': return 'Quản Lý Garage';
      case 'technician': return 'Kỹ Thuật Viên';
      default: return 'Nhân Viên';
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Global Search Bar */}
      <div className="w-80">
        <Input
          placeholder="Tìm phiếu #ORD, tên khách, biển số..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
          className="bg-slate-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 py-1.5 text-xs"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Branch Live Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-full text-xs font-semibold text-green-700 dark:text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />
          <span>Garage CN1: Đang hoạt động (4/5 thợ)</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Bell */}
        <NotificationBell />

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:flex flex-col">

            <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
              {currentUser?.name || 'Đỗ Hoàng Admin'}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
              {getRoleBadge(currentUser?.role)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
