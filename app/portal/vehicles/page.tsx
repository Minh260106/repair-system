'use client';

import React, { useState, useEffect } from 'react';
import { Bike, Plus, Edit2, Gauge, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/store/auth-context';
import ApiClient from '@/lib/api/client';
import { Vehicle } from '@/types';

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

export default function PortalVehiclesPage() {
  const { currentUser } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Form state
  const [licensePlate, setLicensePlate] = useState('');
  const [brand, setBrand] = useState('Honda');
  const [customBrand, setCustomBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2023');
  const [odometer, setOdometer] = useState('10000');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, [currentUser]);

  const fetchVehicles = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await ApiClient.getMyVehicles(currentUser.id);
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
    setBrand('Honda');
    setCustomBrand('');
    setModel('SH 150i ABS');
    setYear('2023');
    setOdometer('5000');
    setIsModalOpen(true);
  };

  const openEditModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setLicensePlate(v.licensePlate);
    const knownBrands = ['Honda', 'Yamaha', 'Piaggio', 'Suzuki', 'SYM', 'VinFast'];
    if (v.brand && !knownBrands.includes(v.brand)) {
      setBrand('Khác');
      setCustomBrand(v.brand);
    } else {
      setBrand(v.brand || 'Honda');
      setCustomBrand('');
    }
    setModel(v.model);
    setYear(v.year ? v.year.toString() : '2023');
    setOdometer(v.odometer.toString());
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licensePlate.trim() || !model.trim() || !currentUser) return;

    const finalBrand = brand === 'Khác' ? (customBrand.trim() || 'Hãng xe khác') : brand;

    setIsSaving(true);
    try {
      if (editingVehicle) {
        await ApiClient.updateVehicle(editingVehicle.id, {
          licensePlate,
          brand: finalBrand,
          model,
          year: parseInt(year) || 2023,
          odometer: parseInt(odometer) || 0,
        });
      } else {
        await ApiClient.addVehicle({
          licensePlate,
          brand: finalBrand,
          model,
          year: parseInt(year) || 2023,
          customerId: currentUser.id,
          customerName: currentUser.name,
          customerPhone: currentUser.phone || '',
          odometer: parseInt(odometer) || 0,
          lastServiceDate: new Date().toLocaleDateString('vi-VN'),
        });
      }
      setIsModalOpen(false);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };


  const availableModels = POPULAR_MODELS[brand] || POPULAR_MODELS['Honda'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Bike className="w-7 h-7 text-blue-600" />
            <span>Danh Sách Phương Tiện Của Tôi</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Quản lý thông tin xe máy, ô tô, gợi ý chọn hãng xe & dòng xe chính xác để nhận nhắc nhở bảo dưỡng AI.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddModal}>
          Thêm phương tiện mới
        </Button>
      </div>

      {/* Vehicles Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">Đang tải danh sách xe...</div>
      ) : vehicles.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4 shadow-sm">
          <Bike className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Bạn chưa đăng ký phương tiện nào</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Nhấn vào nút &quot;Thêm phương tiện mới&quot; bên trên để cập nhật thông tin xe của bạn.
          </p>
          <Button variant="primary" onClick={openAddModal}>
            + Thêm xe ngay
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-xl transition space-y-4 relative group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold border border-blue-100 dark:border-blue-800">
                    {v.licensePlate}
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white pt-1">
                    {v.brand} {v.model}
                  </h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => openEditModal(v)} leftIcon={<Edit2 className="w-3.5 h-3.5" />}>
                  Sửa
                </Button>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    <span>Số km hiện tại:</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{v.odometer.toLocaleString()} km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span>Lần bảo dưỡng gần nhất:</span>
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{v.lastServiceDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                {editingVehicle ? 'Cập Nhật Thông Tin Xe' : 'Thêm Xe Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm">
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

              {/* Select Hãng sản xuất */}
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
                      label="Nhập tên hãng xe thủ công (Hãng xe khác)"
                      placeholder="Ví dụ: Ducati, KTM, Royal Enfield, Triumph, Benelli..."
                      value={customBrand}
                      onChange={(e) => setCustomBrand(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>


              {/* Dòng xe Input + Popular Model Pills */}
              <div className="space-y-2">
                <Input
                  label="2. Dòng xe (Nhập hoặc bấm gợi ý bên dưới)"
                  placeholder="SH 150i ABS, Lead 125, Vespa..."
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Gợi ý các mẫu xe {brand} phổ biến:</span>
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
                  label="Năm sản xuất"
                  type="number"
                  placeholder="2023"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <Input
                  label="Số km đã đi (Odometer)"
                  type="number"
                  placeholder="12500"
                  value={odometer}
                  onChange={(e) => setOdometer(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" type="submit" isLoading={isSaving} className="flex-1">
                  {editingVehicle ? 'Lưu thay đổi' : 'Xác nhận thêm xe'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
