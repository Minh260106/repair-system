'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Wrench, Phone, CheckCircle2, Edit2, UserCheck, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Mechanic } from '@/types';
import ApiClient from '@/lib/api/client';

export default function MechanicsPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMech, setEditingMech] = useState<Mechanic | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [skillLevel, setSkillLevel] = useState('Thợ Chính');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'rảnh' | 'đang làm' | 'nghỉ phép'>('rảnh');
  const [completedOrdersCount, setCompletedOrdersCount] = useState('0');
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    setLoading(true);
    try {
      const data = await ApiClient.getMechanics();
      setMechanics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingMech(null);
    setName('');
    setSkillLevel('Thợ Chính');
    setPhone('');
    setStatus('rảnh');
    setCompletedOrdersCount('0');
    setCurrentOrderId('');
    setIsModalOpen(true);
  };

  const openEditModal = (mech: Mechanic) => {
    setEditingMech(mech);
    setName(mech.name);
    setSkillLevel(mech.skillLevel);
    setPhone(mech.phone);
    setStatus(mech.status);
    setCompletedOrdersCount(mech.completedOrdersCount.toString());
    setCurrentOrderId(mech.currentOrderId || '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingMech) {
        const updated = await ApiClient.updateMechanic(editingMech.id, {
          name,
          skillLevel,
          phone,
          status,
          completedOrdersCount: parseInt(completedOrdersCount) || 0,
          currentOrderId: currentOrderId.trim() || undefined,
        });
        setMechanics((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
        setToast(`Đã cập nhật thông tin thợ ${name} thành công!`);
      } else {
        const added = await ApiClient.addMechanic({
          name,
          skillLevel,
          phone,
          status,
          completedOrdersCount: parseInt(completedOrdersCount) || 0,
          currentOrderId: currentOrderId.trim() || undefined,
        });
        setMechanics((prev) => [added, ...prev]);
        setToast(`Đã thêm Kỹ thuật viên ${name} mới thành công!`);
      }

      setIsModalOpen(false);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMechanics = mechanics.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.skillLevel.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search)
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-7 h-7 text-blue-600" />
            <span>Quản Lý Kỹ Thuật Viên / Thợ Sửa Xe</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cập nhật tên, chức danh (title), số điện thoại, số đơn tháng & phân ca làm việc.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
          Thêm kỹ thuật viên mới
        </Button>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm max-w-md">
        <Input
          placeholder="Tìm theo tên thợ, số điện thoại, trình độ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      {/* Mechanics Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs text-gray-400">Đang tải danh sách kỹ thuật viên...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMechanics.map((mech: Mechanic) => (
            <div
              key={mech.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl mx-auto border border-blue-200 dark:border-blue-800 shadow-sm">
                  <Wrench className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{mech.name}</h3>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-full mt-1">
                    {mech.skillLevel}
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1 pt-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{mech.phone}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Trạng thái:</span>
                  <span
                    className={`font-bold ${mech.status === 'rảnh'
                        ? 'text-green-600 dark:text-green-400'
                        : mech.status === 'đang làm'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-400'
                      }`}
                  >
                    {mech.status === 'rảnh' ? '✓ Đang rảnh' : mech.status === 'đang làm' ? '⚙️ Đang sửa xe' : 'Nghỉ phép'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Đơn tháng này:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{mech.completedOrdersCount} đơn</span>
                </div>
                {mech.currentOrderId && (
                  <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-lg font-mono text-[11px] font-bold text-center border border-blue-100 dark:border-blue-800">
                    Đang làm phiếu: {mech.currentOrderId}
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(mech)}
                  className="w-full mt-2"
                  leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                >
                  Sửa thông tin
                </Button>
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
                {editingMech ? 'Chỉnh Sửa Thông Tin Kỹ Thuật Viên' : 'Thêm Kỹ Thuật Viên Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Họ và tên thợ"
                placeholder="Ví dụ: Nguyễn Văn Nam"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Chức danh / Title (Trình độ)"
                placeholder="Ví dụ: Thợ Chính, Trưởng Nhóm, Chuyên Gia AI..."
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                required
              />

              <Input
                label="Số điện thoại liên hệ"
                placeholder="0901 234 567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  Trạng thái làm việc
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rảnh">Đang rảnh</option>
                  <option value="đang làm">Đang nâng sửa xe</option>
                  <option value="nghỉ phép">Nghỉ phép</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Số đơn hoàn thành (tháng)"
                  type="number"
                  placeholder="0"
                  value={completedOrdersCount}
                  onChange={(e) => setCompletedOrdersCount(e.target.value)}
                />
                <Input
                  label="Mã đơn đang sửa (nếu có)"
                  placeholder="ORD-8892"
                  value={currentOrderId}
                  onChange={(e) => setCurrentOrderId(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting} className="flex-1">
                  {editingMech ? 'Lưu thay đổi' : 'Thêm thợ mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
