'use client';

import React, { useState } from 'react';
import { Search, Bell, Sparkles, MapPin, ChevronDown, ShieldCheck } from 'lucide-react';
import { Input } from '../ui/input';

export const AdminHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Global Search Bar */}
      <div className="w-80">
        <Input
          placeholder="Tìm phiếu #ORD, tên khách, biển số..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
          className="bg-slate-50 border-gray-200 py-1.5 text-xs"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Branch Live Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-semibold text-green-700">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />
          <span>Garage CN1: Đang hoạt động (4/5 thợ)</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-slate-100 rounded-xl transition cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Manager Avatar"
            className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-gray-900 leading-tight">Trần Văn Quản Lý</span>
            <span className="text-[10px] text-gray-500 font-medium">Quản lý Garage Chi Nhánh 1</span>
          </div>
        </div>
      </div>
    </header>
  );
};
