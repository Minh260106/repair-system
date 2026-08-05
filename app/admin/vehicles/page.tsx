'use client';

import React, { useState } from 'react';
import { Plus, Search, Bike, Calendar, Gauge, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockVehicles } from '@/lib/mock/data';
import { Vehicle } from '@/types';

export default function VehiclesPage() {
  const [search, setSearch] = useState('');

  const filtered = mockVehicles.filter(
    (v: Vehicle) =>
      v.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Phương Tiện (Xe Máy / Mô Tô)
          </h1>
          <p className="text-sm text-gray-500">
            Hồ sơ phương tiện, biển số, chỉ số Odometer (km) và lịch bảo dưỡng định kỳ.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Thêm phương tiện mới
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm max-w-md">
        <Input
          placeholder="Tìm theo biển số, dòng xe hoặc chủ xe..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-50 border-b border-gray-200 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Biển Số Xe</th>
              <th className="py-3.5 px-4">Dòng Xe</th>
              <th className="py-3.5 px-4">Hãng Sản Xuất</th>
              <th className="py-3.5 px-4">Chủ Xe</th>
              <th className="py-3.5 px-4">Số KM Đã Đi (Odo)</th>
              <th className="py-3.5 px-4">Lần Bảo Dưỡng Gần Nhất</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((v: Vehicle) => (
              <tr key={v.id} className="hover:bg-slate-50 transition">
                <td className="py-4 px-4 font-mono font-bold text-blue-600 text-base">
                  {v.licensePlate}
                </td>
                <td className="py-4 px-4 font-bold text-gray-900">{v.model}</td>
                <td className="py-4 px-4 text-gray-600">{v.brand} {v.year ? `(${v.year})` : ''}</td>
                <td className="py-4 px-4">
                  <div className="font-semibold text-gray-900">{v.customerName}</div>
                  <div className="text-xs text-gray-500">{v.customerPhone}</div>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-800">
                  {v.odometer.toLocaleString()} km
                </td>
                <td className="py-4 px-4 text-xs text-gray-500">{v.lastServiceDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
