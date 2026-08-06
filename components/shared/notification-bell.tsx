'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Bell, CheckCircle2, AlertTriangle, Info, XCircle, Check } from 'lucide-react';
import { NotificationItem } from '@/types';
import ApiClient from '@/lib/api/client';
import { useAuth } from '@/store/auth-context';

export const NotificationBell: React.FC = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifs = useCallback(async () => {
    try {
      const data = await ApiClient.getNotifications(currentUser?.id || 'usr-admin');
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchNotifs();
  }, [fetchNotifs]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await ApiClient.markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
      default: return <Info className="w-4 h-4 text-blue-500 shrink-0" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
        aria-label="Thông báo"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-slideUp">
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Thông Báo</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  {unreadCount} mới
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
              }}
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Đánh dấu tất cả đã đọc
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-800">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400">Không có thông báo nào</div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3.5 flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${
                    !notif.isRead ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {getIcon(notif.type)}
                    <div className="space-y-1">
                      {notif.link ? (
                        <Link
                          href={notif.link}
                          onClick={() => setIsOpen(false)}
                          className="font-bold text-xs text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 block leading-tight"
                        >
                          {notif.title}
                        </Link>
                      ) : (
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">
                          {notif.title}
                        </h4>
                      )}
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">{notif.message}</p>
                      <span className="text-[10px] text-gray-400 block">{notif.createdAt}</span>
                    </div>
                  </div>

                  {!notif.isRead && (
                    <button
                      onClick={(e) => handleMarkAsRead(notif.id, e)}
                      className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg shrink-0"
                      title="Đánh dấu đã đọc"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
