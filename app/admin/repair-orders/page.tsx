'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Wrench, Eye, Edit3, CheckCircle2, LayoutGrid, List, User, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { OrderItem, OrderStatus, Mechanic } from '@/types';
import ApiClient from '@/lib/api/client';

const KANBAN_COLUMNS: { status: OrderStatus; label: string; color: string }[] = [
  { status: 'received', label: 'Tiếp nhận', color: 'border-t-blue-500' },
  { status: 'inspecting', label: 'Đang kiểm tra', color: 'border-t-yellow-500' },
  { status: 'waiting_parts', label: 'Chờ linh kiện', color: 'border-t-purple-500' },
  { status: 'repairing', label: 'Đang sửa', color: 'border-t-amber-500' },
  { status: 'ready_to_deliver', label: 'Sẵn sàng giao', color: 'border-t-emerald-500' },
  { status: 'completed', label: 'Hoàn thành', color: 'border-t-gray-400' },
];

export default function RepairOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modals
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderItem | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [assignedMechanicId, setAssignedMechanicId] = useState('');
  const [totalPrice, setTotalPrice] = useState('350000');
  const [status, setStatus] = useState<OrderStatus>('received');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const [reassignmentNotice, setReassignmentNotice] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [orderData, mechData] = await Promise.all([
        ApiClient.getOrders(),
        ApiClient.getMechanics()
      ]);
      setOrders(orderData);
      setMechanics(mechData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMechanicSelectChange = (selectedId: string) => {
    const selectedMech = mechanics.find((m) => m.id === selectedId);
    if (selectedMech && selectedMech.status !== 'rảnh') {
      const availableMech = mechanics.find((m) => m.status === 'rảnh' && m.id !== selectedId);
      if (availableMech) {
        setAssignedMechanicId(availableMech.id);
        setReassignmentNotice(
          `⚠️ Thợ ${selectedMech.name} đang bận (${selectedMech.status === 'đang làm' ? 'Đang sửa xe khác' : 'Nghỉ phép'}). Đã tự động điều chuyển cho thợ rảnh: ${availableMech.name}`
        );
      } else {
        setAssignedMechanicId(selectedId);
        setReassignmentNotice(`⚠️ Tất cả thợ hiện đều đang bận. Đơn sẽ ở trạng thái chờ xếp lịch.`);
      }
    } else {
      setAssignedMechanicId(selectedId);
      setReassignmentNotice('');
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    const ord = orders.find((o) => o.id === orderId);
    const updated = await ApiClient.updateOrder(orderId, {
      assignmentStatus: 'accepted',
      status: 'repairing',
    });

    if (ord?.assignedMechanicId) {
      setMechanics((prev) =>
        prev.map((m) => (m.id === ord.assignedMechanicId ? { ...m, status: 'đang làm', currentOrderId: ord.orderNumber } : m))
      );
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, assignmentStatus: 'accepted', status: 'repairing' } : o))
    );
    setToast(`✅ Kỹ thuật viên ${ord?.assignedMechanicName || ''} đã chấp nhận tiếp nhận đơn #${ord?.orderNumber}!`);
    setTimeout(() => setToast(''), 3500);
  };

  const handleDeclineOrder = async (orderId: string) => {
    const ord = orders.find((o) => o.id === orderId);
    const availableMech = mechanics.find((m) => m.status === 'rảnh' && m.id !== ord?.assignedMechanicId);

    const updated = await ApiClient.updateOrder(orderId, {
      assignmentStatus: 'declined',
      assignedMechanicId: availableMech?.id,
      assignedMechanicName: availableMech ? availableMech.name : 'Chưa gán thợ',
      status: 'waiting_parts',
    });

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              assignmentStatus: 'declined',
              assignedMechanicId: availableMech?.id,
              assignedMechanicName: availableMech ? availableMech.name : 'Chưa gán thợ',
              status: 'waiting_parts',
            }
          : o
      )
    );

    setToast(
      `⚠️ Kỹ thuật viên ${ord?.assignedMechanicName || ''} đã từ chối nhận đơn #${ord?.orderNumber}. ${
        availableMech ? `Đã chuyển cho thợ rảnh ${availableMech.name}!` : 'Đơn đã được chuyển về hàng chờ điều phối!'
      }`
    );
    setTimeout(() => setToast(''), 3500);
  };

  const filteredOrders = orders.filter((ord) => {
    const matchSearch =
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(search.toLowerCase()) ||
      ord.vehiclePlate.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || ord.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await ApiClient.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateModal = () => {
    setEditingOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    setVehicleModel('Honda SH 150i');
    setVehiclePlate('59-P1 888.88');
    setSymptoms('');
    setAssignedMechanicId(mechanics[0]?.id || '');
    setTotalPrice('350000');
    setStatus('received');
    setIsEditModalOpen(true);
  };

  const openEditModal = (ord: OrderItem) => {
    setEditingOrder(ord);
    setCustomerName(ord.customerName);
    setCustomerPhone(ord.customerPhone);
    setVehicleModel(ord.vehicleModel);
    setVehiclePlate(ord.vehiclePlate);
    setSymptoms(ord.symptoms);
    setAssignedMechanicId(ord.assignedMechanicId || mechanics[0]?.id || '');
    setTotalPrice(ord.totalPrice ? ord.totalPrice.toString() : '350000');
    setStatus(ord.status);
    setIsEditModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !vehiclePlate.trim() || !symptoms.trim()) return;

    setIsSubmitting(true);
    const mech = mechanics.find((m) => m.id === assignedMechanicId);

    try {
      if (editingOrder) {
        const updated = await ApiClient.updateOrder(editingOrder.id, {
          customerName,
          customerPhone,
          vehicleModel,
          vehiclePlate,
          symptoms,
          assignedMechanicId: mech?.id,
          assignedMechanicName: mech?.name || 'Nguyễn Văn Nam',
          totalPrice: parseInt(totalPrice) || 0,
          status,
        });
        setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
        if (selectedOrder?.id === updated.id) {
          setSelectedOrder(updated);
        }
        setToast(`Đã cập nhật phiếu #${updated.orderNumber}!`);
      } else {
        const created = await ApiClient.createOrder({
          customerId: `cust-${Date.now()}`,
          customerName,
          customerPhone,
          vehicleModel,
          vehiclePlate,
          symptoms,
          branchId: 'br-1',
          estimatedCompletion: '18:00 Hôm nay',
          assignedMechanicId: mech?.id,
          assignedMechanicName: mech?.name || 'Nguyễn Văn Nam',
          totalPrice: parseInt(totalPrice) || 0,
          status,
          services: [
            { serviceId: 'srv-1', serviceName: 'Bảo dưỡng tổng quát & Thay nhớt', price: parseInt(totalPrice) || 350000 }
          ]
        });

        setOrders((prev) => [created, ...prev]);
        setToast(`Đã tạo phiếu sửa #${created.orderNumber} mới!`);
      }

      setIsEditModalOpen(false);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    e.dataTransfer.setData('orderId', orderId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: OrderStatus) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('orderId');
    if (orderId) {
      handleUpdateStatus(orderId, targetStatus);
    }
  };

  const pendingAcceptanceOrders = orders.filter((o) => o.assignmentStatus === 'pending_acceptance');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-7 h-7 text-blue-600" />
            <span>Quản Lý Phiếu Sửa Chữa (#ORD)</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Theo dõi nấc quy trình sửa chữa dạng Bảng Kanban kéo-thả, chỉnh sửa thông tin khách hàng & gán thợ.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Bảng</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Danh sách</span>
            </button>
          </div>

          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={openCreateModal}>
            Tạo phiếu mới
          </Button>
        </div>
      </div>

      {/* Technician Pending Assignment Notification Banner */}
      {pendingAcceptanceOrders.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 space-y-3 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Yêu Cầu Phân Công Đơn Hàng Dành Cho Kỹ Thuật Viên ({pendingAcceptanceOrders.length} đơn chờ duyệt)</span>
            </h3>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">Tài Khoản Kỹ Thuật Viên</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingAcceptanceOrders.map((ord) => (
              <div key={ord.id} className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">#{ord.orderNumber}</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{ord.vehicleModel}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Khách: {ord.customerName} ({ord.customerPhone})</p>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate">Phân công cho: {ord.assignedMechanicName || 'Kỹ thuật viên'}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => handleAcceptOrder(ord.id)}
                    className="text-[11px] py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    ✓ Nhận đơn
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeclineOrder(ord.id)}
                    className="text-[11px] py-1.5 px-3 border-rose-300 text-rose-600 hover:bg-rose-50 font-bold"
                  >
                    ✕ Từ chối
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Filter & Search Bar - Compact without waste */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
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
              { value: 'received', label: 'Tiếp nhận' },
              { value: 'inspecting', label: 'Đang kiểm tra' },
              { value: 'waiting_parts', label: 'Chờ linh kiện' },
              { value: 'repairing', label: 'Đang sửa' },
              { value: 'ready_to_deliver', label: 'Sẵn sàng giao' },
              { value: 'completed', label: 'Đã hoàn thành' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>

      {/* KANBAN VIEW - Optimized without dead space */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {KANBAN_COLUMNS.map((col) => {
            const colOrders = filteredOrders.filter((ord) => ord.status === col.status);
            return (
              <div
                key={col.status}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.status)}
                className={`bg-slate-100 dark:bg-slate-900/60 p-3 rounded-2xl border-t-4 ${col.color} border-x border-b border-gray-200 dark:border-slate-800 flex flex-col min-h-[320px] gap-2.5 transition`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-slate-800">
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">
                    {col.label}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                    {colOrders.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="flex-1 space-y-2.5">
                  {colOrders.map((ord) => (
                    <div
                      key={ord.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, ord.id)}
                      onClick={() => setSelectedOrder(ord)}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/50 cursor-grab active:cursor-grabbing transition space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-blue-600 dark:text-blue-400 font-mono">
                          {ord.orderNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold text-gray-700 dark:text-gray-300">
                          {ord.vehiclePlate}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">
                          {ord.customerName}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                          {ord.vehicleModel}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-gray-500">
                        <span className="flex items-center gap-1 font-medium">
                          <User className="w-3 h-3 text-gray-400" />
                          {ord.assignedMechanicName ? ord.assignedMechanicName.split(' ')[0] : 'Chưa gán'}
                        </span>
                        <span className="text-gray-400">{ord.dateCreated.split(' ')[1] || ''}</span>
                      </div>
                    </div>
                  ))}

                  {colOrders.length === 0 && (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-[11px] text-slate-400 font-medium italic">
                      Kéo thả phiếu vào đây
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST TABLE VIEW */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
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
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="py-4 px-4 font-bold text-blue-600 dark:text-blue-400 font-mono">{ord.orderNumber}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900 dark:text-white">{ord.customerName}</div>
                      <div className="text-xs text-gray-500">{ord.customerPhone}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-800 dark:text-slate-200">{ord.vehicleModel}</div>
                      <div className="text-xs font-mono text-gray-500">{ord.vehiclePlate}</div>
                    </td>
                    <td className="py-4 px-4 max-w-xs text-xs text-gray-600 dark:text-slate-300 truncate">
                      {ord.symptoms}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        statusText={
                          ord.status === 'inspecting' ? 'Đang kiểm tra' :
                          ord.status === 'repairing' ? 'Đang sửa' :
                          ord.status === 'waiting_parts' ? 'Chờ linh kiện' :
                          ord.status === 'ready_to_deliver' ? 'Chờ giao' : 'Hoàn thành'
                        }
                      />
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-gray-700 dark:text-slate-300">
                      {ord.assignedMechanicName || 'Chưa gán'}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(ord)}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
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
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Chi Tiết Phiếu #{selectedOrder.orderNumber}</h3>
                <p className="text-xs text-gray-500">Tạo lúc: {selectedOrder.dateCreated}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(selectedOrder)} leftIcon={<Edit3 className="w-4 h-4" />}>
                  Sửa thông tin phiếu
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                  ✕
                </Button>
              </div>
            </div>

            {/* Customer & Vehicle Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-xs">
              <div>
                <p className="text-gray-400 font-medium">Khách hàng cần sửa:</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{selectedOrder.customerName}</p>
                <p className="text-gray-600 dark:text-gray-300 font-mono">{selectedOrder.customerPhone}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Phương tiện:</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{selectedOrder.vehicleModel}</p>
                <p className="font-mono text-blue-600 dark:text-blue-400 font-bold">{selectedOrder.vehiclePlate}</p>
              </div>
            </div>

            {/* Symptoms & Assigned Mechanic */}
            <div className="grid grid-cols-2 gap-4 p-4 border border-gray-100 dark:border-slate-800 rounded-2xl text-xs">
              <div>
                <p className="text-gray-400 font-medium">Yêu cầu & Triệu chứng hỏng:</p>
                <p className="font-medium text-gray-800 dark:text-slate-200 italic mt-0.5">&ldquo;{selectedOrder.symptoms}&rdquo;</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Thợ phụ trách:</p>
                <p className="font-bold text-blue-600 dark:text-blue-400 text-sm mt-0.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{selectedOrder.assignedMechanicName || 'Chưa gán'}</span>
                </p>
              </div>
            </div>

            {/* Update Status Actions */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Chuyển Nấc Trạng Thái Phân Việc
              </label>
              <div className="flex flex-wrap gap-2">
                {KANBAN_COLUMNS.map((col) => (
                  <Button
                    key={col.status}
                    variant={selectedOrder.status === col.status ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, col.status)}
                  >
                    {col.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Form Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                {editingOrder ? `Sửa Phiếu Sửa Chữa #${editingOrder.orderNumber}` : 'Tạo Phiếu Sửa Chữa Mới'}
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Tên người cần sửa (Khách hàng)"
                  placeholder="Nguyễn Văn A"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                <Input
                  label="Số điện thoại"
                  placeholder="0988 123 456"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Dòng xe"
                  placeholder="Honda SH 150i ABS"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  required
                />
                <Input
                  label="Biển số xe"
                  placeholder="59-P1 888.88"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  required
                />
              </div>

              <Textarea
                label="Mô tả triệu chứng / Yêu cầu sửa chữa"
                placeholder="Xe bị phát tiếng kêu ở lốc máy, phanh sau ăn kém..."
                value={symptoms}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSymptoms(e.target.value)}
                rows={3}
                required
              />

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  Gán thợ phụ trách
                </label>
                <select
                  value={assignedMechanicId}
                  onChange={(e) => handleMechanicSelectChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {mechanics.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.skillLevel} - {m.status === 'rảnh' ? '🟢 Đang rảnh' : '🔴 Bận đang làm'})
                    </option>
                  ))}
                </select>
                {reassignmentNotice && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold mt-1.5 p-2.5 bg-amber-50 dark:bg-amber-950/50 rounded-xl border border-amber-200 dark:border-amber-800 animate-fadeIn">
                    {reassignmentNotice}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Dự toán chi phí (VND)"
                  type="number"
                  placeholder="350000"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                />
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                    Trạng thái
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as OrderStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {KANBAN_COLUMNS.map((col) => (
                      <option key={col.status} value={col.status}>
                        {col.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting} className="flex-1">
                  {editingOrder ? 'Lưu phiếu' : 'Tạo phiếu sửa'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
