'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Receipt, CreditCard, Download, CheckCircle2, QrCode,
  ArrowLeft, ShieldCheck, Printer, AlertCircle, Copy, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApiClient from '@/lib/api/client';
import { Invoice } from '@/types';

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params?.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchInvoice();
  }, [invoiceId]);

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      let data = await ApiClient.getInvoiceById(invoiceId);
      if (!data) {
        // Fallback demo invoice
        const allInvoices = await ApiClient.getMyInvoices('cust-1');
        data = allInvoices[0] || null;
      }
      setInvoice(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleConfirmPayment = async () => {
    if (!invoice) return;
    setIsProcessing(true);
    try {
      const updated = await ApiClient.markInvoicePaid(invoice.id, 'transfer');
      setInvoice(updated);
      setShowQrModal(false);
      setToastMessage('Thanh toán thành công! Trạng thái hóa đơn đã được cập nhật.');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div className="py-12 text-center text-xs text-slate-400">Đang tải thông tin hóa đơn...</div>;
  }

  if (!invoice) {
    return (
      <div className="text-center py-12 space-y-4">
        <h3 className="font-bold text-base">Không tìm thấy thông tin hóa đơn</h3>
        <Button variant="outline" onClick={() => router.push('/portal/invoices')}>
          Quay lại danh sách hóa đơn
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Toast alert */}
      {toastMessage && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-lg animate-slideDown">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Action Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push('/portal/invoices')} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Quay lại
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert('Đang xuất tệp PDF Hóa đơn... (MOCK PDF)')}
            leftIcon={<Download className="w-4 h-4 text-blue-600" />}
          >
            Tải PDF
          </Button>

          {invoice.status === 'unpaid' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowQrModal(true)}
              leftIcon={<CreditCard className="w-4 h-4" />}
            >
              Thanh toán ngay
            </Button>
          )}
        </div>
      </div>

      {/* Invoice Ticket Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Invoice Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-6 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">HÓA ĐƠN DỊCH VỤ SỬA CHỮA</h2>
            <p className="text-xs text-slate-500 font-mono mt-1">Mã hóa đơn: #{invoice.invoiceNumber}</p>
            <p className="text-xs text-slate-500 font-mono">Mã phiếu sửa: #{invoice.orderId}</p>
          </div>

          <div className="text-left sm:text-right">
            <span
              className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase ${
                invoice.status === 'paid'
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
              }`}
            >
              {invoice.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">Ngày xuất: {invoice.createdAt}</p>
          </div>
        </div>

        {/* Customer & Vehicle details */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-xs space-y-1">
          <div>
            <span className="text-slate-400 font-medium">Khách hàng:</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{invoice.customerName}</p>
            <p className="text-slate-500">{invoice.customerPhone}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Phương tiện:</span>
            <p className="font-bold text-blue-600 dark:text-blue-400 text-sm font-mono">{invoice.vehiclePlate}</p>
            <p className="text-slate-500">AutoFixAI Chi Nhánh 1 (Quận 10)</p>
          </div>
        </div>

        {/* Items Breakdown Table */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Chi Tiết Hạng Mục Chi Phí</h3>
          <table className="w-full text-xs text-left">
            <thead className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2">Nội dung công việc / Phụ tùng</th>
                <th className="py-2 text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
              <tr>
                <td className="py-3">Công dịch vụ & Vệ sinh nồi, kim phun FI</td>
                <td className="py-3 text-right font-bold">{formatVND(invoice.servicesCost)}</td>
              </tr>
              {invoice.partsCost > 0 && (
                <tr>
                  <td className="py-3">Thay thế linh kiện phụ tùng chính hãng (Bugi/Lọc gió)</td>
                  <td className="py-3 text-right font-bold">{formatVND(invoice.partsCost)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total Summary */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>Tiền công dịch vụ:</span>
            <span>{formatVND(invoice.servicesCost)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Tiền linh kiện / phụ tùng:</span>
            <span>{formatVND(invoice.partsCost)}</span>
          </div>
          {invoice.discount > 0 && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>Chiết khấu ưu đãi đặt lịch Online (-10%):</span>
              <span>-{formatVND(invoice.discount)}</span>
            </div>
          )}
          <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-slate-700 text-base font-black text-slate-900 dark:text-white">
            <span>TỔNG CỘNG THANH TOÁN:</span>
            <span className="text-xl text-blue-600 dark:text-blue-400">{formatVND(invoice.finalAmount)}</span>
          </div>
        </div>

      </div>

      {/* QR Code Online Payment Modal (MOCK) */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-6 shadow-2xl animate-fadeIn text-center">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-600" />
                <span>Thanh Toán Chuyển Khoản QR Code</span>
              </h3>
              <button onClick={() => setShowQrModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">
                ✕
              </button>
            </div>

            {/* SVG Placeholder QR Code */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 inline-block mx-auto space-y-3">
              <div className="w-48 h-48 bg-white p-2 rounded-xl border border-gray-200 mx-auto flex items-center justify-center shadow-inner relative">
                {/* Clean SVG Mock QR Code */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                  <rect x="5" y="5" width="25" height="25" fill="black" />
                  <rect x="10" y="10" width="15" height="15" fill="white" />
                  <rect x="13" y="13" width="9" height="9" fill="black" />

                  <rect x="70" y="5" width="25" height="25" fill="black" />
                  <rect x="75" y="10" width="15" height="15" fill="white" />
                  <rect x="78" y="13" width="9" height="9" fill="black" />

                  <rect x="5" y="70" width="25" height="25" fill="black" />
                  <rect x="10" y="75" width="15" height="15" fill="white" />
                  <rect x="13" y="78" width="9" height="9" fill="black" />

                  <rect x="35" y="10" width="10" height="10" fill="black" />
                  <rect x="50" y="5" width="10" height="15" fill="black" />
                  <rect x="35" y="30" width="25" height="10" fill="black" />
                  <rect x="70" y="35" width="15" height="15" fill="black" />
                  <rect x="40" y="50" width="15" height="15" fill="black" />
                  <rect x="65" y="65" width="25" height="25" fill="black" />
                  <rect x="35" y="75" width="15" height="15" fill="black" />
                </svg>
              </div>

              <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <p className="font-bold text-slate-900 dark:text-white">Nội dung chuyển khoản:</p>
                <div className="flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-950 p-2 rounded-xl border border-blue-200 dark:border-blue-800">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    AUTOFIX {invoice.invoiceNumber}
                  </span>
                  <button
                    onClick={() => copyToClipboard(`AUTOFIX ${invoice.invoiceNumber}`)}
                    className="p-1 text-blue-600 dark:text-blue-400 hover:opacity-80"
                    title="Sao chép nội dung"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <p>Ngân hàng: <span className="font-bold text-slate-800 dark:text-slate-200">MB Bank (Quân Đội)</span></p>
              <p>Số tài khoản: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">9999 8888 6666</span></p>
              <p>Chủ tài khoản: <span className="font-bold text-slate-800 dark:text-slate-200">CÔNG TY AUTOFIXAI</span></p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowQrModal(false)} className="flex-1">
                Đóng
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmPayment}
                isLoading={isProcessing}
                className="flex-1"
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Xác nhận đã chuyển khoản
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
