'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Wrench, Calendar, Phone, Sparkles, User, MapPin, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../shared/theme-toggle';
import { useAuth } from '@/store/auth-context';

export const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { currentUser } = useAuth();

  const navLinks = [
    { label: 'Trang Chủ', href: '/' },
    { label: 'Chi Nhánh', href: '/branches' },
    { label: 'Hỏi Đáp FAQ', href: '/faq' },
    { label: 'AI Chẩn Đoán', href: '/#ai-diagnostic' },
    { label: 'Theo Dõi Tiến Độ', href: '/tracking' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 group-hover:bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm transition">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white leading-none">
              AutoFix<span className="text-blue-600">AI</span>
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
              Garage Sửa Chữa Thông Minh
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {currentUser ? (
            <Link href={currentUser.role === 'customer' ? '/portal' : '/admin'}>
              <Button variant="outline" size="sm" leftIcon={<User className="w-4 h-4" />}>
                {currentUser.name.split(' ')[0]} ({currentUser.role === 'customer' ? 'Portal' : 'Admin'})
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" leftIcon={<User className="w-4 h-4" />}>
                Đăng nhập
              </Button>
            </Link>
          )}

          <a href="/booking">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Đặt lịch gấp
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-gray-700 dark:text-slate-300 hover:text-blue-600 focus:outline-none"
          aria-label="Toggle Mobile Menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop & Drawer Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col justify-between p-6 transform transition-transform animate-slideInLeft">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">AutoFixAI</span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-sm font-semibold text-gray-700 dark:text-slate-300 hover:text-blue-600 py-1.5 border-b border-gray-50 dark:border-slate-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Giao diện:</span>
                <ThemeToggle />
              </div>

              <Link href={currentUser ? (currentUser.role === 'customer' ? '/portal' : '/admin') : '/login'} onClick={() => setIsMobileOpen(false)}>
                <Button variant="outline" className="w-full" leftIcon={<User className="w-4 h-4" />}>
                  {currentUser ? `Tài khoản (${currentUser.name})` : 'Đăng nhập'}
                </Button>
              </Link>
              <a href="/booking" onClick={() => setIsMobileOpen(false)}>
                <Button variant="primary" className="w-full" leftIcon={<Calendar className="w-4 h-4" />}>
                  Đặt lịch ngay
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
