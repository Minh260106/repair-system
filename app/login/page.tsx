'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wrench, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@autofixai.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-gray-900">
              AutoFix<span className="text-blue-600">AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-gray-900 pt-2">Đăng Nhập Quản Trị Hệ Thống</h2>
          <p className="text-xs text-gray-500">Đăng nhập tài khoản Quản lý Garage hoặc Kỹ thuật viên</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email đăng nhập"
            type="email"
            placeholder="admin@autofixai.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4 text-gray-400" />}
          />

          <Button type="submit" variant="primary" isLoading={isLoading} className="w-full text-base py-3">
            Đăng nhập Admin
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-bold text-blue-600 hover:underline">
            Đăng ký tài khoản mới
          </Link>
        </div>
      </div>
    </div>
  );
}
