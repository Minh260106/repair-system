'use client';

import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, CheckCircle2, Clock, MapPin, Wrench, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/store/auth-context';
import ApiClient from '@/lib/api/client';
import { OrderItem, Branch } from '@/types';

function formatPhoneNumber(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

const VEHICLE_BRANDS = [
  { value: 'Honda', label: 'Honda' },
  { value: 'Yamaha', label: 'Yamaha' },
  { value: 'Piaggio', label: 'Piaggio / Vespa' },
  { value: 'Suzuki', label: 'Suzuki' },
  { value: 'SYM', label: 'SYM' },
  { value: 'VinFast', label: 'VinFast' },
  { value: 'Khác', label: 'Hãng xe khác...' },
];

export default function PortalBookingsPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state prefilled with currentUser
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [brand, setBrand] = useState('Honda');
  const [customBrand, setCustomBrand] = useState('');
  const [deviceModel, setDeviceModel] = useState('SH 150i ABS');
  const [symptoms, setSymptoms] = useState('');
  const [branchId, setBranchId] = useState('hcm-q10');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const fetchData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [userOrders, bList] = await Promise.all([
        ApiClient.getMyOrders(currentUser.id),
        ApiClient.getBranches(),
      ]);
      setOrders(userOrders);
      setBranches(bList);
      setCustomerName(currentUser.name || '');
      setPhoneNumber(formatPhoneNumber(currentUser.phone || ''));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneNumber || !symptoms) return;

    const finalBrand = brand === 'Khác' ? (customBrand.trim() || 'Hãng xe khác') : brand;

    setIsSubmitting(true);
    setSuccessMsg('');
    try {
      const cleanPhone = phoneNumber.replace(/\s+/g, '');
      const newBooking = await ApiClient.createBooking({
        customerName,
        phoneNumber: cleanPhone,
        deviceType: 'bike',
        brand: finalBrand,
        deviceModel,
        symptoms,
        branchId,
      });

      // Update customerId to current user for local persistence
      newBooking.customerId = currentUser?.id || 'cust-1';

      setSuccessMsg(`Đặt lịch thành công! Mã đơn của bạn là #${newBooking.orderNumber}`);
      setTimeout(() => {
        setIsModalOpen(false);
        fetchData();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-7 h-7 text-blue-600" />
            <span>Lịch Hẹn & Lịch Sử Sửa Chữa</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Đặt lịch bảo dưỡng trực tuyến nhanh chóng, chủ động chọn giờ và chi nhánh garage.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
          Đặt lịch bảo dưỡng mới
        </Button>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">Đang tải lịch hẹn...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4 shadow-sm">
          <CalendarDays className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Bạn chưa có lịch hẹn nào</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Đặt lịch sửa chữa ngay để nhận ưu đãi giảm 10% công dịch vụ và không phải chờ đợi tại garage.
          </p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            + Đặt lịch ngay
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-lg transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-blue-600 text-sm">#{ord.orderNumber}</span>
                  <span className="text-xs text-slate-400">Tạo lúc: {ord.dateCreated}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {ord.brand} {ord.vehicleModel}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">Yêu cầu:</span> {ord.symptoms}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 uppercase">
                  {ord.status === 'completed' ? 'Đã hoàn thành' : 'Đang xử lý'}
                </span>
                <a href={`/portal/orders/${ord.id}`}>
                  <Button variant="outline" size="sm">
                    Chi tiết
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Đặt Lịch Hẹn Sửa Chữa</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm">
                ✕
              </button>
            </div>

            {successMsg ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Họ và tên"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                  <Input
                    label="Số điện thoại"
                    type="tel"
                    inputMode="numeric"
                    maxLength={12}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 items-start">
                  <div className="space-y-2">
                    <Select
                      label="Hãng xe"
                      options={VEHICLE_BRANDS}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    {brand === 'Khác' && (
                      <div className="animate-fade-in">
                        <Input
                          label="Nhập hãng xe thủ công"
                          placeholder="Ví dụ: Ducati, KTM..."
                          value={customBrand}
                          onChange={(e) => setCustomBrand(e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </div>
                  <Input
                    label="Dòng xe"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Mô tả triệu chứng / Yêu cầu bảo dưỡng"
                  placeholder="Ví dụ: Thay nhớt, kiểm tra phanh sau, vệ sinh kim phun..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  required
                />

                <Select
                  label="Chọn Chi Nhánh Garage"
                  options={branches.map((b) => ({ value: b.id, label: `${b.name} (${b.address})` }))}
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                />

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Hủy
                  </Button>
                  <Button variant="primary" type="submit" isLoading={isSubmitting} className="flex-1">
                    Xác nhận đặt lịch
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
