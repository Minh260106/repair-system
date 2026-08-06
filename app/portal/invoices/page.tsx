'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Receipt, Eye, CreditCard, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/auth-context';
import ApiClient from '@/lib/api/client';
import { Invoice } from '@/types';

export default function PortalInvoicesPage() {
  const { currentUser } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, [currentUser]);

  const fetchInvoices = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await ApiClient.getMyInvoices(currentUser.id);
      setInvoices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Receipt className="w-7 h-7 text-blue-600" />
          <span>Danh Sách Hóa Đơn Sửa Chữa</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Theo dõi minh bạch chi phí dịch vụ, xem chi tiết và thanh toán chuyển khoản qua QR code tiện lợi.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">Đang tải hóa đơn...</div>
      ) : invoices.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4 shadow-sm">
          <Receipt className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Không có hóa đơn nào</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hóa đơn sẽ xuất hiện tại đây khi phiếu sửa chữa được lập thành công.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-xl transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    #{inv.invoiceNumber}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      inv.status === 'paid'
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    {inv.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium">Phương tiện: {inv.vehiclePlate}</p>
                  <p className="text-xs text-slate-400 font-medium">Tạo ngày: {inv.createdAt}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                  <span className="text-xs text-slate-500 font-medium">Tổng số tiền:</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">{formatVND(inv.finalAmount)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Link href={`/portal/invoices/${inv.id}`} className="flex-1">
                  <Button variant="outline" className="w-full text-xs" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                    Xem chi tiết
                  </Button>
                </Link>

                {inv.status === 'unpaid' && (
                  <Link href={`/portal/invoices/${inv.id}`} className="flex-1">
                    <Button variant="primary" className="w-full text-xs" leftIcon={<CreditCard className="w-3.5 h-3.5" />}>
                      Thanh toán ngay
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
