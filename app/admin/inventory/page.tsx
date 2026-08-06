'use client';

import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ApiClient from '@/lib/api/client';
import { PartItem } from '@/types';

export default function InventoryPage() {
  const [parts, setParts] = useState<PartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPart, setSelectedPart] = useState<PartItem | null>(null);
  const [restockQty, setRestockQty] = useState<string>('10');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    setLoading(true);
    try {
      const data = await ApiClient.getParts();
      setParts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredParts = parts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const handleRestockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPart || !restockQty) return;

    const qty = parseInt(restockQty);
    if (isNaN(qty) || qty <= 0) return;

    setIsSubmitting(true);
    try {
      const updated = await ApiClient.restockPart(selectedPart.id, qty);
      setParts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setToast(`Đã cộng ${qty} linh kiện vào kho cho ${selectedPart.name}!`);
      setSelectedPart(null);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Package className="w-7 h-7 text-blue-600" />
            <span>Quản Lý Kho Phụ Tùng & Linh Kiện</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Theo dõi số lượng tồn kho, cảnh báo tự động khi linh kiện dưới ngưỡng và nhập kho nhanh.
          </p>
        </div>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
        <Input
          placeholder="Tìm phụ tùng theo tên, SKU, nhà cung cấp..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-slate-400" />}
        />
      </div>

      {/* Parts Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Tên Linh Kiện & SKU</th>
                <th className="py-3.5 px-4">Nhà Cung Cấp</th>
                <th className="py-3.5 px-4">Đơn Giá</th>
                <th className="py-3.5 px-4">Số Lượng Tồn Kho</th>
                <th className="py-3.5 px-4">Nhập Gần Nhất</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Đang tải dữ liệu kho phụ tùng...
                  </td>
                </tr>
              ) : filteredParts.map((part) => {
                const isLow = part.quantity < part.minQuantity;
                return (
                  <tr key={part.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{part.name}</div>
                      <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">{part.sku}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700 dark:text-slate-300">{part.supplier}</td>
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{formatVND(part.unitPrice)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">{part.quantity} cái</span>
                        {isLow && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Cần nhập thêm (&lt;{part.minQuantity})
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500">{part.lastRestockDate}</td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPart(part);
                          setRestockQty('10');
                        }}
                        leftIcon={<Plus className="w-3.5 h-3.5" />}
                      >
                        Nhập kho nhanh
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {selectedPart && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Nhập Kho Nhanh Linh Kiện
              </h3>
              <button onClick={() => setSelectedPart(null)} className="text-slate-400 hover:text-slate-600 text-sm">
                ✕
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl space-y-1 text-xs">
              <p className="text-slate-400">Linh kiện:</p>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedPart.name}</p>
              <p className="text-blue-600 font-mono font-bold">{selectedPart.sku}</p>
              <p className="text-slate-500 pt-1">Số lượng hiện tại trong kho: <span className="font-bold text-slate-900 dark:text-white">{selectedPart.quantity} cái</span></p>
            </div>

            <form onSubmit={handleRestockSubmit} className="space-y-4">
              <Input
                label="Số lượng cộng thêm vào kho"
                type="number"
                min="1"
                value={restockQty}
                onChange={(e) => setRestockQty(e.target.value)}
                required
              />

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setSelectedPart(null)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting} className="flex-1">
                  Xác nhận cộng kho
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
