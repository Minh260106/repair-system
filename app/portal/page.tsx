'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wrench, Bike, CalendarDays, ArrowRight, Eye, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SmartReminder } from '@/components/ai/smart-reminder';
import { useAuth } from '@/store/auth-context';
import ApiClient from '@/lib/api/client';
import { OrderItem, Vehicle, Appointment } from '@/types';

export default function PortalDashboard() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const fetchData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [userOrders, userVehicles] = await Promise.all([
        ApiClient.getMyOrders(currentUser.id),
        ApiClient.getMyVehicles(currentUser.id),
      ]);
      setOrders(userOrders);
      setVehicles(userVehicles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const activeOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled');
  const userVehicle = vehicles[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
              Khách hàng VIP
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Xin chào, {currentUser?.name || 'Quý khách'}! 👋
          </h1>
          <p className="text-xs text-blue-100">
            Theo dõi nấc sửa chữa realtime, đặt lịch bảo dưỡng & quản lý xe dễ dàng.
          </p>
        </div>
        <Link href="/portal/bookings">
          <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Đặt lịch sửa mới
          </Button>
        </Link>
      </div>

      {/* AI Smart Reminder connected to current user's vehicle */}
      <SmartReminder
        vehicleName={userVehicle ? `${userVehicle.brand} ${userVehicle.model} (${userVehicle.licensePlate})` : 'Honda SH 150i (59-P1 888.88)'}
        odometer={userVehicle ? `${userVehicle.odometer.toLocaleString()} km` : '12.500 km'}
        recommendedService="Bảo dưỡng bộ nồi & thay nhớt Motul 300V"
        dueDate="tuần sau (ngày 12/08/2026)"
      />

      {/* Grid Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): Active Repair Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-600" />
              <span>Đơn Sửa Chữa Đang Xử Lý</span>
            </h2>
            <Link href="/portal/bookings" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Xem tất cả đơn
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400">Đang tải dữ liệu đơn hàng...</div>
          ) : activeOrders.length > 0 ? (
            <div className="space-y-4">
              {activeOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-4 hover:border-blue-500/50 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="font-black text-blue-600 text-sm">{ord.orderNumber}</span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white mt-0.5">{ord.vehicleModel}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-bold uppercase">
                        {ord.status === 'inspecting' ? 'Đang kiểm tra' : ord.status === 'repairing' ? 'Đang sửa chữa' : 'Chờ giao xe'}
                      </span>
                      <Link href={`/portal/orders/${ord.id}`}>
                        <Button variant="outline" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                          Theo dõi
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium">Triệu chứng ban đầu:</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{ord.symptoms}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Thợ phụ trách:</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{ord.assignedMechanicName || 'Đang phân công'}</p>
                    </div>
                  </div>

                  {/* Quick Timeline Progress Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                      <span>Tiếp nhận</span>
                      <span>Đang kiểm tra</span>
                      <span>Đang sửa</span>
                      <span>Sẵn sàng</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                        style={{
                          width:
                            ord.status === 'received' ? '25%' :
                            ord.status === 'inspecting' ? '50%' :
                            ord.status === 'repairing' ? '75%' : '100%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Không có đơn đang sửa chữa</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Tất cả phương tiện của bạn đang ở trạng thái vận hành tốt. Bạn có thể đặt lịch kiểm tra định kỳ bất cứ lúc nào.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: User Vehicles List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Bike className="w-5 h-5 text-blue-600" />
              <span>Phương Tiện Của Tôi</span>
            </h2>
            <Link href="/portal/vehicles" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
              + Thêm xe
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-4">
            {vehicles.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">Chưa có thông tin xe</div>
            ) : (
              vehicles.map((v) => (
                <div key={v.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{v.brand} {v.model}</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-[10px] font-bold">
                      {v.licensePlate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Số km hiện tại: {v.odometer.toLocaleString()} km</span>
                    <span>Bảo dưỡng: {v.lastServiceDate}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
