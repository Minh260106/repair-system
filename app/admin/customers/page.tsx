'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, User, Phone, Mail, MapPin, Edit2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Customer } from '@/types';
import ApiClient from '@/lib/api/client';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCust, setEditingCust] = useState<Customer | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [totalSpent, setTotalSpent] = useState('0');
  const [totalOrders, setTotalOrders] = useState('0');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await ApiClient.getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingCust(null);
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setTotalSpent('0');
    setTotalOrders('0');
    setIsModalOpen(true);
  };

  const openEditModal = (cust: Customer) => {
    setEditingCust(cust);
    setName(cust.name);
    setPhone(cust.phone);
    setEmail(cust.email || '');
    setAddress(cust.address || '');
    setTotalSpent(cust.totalSpent.toString());
    setTotalOrders(cust.totalOrders.toString());
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingCust) {
        const updated = await ApiClient.updateCustomer(editingCust.id, {
          name,
          phone,
          email,
          address,
          totalSpent: parseInt(totalSpent) || 0,
          totalOrders: parseInt(totalOrders) || 0,
        });
        setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setToast(`Đã cập nhật thông tin khách hàng ${name}!`);
      } else {
        const added = await ApiClient.addCustomer({
          name,
          phone,
          email,
          address,
          totalSpent: parseInt(totalSpent) || 0,
          totalOrders: parseInt(totalOrders) || 0,
        });
        setCustomers((prev) => [added, ...prev]);
        setToast(`Đã thêm khách hàng ${name} mới thành công!`);
      }
      setIsModalOpen(false);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = customers.filter(
    (c: Customer) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <User className="w-7 h-7 text-blue-600" />
            <span>Quản Lý Khách Hàng</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Danh sách khách hàng, thêm/sửa thông tin liên hệ và tổng chi tiêu tích lũy.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
          Thêm khách hàng mới
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
          placeholder="Tìm theo tên hoặc số điện thoại..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-gray-400">Đang tải danh sách khách hàng...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((cust: Customer) => (
            <div
              key={cust.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-lg">
                      {cust.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">{cust.name}</h3>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Tham gia: {cust.joinedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800">
                      {cust.totalOrders} lượt sửa
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(cust)} className="p-2 text-gray-400 hover:text-blue-600">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-gray-900 dark:text-white">{cust.phone}</span>
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
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-slate-400">Tổng chi tiêu tích lũy:</span>
                <span className="font-bold text-base text-blue-600 dark:text-blue-400">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cust.totalSpent)}
                </span>
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
                {editingCust ? 'Sửa Thông Tin Khách Hàng' : 'Thêm Khách Hàng Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Tên khách hàng"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Số điện thoại"
                placeholder="0988 123 456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Địa chỉ"
                placeholder="123 Ba Tháng Hai, Q.10"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Tổng chi tiêu (VND)"
                  type="number"
                  placeholder="0"
                  value={totalSpent}
                  onChange={(e) => setTotalSpent(e.target.value)}
                />
                <Input
                  label="Số lượt sửa chữa"
                  type="number"
                  placeholder="0"
                  value={totalOrders}
                  onChange={(e) => setTotalOrders(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting} className="flex-1">
                  {editingCust ? 'Lưu thay đổi' : 'Thêm mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
