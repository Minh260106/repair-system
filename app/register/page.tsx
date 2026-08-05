'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wrench, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/login');
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
          <h2 className="text-xl font-bold text-gray-900 pt-2">Tạo Tài Khoản Quản Lý</h2>
          <p className="text-xs text-gray-500">Đăng ký tài khoản hệ thống quản lý garage sửa chữa</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Họ và tên *"
            placeholder="Nguyễn Văn Quản Lý"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4 text-gray-400" />}
          />

          <Input
            label="Số điện thoại *"
            type="tel"
            placeholder="0988 123 456"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4 text-gray-400" />}
          />

          <Input
            label="Email đăng nhập *"
            type="email"
            placeholder="manager@autofixai.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
          />

          <Input
            label="Mật khẩu *"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4 text-gray-400" />}
          />

          <Button type="submit" variant="primary" isLoading={isLoading} className="w-full text-base py-3">
            Đăng ký tài khoản
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Đã có tài khoản?{' '}
          <Link href="/login" className="font-bold text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
