'use client';

import React, { useState } from 'react';
import { CalendarDays, Clock, Check, X, Phone, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockAppointments } from '@/lib/mock/data';
import { Appointment } from '@/types';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const handleStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Lịch Hẹn Đặt Trước
          </h1>
          <p className="text-sm text-gray-500">
            Duyệt lịch hẹn từ Landing Page, xếp thời gian cho khách và giảm 10% công thợ.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className={`bg-white rounded-2xl border p-6 shadow-sm space-y-4 ${
              apt.status === 'confirmed'
                ? 'border-green-200 bg-green-50/20'
                : apt.status === 'cancelled'
                ? 'border-red-200 bg-red-50/20'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{apt.customerName}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{apt.phone}</span>
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  apt.status === 'confirmed'
                    ? 'bg-green-100 text-green-700'
                    : apt.status === 'cancelled'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {apt.status === 'confirmed'
                  ? '✓ Đã xác nhận'
                  : apt.status === 'cancelled'
                  ? '✕ Đã hủy'
                  : '⏳ Đang chờ duyệt'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Dòng xe:</span>
                <span className="font-bold text-gray-900">{apt.vehicleModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Lịch hẹn đến:</span>
                <span className="font-bold text-blue-600">
                  {apt.scheduledTime} - ngày {apt.scheduledDate}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-gray-500">Vấn đề / Triệu chứng:</span>
                <p className="p-2.5 bg-gray-50 rounded-xl text-gray-800 font-medium italic mt-1">
                  "{apt.symptoms}"
                </p>
              </div>
            </div>

            {apt.status === 'pending' && (
              <div className="pt-2 flex items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  leftIcon={<Check className="w-4 h-4" />}
                  onClick={() => handleStatus(apt.id, 'confirmed')}
                >
                  Xác nhận lịch
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  leftIcon={<X className="w-4 h-4" />}
                  onClick={() => handleStatus(apt.id, 'cancelled')}
                >
                  Từ chối
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
