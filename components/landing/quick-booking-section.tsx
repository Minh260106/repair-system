'use client';

import React, { useState } from 'react';
import { Calendar, Phone, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Textarea } from '../ui/textarea';

export const QuickBookingSection: React.FC = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [customVehicle, setCustomVehicle] = useState('');
  const [symptom, setSymptom] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const vehicleOptions = [
    { value: 'honda_sh', label: 'Honda SH 125i / 150i / 350i' },
    { value: 'honda_vision', label: 'Honda Vision / Lead / Air Blade' },
    { value: 'vespa', label: 'Vespa / Piaggio Liberty / Medley' },
    { value: 'yamaha_exciter', label: 'Yamaha Exciter / NVX / Grande' },
    { value: 'moto_PKL', label: 'Xe Mô tô Phân Khối Lớn (PKL)' },
    { value: 'other', label: 'Dòng xe / hãng xe khác...' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!vehicleType) newErrors.vehicleType = 'Vui lòng chọn loại xe';
    if (vehicleType === 'other' && !customVehicle.trim()) newErrors.customVehicle = 'Vui lòng nhập tên hãng xe / dòng xe';
    if (!symptom.trim()) newErrors.symptom = 'Vui lòng nhập triệu chứng hoặc vấn đề xe đang gặp';
    if (!dateTime) newErrors.dateTime = 'Vui lòng chọn ngày giờ dự định đến';
    if (!phone.trim() || phone.length < 9) newErrors.phone = 'Số điện thoại không hợp lệ';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="quick-booking" className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Outstanding block with subtle gradient background */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white rounded-2xl border border-blue-100 p-6 md:p-12 shadow-sm relative overflow-hidden">
          {/* Decorative Sparkle Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Form Title Header */}
          <div className="text-center space-y-3 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Đặt Lịch Nhanh ✦ Giảm ngay 10%
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Chẩn Đoán Nguyên Nhân Hỏng & Đặt Lịch Bảo Dưỡng
            </h2>
            <p className="text-base text-gray-600">
              Điền thông tin bên dưới để được hệ thống xếp lịch ưu tiên và báo giá chẩn đoán AI lập tức.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Đã Nhận Đơn Đặt Lịch!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Cảm ơn bạn! Đội ngũ tư vấn viên của AutoFixAI sẽ liên hệ lại số điện thoại{' '}
                <strong className="text-gray-900">{phone}</strong> trong vòng 10 phút để xác nhận lịch hẹn.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setSymptom('');
                  setPhone('');
                  setCustomVehicle('');
                }}
              >
                Đặt thêm lịch hẹn khác
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* 1. Loại xe (Select) */}
                <div className="space-y-2">
                  <Select
                    label="Loại xe của bạn *"
                    placeholder="-- Chọn dòng xe cần sửa chữa --"
                    options={vehicleOptions}
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    error={errors.vehicleType}
                  />
                  {vehicleType === 'other' && (
                    <div className="animate-fade-in">
                      <Input
                        label="Tên hãng xe / dòng xe khác của bạn *"
                        placeholder="Ví dụ: Ducati, KTM, Royal Enfield, Suzuki Raider..."
                        value={customVehicle}
                        onChange={(e) => setCustomVehicle(e.target.value)}
                        error={errors.customVehicle}
                      />
                    </div>
                  )}
                </div>

                {/* 2. Số điện thoại (Input) */}
                <Input
                  label="Số điện thoại liên hệ *"
                  type="tel"
                  placeholder="VD: 0988 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={errors.phone}
                  leftIcon={<Phone className="w-4 h-4" />}
                />
              </div>

              {/* 3. Ngày giờ (DatePicker / datetime-local) */}
              <Input
                label="Ngày & giờ dự định đến garage *"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                error={errors.dateTime}
              />

              {/* 4. Triệu chứng/Vấn đề (Textarea) */}
              <Textarea
                label="Triệu chứng hoặc sự cố xe đang gặp *"
                placeholder="VD: Xe bị hụp ga khi tăng tốc, phanh kêu rét rét, muốn thay nhớt máy..."
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                error={errors.symptom}
                helperText="Mô tả càng chi tiết, AI chẩn đoán chính xác giá & thời gian hoàn thành cho bạn."
              />

              {/* Submit button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  leftIcon={<Sparkles className="w-5 h-5" />}
                  className="w-full text-base py-4"
                >
                  Chẩn đoán nguyên nhân hỏng & Đặt lịch
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Giữ chỗ ưu tiên
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Không mất phí hủy lịch
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
