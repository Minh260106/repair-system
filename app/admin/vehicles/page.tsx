'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Bike, Calendar, Gauge, User, Edit2, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Vehicle } from '@/types';
import ApiClient from '@/lib/api/client';

const BRAND_OPTIONS = [
  { value: 'Honda', label: 'Honda' },
  { value: 'Yamaha', label: 'Yamaha' },
  { value: 'Piaggio', label: 'Piaggio / Vespa' },
  { value: 'Suzuki', label: 'Suzuki' },
  { value: 'SYM', label: 'SYM' },
  { value: 'VinFast', label: 'VinFast (Xe điện / Ô tô)' },
  { value: 'Toyota', label: 'Toyota (Ô tô)' },
  { value: 'Hyundai', label: 'Hyundai (Ô tô)' },
  { value: 'Ford', label: 'Ford (Ô tô)' },
  { value: 'Khác', label: 'Hãng xe khác' },
];

const POPULAR_MODELS: Record<string, string[]> = {
  Honda: ['SH 150i ABS', 'SH 125i', 'Lead 125', 'Air Blade 160', 'Vision 110', 'Winner X', 'Wave Alpha', 'Future 125'],
  Yamaha: ['Exciter 155 VVA', 'NVX 155', 'Janus 125', 'Grande Hybrid', 'Sirius FI'],
  Piaggio: ['Vespa Sprint 125', 'Vespa Primavera 125', 'Liberty ABS', 'Medley 150'],
  Suzuki: ['Raider R150', 'Satria F150', 'Burgman 125'],
  SYM: ['Attila Victoria', 'Passing 125', 'Galaxy 125'],
  VinFast: ['Feliz S', 'Klara S', 'Vento S', 'Evo200', 'VF8', 'VF9'],
  Toyota: ['Vios', 'Corolla Cross', 'Camry', 'Fortuner'],
  Hyundai: ['Accent', 'Tucson', 'Santa Fe', 'Creta'],
  Ford: ['Ranger', 'Everest', 'Territory'],
  Khác: ['BMW R1250GS', 'Ducati Panigale', 'Kawasaki Z900'],
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Form State
  const [licensePlate, setLicensePlate] = useState('');
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('Honda');
  const [customBrand, setCustomBrand] = useState('');
  const [year, setYear] = useState('2023');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [odometer, setOdometer] = useState('10000');
  const [lastServiceDate, setLastServiceDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const data = await ApiClient.getVehicles();
      setVehicles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingVehicle(null);
    setLicensePlate('');
    setModel('SH 150i ABS');
    setBrand('Honda');
    setCustomBrand('');
    setYear('2023');
    setCustomerName('');
    setCustomerPhone('');
    setOdometer('5000');
    setLastServiceDate(new Date().toLocaleDateString('vi-VN'));
    setIsModalOpen(true);
  };

  const openEditModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setLicensePlate(v.licensePlate);
    setModel(v.model);
    const knownBrands = ['Honda', 'Yamaha', 'Piaggio', 'Suzuki', 'SYM', 'VinFast'];
    if (v.brand && !knownBrands.includes(v.brand)) {
      setBrand('Khác');
      setCustomBrand(v.brand);
    } else {
      setBrand(v.brand || 'Honda');
      setCustomBrand('');
    }
    setYear(v.year ? v.year.toString() : '2023');
    setCustomerName(v.customerName);
    setCustomerPhone(v.customerPhone);
    setOdometer(v.odometer.toString());
    setLastServiceDate(v.lastServiceDate);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licensePlate.trim() || !model.trim() || !customerName.trim()) return;

    const finalBrand = brand === 'Khác' ? (customBrand.trim() || 'Hãng xe khác') : brand;

    setIsSubmitting(true);
    try {
      if (editingVehicle) {
        const updated = await ApiClient.updateVehicle(editingVehicle.id, {
          licensePlate,
          model,
          brand: finalBrand,
          year: parseInt(year) || 2023,
          customerName,
          customerPhone,
          odometer: parseInt(odometer) || 0,
          lastServiceDate: lastServiceDate || new Date().toLocaleDateString('vi-VN'),
        });
        setVehicles((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
        setToast(`Đã cập nhật phương tiện ${licensePlate}!`);
      } else {
        const added = await ApiClient.addVehicle({
          licensePlate,
          model,
          brand: finalBrand,
          year: parseInt(year) || 2023,
          customerId: `cust-${Date.now()}`,
          customerName,
          customerPhone,
          odometer: parseInt(odometer) || 0,
          lastServiceDate: lastServiceDate || new Date().toLocaleDateString('vi-VN'),
        });
        setVehicles((prev) => [added, ...prev]);
        setToast(`Đã thêm xe ${licensePlate} mới thành công!`);
      }

      setIsModalOpen(false);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };


  const filtered = vehicles.filter(
    (v: Vehicle) =>
      v.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const availableModels = POPULAR_MODELS[brand] || POPULAR_MODELS['Honda'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bike className="w-7 h-7 text-blue-600" />
            <span>Quản Lý Phương Tiện (Xe Máy / Mô Tô)</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hồ sơ phương tiện, gợi ý chọn hãng xe & dòng xe chính xác để nâng hiệu quả sửa chữa.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
          Thêm phương tiện mới
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
          placeholder="Tìm theo biển số, dòng xe hoặc chủ xe..."
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
              <th className="py-3.5 px-4">Biển Số Xe</th>
              <th className="py-3.5 px-4">Dòng Xe</th>
              <th className="py-3.5 px-4">Hãng Sản Xuất</th>
              <th className="py-3.5 px-4">Chủ Xe</th>
              <th className="py-3.5 px-4">Số KM Đã Đi (Odo)</th>
              <th className="py-3.5 px-4">Lần Bảo Dưỡng Gần Nhất</th>
              <th className="py-3.5 px-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-xs text-gray-400">
                  Đang tải danh sách phương tiện...
                </td>
              </tr>
            ) : filtered.map((v: Vehicle) => (
              <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td className="py-4 px-4 font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
                  {v.licensePlate}
                </td>
                <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">{v.model}</td>
                <td className="py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 text-xs">
                    {v.brand} {v.year ? `(${v.year})` : ''}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="font-semibold text-gray-900 dark:text-white">{v.customerName}</div>
                  <div className="text-xs text-gray-500">{v.customerPhone}</div>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-800 dark:text-slate-200">
                  {v.odometer.toLocaleString()} km
                </td>
                <td className="py-4 px-4 text-xs text-gray-500">{v.lastServiceDate}</td>
                <td className="py-4 px-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(v)}>
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                {editingVehicle ? 'Sửa Thông Tin Phương Tiện' : 'Thêm Phương Tiện Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Biển số xe"
                placeholder="59-P1 888.88"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                required
              />

              {/* Hãng sản xuất Select với gợi ý */}
              <div className="space-y-2">
                <Select
                  label="1. Chọn Hãng Sản Xuất (Thương hiệu)"
                  options={BRAND_OPTIONS}
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    const defaultModels = POPULAR_MODELS[e.target.value];
                    if (defaultModels && defaultModels.length > 0) {
                      setModel(defaultModels[0]);
                    }
                  }}
                />
                
                {brand === 'Khác' && (
                  <div className="pt-1 animate-fadeIn">
                    <Input
                      label="Tên hãng xe thủ công (Hãng xe khác)"
                      placeholder="Ví dụ: Ducati, KTM, Royal Enfield, Triumph, Benelli..."
                      value={customBrand}
                      onChange={(e) => setCustomBrand(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>


              {/* Dòng xe Input + Gợi ý các Model phổ biến */}
              <div className="space-y-2">
                <Input
                  label="2. Dòng xe (Nhập hoặc chọn gợi ý bên dưới)"
                  placeholder="Ví dụ: SH 150i ABS, Lead 125..."
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
                
                {/* Gợi ý mẫu xe theo hãng */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Gợi ý dòng xe phổ biến của {brand}:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {availableModels.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setModel(m)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer font-medium ${
                          model === m
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Chủ xe (Họ và tên)"
                  placeholder="Nguyễn Văn A"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                <Input
                  label="SĐT liên hệ chủ xe"
                  placeholder="0988 123 456"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Số km đã đi (Odometer)"
                  type="number"
                  placeholder="12500"
                  value={odometer}
                  onChange={(e) => setOdometer(e.target.value)}
                />
                <Input
                  label="Năm sản xuất"
                  type="number"
                  placeholder="2023"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting} className="flex-1">
                  {editingVehicle ? 'Lưu thay đổi' : 'Thêm phương tiện'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
