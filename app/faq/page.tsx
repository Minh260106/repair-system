'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/landing/navbar';
import { FooterSection } from '@/components/landing/footer-section';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Chẩn đoán AI & Quy trình',
    question: 'AI Chẩn đoán sự cố xe của AutoFixAI hoạt động như thế nào?',
    answer: 'Hệ thống AI sử dụng mô hình học máy phân tích triệu chứng âm thanh động cơ, chỉ số dòng điện và lịch sử vận hành xe để đưa ra chẩn đoán chính xác đến 95% về nguyên nhân gây ra sự cố.',
  },
  {
    category: 'Bảo hành & Phụ tùng',
    question: 'Linh kiện thay thế có chính hãng không và được bảo hành bao lâu?',
    answer: '100% phụ tùng (Bugi NGK, Nhớt Motul/Castrol, Bố phanh Nissin, Bình GS...) đều nhập khẩu trực tiếp từ nhà phân phối chính hãng. Tất cả linh kiện được bảo hành 1 đổi 1 từ 3 đến 12 tháng.',
  },
  {
    category: 'Đặt lịch & Ưu đãi',
    question: 'Tại sao nên đặt lịch bảo dưỡng trực tuyến trước khi tới garage?',
    answer: 'Đặt lịch online giúp quý khách giữ chỗ trước, không cần xếp hàng chờ đợi và nhận ngay ưu đãi giảm 10% tổng chi phí công dịch vụ sửa chữa.',
  },
  {
    category: 'Thanh toán & Chi phí',
    question: 'Garage hỗ trợ những hình thức thanh toán nào?',
    answer: 'Chúng tôi hỗ trợ đa dạng phương thức thanh toán: Tiền mặt, Chuyển khoản QR ngân hàng (MB, Vietcombank, Techcombank...), Thẻ ATM/Visa và ví điện tử MoMo/ZaloPay.',
  },
  {
    category: 'Thời gian sửa chữa',
    question: 'Thời gian thay nhớt và bảo dưỡng toàn diện mất bao lâu?',
    answer: 'Dịch vụ thay nhớt máy thông thường diễn ra trong 15-20 phút. Gói bảo dưỡng toàn diện 20 hạng mục kết hợp vệ sinh nồi & súc kim phun FI mất khoảng 45-60 phút.',
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Header Hero */}
        <div className="text-center space-y-4">
          <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
            Trung Tâm Hỗ Trợ Khách Hàng
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Câu Hỏi Thường Gặp (FAQ)
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Giải đáp mọi thắc mắc về quy trình sửa chữa xe, chính sách bảo hành, báo giá và dịch vụ chẩn đoán AI.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {faq.category}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl">
          <h2 className="text-xl font-bold">Bạn còn câu hỏi khác chưa được giải đáp?</h2>
          <p className="text-xs text-blue-100 max-w-md mx-auto">
            Trò chuyện trực tiếp với Trợ lý Trực tuyến AI hoặc liên hệ tổng đài tư vấn miễn cước 24/7.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/portal">
              <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Vào Portal Khách Hàng
              </Button>
            </Link>
          </div>
        </div>

      </main>

      <FooterSection />
    </div>
  );
}
