'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockServices } from '@/lib/mock/data';
import { ServiceItem } from '@/types';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(mockServices);
  const [search, setSearch] = useState('');

  const filtered = services.filter((s: ServiceItem) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Dịch Vụ & Bảng Giá
          </h1>
          <p className="text-sm text-gray-500">
            Danh mục dịch vụ bảo dưỡng, giá tiền công, phụ tùng và thời gian xử lý.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Thêm dịch vụ mới
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm max-w-md">
        <Input
          placeholder="Tìm tên dịch vụ..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((srv: ServiceItem) => (
          <div
            key={srv.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {srv.category}
                </span>
                {srv.popular && (
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    Bán chạy
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 text-base">{srv.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{srv.description}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {srv.duration || srv.time}
                </span>
                <span>Bảo hành: <strong className="text-gray-900">{srv.warranty}</strong></span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-base font-extrabold text-blue-600">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(srv.price)}
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="p-2 text-gray-500">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
