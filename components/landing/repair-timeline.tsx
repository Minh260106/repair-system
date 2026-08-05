'use client';

import React, { useState } from 'react';
import { CheckCircle2, Clock, Wrench, ShieldCheck, Truck, Sparkles, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

export interface TimelineStep {
  id: number;
  label: string;
  sublabel: string;
  status: 'completed' | 'active' | 'pending';
}

export const RepairTimeline: React.FC = () => {
  const steps: TimelineStep[] = [
    { id: 1, label: 'Tiếp nhận xe', sublabel: '08:30 - Lập phiếu', status: 'completed' },
    { id: 2, label: 'Đang kiểm tra tình trạng', sublabel: '08:45 - AI Chẩn đoán', status: 'active' },
    { id: 3, label: 'Báo giá khách hàng', sublabel: '09:00 - Xác nhận', status: 'pending' },
    { id: 4, label: 'Đang tiến hành sửa', sublabel: 'Dự kiến 09:15', status: 'pending' },
    { id: 5, label: 'Kiểm định chất lượng', sublabel: 'Dự kiến 09:45', status: 'pending' },
    { id: 6, label: 'Sẵn sàng giao xe', sublabel: 'Dự kiến 10:00', status: 'pending' },
  ];

  return (
    <section id="tracking-timeline" className="py-16 md:py-24 bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Realtime Tracking
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trình Theo Dõi Tiến Độ Sửa Chữa Realtime
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Minh bạch từng công đoạn. Khách hàng theo dõi qua điện thoại từ lúc tiếp nhận đến khi giao xe.
          </p>
        </div>

        {/* Tracking Card Container */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm space-y-8">
          {/* Header metadata bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-900">Mã phiếu: #FIX-8892</h3>
                {/* Status Badge */}
                <Badge statusText="Đang kiểm tra" />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Phương tiện: <strong className="text-gray-800">Honda SH 150i (59-P1 888.88)</strong> ✦ Kỹ thuật viên: <strong className="text-gray-800">Nguyễn Văn Nam</strong>
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 w-fit">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Thời gian cập nhật: <strong>08:47 AM</strong></span>
            </div>
          </div>

          {/* Horizontal Progress Bar with 6 steps */}
          <div className="relative py-4">
            {/* Horizontal Line background */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
            <div className="hidden md:block absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: '25%' }} />

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
              {steps.map((st) => {
                const isCompleted = st.status === 'completed';
                const isActive = st.status === 'active';

                return (
                  <div key={st.id} className="flex md:flex-col items-center gap-4 md:gap-3 text-left md:text-center group">
                    {/* Node circle indicator */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shrink-0 ${
                        isCompleted
                          ? 'bg-green-600 text-white shadow-sm'
                          : isActive
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md scale-110'
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isActive ? (
                        <span className="relative flex items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          {st.id}
                        </span>
                      ) : (
                        st.id
                      )}
                    </div>

                    {/* Step label info */}
                    <div className="space-y-0.5">
                      <p
                        className={`text-sm font-semibold leading-tight ${
                          isActive
                            ? 'text-blue-600 font-bold'
                            : isCompleted
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        }`}
                      >
                        {st.label}
                      </p>
                      <p className="text-xs text-gray-500">{st.sublabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status Highlight Alert */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 text-white rounded-lg shrink-0">
                <Wrench className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-950 flex items-center gap-2">
                  <span>Trạng thái nấc hiện tại: Nấc 2 - Đang kiểm tra tình trạng</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                </p>
                <p className="text-xs text-blue-800">
                  Kỹ thuật viên đang tháo nồi & kết nối máy đọc lỗi AI để phân tích thông số động cơ.
                </p>
              </div>
            </div>
            <a
              href="#ai-diagnostic"
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 underline shrink-0"
            >
              Xem chẩn đoán AI ✦
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
