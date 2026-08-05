'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone, ShieldCheck, Clock, Calendar } from 'lucide-react';
import { ChatMessage } from '../../types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    sender: 'ai',
    text: 'Xin chào! Em là **Trợ lý AI Garage & Sửa Chữa**. 🛠️\n\nEm có thể hỗ trợ báo giá dịch vụ, dự đoán nguyên nhân sự cố xe và tra cứu tiến độ sửa chữa realtime. Bạn cần hỗ trợ thông tin gì ạ?',
    timestamp: new Date(),
  },
];

const QUICK_REPLIES = [
  { label: 'Tôi muốn báo giá', query: 'Tôi muốn xem báo giá sửa chữa xe' },
  { label: 'Kiểm tra tiến độ xe', query: 'Tôi muốn tra cứu tiến độ sửa xe của tôi' },
  { label: 'Đặt lịch bảo dưỡng', query: 'Tôi muốn đặt lịch hẹn bảo dưỡng gấp' },
  { label: 'Garage ở đâu?', query: 'Địa chỉ chi nhánh garage gần nhất' },
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  // AI response engine
  const getAiAnswer = (queryStr: string): string => {
    const text = queryStr.toLowerCase().trim();

    if (text.includes('báo giá') || text.includes('giá')) {
      return 'Dạ, bảng giá tham khảo các dịch vụ phổ biến:\n- **Thay nhớt máy chính hãng**: từ 150.000đ - 350.000đ\n- **Vệ sinh nồi & Kim phun xăng (FI)**: 250.000đ\n- **Thay Bugi Iridium cao cấp**: 120.000đ - 220.000đ\n- **Thay dĩa phanh & bố phanh**: 200.000đ - 450.000đ\n\nBạn có thể nhấn vào mục **Bảng Giá Dịch Vụ** trên menu để xem thêm chi tiết!';
    }
    if (text.includes('tiến độ') || text.includes('tra cứu')) {
      return 'Dạ để tra cứu tiến độ sửa chữa xe realtime:\n1. Vui lòng vào trang **Tra Cứu Tiến Độ** trên thanh điều hướng.\n2. Nhập **Mã phiếu sửa** hoặc **Số điện thoại** đăng ký.\n3. Hệ thống sẽ hiển thị nấc tiến độ từ Kiểm tra -> Đang sửa -> Chờ giao xe.';
    }
    if (text.includes('đặt lịch') || text.includes('hẹn')) {
      return 'Dạ bạn có thể cuộn xuống phần **Form Đặt Lịch Nhanh** trên trang chủ hoặc chọn mục **Đặt Lịch** trên thanh menu để chọn ngày giờ và nhận ưu đãi giảm 10% công sửa chữa ạ!';
    }
    if (text.includes('địa chỉ') || text.includes('garage') || text.includes('ở đâu')) {
      return 'Dạ Garage chúng em có các chi nhánh:\n- **CN1**: 123 Đường Ba Tháng Hai, P.11, Q.10, TP.HCM\n- **CN2**: 456 Nguyễn Văn Cừ, Long Biên, Hà Nội\n- Giờ mở cửa: **8:00 - 20:00** tất cả các ngày trong tuần.';
    }

    return 'Dạ em đã ghi nhận thông tin của bạn. Kỹ thuật viên của garage đang phân tích thêm. Bạn có thể để lại số điện thoại hoặc đặt lịch trực tiếp trên trang chủ để nhận tư vấn nhanh nhất ạ!';
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const fullAnswer = getAiAnswer(text);
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        text: fullAnswer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="relative p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          aria-label="Open AI Chatbot"
        >
          <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          
          {/* Red unread message dot badge */}
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-bounce">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            </span>
          )}
        </button>
      )}

      {/* Floating Chat Drawer / Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-2xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  FixCare AI Assistant
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                </h4>
                <p className="text-[11px] text-blue-100">Hỗ trợ chẩn đoán & báo giá 24/7</p>
              </div>
            </div>
            <button
              onClick={toggleOpen}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-2xl w-fit rounded-bl-none">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                <span className="text-xs text-gray-500 font-medium">AI đang gõ...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="p-2.5 bg-white border-t border-gray-100 flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(reply.query)}
                className="text-[11px] px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full font-medium transition cursor-pointer border border-blue-100"
              >
                ✦ {reply.label}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Hỏi AI bất kỳ triệu chứng hay dịch vụ nào..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-gray-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
