'use client';

import React, { useState } from 'react';
import { Plus, Search, Receipt, Printer, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockInvoices } from '@/lib/mock/data';
import { Invoice } from '@/types';

export default function InvoicesPage() {
  const [search, setSearch] = useState('');

  const filtered = mockInvoices.filter(
    (inv: Invoice) =>
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
      inv.vehiclePlate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Hóa Đơn & Thanh Toán
          </h1>
          <p className="text-sm text-gray-500">
            Lịch sử xuất hóa đơn, chiết khấu giảm giá đặt lịch và hình thức thanh toán.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm max-w-md">
        <Input
          placeholder="Tìm mã hóa đơn #INV, tên khách, biển số..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-50 border-b border-gray-200 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Mã Hóa Đơn</th>
              <th className="py-3.5 px-4">Khách Hàng</th>
              <th className="py-3.5 px-4">Biển Số Xe</th>
              <th className="py-3.5 px-4">Hình Thức</th>
              <th className="py-3.5 px-4">Giảm Giá</th>
              <th className="py-3.5 px-4 text-right">Tổng Thanh Toán</th>
              <th className="py-3.5 px-4 text-center">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((inv: Invoice) => (
              <tr key={inv.id} className="hover:bg-slate-50 transition">
                <td className="py-4 px-4 font-mono font-bold text-blue-600">
                  {inv.invoiceNumber}
                </td>
                <td className="py-4 px-4">
                  <div className="font-bold text-gray-900">{inv.customerName}</div>
                  <div className="text-xs text-gray-500">{inv.customerPhone}</div>
                </td>
                <td className="py-4 px-4 font-mono text-gray-800">{inv.vehiclePlate}</td>
                <td className="py-4 px-4 text-xs font-semibold text-gray-700 capitalize">
                  {inv.paymentMethod === 'transfer' ? 'Chuyển khoản QR' : 'Tiền mặt'}
                </td>
                <td className="py-4 px-4 text-xs text-green-600 font-semibold">
                  -{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inv.discount)}
                </td>
                <td className="py-4 px-4 text-right font-extrabold text-gray-900 text-base">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inv.finalAmount)}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    ✓ Đã thanh toán
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
