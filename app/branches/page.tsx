'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Navigation, Wrench } from 'lucide-react';
import { Navbar } from '@/components/landing/navbar';
import { FooterSection } from '@/components/landing/footer-section';
import { Button } from '@/components/ui/button';
import ApiClient from '@/lib/api/client';
import { Branch } from '@/types';

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const data = await ApiClient.getBranches();
      if (data.length <= 2) {
        setBranches([
          ...data,
          {
            id: 'br-3',
            name: 'AutoFixAI Chi Nhánh Cầu Giấy (Hà Nội)',
            address: '302 Cầu Giấy, P. Dịch Vọng, Q. Cầu Giấy, Hà Nội',
            phone: '024 3888 9999',
            workingHours: '07:30 - 20:30 (Thứ 2 - CN)',
          },
          {
            id: 'br-4',
            name: 'AutoFixAI Chi Nhánh Hải Châu (Đà Nẵng)',
            address: '97 Hàm Nghi, P. Vĩnh Trung, Q. Hải Châu, Đà Nẵng',
            phone: '0236 3777 888',
            workingHours: '08:00 - 20:00 (Thứ 2 - CN)',
          },
        ]);
      } else {
        setBranches(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10 space-y-10">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <MapPin className="w-8 h-8 text-blue-600" />
            <span>Hệ Thống Chi Nhánh AutoFixAI Garage</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Mạng lưới xưởng sửa chữa & bảo dưỡng xe máy, ô tô hiện đại, trang bị máy chẩn đoán lỗi AI tại các thành phố lớn.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-400">Đang tải danh sách chi nhánh...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                          {b.name}
                        </h2>
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Đang mở cửa
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        Hotline: {b.phone || b.hotline || '1800 2056'}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{b.workingHours || '08:00 - 20:00 (Thứ 2 - Chủ Nhật)'}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full text-xs" leftIcon={<Navigation className="w-3.5 h-3.5" />}>
                      Chỉ đường
                    </Button>
                  </a>
                  <Link href={`/booking?branchId=${b.id}`} className="flex-1">
                    <Button variant="primary" className="w-full text-xs">
                      Đặt lịch hẹn →
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
