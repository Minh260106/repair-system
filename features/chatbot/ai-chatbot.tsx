'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone, AlertCircle, Wrench, ShieldAlert } from 'lucide-react';
import { ChatMessage } from '../../types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    sender: 'ai',
    text: 'Xin chào! Em là **Trợ lý AI Hỗ trợ Sửa chữa** của FixCare. 🛠️\n\nEm có thể hỗ trợ kiểm tra nhanh giá linh kiện, dự đoán lỗi thiết bị và thời gian bảo hành. Anh/Chị đang gặp sự cố với thiết bị nào ạ?',
    timestamp: new Date()
  }
];

const PRESETS = [
  { label: 'Thay màn hình iPhone 13?', query: 'giá thay màn hình iphone 13' },
  { label: 'Thay pin MacBook Pro M1?', query: 'giá thay pin macbook pro m1' },
  { label: 'Ép kính Galaxy S23 Ultra?', query: 'ép kính samsung galaxy s23 ultra' },
  { label: 'Laptop không lên nguồn?', query: 'sửa laptop không lên nguồn' },
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // AI responses dictionary
  const getAiAnswer = (queryStr: string): string => {
    const text = queryStr.toLowerCase().trim();
    
    if (text.includes('màn hình') && text.includes('iphone 13')) {
      return 'Dạ, giá thay màn hình chính hãng bóc máy cho **iPhone 13** tại FixCare hiện tại là **4.200.000đ** (đã bao gồm công thợ tháo lắp, bảo hành màn hình cảm ứng 6 tháng một đổi một). \n- Thời gian sửa: 30 - 45 phút lấy ngay trước mặt khách hàng.';
    }
    if (text.includes('pin') && text.includes('macbook') && (text.includes('m1') || text.includes('2020'))) {
      return 'Dạ, chi phí thay pin cho dòng **MacBook Pro 2020 M1** tại FixCare hiện tại là **2.100.000đ**.\n- Thời gian sửa: 60 - 90 phút.\n- Bảo hành: 12 tháng.\n- Quà tặng kèm: Vệ sinh máy + tra keo tản nhiệt CPU chất lượng cao miễn phí.';
    }
    if (text.includes('kính') && text.includes('s23') && text.includes('ultra')) {
      return 'Dạ, dịch vụ ép mặt kính Gorilla Glass bên ngoài cho **Samsung Galaxy S23 Ultra** là **1.450.000đ**.\n- Thời gian sửa: 90 - 120 phút.\n- Bảo hành: 12 tháng về lỗi hở keo, bọt khí.\n\n*Lưu ý: Màn hình hiển thị và cảm ứng bên trong của máy phải còn hoạt động bình thường, không bị chảy mực hay sọc kẻ.*';
    }
    if (text.includes('nguồn') || (text.includes('laptop') && text.includes('không lên'))) {
      return 'Dạ, đối với lỗi **Laptop không lên nguồn**, chi phí sửa chữa dao động từ **350.000đ - 1.200.000đ** tùy thuộc vào nguyên nhân cụ thể (hỏng IC nguồn, chạm nguồn trên mainboard, lỗi nguồn sạc hay lỗi pin).\n- Kỹ thuật viên của chúng tôi sẽ tháo máy đo đạc dòng điện và báo lỗi MIỄN PHÍ trước khi báo giá chính xác.\n- Thời gian kiểm tra: 30 - 60 phút.';
    }
    if (text.includes('pin')) {
      return 'Chào bạn, hiện FixCare cung cấp thay pin chính hãng Pisen, Orizin cho nhiều dòng iPhone, Samsung, MacBook. Giá thay dao động từ **350.000đ - 2.500.000đ** tùy model. Bạn cần tìm giá pin cho model máy cụ thể nào ạ?';
    }
    if (text.includes('màn hình')) {
      return 'Chào bạn, FixCare thay màn hình các dòng điện thoại, máy tính bảng và laptop. Giá dao động từ **850.000đ** đến các dòng cao cấp 8-9 triệu đồng. Bạn vui lòng cung cấp model cụ thể để em báo giá chính xác nhé!';
    }
    if (text.includes('macbook')) {
      return 'Chào bạn, đối với MacBook, FixCare chuyên sửa các lỗi: hỏng bàn phím, chai pin, sọc màn hình, lỗi nguồn mainboard... Linh kiện luôn cam kết chất lượng tốt nhất kèm bảo hành 6 - 12 tháng.';
    }

    return 'Em đã nhận câu hỏi của bạn. Dựa trên dữ liệu chẩn đoán nhanh của AI:\n- Triệu chứng lỗi này cần được đo đạc dòng điện nội vi để xác định chạm linh kiện hay lỗi phần cứng.\n- Thời gian sửa dự kiến: **30 phút - 2 tiếng** tùy độ phức tạp.\n- Anh/Chị có thể mang máy đến chi nhánh gần nhất để kỹ thuật viên kiểm tra **MIỄN PHÍ** hoặc liên hệ Hotline **1800 2056** để nhân viên hỗ trợ trực tiếp ngay nhé!';
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and streaming response
    setTimeout(() => {
      const fullAnswer = getAiAnswer(text);
      const aiMsgId = `msg-${Date.now()}-ai`;
      
      // Initialize empty AI message
      const aiMsgPlaceholder: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: '',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, aiMsgPlaceholder]);
      setIsTyping(false);

      // Simulated streaming generator
      const words = fullAnswer.split(' ');
      let currentWordIndex = 0;
      let currentText = '';

      // TODO: In production, replace this interval streaming logic with a real EventSource or stream reader fetch loop:
      // const response = await fetch('/api/chatbot', { method: 'POST', body: JSON.stringify({ message: text }) });
      // const reader = response.body.getReader();
      const interval = setInterval(() => {
        if (currentWordIndex < words.length) {
          currentText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: currentText } : msg))
          );
          currentWordIndex++;
        } else {
          clearInterval(interval);
        }
      }, 40); // 40ms per word creates a highly realistic stream pace
    }, 1000);
  };

  // Render text containing markdown-like bold format **bold**
  const renderMessageText = (text: string) => {
    if (!text) return '';
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 no-print flex flex-col items-end">
      
      {/* Chat Widget Panel */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[80vh] sm:max-h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-slide-up">
          
          {/* Chat Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white relative">
                <Wrench className="w-4.5 h-4.5" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-slate-900 animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-bold text-xs flex items-center gap-1.5">
                  Chẩn Đoán Lỗi AI <Sparkles className="w-3 h-3 text-accent fill-accent" />
                </h3>
                <span className="text-[10px] text-slate-400">FixCare AI Assistant • Trực tuyến</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Screen Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 select-none text-[10px] font-black">
                    AI
                  </div>
                )}
                
                <div className="flex flex-col gap-1.5">
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-sm border ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white border-primary rounded-tr-none'
                        : 'bg-white dark:bg-slate-900 text-foreground border-slate-100 dark:border-slate-800/80 rounded-tl-none'
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                  <span className="text-[9px] text-muted self-end">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 text-[10px] font-black">
                  AI
                </div>
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800/80 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Preset Queries */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80">
              <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1.5">Gợi ý câu hỏi:</p>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.query)}
                    className="text-[10px] font-semibold text-slate-750 dark:text-slate-300 bg-slate-100 dark:bg-slate-850 hover:bg-primary-light/50 hover:text-primary dark:hover:bg-primary-light/10 border border-slate-200 dark:border-slate-800 rounded-full px-2.5 py-1 transition cursor-pointer text-left"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Chat Inputs & Disclaimer */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {/* Input Row */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập triệu chứng lỗi hoặc tên dòng máy..."
                className="flex-1 py-2 px-3.5 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-850 rounded-xl text-xs text-foreground placeholder:text-muted/70 outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-primary hover:bg-primary-hover disabled:bg-slate-200 dark:disabled:bg-slate-850 disabled:text-muted rounded-xl text-white transition shrink-0 cursor-pointer shadow-sm active:scale-95"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            
            {/* Escalation links & Disclaimer */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-850 pt-2 text-[10px] text-muted leading-tight">
              <span className="flex items-center gap-1 max-w-[70%] select-none">
                <AlertCircle className="w-3.5 h-3.5 text-warning shrink-0" />
                <span>Giá dự kiến, có thể thay đổi sau kiểm tra thực tế.</span>
              </span>
              
              <a
                href="tel:18002056"
                className="flex items-center gap-0.5 font-bold text-accent hover:underline shrink-0"
              >
                <Phone className="w-3 h-3" />
                <span>Gọi kỹ thuật</span>
              </a>
            </div>
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-xl shadow-primary/25 cursor-pointer transform active:scale-95 transition-all duration-300 relative border-2 border-white dark:border-slate-900"
        aria-label="Open AI assistant"
      >
        {isOpen ? <X className="w-5.5 h-5.5" /> : <MessageSquare className="w-5.5 h-5.5" />}
        {!isOpen && (
          <span className="absolute -top-1.5 -right-1 bg-accent text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white dark:border-slate-900 text-white animate-bounce shadow-md">
            AI
          </span>
        )}
      </button>

    </div>
  );
}
