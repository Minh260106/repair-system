'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/store/auth-context';
import ApiClient from '@/lib/api/client';
import { OrderItem, Review } from '@/types';

export default function PortalReviewsPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-8890');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const fetchData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [userOrders, publicRevs] = await Promise.all([
        ApiClient.getMyOrders(currentUser.id),
        ApiClient.getPublicReviews(),
      ]);
      setOrders(userOrders);
      setReviews(publicRevs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !currentUser) return;

    setIsSubmitting(true);
    setSuccessMsg('');
    try {
      await ApiClient.createReview({
        orderId: selectedOrderId,
        customerId: currentUser.id,
        customerName: currentUser.name,
        rating,
        comment,
        isPublic,
      });

      setSuccessMsg('Đã gửi đánh giá thành công! Cảm ơn ý kiến của bạn.');
      setComment('');
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Star className="w-7 h-7 text-yellow-500 fill-yellow-500" />
          <span>Đánh Giá Dịch Vụ Sửa Chữa</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Nhận xét chất lượng phục vụ của kỹ thuật viên để giúp garage không ngừng nâng cao chất lượng.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Review Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md space-y-6">
          <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Viết Đánh Giá Mới</span>
          </h2>

          {successMsg && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-5">
            {/* Order selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Chọn đơn sửa chữa
              </label>
              <select
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ORD-8890">#ORD-8890 (Honda SH 150i - Thay nhớt & Bảo dưỡng nồi)</option>
                <option value="ORD-8892">#ORD-8892 (Honda SH 150i ABS - Vệ sinh kim phun FI)</option>
              </select>
            </div>

            {/* Rating Stars */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Đánh giá mức độ hài lòng
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-125 transition duration-150 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 ml-2">
                  {rating === 5 ? 'Rất hài lòng ⭐⭐⭐⭐⭐' : `${rating} sao`}
                </span>
              </div>
            </div>

            {/* Comment Textarea */}
            <Textarea
              label="Ý kiến đánh giá / Nhận xét của bạn"
              placeholder="Chia sẻ trải nghiệm về thái độ phục vụ, tay nghề thợ, thời gian sửa chữa..."
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
              rows={4}
              required
            />

            {/* Public checkbox */}
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Cho phép hiển thị đánh giá này công khai trên trang chủ Garage</span>
            </label>

            <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full text-xs py-3" rightIcon={<Send className="w-4 h-4" />}>
              Gửi nhận xét đánh giá
            </Button>
          </form>
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          <h2 className="font-extrabold text-base text-slate-900 dark:text-white">Đánh Giá Của Khách Hàng Đã Gửi</h2>
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{rev.customerName}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">&ldquo;{rev.comment}&rdquo;</p>
                <span className="text-[10px] text-slate-400 block pt-1">{rev.createdAt}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
