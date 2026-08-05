import { mockBranches, mockServices, mockOrders } from '../mock/data';
import { Branch, ServiceItem, OrderItem } from '../../types';

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
}
export default ApiClient;
