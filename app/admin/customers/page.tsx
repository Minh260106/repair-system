'use client';

import React, { useState } from 'react';
import { Plus, Search, User, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCustomers } from '@/lib/mock/data';
import { Customer } from '@/types';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c: Customer) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Khách Hàng
          </h1>
          <p className="text-sm text-gray-500">
            Danh sách khách hàng, thông tin liên hệ và tổng chi tiêu sửa chữa.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Thêm khách hàng mới
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm max-w-md">
        <Input
          placeholder="Tìm theo tên hoặc số điện thoại..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((cust: Customer) => (
          <div
            key={cust.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg">
                  {cust.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{cust.name}</h3>
                  <p className="text-xs text-blue-600 font-medium">Tham gia: {cust.joinedDate}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                {cust.totalOrders} lượt sửa
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="font-semibold text-gray-900">{cust.phone}</span>
              </div>
              {cust.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{cust.email}</span>
                </div>
              )}
              {cust.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{cust.address}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Tổng chi tiêu tích lũy:</span>
              <span className="font-bold text-base text-blue-600">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                  cust.totalSpent
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
