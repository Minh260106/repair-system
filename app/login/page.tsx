'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Wrench, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/store/auth-context';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  const { login } = useAuth();
  const [email, setEmail] = useState('admin@autofixai.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const demoAccounts = [
    { role: 'admin', label: 'Quản trị viên (Admin)', email: 'admin@autofixai.com', color: 'bg-red-50 text-red-700 border-red-200' },
    { role: 'manager', label: 'Quản lý Garage', email: 'manager@autofixai.com', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { role: 'technician', label: 'Kỹ thuật viên', email: 'tech@autofixai.com', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { role: 'customer', label: 'Khách hàng', email: 'khach@gmail.com', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('123456');
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      if (redirectPath) {
        router.push(redirectPath);
      } else if (user.role === 'customer') {
        router.push('/portal');
      } else {
        router.push('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
              AutoFix<span className="text-blue-600">AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white pt-2">Đăng Nhập Hệ Thống</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Dành cho Khách hàng, Quản lý & Kỹ thuật viên Garage</p>
        </div>

        {/* Demo Quick Accounts Selector */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Chọn nhanh tài khoản Demo để test:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((demo) => (
              <button
                key={demo.email}
                type="button"
                onClick={() => fillDemo(demo.email)}
                className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex flex-col justify-between hover:scale-[1.02] ${demo.color} ${
                  email === demo.email ? 'ring-2 ring-blue-600 font-bold' : ''
                }`}
              >
                <span className="font-bold leading-tight">{demo.label}</span>
                <span className="text-[10px] opacity-80 font-mono mt-0.5 truncate">{demo.email}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email đăng nhập"
            type="email"
            placeholder="nhap.email@autofixai.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
            required
          />

          <Input
            label="Mật khẩu (demo: 123456)"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4 text-gray-400" />}
            required
          />

          <Button type="submit" variant="primary" isLoading={isLoading} className="w-full text-sm py-3" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Đăng nhập ngay
          </Button>
        </form>

        {/* Footer link */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-slate-800">
          Chưa có tài khoản khách hàng?{' '}
          <Link href="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Đăng ký tài khoản mới
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xs">Đang tải trang đăng nhập...</div>}>
      <LoginContent />
    </Suspense>
  );
}
