'use client';

import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Wrench, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Báo Cáo Thống Kê & Doanh Thu
          </h1>
          <p className="text-sm text-gray-500">
            Tổng quan hiệu suất vận hành garage, doanh thu dịch vụ và tỷ lệ hài lòng.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Doanh Thu Tháng Này</span>
            <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">128.500.000đ</p>
          <p className="text-xs text-green-600 font-semibold">↑ +18.4% so với tháng trước</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Tổng Đơn Sửa Đã Làm</span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">342 đơn</p>
          <p className="text-xs text-blue-600 font-semibold">Tỷ lệ hoàn thành đúng giờ 98.5%</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Khách Hàng Mới</span>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">86 khách</p>
          <p className="text-xs text-purple-600 font-semibold">45% đến từ đặt lịch hẹn AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Doanh Thu Theo Tuần</h3>
          <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-4 border-b border-gray-100">
            {[
              { day: 'T2', amount: '12M', height: 'h-24' },
              { day: 'T3', amount: '18M', height: 'h-36' },
              { day: 'T4', amount: '15M', height: 'h-28' },
              { day: 'T5', amount: '22M', height: 'h-48' },
              { day: 'T6', amount: '25M', height: 'h-56' },
              { day: 'T7', amount: '30M', height: 'h-60' },
              { day: 'CN', amount: '28M', height: 'h-52' },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition">
                  {bar.amount}
                </span>
                <div className={`w-full bg-blue-600 rounded-t-lg transition-all group-hover:bg-blue-700 ${bar.height}`} />
                <span className="text-xs font-semibold text-gray-600">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Top Dịch Vụ Được Thực Hiện Nhiều Nhất</h3>
          <div className="space-y-3">
            {[
              { name: 'Thay Nhớt & Bảo Dưỡng Động Cơ', count: '142 lần', percent: '42%' },
              { name: 'Vệ Sinh Nồi & Kim Phun FI', count: '98 lần', percent: '28%' },
              { name: 'Gói Bảo Dưỡng Toàn Diện 20 Hạng Mục', count: '54 lần', percent: '16%' },
              { name: 'Thay Bugi Iridium High-Performance', count: '48 lần', percent: '14%' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-900">
                  <span>{item.name}</span>
                  <span className="text-blue-600">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: item.percent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
