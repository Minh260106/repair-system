'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ClipboardList,
  CalendarDays,
  Wrench,
  TrendingUp,
  Plus,
  ArrowRight,
  Sparkles,
  UserCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockOrders, mockMechanics, mockAppointments } from '../../lib/mock/data';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Doanh Thu Hôm Nay',
      value: '4.850.000đ',
      change: '+15.2% so với hôm qua',
      icon: DollarSign,
      color: 'bg-green-50 text-green-600 border-green-200',
    },
    {
      title: 'Phiếu Sửa Đang Làm',
      value: '3 phiếu',
      change: '2 phiếu chờ bàn giao',
      icon: ClipboardList,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      title: 'Lịch Hẹn Cần Duyệt',
      value: '2 lịch hẹn',
      change: '1 hẹn gấp vào sáng mai',
      icon: CalendarDays,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
    },
    {
      title: 'Kỹ Thuật Viên Rảnh',
      value: '2 / 4 thợ',
      change: '2 thợ đang nâng xe',
      icon: Wrench,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Tổng Quan Quản Lý Garage
          </h1>
          <p className="text-sm text-gray-500">
            Cập nhật tình hình kinh doanh, tiến độ sửa xe & lịch hẹn khách hàng realtime.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/repair-orders">
            <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
              Tạo phiếu sửa mới
            </Button>
          </Link>
        </div>
      </div>

      {/* AI Smart Insight Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white border border-purple-500/30 shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-400/30 shrink-0">
            <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-full">
                AI Garage Insight
              </span>
              <span className="text-xs text-slate-300">Gợi ý tối ưu vận hành</span>
            </div>
            <p className="text-sm font-semibold text-white mt-1">
              Khung giờ 14:00 - 16:00 hôm nay có 3 xe SH 150i cùng hẹn vệ sinh kim phun FI. Đề xuất chuẩn bị trước kit dung dịch rửa kim phun.
            </p>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, idx) => {
          const IconComp = st.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">{st.title}</span>
                <div className={`p-2.5 rounded-xl border ${st.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">{st.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{st.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Repair Orders & Mechanics Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Repair Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Phiếu Sửa Chữa Đang Xử Lý</h3>
              <p className="text-xs text-gray-500">Các xe đang nằm trên nâng hoặc chờ kiểm định</p>
            </div>
            <Link
              href="/admin/repair-orders"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-2">Mã Phiếu</th>
                  <th className="py-3 px-2">Khách Hàng</th>
                  <th className="py-3 px-2">Loại Xe / Biển Số</th>
                  <th className="py-3 px-2">Trạng Thái</th>
                  <th className="py-3 px-2">Thợ Phụ Trách</th>
                  <th className="py-3 px-2 text-right">Tổng Tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-2 font-bold text-blue-600">{ord.orderNumber}</td>
                    <td className="py-3.5 px-2">
                      <div className="font-semibold text-gray-900">{ord.customerName}</div>
                      <div className="text-[10px] text-gray-400">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-2">
                      <div className="font-semibold text-gray-800">{ord.vehicleModel}</div>
                      <div className="text-[10px] font-mono text-gray-500">{ord.vehiclePlate}</div>
                    </td>
                    <td className="py-3.5 px-2">
                      <Badge statusText={
                        ord.status === 'inspecting' ? 'Đang kiểm tra' :
                        ord.status === 'repairing' ? 'Đang sửa' : 'Chờ giao'
                      } />
                    </td>
                    <td className="py-3.5 px-2 font-medium text-gray-700">
                      {ord.assignedMechanicName || 'Chưa gán'}
                    </td>
                    <td className="py-3.5 px-2 text-right font-bold text-gray-900">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ord.totalPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Mechanics Status & Upcoming Appointments */}
        <div className="space-y-6">
          {/* Mechanics Workload */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Kỹ Thuật Viên (4)</h3>
              <Link href="/admin/mechanics" className="text-xs text-blue-600 hover:underline">
                Quản lý
              </Link>
            </div>

            <div className="space-y-3">
              {mockMechanics.map((mech) => (
                <div key={mech.id} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={mech.avatar}
                      alt={mech.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{mech.name}</p>
                      <p className="text-[10px] text-gray-500">{mech.skillLevel}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                      mech.status === 'rảnh'
                        ? 'bg-green-100 text-green-700'
                        : mech.status === 'đang làm'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {mech.status === 'rảnh' ? '✓ Đang rảnh' : mech.status === 'đang làm' ? '⚙️ Đang làm' : 'Nghỉ'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Lịch Hẹn Mới</h3>
              <Link href="/admin/appointments" className="text-xs text-blue-600 hover:underline">
                Xem tất cả
              </Link>
            </div>

            <div className="space-y-3">
              {mockAppointments.slice(0, 2).map((apt) => (
                <div key={apt.id} className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-gray-900">
                    <span>{apt.customerName}</span>
                    <span className="text-blue-600">{apt.scheduledTime} ({apt.scheduledDate})</span>
                  </div>
                  <p className="text-xs text-gray-600">{apt.vehicleModel}</p>
                  <p className="text-[11px] text-gray-500 italic truncate">"{apt.symptoms}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
