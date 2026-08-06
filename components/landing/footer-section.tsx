'use client';

import React, { useState } from 'react';
import { Wrench, Phone, Mail, MapPin, Send, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Columns Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                AutoFix<span className="text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống garage sửa chữa và bảo dưỡng xe máy, ô tô chuyên nghiệp tích hợp công nghệ chẩn đoán AI hàng đầu.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>123 Đường Ba Tháng Hai, P.11, Q.10, TP.HCM</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dịch Vụ Sửa Chữa</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Thay nhớt & Bảo dưỡng nồi
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Vệ sinh kim phun điện tử FI
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Sửa chữa phanh & đĩa phanh
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Chẩn đoán lỗi điện tử AI
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Cứu hộ xe lưu động 24/7
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy & Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#tracking-timeline" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Tra cứu tiến độ sửa chữa
                </a>
              </li>
              <li>
                <a href="#ai-diagnostic" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Công cụ AI Chẩn đoán
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Chính sách bảo hành 12 tháng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Quy trình tiếp nhận xe
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-400 hover:text-gray-100 transition">
                  Câu hỏi thường gặp (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Email Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Đăng Ký Khuyến Mãi</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nhập email để nhận mã giảm giá 15% cho lần bảo dưỡng tiếp theo và các mẹo chăm sóc xe hàng tuần.
            </p>

            {subscribed ? (
              <div className="p-3 bg-green-500/20 border border-green-500/40 rounded-xl text-xs text-green-300 font-medium">
                ✓ Đăng ký nhận tin khuyến mãi thành công!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <Input
                  type="email"
                  required
                  placeholder="Email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="secondary" size="sm" className="w-full" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Đăng ký ngay
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AutoFixAI Garage. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline text-gray-500 hover:text-gray-900">Điều khoản sử dụng</a>
            <a href="#" className="hover:underline text-gray-500 hover:text-gray-900">Bảo mật thông tin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
