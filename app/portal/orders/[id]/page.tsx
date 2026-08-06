'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Wrench, CheckCircle, Hammer, Info, Timer, ClipboardList,
  Send, MessageSquare, Image as ImageIcon, Camera, Sparkles, Bot, ShieldCheck, Clock, X, UserCheck, Phone
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ApiClient from '@/lib/api/client';
import { OrderItem, ChatMessage } from '@/types';
import { useAuth } from '@/store/auth-context';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const { currentUser } = useAuth();

  const [order, setOrder] = useState<OrderItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Floating AI Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'ai-init-1',
      sender: 'ai',
      text: 'Xin chào anh/chị! Em là **Trợ Lý AI Chẩn Đoán AutoFix**. 🤖\n\nEm đang đồng hành theo dõi tiến độ sửa chữa cho xe của anh/chị.',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 'ai-init-2',
      sender: 'ai',
      text: '💡 **Kết quả chẩn đoán AI**: Động cơ có dấu hiệu hụp ga nhẹ do bộ nồi bám bụi và lọc gió bẩn. Kỹ thuật viên đang tiến hành vệ sinh và súc kim phun FI.',
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping, isChatOpen]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const data = await ApiClient.getOrderById(orderId);
      if (data) {
        setOrder(data);
      } else {
        const allOrders = await ApiClient.getOrdersByContact('0988 123 456');
        setOrder(allOrders[0] || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const queryText = customText || inputMsg;
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMsg('');
    setIsAiTyping(true);

    // AI dynamic response generator based on query & order state
    setTimeout(() => {
      const textLower = queryText.toLowerCase();
      let aiText = '';

      if (textLower.includes('khi nào') || textLower.includes('xong') || textLower.includes('mấy giờ')) {
        aiText = `⏱️ Dự kiến xe **${order?.vehicleModel || 'SH 150i'}** sẽ hoàn tất vào **${order?.estimatedCompletion || '10:15 hôm nay'}**. Ngay khi hoàn thành, hệ thống sẽ gửi thông báo đẩy đến điện thoại của anh/chị ạ!`;
      } else if (textLower.includes('giá') || textLower.includes('tiền') || textLower.includes('phí')) {
        aiText = `💰 Báo giá chi tiết hiện tại cho đơn #${order?.orderNumber || 'ORD-8892'} là **${order?.totalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice) : '400.000đ'}** (Giá trọn gói phụ tùng chính hãng + tiền công thợ, không phát sinh chi phí ẩn).`;
      } else if (textLower.includes('bảo hành') || textLower.includes('hạn')) {
        aiText = `🛡️ Hạng mục dịch vụ cho đơn #${order?.orderNumber || 'ORD-8892'} được áp dụng chính sách **bảo hành 3 - 12 tháng**. Anh/chị hoàn toàn yên tâm sử dụng!`;
      } else if (textLower.includes('phụ tùng') || textLower.includes('thay') || textLower.includes('láp')) {
        aiText = `🔧 Kỹ thuật viên đã kiểm tra bộ nồi & dầu nhớt. Bộ nồi đã được làm sạch bằng máy chẩn đoán siêu âm, nhớt máy còn mới chưa cần thay ạ.`;
      } else {
        aiText = `🤖 Trợ lý AI đã ghi nhận yêu cầu "${queryText}". Dữ liệu đã được cập nhật đến máy chẩn đoán tại xưởng. Kỹ thuật viên phụ trách đang xử lý trực tiếp theo yêu cầu ạ!`;
      }

      const aiMsg: ChatMessage = {
        id: `chat-${Date.now()}-ai`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      setIsAiTyping(false);
    }, 1000);
  };

  const stagePhotos = [
    {
      stage: '1. Tiếp nhận & Kiểm tra ban đầu',
      url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=80',
      time: '08:45',
    },
    {
      stage: '2. Tháo rã & Vệ sinh bộ nồi',
      url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=80',
      time: '09:05',
    },
    {
      stage: '3. Kiểm tra kim phun xăng FI bằng máy siêu âm',
      url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=80',
      time: '09:20',
    },
  ];

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'received':
        return <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold rounded-full text-xs">Mới tiếp nhận</span>;
      case 'inspecting':
        return <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold rounded-full text-xs">Đang kiểm tra AI</span>;
      case 'repairing':
        return <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold rounded-full text-xs animate-pulse">Đang tiến hành sửa</span>;
      case 'ready_to_deliver':
        return <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold rounded-full text-xs">Chờ bàn giao xe</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-full text-xs">Hoàn thành</span>;
      default:
        return <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold rounded-full text-xs">Đang xử lý</span>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 text-xs font-semibold">Đang tải chi tiết tiến độ sửa chữa...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Không tìm thấy phiếu sửa chữa</h2>
        <p className="text-xs text-slate-500">Mã đơn không tồn tại hoặc đã bị xóa khỏi hệ thống.</p>
        <Button onClick={() => router.push('/portal/bookings')} variant="outline">
          Quay lại danh sách đơn hàng
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn relative">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Đơn Sửa Chữa #{order.orderNumber}
            </h1>
            {getStatusBadge(order.status)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Phương tiện: <strong className="text-slate-900 dark:text-slate-200">{order.vehicleModel}</strong> (Biển số: {order.vehiclePlate})
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0">
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Dự kiến xong</span>
            <span className="font-bold text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {order.estimatedCompletion || '10:15'}
            </span>
          </div>
          <div className="text-right pl-4 border-l border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Tổng chi phí</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Timeline & Photos */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Progress Timeline */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Timer className="w-5 h-5 text-blue-600" />
                <span>Tiến Độ Sửa Chữa Realtime</span>
              </h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Cập nhật tự động
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {order.timeline.map((step, idx) => {
                const isCurrent = step.status === order.status;
                return (
                  <div key={idx} className="relative flex items-start gap-4 group">
                    <span
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 bg-white dark:bg-slate-900 flex items-center justify-center transition ${
                        step.isCompleted
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : isCurrent
                          ? 'border-purple-600 bg-purple-600 text-white ring-4 ring-purple-100 dark:ring-purple-950'
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {step.isCompleted && <CheckCircle className="w-2.5 h-2.5" />}
                    </span>

                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-bold text-xs ${step.isCompleted || isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                          {step.statusLabel}
                        </h3>
                        {step.timestamp && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                            {step.timestamp}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stage Photos Gallery */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-4">
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-600" />
              <span>Hình Ảnh Thực Tế Công Đoạn Sửa Chữa</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stagePhotos.map((photo, idx) => (
                <div key={idx} className="space-y-2 group">
                  <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-700 shadow-sm">
                    <img src={photo.url} alt={photo.stage} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono">
                      {photo.time}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                    {photo.stage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Mechanic Info & AI Chat Prompt */}
        <div className="space-y-6">
          
          {/* Assigned Mechanic Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Kỹ Thuật Viên Phụ Trách</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200 dark:border-blue-800">
                <UserCheck className="w-5 h-5" />
              </div>

              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {order.assignedMechanicName || 'Nguyễn Văn Nam'}
                </h4>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">Trưởng Nhóm Kỹ Thuật (Chuyên SH & Vespa)</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 pt-0.5">
                  <Phone className="w-3 h-3 text-emerald-500" /> Hotline garage: 0901 234 567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Chatbot Button & Popup Panel (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 no-print">
        {/* Floating Chat Trigger Button */}
        {!isChatOpen && (
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer group relative"
            aria-label="Open AI Assistant Chat"
          >
            <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white text-[9px] font-bold text-white items-center justify-center">
                AI
              </span>
            </span>
          </button>
        )}

        {/* Floating Popup Chatbox Window */}
        {isChatOpen && (
          <div className="w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 flex flex-col h-[500px] animate-fadeIn">
            {/* Header */}
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">Trợ Lý AI AutoFix</h3>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Realtime 24/7
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div className="py-2 flex gap-1.5 overflow-x-auto no-scrollbar border-b border-slate-50 dark:border-slate-800/50">
              {[
                'Khi nào xong xe?',
                'Tổng chi phí bao nhiêu?',
                'Thời gian bảo hành?'
              ].map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(undefined, chip)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 rounded-full text-[10px] font-semibold whitespace-nowrap transition cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-2 overflow-y-auto space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[90%]">
                    {msg.sender === 'ai' && (
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        🤖
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {isAiTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px]">🤖</div>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => handleSendMessage(e)} className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <Input
                placeholder="Hỏi AI về đơn hàng này..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="text-xs"
              />
              <Button type="submit" variant="primary" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>
                Gửi
              </Button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}
