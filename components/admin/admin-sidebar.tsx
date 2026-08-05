'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Bike,
  CalendarDays,
  Wrench,
  BadgePercent,
  Receipt,
  BarChart3,
  ExternalLink,
  Sparkles,
  LogOut
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Tổng Quan', href: '/admin', icon: LayoutDashboard },
    { label: 'Phiếu Sửa Chữa', href: '/admin/repair-orders', icon: ClipboardList, badge: '3' },
    { label: 'Khách Hàng', href: '/admin/customers', icon: Users },
    { label: 'Quản Lý Xe', href: '/admin/vehicles', icon: Bike },
    { label: 'Lịch Hẹn', href: '/admin/appointments', icon: CalendarDays, badge: '2' },
    { label: 'Kỹ Thuật Viên', href: '/admin/mechanics', icon: Wrench },
    { label: 'Dịch Vụ & Bảng Giá', href: '/admin/services', icon: BadgePercent },
    { label: 'Hóa Đơn', href: '/admin/invoices', icon: Receipt },
    { label: 'Báo Cáo Thống Kê', href: '/admin/reports', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen select-none">
      <div className="p-4 space-y-6">
        {/* Brand Header */}
        <Link href="/admin" className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-gray-900 leading-none">
              AutoFix<span className="text-blue-600">Admin</span>
            </span>
            <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-0.5">
              Hệ thống Quản lý Garage
            </span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            Menu Quản Trị
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'text-gray-600 hover:bg-slate-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer link to public website & logout */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-slate-100 transition"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Xem Trang Landing</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
        </Link>

        <Link
          href="/login"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất hệ thống</span>
        </Link>
      </div>
    </aside>
  );
};
