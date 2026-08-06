'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  LogOut,
  Package
} from 'lucide-react';
import { useAuth } from '../../store/auth-context';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const allNavItems = [
    { label: 'Tổng Quan', href: '/admin', icon: LayoutDashboard, roles: ['admin', 'manager', 'technician'] },
    { label: 'Phiếu Sửa Chữa', href: '/admin/repair-orders', icon: ClipboardList, badge: '3', roles: ['admin', 'manager', 'technician'] },
    { label: 'Khách Hàng', href: '/admin/customers', icon: Users, roles: ['admin', 'manager'] },
    { label: 'Quản Lý Xe', href: '/admin/vehicles', icon: Bike, roles: ['admin', 'manager', 'technician'] },
    { label: 'Lịch Hẹn', href: '/admin/appointments', icon: CalendarDays, badge: '2', roles: ['admin', 'manager', 'technician'] },
    { label: 'Kho Phụ Tùng', href: '/admin/inventory', icon: Package, badge: 'Low', roles: ['admin', 'manager', 'technician'] },
    { label: 'Kỹ Thuật Viên', href: '/admin/mechanics', icon: Wrench, roles: ['admin', 'manager'] },
    { label: 'Dịch Vụ & Bảng Giá', href: '/admin/services', icon: BadgePercent, roles: ['admin', 'manager'] },
    { label: 'Hóa Đơn', href: '/admin/invoices', icon: Receipt, roles: ['admin', 'manager', 'technician'] },
    { label: 'Báo Cáo Thống Kê', href: '/admin/reports', icon: BarChart3, roles: ['admin', 'manager'] },
  ];

  const userRole = currentUser?.role || 'admin';
  const navItems = allNavItems.filter((item) => item.roles.includes(userRole));

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen select-none">
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Brand Header */}
        <Link href="/admin" className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-gray-900 dark:text-white leading-none">
              AutoFix<span className="text-blue-600">Admin</span>
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold tracking-wider uppercase mt-0.5">
              Hệ thống Quản lý Garage
            </span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            Menu Quản Trị ({userRole})
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
                    : 'text-gray-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800'
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
      <div className="p-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Xem Trang Landing</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất ({currentUser?.name || 'Tài khoản'})</span>
        </button>
      </div>
    </aside>
  );
};
