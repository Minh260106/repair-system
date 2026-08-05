'use client';

import React, { useState } from 'react';
import { Plus, Wrench, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockMechanics } from '@/lib/mock/data';
import { Mechanic } from '@/types';

export default function MechanicsPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>(mockMechanics);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Kỹ Thuật Viên / Thợ Sửa Xe
          </h1>
          <p className="text-sm text-gray-500">
            Phân ca làm việc, xem xe đang sửa & số đơn hoàn thành trong tháng.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Thêm kỹ thuật viên
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mechanics.map((mech: Mechanic) => (
          <div
            key={mech.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3 text-center">
              <img
                src={mech.avatar}
                alt={mech.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md mx-auto"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{mech.name}</h3>
                <span className="px-2.5 py-0.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
                  {mech.skillLevel}
                </span>
              </div>

              <p className="text-xs text-gray-500 flex items-center justify-center gap-1 pt-1">
                <Phone className="w-3.5 h-3.5" />
                <span>{mech.phone}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Trạng thái:</span>
                <span
                  className={`font-bold ${
                    mech.status === 'rảnh'
                      ? 'text-green-600'
                      : mech.status === 'đang làm'
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  {mech.status === 'rảnh' ? '✓ Đang rảnh' : mech.status === 'đang làm' ? '⚙️ Đang nâng xe' : 'Nghỉ phép'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Đơn tháng này:</span>
                <span className="font-bold text-gray-900">{mech.completedOrdersCount} đơn</span>
              </div>
              {mech.currentOrderId && (
                <div className="p-2 bg-blue-50 text-blue-800 rounded-lg font-mono text-[11px] font-bold text-center">
                  Đang làm: {mech.currentOrderId}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
