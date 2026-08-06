import {
  mockBranches, mockServices, mockOrders, mockUsers, mockVehicles,
  mockInvoices, mockParts, mockReviews, mockNotifications, mockCustomers, mockMechanics, mockAppointments
} from '../mock/data';
import {
  Branch, ServiceItem, OrderItem, AuthUser, Vehicle, Invoice,
  PartItem, Review, NotificationItem, OrderStatus, Customer, Mechanic, Appointment
} from '../../types';




const simulateDelay = true;
const defaultDelayMs = 300;

function delay<T>(data: T, minMs = defaultDelayMs, maxMs = 600): Promise<T> {
  if (!simulateDelay) return Promise.resolve(data);
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export class ApiClient {
  static async getBranches(): Promise<Branch[]> {
    return delay(mockBranches);
  }

  static async getServices(params?: {
    category?: string;
    brand?: string;
    searchQuery?: string;
  }): Promise<ServiceItem[]> {
    let services = [...mockServices];

    if (params) {
      const { category, brand, searchQuery } = params;
      
      if (category && category !== 'all') {
        services = services.filter(s => s.category === category);
      }
      
      if (brand && brand !== 'all') {
        services = services.filter(s => s.brand && s.brand.toLowerCase() === brand.toLowerCase());
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        services = services.filter(s => 
          s.name.toLowerCase().includes(query) ||
          (s.deviceModel && s.deviceModel.toLowerCase().includes(query)) ||
          (s.brand && s.brand.toLowerCase().includes(query))
        );
      }
    }

    return delay(services);
  }

  static async getOrdersByContact(queryStr: string): Promise<OrderItem[]> {
    const q = queryStr.trim().toUpperCase();
    if (!q) return delay([]);

    const results = mockOrders.filter(order => 
      order.id.toUpperCase() === q || 
      order.orderNumber.toUpperCase() === q ||
      order.customerPhone.replace(/[\s.-]/g, '') === q.replace(/[\s.-]/g, '') ||
      (order.phoneNumber && order.phoneNumber.replace(/[\s.-]/g, '') === q.replace(/[\s.-]/g, ''))
    );

    return delay(results);
  }

  static async createBooking(data: {
    customerName: string;
    phoneNumber: string;
    deviceType: string;
    brand: string;
    deviceModel: string;
    symptoms: string;
    branchId: string;
  }): Promise<OrderItem> {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `FIX-${randomNum}`;
    
    const matchedService = mockServices.find(s => 
      s.deviceModel && s.deviceModel.toLowerCase().includes(data.deviceModel.toLowerCase())
    );
    const totalPrice = matchedService ? matchedService.price : 250000;

    const newOrder: OrderItem = {
      id: orderId,
      orderNumber: orderId,
      customerId: `cust-${Date.now()}`,
      customerName: data.customerName,
      customerPhone: data.phoneNumber,
      phoneNumber: data.phoneNumber,
      vehiclePlate: 'Đang cập nhật',
      vehicleModel: data.deviceModel,
      deviceModel: data.deviceModel,
      brand: data.brand,
      symptoms: data.symptoms,
      branchId: data.branchId,
      status: 'received',
      totalPrice,
      services: matchedService ? [{ serviceId: matchedService.id, serviceName: matchedService.name, price: matchedService.price }] : [],
      dateCreated: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 3600000).toISOString(),
      technicianNotes: 'Đang xếp lịch kiểm tra sơ bộ thiết bị.',
      timeline: [
        {
          status: 'received',
          statusLabel: 'Tiếp nhận thiết bị',
          timestamp: new Date().toISOString(),
          description: 'Hệ thống đã ghi nhận lịch hẹn sửa chữa trực tuyến của quý khách.',
          isCompleted: true
        },
        {
          status: 'inspecting',
          statusLabel: 'Đang kiểm tra',
          description: 'Kỹ thuật viên sẽ thực hiện tháo lắp và kiểm tra linh kiện trực tiếp.',
          isCompleted: false
        },
        {
          status: 'waiting_parts',
          statusLabel: 'Chờ linh kiện',
          description: 'Kiểm kho linh kiện tương thích.',
          isCompleted: false
        },
        {
          status: 'repairing',
          statusLabel: 'Đang tiến hành sửa',
          description: 'Tiến hành sửa chữa sau khi đạt thỏa thuận.',
          isCompleted: false
        },
        {
          status: 'completed',
          statusLabel: 'Hoàn thành & Bàn giao',
          description: 'Kiểm tra chức năng hậu sửa chữa và bàn giao xe.',
          isCompleted: false
        }
      ]
    };

    mockOrders.unshift(newOrder);

    return delay(newOrder, 800, 1200);
  }

  // Auth Methods
  static async login(email: string, _pass: string): Promise<AuthUser> {

    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }
    return delay(user, 500, 900);
  }

  static async register(data: { name: string; email: string; phone?: string; password?: string }): Promise<AuthUser> {
    const existing = mockUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      throw new Error('Email này đã được đăng ký tài khoản.');
    }
    const newUser: AuthUser = {
      id: `cust-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    mockUsers.push(newUser);
    
    // Also create customer entry
    mockCustomers.push({
      id: newUser.id,
      name: newUser.name,
      phone: newUser.phone || '',
      email: newUser.email,
      totalSpent: 0,
      totalOrders: 0,
      joinedDate: new Date().toLocaleDateString('vi-VN')
    });

    return delay(newUser, 600, 1000);
  }

  // Vehicles
  static async getMyVehicles(customerId: string): Promise<Vehicle[]> {
    const list = mockVehicles.filter(v => v.customerId === customerId);
    return delay(list);
  }

  static async addVehicle(data: Omit<Vehicle, 'id'>): Promise<Vehicle> {
    const newVeh: Vehicle = {
      ...data,
      id: `veh-${Date.now()}`
    };
    mockVehicles.unshift(newVeh);
    return delay(newVeh);
  }

  static async updateVehicle(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    const index = mockVehicles.findIndex(v => v.id === id);
    if (index !== -1) {
      mockVehicles[index] = { ...mockVehicles[index], ...data };
      return delay(mockVehicles[index]);
    }
    throw new Error('Không tìm thấy xe.');
  }

  // Orders
  static async getOrders(): Promise<OrderItem[]> {
    return delay([...mockOrders]);
  }

  static async getMyOrders(customerId: string): Promise<OrderItem[]> {

    const list = mockOrders.filter(o => o.customerId === customerId);
    return delay(list);
  }

  static async getOrderById(orderId: string): Promise<OrderItem | null> {
    const order = mockOrders.find(o => o.id === orderId || o.orderNumber === orderId);
    return delay(order || null);
  }

  static async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<OrderItem> {
    const order = mockOrders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) throw new Error('Không tìm thấy phiếu sửa chữa.');

    order.status = newStatus;
    
    // Update timeline step
    const timelineStep = order.timeline.find(t => t.status === newStatus);
    if (timelineStep) {
      timelineStep.isCompleted = true;
      timelineStep.timestamp = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    } else {
      // Create new step if missing
      const statusLabels: Record<string, string> = {
        received: 'Tiếp nhận',
        inspecting: 'Đang kiểm tra',
        waiting_parts: 'Chờ linh kiện',
        repairing: 'Đang sửa',
        ready_to_deliver: 'Sẵn sàng giao',
        completed: 'Hoàn thành'
      };
      order.timeline.push({
        status: newStatus,
        statusLabel: statusLabels[newStatus] || newStatus,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        description: `Chuyển sang trạng thái ${statusLabels[newStatus] || newStatus}`,
        isCompleted: true
      });
    }

    return delay(order);
  }

  static async updateOrder(orderId: string, data: Partial<OrderItem>): Promise<OrderItem> {
    const idx = mockOrders.findIndex(o => o.id === orderId || o.orderNumber === orderId);
    if (idx !== -1) {
      mockOrders[idx] = { ...mockOrders[idx], ...data };
      return delay(mockOrders[idx]);
    }
    throw new Error('Không tìm thấy phiếu sửa chữa.');
  }

  static async createOrder(data: Omit<OrderItem, 'id' | 'orderNumber' | 'dateCreated' | 'timeline' | 'chatMessages'>): Promise<OrderItem> {
    const num = Math.floor(8000 + Math.random() * 1999);
    const newOrder: OrderItem = {
      ...data,
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-${num}`,
      dateCreated: new Date().toLocaleString('vi-VN'),
      timeline: [
        {
          status: 'received',
          statusLabel: 'Tiếp nhận',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          description: 'Đã tạo phiếu sửa mới',
          isCompleted: true
        }
      ]
    };
    mockOrders.unshift(newOrder);

    return delay(newOrder);
  }


  // Invoices
  static async getMyInvoices(customerId: string): Promise<Invoice[]> {
    // Find orders of customer first or match customerName/phone
    const list = mockInvoices.filter(inv => {
      const order = mockOrders.find(o => o.orderNumber === inv.orderId || o.id === inv.orderId);
      return order ? order.customerId === customerId : true;
    });
    return delay(list);
  }

  static async getInvoiceById(id: string): Promise<Invoice | null> {
    const inv = mockInvoices.find(i => i.id === id || i.invoiceNumber === id);
    return delay(inv || null);
  }

  static async markInvoicePaid(invoiceId: string, paymentMethod: 'cash' | 'transfer' | 'card' = 'transfer'): Promise<Invoice> {
    const inv = mockInvoices.find(i => i.id === invoiceId || i.invoiceNumber === invoiceId);
    if (!inv) throw new Error('Không tìm thấy hóa đơn.');
    inv.status = 'paid';
    inv.paymentMethod = paymentMethod;
    return delay(inv);
  }

  // Inventory
  static async getParts(): Promise<PartItem[]> {
    return delay([...mockParts]);
  }

  static async restockPart(partId: string, quantityToAdd: number): Promise<PartItem> {
    const part = mockParts.find(p => p.id === partId);
    if (!part) throw new Error('Không tìm thấy phụ tùng.');
    part.quantity += quantityToAdd;
    part.lastRestockDate = new Date().toLocaleDateString('vi-VN');
    return delay(part);
  }

  // Notifications
  static async getNotifications(userId?: string): Promise<NotificationItem[]> {
    if (!userId) return delay([...mockNotifications]);
    const userNotifs = mockNotifications.filter(n => n.userId === userId || n.userId === 'all');
    return delay(userNotifs);
  }

  static async markNotificationAsRead(id: string): Promise<boolean> {
    const notif = mockNotifications.find(n => n.id === id);
    if (notif) {
      notif.isRead = true;
      return delay(true);
    }
    return delay(false);
  }

  // Reviews
  static async getPublicReviews(): Promise<Review[]> {
    const publicReviews = mockReviews.filter(r => r.isPublic);
    return delay(publicReviews);
  }

  static async createReview(data: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toLocaleString('vi-VN')
    };
    mockReviews.unshift(newReview);
    return delay(newReview);
  }

  static async getMechanics(): Promise<Mechanic[]> {
    return delay([...mockMechanics]);
  }

  static async addMechanic(data: Omit<Mechanic, 'id'>): Promise<Mechanic> {
    const newMech: Mechanic = {
      ...data,
      id: `mech-${Date.now()}`
    };
    mockMechanics.unshift(newMech);
    return delay(newMech);
  }

  static async updateMechanic(id: string, data: Partial<Mechanic>): Promise<Mechanic> {
    const idx = mockMechanics.findIndex(m => m.id === id);
    if (idx !== -1) {
      mockMechanics[idx] = { ...mockMechanics[idx], ...data };
      return delay(mockMechanics[idx]);
    }
    throw new Error('Không tìm thấy kỹ thuật viên.');
  }

  // Customers
  static async getCustomers(): Promise<Customer[]> {
    return delay([...mockCustomers]);
  }

  static async addCustomer(data: Omit<Customer, 'id' | 'joinedDate'>): Promise<Customer> {
    const newCust: Customer = {
      ...data,
      id: `cust-${Date.now()}`,
      joinedDate: new Date().toLocaleDateString('vi-VN')
    };
    mockCustomers.unshift(newCust);
    return delay(newCust);
  }

  static async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
    const idx = mockCustomers.findIndex(c => c.id === id);
    if (idx !== -1) {
      mockCustomers[idx] = { ...mockCustomers[idx], ...data };
      return delay(mockCustomers[idx]);
    }
    throw new Error('Không tìm thấy khách hàng.');
  }

  // Vehicles (All)
  static async getVehicles(): Promise<Vehicle[]> {
    return delay([...mockVehicles]);
  }

  // Appointments
  static async getAppointments(): Promise<Appointment[]> {
    return delay([...mockAppointments]);
  }

  static async addAppointment(data: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> {
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toLocaleString('vi-VN')
    };
    mockAppointments.unshift(newApt);
    return delay(newApt);
  }

  static async updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
    const idx = mockAppointments.findIndex(a => a.id === id);
    if (idx !== -1) {
      mockAppointments[idx] = { ...mockAppointments[idx], ...data };
      return delay(mockAppointments[idx]);
    }
    throw new Error('Không tìm thấy lịch hẹn.');
  }

  // Services
  static async addService(data: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    const newSrv: ServiceItem = {
      ...data,
      id: `srv-${Date.now()}`
    };
    mockServices.unshift(newSrv);
    return delay(newSrv);
  }

  static async updateService(id: string, data: Partial<ServiceItem>): Promise<ServiceItem> {
    const idx = mockServices.findIndex(s => s.id === id);
    if (idx !== -1) {
      mockServices[idx] = { ...mockServices[idx], ...data };
      return delay(mockServices[idx]);
    }
    throw new Error('Không tìm thấy dịch vụ.');
  }

  // Invoices (All)
  static async getInvoices(): Promise<Invoice[]> {
    return delay([...mockInvoices]);
  }

  static async createInvoice(data: Omit<Invoice, 'id' | 'createdAt'>): Promise<Invoice> {
    const newInv: Invoice = {
      ...data,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toLocaleString('vi-VN')
    };
    mockInvoices.unshift(newInv);
    return delay(newInv);
  }

  static async updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const idx = mockInvoices.findIndex(i => i.id === id);
    if (idx !== -1) {
      mockInvoices[idx] = { ...mockInvoices[idx], ...data };
      return delay(mockInvoices[idx]);
    }
    throw new Error('Không tìm thấy hóa đơn.');
  }
}
export default ApiClient;



