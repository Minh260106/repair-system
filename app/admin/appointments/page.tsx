'use client';

import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock, Check, X, Phone, Plus, Edit2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Appointment } from '@/types';
import ApiClient from '@/lib/api/client';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApt, setEditingApt] = useState<Appointment | null>(null);

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-08-07');
  const [scheduledTime, setScheduledTime] = useState('09:00');
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'completed' | 'cancelled'>('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await ApiClient.getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingApt(null);
    setCustomerName('');
    setPhone('');
    setVehicleModel('');
    setSymptoms('');
    setScheduledDate(new Date().toISOString().split('T')[0]);
    setScheduledTime('09:00');
    setStatus('pending');
    setIsModalOpen(true);
  };

  const openEditModal = (apt: Appointment) => {
    setEditingApt(apt);
    setCustomerName(apt.customerName);
    setPhone(apt.phone);
    setVehicleModel(apt.vehicleModel);
    setSymptoms(apt.symptoms);
    setScheduledDate(apt.scheduledDate);
    setScheduledTime(apt.scheduledTime);
    setStatus(apt.status);
    setIsModalOpen(true);
  };

  const handleStatus = async (id: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const updated = await ApiClient.updateAppointment(id, { status: newStatus });
      setAppointments((prev) => prev.map((apt) => (apt.id === id ? updated : apt)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !symptoms.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingApt) {
        const updated = await ApiClient.updateAppointment(editingApt.id, {
          customerName,
          phone,
          vehicleModel,
          symptoms,
          scheduledDate,
          scheduledTime,
          status,
        });
        setAppointments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        setToast(`Đã cập nhật lịch hẹn của ${customerName}!`);
      } else {
        const added = await ApiClient.addAppointment({
          customerName,
          phone,
          vehicleModel,
          symptoms,
          scheduledDate,
          scheduledTime,
          status,
        });
        setAppointments((prev) => [added, ...prev]);
        setToast(`Đã tạo lịch hẹn mới cho ${customerName}!`);
      }

      setIsModalOpen(false);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <CalendarDays className="w-7 h-7 text-blue-600" />
            <span>Quản Lý Lịch Hẹn Đặt Trước</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Duyệt lịch hẹn trực tuyến, thêm/sửa giờ hẹn & gán giảm 10% công dịch vụ cho khách.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
          Tạo lịch hẹn mới
        </Button>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-xs text-gray-400">Đang tải lịch hẹn...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 shadow-sm space-y-4 ${
                apt.status === 'confirmed'
                  ? 'border-green-200 dark:border-green-800 bg-green-50/20 dark:bg-green-950/20'
                  : apt.status === 'cancelled'
                  ? 'border-red-200 dark:border-red-800 bg-red-50/20 dark:bg-red-950/20'
                  : 'border-gray-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{apt.customerName}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{apt.phone}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                      apt.status === 'confirmed'
                        ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                        : apt.status === 'cancelled'
                        ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                        : 'bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-400'
                    }`}
                  >
                    {apt.status === 'confirmed'
                      ? '✓ Đã xác nhận'
                      : apt.status === 'cancelled'
                      ? '✕ Đã hủy'
                      : '⏳ Đang chờ duyệt'}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(apt)} className="p-2 text-gray-400 hover:text-blue-600">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-700 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Dòng xe:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{apt.vehicleModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Lịch hẹn đến:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {apt.scheduledTime} - ngày {apt.scheduledDate}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-gray-500 dark:text-gray-400">Vấn đề / Triệu chứng:</span>
                  <p className="p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-gray-800 dark:text-slate-200 font-medium italic mt-1">
                    &ldquo;{apt.symptoms}&rdquo;
                  </p>
                </div>
              </div>

              {apt.status === 'pending' && (
                <div className="pt-2 flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    leftIcon={<Check className="w-4 h-4" />}
                    onClick={() => handleStatus(apt.id, 'confirmed')}
                  >
                    Xác nhận lịch
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    leftIcon={<X className="w-4 h-4" />}
                    onClick={() => handleStatus(apt.id, 'cancelled')}
                  >
                    Từ chối
                  </Button>
                </div>
              )}
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
                {editingApt ? 'Sửa Lịch Hẹn Đặt Trước' : 'Tạo Lịch Hẹn Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Dòng xe"
                placeholder="Honda SH 150i / Winner X..."
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                required
              />

              <Input
                label="Triệu chứng / Yêu cầu bảo dưỡng"
                placeholder="Thay nhớt, kiểm tra phanh..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Ngày hẹn"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
                <Input
                  label="Giờ hẹn"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  Trạng thái lịch
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Chờ duyệt</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="completed">Đã hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting} className="flex-1">
                  {editingApt ? 'Lưu thay đổi' : 'Tạo lịch'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
