'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter, Wrench, Eye, Edit3, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Select } from '../../../components/ui/select';
import { mockOrders, mockMechanics } from '../../../lib/mock/data';
import { OrderItem, OrderStatus } from '../../../types';

export default function RepairOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(mockOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const filteredOrders = orders.filter((ord) => {
    const matchSearch =
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(search.toLowerCase()) ||
      ord.vehiclePlate.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || ord.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Phiếu Sửa Chữa (#ORD)
          </h1>
          <p className="text-sm text-gray-500">
            Theo dõi nấc quy trình sửa chữa, gán thợ & cập nhật trạng thái realtime.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Tạo phiếu sửa mới
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="w-full md:w-80">
          <Input
            placeholder="Tìm theo mã phiếu, tên khách, biển số..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>

        <div className="w-full md:w-64">
          <Select
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'inspecting', label: 'Đang kiểm tra' },
              { value: 'repairing', label: 'Đang sửa' },
              { value: 'ready_to_deliver', label: 'Chờ giao xe' },
              { value: 'completed', label: 'Đã hoàn thành' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Repair Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 border-b border-gray-200 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Mã Phiếu</th>
                <th className="py-3.5 px-4">Khách Hàng</th>
                <th className="py-3.5 px-4">Dòng Xe & Biển Số</th>
                <th className="py-3.5 px-4">Triệu Chứng</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Thợ Phụ Trách</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50 transition">
                  <td className="py-4 px-4 font-bold text-blue-600">{ord.orderNumber}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-900">{ord.customerName}</div>
                    <div className="text-xs text-gray-500">{ord.customerPhone}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-800">{ord.vehicleModel}</div>
                    <div className="text-xs font-mono text-gray-500">{ord.vehiclePlate}</div>
                  </td>
                  <td className="py-4 px-4 max-w-xs text-xs text-gray-600 truncate">
                    {ord.symptoms}
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      statusText={
                        ord.status === 'inspecting'
                          ? 'Đang kiểm tra'
                          : ord.status === 'repairing'
                          ? 'Đang sửa'
                          : 'Chờ giao'
                      }
                    />
                  </td>
                  <td className="py-4 px-4 text-xs font-medium text-gray-700">
                    {ord.assignedMechanicName || 'Chưa gán'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(ord)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 max-w-2xl w-full p-6 space-y-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Chi Tiết Phiếu #{selectedOrder.orderNumber}</h3>
                <p className="text-xs text-gray-500">Tạo lúc: {selectedOrder.dateCreated}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                Đóng ✕
              </Button>
            </div>

            {/* Customer & Vehicle Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl text-xs space-y-1">
              <div>
                <p className="text-gray-400 font-medium">Khách hàng:</p>
                <p className="font-bold text-gray-900 text-sm">{selectedOrder.customerName}</p>
                <p className="text-gray-600">{selectedOrder.customerPhone}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Phương tiện:</p>
                <p className="font-bold text-gray-900 text-sm">{selectedOrder.vehicleModel}</p>
                <p className="font-mono text-blue-600 font-bold">{selectedOrder.vehiclePlate}</p>
              </div>
            </div>

            {/* Update Status Actions */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Chuyển Nấc Trạng Thái
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedOrder.status === 'inspecting' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'inspecting')}
                >
                  1. Đang kiểm tra
                </Button>
                <Button
                  variant={selectedOrder.status === 'repairing' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'repairing')}
                >
                  2. Đang sửa
                </Button>
                <Button
                  variant={selectedOrder.status === 'ready_to_deliver' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'ready_to_deliver')}
                >
                  3. Chờ giao xe
                </Button>
              </div>
            </div>

            {/* AI Diagnostic Result if present */}
            {selectedOrder.aiDiagnosticCause && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">Chẩn đoán AI</span>
                <p className="text-xs font-semibold text-purple-900">{selectedOrder.aiDiagnosticCause}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
