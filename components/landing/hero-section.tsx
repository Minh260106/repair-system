'use client';

import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Clock, Award, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

export const HeroSection: React.FC = () => {
  const stats = [
    { value: '15.000+', label: 'Lượt sửa thành công' },
    { value: '99.2%', label: 'Khách hàng hài lòng' },
    { value: '15+', label: 'Kỹ thuật viên chuyên nghiệp' },
    { value: '30 phút', label: 'Xử lý lấy ngay' },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Headline & Content */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Chẩn đoán lỗi thông minh bằng AI ✦ Tiết kiệm 30% chi phí</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Garage Chuyên Sửa Chữa & Bảo Dưỡng Xe <br className="hidden lg:block" />
              <span className="text-blue-600">Uy Tín Với AI Chẩn Đoán</span>
            </h1>

            <p className="text-base text-gray-600 leading-relaxed max-w-xl">
              Dịch vụ thay nhớt, bảo dưỡng bộ nồi, sửa chữa phanh & động cơ công nghệ cao. Theo dõi tiến độ sửa chữa Realtime, cam kết linh kiện chính hãng 100%.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a href="#quick-booking" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<Calendar className="w-5 h-5 ml-1" />}
                  className="w-full sm:w-auto shadow-blue-600/20"
                >
                  Đặt lịch ngay
                </Button>
              </a>
              <a href="#services" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Tìm hiểu thêm
                </Button>
              </a>
            </div>

            {/* Micro assurances */}
            <div className="pt-6 border-t border-gray-200 flex flex-wrap gap-6 text-xs font-medium text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Xem thợ làm trực tiếp
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Bảo hành 12 tháng
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Đặt trước giảm 10%
              </span>
            </div>
          </div>

          {/* Right Column: High Quality Garage 3D Graphic & Counter */}
          <div className="space-y-6">
            {/* Garage 3D Visual Mockup Card */}
            <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 shadow-2xl border border-slate-800 text-white overflow-hidden group">
              {/* Animated ambient light glow */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500 pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">AutoFix Realtime Diagnostic System</span>
                </div>
                <span className="px-2.5 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full border border-green-500/30">
                  LIVE GARAGE
                </span>
              </div>

              {/* Graphic Elements */}
              <div className="space-y-4 my-4">
                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Phương tiện tiếp nhận</span>
                    <span className="font-bold text-white">Honda SH 150i ABS</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Trạng thái kiểm tra</span>
                    <span className="text-blue-400 font-semibold">Đang bảo dưỡng nồi & thay nhớt</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-3/4 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="p-3.5 bg-purple-950/40 border border-purple-500/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-medium text-purple-200">Gói AI đề xuất: Vệ sinh kim phun FI</span>
                  </div>
                  <span className="text-xs font-bold text-green-400">350.000đ</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-3">
                <span>Kỹ thuật viên: Nguyễn Văn Nam</span>
                <span className="text-slate-300 font-medium">Hoàn thành: ~15 phút nữa</span>
              </div>
            </div>

            {/* Counter (Statistics): Flexbox bọc trong thẻ nền trắng có shadow nhẹ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((st, idx) => (
                <div key={idx} className="text-center space-y-1">
                  <p className="text-2xl lg:text-3xl font-extrabold text-blue-600 tracking-tight">
                    {st.value}
                  </p>
                  <p className="text-xs font-medium text-gray-500">{st.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
