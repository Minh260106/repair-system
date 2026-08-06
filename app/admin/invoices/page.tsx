'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Receipt, Printer, CheckCircle2, CreditCard, Edit2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Invoice } from '@/types';
import ApiClient from '@/lib/api/client';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInv, setEditingInv] = useState<Invoice | null>(null);

  // Form State
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [servicesCost, setServicesCost] = useState('300000');
  const [partsCost, setPartsCost] = useState('150000');
  const [discount, setDiscount] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer' | 'card'>('transfer');
  const [status, setStatus] = useState<'paid' | 'unpaid'>('paid');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await ApiClient.getInvoices();
      setInvoices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingInv(null);
    const num = Math.floor(100 + Math.random() * 900);
    setInvoiceNumber(`INV-2026-${num}`);
    setOrderId('ORD-8895');
    setCustomerName('');
    setCustomerPhone('');
    setVehiclePlate('');
    setServicesCost('300000');
    setPartsCost('100000');
    setDiscount('40000');
    setPaymentMethod('transfer');
    setStatus('unpaid');
    setIsModalOpen(true);
  };

  const openEditModal = (inv: Invoice) => {
    setEditingInv(inv);
    setInvoiceNumber(inv.invoiceNumber);
    setOrderId(inv.orderId);
    setCustomerName(inv.customerName);
    setCustomerPhone(inv.customerPhone);
    setVehiclePlate(inv.vehiclePlate);
    setServicesCost(inv.servicesCost.toString());
    setPartsCost(inv.partsCost.toString());
    setDiscount(inv.discount.toString());
    setPaymentMethod(inv.paymentMethod);
    setStatus(inv.status);
    setIsModalOpen(true);
  };

  const handleQuickMarkPaid = async (invId: string) => {
    try {
      const updated = await ApiClient.markInvoicePaid(invId, 'transfer');
      setInvoices((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setToast(`Đã xác nhận thanh toán hóa đơn #${updated.invoiceNumber}!`);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !vehiclePlate.trim()) return;

    const sCost = parseInt(servicesCost) || 0;
    const pCost = parseInt(partsCost) || 0;
    const disc = parseInt(discount) || 0;
    const finalAmount = Math.max(0, sCost + pCost - disc);

    setIsSubmitting(true);
    try {
      if (editingInv) {
        const updated = await ApiClient.updateInvoice(editingInv.id, {
          invoiceNumber,
          orderId,
          customerName,
          customerPhone,
          vehiclePlate,
          servicesCost: sCost,
          partsCost: pCost,
          discount: disc,
          finalAmount,
          paymentMethod,
          status,
        });
        setInvoices((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
        setToast(`Đã cập nhật hóa đơn #${invoiceNumber}!`);
      } else {
        const added = await ApiClient.createInvoice({
          invoiceNumber,
          orderId,
          customerName,
          customerPhone,
          vehiclePlate,
          servicesCost: sCost,
          partsCost: pCost,
          discount: disc,
          finalAmount,
          paymentMethod,
          status,
        });
        setInvoices((prev) => [added, ...prev]);
        setToast(`Đã xuất hóa đơn #${invoiceNumber} thành công!`);
      }

      setIsModalOpen(false);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = invoices.filter(
    (inv: Invoice) =>
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
      inv.vehiclePlate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Receipt className="w-7 h-7 text-blue-600" />
            <span>Quản Lý Hóa Đơn & Thanh Toán</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lịch sử xuất hóa đơn, chiết khấu giảm giá đặt lịch và xác nhận hình thức thanh toán.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
          Tạo hóa đơn mới
        </Button>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm max-w-md">
        <Input
          placeholder="Tìm mã hóa đơn #INV, tên khách, biển số..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Mã Hóa Đơn</th>
              <th className="py-3.5 px-4">Khách Hàng</th>
              <th className="py-3.5 px-4">Biển Số Xe</th>
              <th className="py-3.5 px-4">Hình Thức</th>
              <th className="py-3.5 px-4">Giảm Giá</th>
              <th className="py-3.5 px-4 text-right">Tổng Thanh Toán</th>
              <th className="py-3.5 px-4 text-center">Trạng Thái</th>
              <th className="py-3.5 px-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-xs text-gray-400">
                  Đang tải danh sách hóa đơn...
                </td>
              </tr>
            ) : filtered.map((inv: Invoice) => (
              <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td className="py-4 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  {inv.invoiceNumber}
                </td>
                <td className="py-4 px-4">
                  <div className="font-bold text-gray-900 dark:text-white">{inv.customerName}</div>
                  <div className="text-xs text-gray-500">{inv.customerPhone}</div>
                </td>
                <td className="py-4 px-4 font-mono text-gray-800 dark:text-slate-200">{inv.vehiclePlate}</td>
                <td className="py-4 px-4 text-xs font-semibold text-gray-700 dark:text-slate-300 capitalize">
                  {inv.paymentMethod === 'transfer' ? 'Chuyển khoản' : inv.paymentMethod === 'card' ? 'Thẻ' : 'Tiền mặt'}
                </td>
                <td className="py-4 px-4 text-xs text-green-600 dark:text-green-400 font-semibold">
                  -{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inv.discount)}
                </td>
                <td className="py-4 px-4 text-right font-extrabold text-gray-900 dark:text-white text-base">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inv.finalAmount)}
                </td>
                <td className="py-4 px-4 text-center">
                  {inv.status === 'paid' ? (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                      ✓ Đã thanh toán
                    </span>
                  ) : (
                    <button
                      onClick={() => handleQuickMarkPaid(inv.id)}
                      className="px-3 py-1 bg-red-100 hover:bg-emerald-100 text-red-700 hover:text-emerald-700 text-xs font-bold rounded-full transition cursor-pointer"
                      title="Bấm để xác nhận đã nhận tiền"
                    >
                      ⏳ Chưa thanh toán (Xác nhận)
                    </button>
                  )}
                </td>
                <td className="py-4 px-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(inv)}>
                    <Edit2 className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-md w-full p-6 space-y-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                {editingInv ? 'Sửa Hóa Đơn Thanh Toán' : 'Tạo Hóa Đơn Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Mã hóa đơn"
                  placeholder="INV-2026-001"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  required
                />
                <Input
                  label="Mã phiếu sửa (#ORD)"
                  placeholder="ORD-8892"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Tên khách hàng"
                  placeholder="Nguyễn Văn A"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                <Input
                  label="Số điện thoại"
                  placeholder="0988 123 456"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>

              <Input
                label="Biển số xe"
                placeholder="59-P1 888.88"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                required
              />

              <div className="grid grid-cols-3 gap-2">
                <Input
                  label="Tiền công (VND)"
                  type="number"
                  placeholder="300000"
                  value={servicesCost}
                  onChange={(e) => setServicesCost(e.target.value)}
                />
                <Input
                  label="Tiền linh kiện"
                  type="number"
                  placeholder="150000"
                  value={partsCost}
                  onChange={(e) => setPartsCost(e.target.value)}
                />
                <Input
                  label="Chiết khấu"
                  type="number"
                  placeholder="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                    Hình thức
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="transfer">Chuyển khoản QR</option>
                    <option value="cash">Tiền mặt</option>
                    <option value="card">Thẻ ngân hàng</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                    Trạng thái
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="paid">Đã thanh toán</option>
                    <option value="unpaid">Chưa thanh toán</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting} className="flex-1">
                  {editingInv ? 'Lưu thay đổi' : 'Xuất hóa đơn'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
