'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Wrench, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/landing/navbar';
import Footer from '@/components/layout/footer';
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
      // Add extra demo branches if needed
      if (data.length <= 2) {
        data.push({
          id: 'hcm-q1',
          name: 'AutoFixAI Quận 1 (TP.HCM)',
          address: '26 Trần Quang Khải, Phường Tân Định, Quận 1, TP.HCM',
          hotline: '1800 2057',
          workingHours: '08:00 - 20:00 (Cả CN & Ngày lễ)'
        });
        data.push({
          id: 'dn-hc',
          name: 'AutoFixAI Hải Châu (Đà Nẵng)',
          address: '97 Hàm Nghi, Phường Vĩnh Trung, Quận Hải Châu, Đà Nẵng',
          hotline: '1800 2059',
          workingHours: '08:00 - 20:00 (Cả CN & Ngày lễ)'
        });
      }
      setBranches(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            Hệ Thống Garage Toàn Quốc
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Danh Sách Chi Nhánh AutoFixAI
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Hệ thống cơ sở hạ tầng hiện đại trang bị máy chẩn đoán lỗi AI, phòng chờ máy lạnh phục vụ cà phê miễn phí và dịch vụ cứu hộ lưu động 24/7.
          </p>
        </div>

        {/* Branches Grid */}
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Đang tải danh sách chi nhánh...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((b) => {
              const mapsQueryUrl = b.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`;
              return (
                <div
                  key={b.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg hover:shadow-xl transition space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                        <Wrench className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">
                          {b.name}
                        </h2>
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Đang mở cửa hoạt động
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{b.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-bold text-slate-900 dark:text-white">
                          Hotline: {b.hotline || '1800 2056'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="font-medium">{b.workingHours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                    <a href={mapsQueryUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="primary" className="w-full text-xs" leftIcon={<Navigation className="w-4 h-4" />}>
                        Chỉ đường trên Google Maps
                      </Button>
                    </a>
                    <Link href="/booking" className="flex-1">
                      <Button variant="secondary" className="w-full text-xs">
                        Đặt lịch cơ sở này
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
