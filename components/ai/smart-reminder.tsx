'use client';

import React from 'react';
import { Sparkles, Calendar, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export interface SmartReminderProps {
  vehicleName?: string;
  odometer?: string;
  recommendedService?: string;
  dueDate?: string;
  onBookClick?: () => void;
}

export const SmartReminder: React.FC<SmartReminderProps> = ({
  vehicleName = 'Honda SH 150i (Biển số 59-P1 888.88)',
  odometer = '5.000km',
  recommendedService = 'Thay nhớt máy & nhớt lap',
  dueDate = 'tuần sau (ngày 12/08/2026)',
  onBookClick,
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white border border-purple-500/30 shadow-lg relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-purple-500/20 text-purple-300 rounded-2xl border border-purple-400/30 shrink-0">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-full">
                AI Smart Reminder
              </span>
              <span className="text-xs text-slate-400 font-medium">{vehicleName}</span>
            </div>
            <h4 className="text-base md:text-lg font-bold text-white leading-snug">
              Dựa trên lịch sử, xe bạn đã đi được <span className="text-yellow-400 font-extrabold">{odometer}</span> từ lần thay nhớt trước.
            </h4>
            <p className="text-sm text-slate-300">
              Ước tính cần <span className="text-purple-300 font-semibold">{recommendedService}</span> vào <span className="text-slate-200 underline decoration-purple-400">{dueDate}</span>.
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <a href="#quick-booking">
            <Button
              variant="secondary"
              size="md"
              onClick={onBookClick}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full md:w-auto shadow-purple-900/50"
            >
              Đặt lịch ngay
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
