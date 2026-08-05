'use client';

import React from 'react';
import { Droplet, Wrench, ShieldAlert, Cpu, Sparkles, Disc, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export interface ServiceItemData {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  price: string;
  badge?: string;
}

export const servicesData: ServiceItemData[] = [
  {
    id: 1,
    title: 'Thay Nhớt & Bảo Dưỡng Động Cơ',
    description: 'Thay nhớt máy, nhớt hộp số chính hãng Motul, Castrol. Vệ sinh lọc nhớt giúp xe êm bốc.',
    icon: Droplet,
    price: 'Từ 150.000đ',
    badge: 'Bán chạy',
  },
  {
    id: 2,
    title: 'Vệ Sinh Nồi & Kim Phun FI',
    description: 'Tẩy sạch cặn bẩn kim phun xăng, vệ sinh bộ nồi 3 càng trị dứt điểm tình trạng hụp ga, xe giật.',
    icon: Sparkles,
    price: 'Từ 250.000đ',
    badge: 'AI Khuyên dùng',
  },
  {
    id: 3,
    title: 'Sửa Chữa Phanh & Đĩa Phanh',
    description: 'Thay bố phanh, dầu phanh đĩa, rà đĩa phanh chống bó phanh, chống kêu rét rét an toàn tuyệt đối.',
    icon: Disc,
    price: 'Từ 180.000đ',
  },
  {
    id: 4,
    title: 'Kiểm Tra Hệ Thống Điện & Bình Ắc Quy',
    description: 'Đo đọc dòng điện bằng máy chẩn đoán AI, thay bình ắc quy GS/Globe chính hãng lấy ngay.',
    icon: Zap,
    price: 'Từ 200.000đ',
  },
  {
    id: 5,
    title: 'Bảo Dưỡng Toàn Diện 20 Hạng Mục',
    description: 'Kiểm tra tổng thể phuộc nhún, vỏ xe, hệ thống làm mát, curoa, tra mỡ cổ xe và chẩn đoán AI.',
    icon: Wrench,
    price: 'Từ 450.000đ',
    badge: 'Tiết kiệm 30%',
  },
  {
    id: 6,
    title: 'Cứu Hộ & Sửa Chữa Lưu Động',
    description: 'Đội ngũ kỹ thuật viên đến tận nơi xử lý sự cố xe không nổ máy, chết máy giữa đường 24/7.',
    icon: ShieldAlert,
    price: 'Từ 100.000đ',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Dịch Vụ Sửa Chữa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dịch Vụ Sửa Chữa & Bảo Dưỡng Nổi Bật
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Cam kết phụ tùng chính hãng 100%, niêm yết giá minh bạch và quy trình xử lý chuẩn kỹ thuật.
          </p>
        </div>

        {/* Services Grid using map() */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((item) => {
            const IconComponent = item.icon;
            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Icon inside circle */}
                    <div className="bg-blue-50 text-blue-600 p-4 rounded-full w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full border border-orange-200">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-base text-gray-500 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-600">{item.price}</span>
                  <a href="#quick-booking" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                    Đặt lịch <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
