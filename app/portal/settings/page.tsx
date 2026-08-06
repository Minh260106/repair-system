'use client';

import React, { useState } from 'react';
import {
  Settings, User, Lock, Bell, Car, CreditCard, Palette,
  ShieldCheck, CheckCircle2, Save, Moon, Sun, Globe,
  Smartphone, Mail, Plus, Trash2, QrCode, Sliders, ChevronRight, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/store/auth-context';
import { useTheme } from '@/components/theme-provider';

type SettingTab = 'profile' | 'security' | 'notifications' | 'vehicles' | 'payments' | 'appearance';

export default function PortalSettingsPage() {
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<SettingTab>('profile');
  const [toast, setToast] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Form states - Profile
  const [name, setName] = useState(currentUser?.name || 'Nguyễn Văn Tuấn');
  const [email] = useState(currentUser?.email || 'tuan.nguyen@gmail.com');
  const [phone, setPhone] = useState(currentUser?.phone || '0988 123 456');
  const [address, setAddress] = useState(currentUser?.address || '147 Lý Thường Kiệt, Phường 7, Quận 11, TP.HCM');

  // Form states - Password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Form states - Notifications
  const [notifySms, setNotifySms] = useState(true);
  const [notifyZalo, setNotifyZalo] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [notifyAiReminders, setNotifyAiReminders] = useState(true);

  // Form states - Payment & Billing
  const [taxId, setTaxId] = useState('0314889922');
  const [companyName, setCompanyName] = useState('Công ty TNHH Giải Pháp Công Nghệ AutoFix');

  const showSuccessToast = (msg: string) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToast(msg);
      setTimeout(() => setToast(''), 3000);
    }, 500);
  };

  const menuCategories = [
    {
      id: 'profile' as SettingTab,
      label: 'Thông Tin Cá Nhân',
      sublabel: 'Tên, SĐT, email & địa chỉ nhận xe',
      icon: User,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400',
    },
    {
      id: 'security' as SettingTab,
      label: 'Bảo Mật & Mật Khẩu',
      sublabel: 'Mật khẩu, xác thực 2 lớp & phiên làm việc',
      icon: Lock,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400',
    },
    {
      id: 'notifications' as SettingTab,
      label: 'Cấu Hình Thông Báo',
      sublabel: 'Cập nhật tiến độ qua SMS, Zalo, AI Alert',
      icon: Bell,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400',
    },
    {
      id: 'vehicles' as SettingTab,
      label: 'Quản Lý Xe Của Tôi',
      sublabel: 'Danh sách xe đặt lịch & nhắc bảo dưỡng',
      icon: Car,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
    {
      id: 'payments' as SettingTab,
      label: 'Ví & Thanh Toán',
      sublabel: 'Liên kết MoMo, VNPay, hóa đơn VAT',
      icon: CreditCard,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400',
    },
    {
      id: 'appearance' as SettingTab,
      label: 'Giao Diện & Cài Đặt',
      sublabel: 'Chế độ Sáng/Tối, ngôn ngữ & hiển thị',
      icon: Palette,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-blue-600" />
            <span>Danh Mục Cài Đặt Hệ Thống</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tùy chỉnh thông tin tài khoản, thông báo tiến độ sửa xe và tùy chọn giao diện cá nhân.
          </p>
        </div>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-md animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Grid: Left Category Navigation Menu & Right Category Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Category Selection Menu */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-md space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
            Danh Mục Cài Đặt
          </h2>

          <nav className="space-y-1">
            {menuCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full p-3 rounded-2xl text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                        isActive ? 'bg-white/20 text-white' : cat.color
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className={`font-bold text-xs truncate ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {cat.label}
                      </h3>
                      <p className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {cat.sublabel}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white translate-x-0.5' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Column: Settings Content Form based on Selected Category */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Cập Nhật Thông Tin Cá Nhân</span>
                </h2>
                <p className="text-xs text-slate-500">Quản lý họ tên, số điện thoại và địa chỉ giao/nhận xe mặc định.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showSuccessToast('Đã lưu thành công thông tin cá nhân!');
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Họ và tên khách hàng"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Số điện thoại liên hệ"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Địa chỉ Email"
                    value={email}
                    disabled
                    className="opacity-70 bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
                  />
                  <Input
                    label="Địa chỉ giao/nhận xe tại nhà"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
                    Lưu Thay Đổi Hồ Sơ
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-600" />
                  <span>Bảo Mật Tài Khoản & Mật Khẩu</span>
                </h2>
                <p className="text-xs text-slate-500">Đổi mật khẩu định kỳ để tăng cường độ an toàn cho tài khoản.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newPassword !== confirmPassword) {
                    alert('Mật khẩu mới không khớp!');
                    return;
                  }
                  showSuccessToast('Đổi mật khẩu thành công!');
                  setOldPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                className="space-y-4 max-w-md"
              >
                <Input
                  label="Mật khẩu hiện tại"
                  type="password"
                  placeholder="••••••••"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <Input
                  label="Mật khẩu mới"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <Input
                  label="Xác nhận mật khẩu mới"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
                    Cập Nhật Mật Khẩu Mới
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-500" />
                  <span>Cấu Hình Nhận Thông Báo Tiến Độ</span>
                </h2>
                <p className="text-xs text-slate-500">Lựa chọn các kênh nhận tin khi xe đang trong quá trình bảo dưỡng & sửa chữa.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-500" /> Tin nhắn SMS tin nhắn tiếp nhận & bàn giao xe
                    </h3>
                    <p className="text-[11px] text-slate-500">Tự động gửi SMS báo khi xe hoàn tất sửa chữa.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifySms}
                    onChange={(e) => setNotifySms(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-500" /> Thông báo Zalo ZNS kèm ảnh thực tế
                    </h3>
                    <p className="text-[11px] text-slate-500">Gửi hình ảnh linh kiện thay thế & tiến độ qua Zalo Official Account.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyZalo}
                    onChange={(e) => setNotifyZalo(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-500" /> Hóa đơn VAT điện tử qua Email
                    </h3>
                    <p className="text-[11px] text-slate-500">Tự động đính kèm file PDF hóa đơn đỏ VAT sau khi thanh toán.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-500" /> Cảnh báo AI nhắc lịch thay nhớt định kỳ
                    </h3>
                    <p className="text-[11px] text-slate-500">Trợ lý AI phân tích số km và gửi thông báo nhắc lịch thay nhớt máy & nhớt láp.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyAiReminders}
                    onChange={(e) => setNotifyAiReminders(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button onClick={() => showSuccessToast('Đã lưu cấu hình thông báo!')} variant="primary" leftIcon={<Save className="w-4 h-4" />}>
                  Lưu Cấu Hình Thông Báo
                </Button>
              </div>
            </div>
          )}

          {/* TAB 4: VEHICLES */}
          {activeTab === 'vehicles' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <Car className="w-5 h-5 text-emerald-600" />
                    <span>Quản Lý Xe Của Tôi</span>
                  </h2>
                  <p className="text-xs text-slate-500">Danh sách các xe máy, ô tô đã được lưu mặc định trong tài khoản.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-slate-900 dark:text-white">Honda SH 150i ABS (Xe Mặc Định)</h3>
                      <p className="text-[11px] text-slate-500">Biển số: 59-P1 888.88 • ODO: 12.500 km</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full">
                    Đang hoạt động
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-slate-900 dark:text-white">Vespa Sprint 125 3V i-Get</h3>
                      <p className="text-[11px] text-slate-500">Biển số: 59-S2 666.66 • ODO: 8.200 km</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => showSuccessToast('Đã đặt Vespa thành xe mặc định!')}>
                    Đặt mặc định
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  <span>Ví & Xuất Hóa Đơn VAT</span>
                </h2>
                <p className="text-xs text-slate-500">Cấu hình thông tin mã số thuế công ty để tự động xuất hóa đơn đỏ VAT.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showSuccessToast('Đã lưu thông tin hóa đơn VAT!');
                }}
                className="space-y-4 max-w-lg"
              >
                <Input
                  label="Tên Công Ty / Đơn Vị Xuất Hóa Đơn"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
                <Input
                  label="Mã Số Thuế (MST)"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  required
                />

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
                    Lưu Thông Tin Hóa Đơn VAT
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: APPEARANCE */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-rose-500" />
                  <span>Giao Diện & Chế Độ Hiển Thị</span>
                </h2>
                <p className="text-xs text-slate-500">Tùy chỉnh giao diện Sáng / Tối và ngôn ngữ hiển thị hệ thống.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      {theme === 'dark' ? <Moon className="w-4 h-4 text-yellow-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                      Chế độ màu Giao diện (Theme)
                    </h3>
                    <p className="text-[11px] text-slate-500">Hiện tại: {theme === 'dark' ? 'Chế độ Tối (Dark Mode)' : 'Chế độ Sáng (Light Mode)'}</p>
                  </div>
                  <Button onClick={toggleTheme} variant="outline" size="sm">
                    {theme === 'dark' ? 'Chuyển sang Sáng ☀️' : 'Chuyển sang Tối 🌙'}
                  </Button>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" /> Ngôn ngữ hiển thị
                    </h3>
                    <p className="text-[11px] text-slate-500">Tiếng Việt (Mặc định)</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs rounded-full">
                    Tiếng Việt
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
