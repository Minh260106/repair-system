'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export interface TestimonialItem {
  id: number;
  name: string;
  vehicle: string;
  comment: string;
  avatar: string;
  rating: number;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    name: 'Anh Nguyễn Minh Tuấn',
    vehicle: 'Honda SH 150i ABS',
    comment:
      'Xe bị hụp ga đi rất khó chịu. Mang sang đây được AI chẩn đoán đúng nguyên nhân hỏng do tắc kim phun và bẩn bugi. Làm xong xe chạy êm ru như mới mua!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'Chị Lê Thị Thanh Hương',
    vehicle: 'VESPA Sprint 125',
    comment:
      'Thích nhất là có màn hình theo dõi tiến độ sửa chữa realtime. Giá niêm yết rõ ràng không lo bị vẽ thêm chi phí. Đội ngũ nhân viên tư vấn rất lịch sự.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Anh Trần Quốc Bảo',
    vehicle: 'Yamaha Exciter 155 VVA',
    comment:
      'Đặt lịch trước trên website vừa được giảm 10% vừa không phải chờ đợi. Kỹ thuật viên tay nghề cao, thay nhớt và bảo dưỡng nồi cực kỳ kỹ lưỡng.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 4,
    name: 'Chị Phạm Hoàng Yến',
    vehicle: 'Honda Lead 125',
    comment:
      'Xe mình bị kêu rè rè khi tăng tốc, thợ kiểm tra và giải thích rất tận tình. Sửa nhanh trong 40 phút có phòng chờ máy lạnh nước uống miễn phí.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Ý Kiến Khách Hàng
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Khách Hàng Nói Gì Về Chúng Tôi
            </h2>
            <p className="text-base text-gray-600">
              Hơn 15.000+ chủ xe tin tưởng chọn AutoFixAI cho mỗi kỳ bảo dưỡng.
            </p>
          </div>

          {/* Slider navigation buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel / Grid list of Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item, idx) => (
            <article
              key={item.id}
              className={`bg-slate-50 rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${
                idx === currentIndex ? 'ring-2 ring-blue-500 bg-white' : ''
              }`}
            >
              <div className="space-y-4">
                {/* 5 Yellow Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Italic review text */}
                <p className="text-base text-gray-600 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Customer Info Footer */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-200/60 mt-6">
                {/* Avatar round w-12 h-12 */}
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="text-base font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-blue-600 font-medium">Sửa xe: {item.vehicle}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
