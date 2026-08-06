export interface Branch {
  id: string;
  name: string;
  address: string;
  hotline?: string;
  phone?: string;
  mapUrl?: string;
  workingHours: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'maintenance' | 'repair' | 'engine' | 'electrical' | 'brakes' | 'other';
  brand?: string;
  deviceModel?: string;
  price: number;
  warranty: string;
  duration?: string;
  time?: string;
  popular?: boolean;
  description?: string;
}

export type OrderStatus = 'received' | 'inspecting' | 'quoted' | 'repairing' | 'inspecting_done' | 'ready_to_deliver' | 'completed' | 'cancelled' | 'waiting_parts';

export interface TimelineEvent {
  status: OrderStatus;
  statusLabel: string;
  timestamp?: string;
  description: string;
  isCompleted: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalSpent: number;
  totalOrders: number;
  joinedDate: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  brand: string;
  year?: number;
  customerId: string;
  customerName: string;
  customerPhone: string;
  odometer: number;
  lastServiceDate: string;
}

export interface Mechanic {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  skillLevel: 'Thợ Chính' | 'Thợ Phụ' | 'Trưởng Nhóm' | 'Chuyên Gia AI' | string;
  status: 'rảnh' | 'đang làm' | 'nghỉ phép';
  currentOrderId?: string;
  completedOrdersCount: number;
}


export interface OrderItem {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  phoneNumber?: string;
  vehiclePlate: string;
  vehicleModel: string;
  deviceModel?: string;
  brand?: string;
  symptoms: string;
  branchId: string;
  status: OrderStatus;
  timeline: TimelineEvent[];
  assignedMechanicId?: string;
  assignedMechanicName?: string;
  assignmentStatus?: 'pending_acceptance' | 'accepted' | 'declined';
  services: { serviceId: string; serviceName: string; price: number }[];
  totalPrice: number;
  dateCreated: string;
  estimatedCompletion: string;
  technicianNotes?: string;
  aiDiagnosticCause?: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  vehicleModel: string;
  symptoms: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  vehiclePlate: string;
  servicesCost: number;
  partsCost: number;
  discount: number;
  finalAmount: number;
  paymentMethod: 'cash' | 'transfer' | 'card';
  status: 'paid' | 'unpaid';
  createdAt: string;
}

export type UserRole = 'customer' | 'technician' | 'manager' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Review {
  id: string;
  orderId: string;
  customerId: string;
  customerName?: string;
  rating: number;
  comment: string;
  isPublic: boolean;
  createdAt: string;
}

export interface PartItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  unitPrice: number;
  supplier: string;
  lastRestockDate: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'mechanic';
  text: string;
  timestamp: Date;
  isDisclaimer?: boolean;
}

