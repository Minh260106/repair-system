'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Clock, CheckCircle2, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ServiceItem } from '@/types';
import ApiClient from '@/lib/api/client';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSrv, setEditingSrv] = useState<ServiceItem | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceItem['category']>('maintenance');
  const [price, setPrice] = useState('150000');
  const [warranty, setWarranty] = useState('3 tháng');
  const [duration, setDuration] = useState('30 phút');
  const [popular, setPopular] = useState(false);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await ApiClient.getServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingSrv(null);
    setName('');
    setCategory('maintenance');
    setPrice('150000');
    setWarranty('3 tháng');
    setDuration('30 phút');
    setPopular(false);
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (srv: ServiceItem) => {
    setEditingSrv(srv);
    setName(srv.name);
    setCategory(srv.category);
    setPrice(srv.price.toString());
    setWarranty(srv.warranty);
    setDuration(srv.duration || srv.time || '30 phút');
    setPopular(!!srv.popular);
    setDescription(srv.description || '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    setIsSubmitting(true);
    try {
      if (editingSrv) {
        const updated = await ApiClient.updateService(editingSrv.id, {
          name,
          category,
          price: parseInt(price) || 0,
          warranty,
          duration,
          popular,
          description,
        });
        setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        setToast(`Đã cập nhật bảng giá dịch vụ ${name}!`);
      } else {
        const added = await ApiClient.addService({
          name,
          category,
          price: parseInt(price) || 0,
          warranty,
          duration,
          popular,
          description,
        });
        setServices((prev) => [added, ...prev]);
        setToast(`Đã thêm dịch vụ ${name} mới thành công!`);
      }

      setIsModalOpen(false);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = services.filter((s: ServiceItem) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <BadgePercent className="w-7 h-7 text-blue-600" />
            <span>Quản Lý Dịch Vụ & Bảng Giá</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Danh mục dịch vụ bảo dưỡng, giá tiền công, phụ tùng và thời gian xử lý.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
          Thêm dịch vụ mới
        </Button>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm max-w-md">
        <Input
          placeholder="Tìm tên dịch vụ..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-gray-400">Đang tải danh mục dịch vụ...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((srv: ServiceItem) => (
            <div
              key={srv.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-800">
                    {srv.category}
                  </span>
                  {srv.popular && (
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800">
                      Bán chạy
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">{srv.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{srv.description}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {srv.duration || srv.time}
                  </span>
                  <span>Bảo hành: <strong className="text-gray-900 dark:text-white">{srv.warranty}</strong></span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(srv.price)}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(srv)} className="p-2 text-gray-500 hover:text-blue-600">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-md w-full p-6 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                {editingSrv ? 'Sửa Dịch Vụ & Báo Giá' : 'Thêm Dịch Vụ Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Tên dịch vụ"
                placeholder="Thay Nhớt & Bảo Dưỡng..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  Danh mục
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="maintenance">Bảo dưỡng (maintenance)</option>
                  <option value="repair">Sửa chữa (repair)</option>
                  <option value="brakes">Phanh & Thắng (brakes)</option>
                  <option value="electrical">Điện & Ắc quy (electrical)</option>
                  <option value="engine">Động cơ (engine)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Giá dịch vụ (VND)"
                  type="number"
                  placeholder="150000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <Input
                  label="Thời gian hoàn thành"
                  placeholder="30 phút"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <Input
                label="Thời gian bảo hành"
                placeholder="3 tháng"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              />

              <Textarea
                label="Mô tả chi tiết công việc"
                placeholder="Chi tiết quy trình kỹ thuật..."
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                rows={3}
              />

              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={popular}
                  onChange={(e) => setPopular(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Đánh dấu dịch vụ Hot / Bán chạy</span>
              </label>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting} className="flex-1">
                  {editingSrv ? 'Lưu thay đổi' : 'Thêm mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
