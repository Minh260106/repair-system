'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Clock, DollarSign, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface DiagnosticResult {
  cause: string;
  confidence: number;
  services: string[];
  duration: string;
  cost: string;
}

const mockDatabase: Record<string, DiagnosticResult> = {
  default: {
    cause: '70% do Bugi quá cũ, Lọc gió bám bụi hoặc tắc Kim phun xăng',
    confidence: 85,
    services: ['Vệ sinh kim phun xăng điện tử', 'Thay Bugi đánh lửa chính hãng', 'Vệ sinh / Thay lọc gió'],
    duration: '45 phút',
    cost: '~350.000đ',
  },
  hup_ga: {
    cause: '70% do Bugi quá cũ, Lọc gió bám bụi hoặc tắc Kim phun xăng',
    confidence: 88,
    services: ['Vệ sinh kim phun & Họng ga', 'Thay Bugi Iridium cao cấp', 'Ktra bơm xăng'],
    duration: '45 phút',
    cost: '~350.000đ',
  },
  keo_xet: {
    cause: '65% do Bộ nồi bị mòn phíp, dây curoa nứt rãnh hoặc cạn nhớt lap',
    confidence: 82,
    services: ['Vệ sinh bộ nồi búa ba càng', 'Thay dây curoa Bando', 'Thay nhớt hộp số'],
    duration: '60 phút',
    cost: '~480.000đ',
  },
  tat_may: {
    cause: '75% do Nghẹt đường xăng, lỗi IC đánh lửa hoặc mòn xì bắp',
    confidence: 90,
    services: ['Chẩn đoán điện bằng máy đọc lỗi AI', 'Súc rửa bình xăng con / FI'],
    duration: '30 phút',
    cost: '~250.000đ',
  },
};

export const AiDiagnostic: React.FC = () => {
  const [symptomInput, setSymptomInput] = useState<string>('Xe bị hụp ga khi tăng tốc');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const quickSymptoms = [
    'Xe bị hụp ga khi tăng tốc',
    'Phanh xe kêu rét rét',
    'Nổ máy kêu lách cách ở nồi',
    'Xe chạy hao xăng bất thường',
  ];

  const handleDiagnose = (inputQuery?: string) => {
    const query = inputQuery !== undefined ? inputQuery : symptomInput;
    if (!query.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI loading shimmer effect
    setTimeout(() => {
      setIsAnalyzing(false);
      let matchKey = 'default';
      if (query.toLowerCase().includes('hụp ga') || query.toLowerCase().includes('tăng tốc')) matchKey = 'hup_ga';
      else if (query.toLowerCase().includes('kêu') || query.toLowerCase().includes('nồi')) matchKey = 'keo_xet';
      else if (query.toLowerCase().includes('tắt máy') || query.toLowerCase().includes('hao xăng')) matchKey = 'tat_may';

      setResult(mockDatabase[matchKey] || mockDatabase.default);
    }, 1500);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
      {/* Decorative AI background accent */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 via-blue-500/10 to-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header with Purple Sparkle Icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-gray-900">AI Chẩn Đoán Nguyên Nhân Hỏng</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 rounded-full">
              AI Smart Engine
            </span>
          </div>
          <p className="text-sm text-gray-500">Mô tả hiện trạng xe để AI phân tích nguyên nhân & chi phí dự kiến</p>
        </div>
      </div>

      {/* Input section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="VD: Xe bị hụp ga khi tăng tốc, máy rung giật..."
              onKeyDown={(e) => e.key === 'Enter' && handleDiagnose()}
            />
          </div>
          <Button
            variant="primary"
            onClick={() => handleDiagnose()}
            isLoading={isAnalyzing}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Phân tích AI
          </Button>
        </div>

        {/* Quick select pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-gray-400">Gợi ý nhanh:</span>
          {quickSymptoms.map((sym, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSymptomInput(sym);
                handleDiagnose(sym);
              }}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-purple-50 hover:text-purple-700 text-gray-600 rounded-full transition cursor-pointer border border-transparent hover:border-purple-200"
            >
              ✦ {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton (Shimmer effect) */}
      {isAnalyzing && (
        <div className="mt-6 p-6 bg-gradient-to-r from-purple-50/50 via-blue-50/50 to-purple-50/50 rounded-2xl border border-purple-100 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-purple-200 rounded-full animate-spin border-2 border-purple-600 border-t-transparent" />
            <span className="text-sm font-semibold text-purple-900">AI đang phân tích triệu chứng & tra cứu dữ liệu kỹ thuật...</span>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-purple-200/60 rounded w-3/4" />
            <div className="h-4 bg-purple-200/40 rounded w-1/2" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="h-12 bg-purple-200/40 rounded-xl" />
            <div className="h-12 bg-purple-200/40 rounded-xl" />
          </div>
        </div>
      )}

      {/* Result Card */}
      {result && !isAnalyzing && (
        <div className="mt-6 p-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl border border-purple-500/30 shadow-xl space-y-5 animate-fadeIn relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-sm font-bold tracking-wide uppercase text-purple-300">Kết quả chẩn đoán AI</span>
            </div>
            <span className="px-2.5 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
              Độ tin cậy: {result.confidence}%
            </span>
          </div>

          {/* Predicted cause */}
          <div className="space-y-1">
            <span className="text-xs text-slate-400 uppercase font-medium tracking-wider">Nguyên nhân dự đoán:</span>
            <p className="text-lg font-bold text-amber-300 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
              <span>{result.cause}</span>
            </p>
          </div>

          {/* Proposed Services */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 uppercase font-medium tracking-wider">Đề xuất dịch vụ xử lý:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.services.map((srv, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-800/80 rounded-xl text-xs font-medium text-slate-200 border border-slate-700/60">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Time and Cost */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/40">
              <Clock className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">Thời gian xử lý</p>
                <p className="text-sm font-bold text-white">{result.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/40">
              <DollarSign className="w-5 h-5 text-green-400 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">Chi phí dự kiến</p>
                <p className="text-sm font-bold text-green-400">{result.cost}</p>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex justify-end">
            <a href="#quick-booking">
              <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Đặt lịch xử lý ngay
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
