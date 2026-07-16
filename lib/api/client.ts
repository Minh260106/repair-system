import { Branch, ServiceItem, OrderItem } from '../../types';
import { mockBranches, mockServices, mockOrders } from '../mock/data';

// Read backend URL configuration placeholder
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.fixcare.vn/v1';

// Helper to simulate network latency
const delay = <T>(data: T, min = 500, max = 800): Promise<T> => {
  const ms = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Log for developer reference (simulated endpoint)
      console.log(`[API Call] Resolved mockup to ${API_URL} after ${ms}ms`);
      resolve(data);
    }, ms);
  });
};

export class ApiClient {
  /**
   * Fetch all service branches
   */
  static async getBranches(): Promise<Branch[]> {
    return delay(mockBranches);
  }

  /**
   * Fetch services with optional filters
   */
  static async getServices(filters?: {
    category?: string;
    brand?: string;
    searchQuery?: string;
  }): Promise<ServiceItem[]> {
    let services = [...mockServices];

    if (filters) {
      const { category, brand, searchQuery } = filters;
      
      if (category && category !== 'all') {
        services = services.filter(s => s.category === category);
      }
      
      if (brand && brand !== 'all') {
        services = services.filter(s => s.brand.toLowerCase() === brand.toLowerCase());
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        services = services.filter(s => 
          s.name.toLowerCase().includes(query) ||
          s.deviceModel.toLowerCase().includes(query) ||
          s.brand.toLowerCase().includes(query)
        );
      }
    }

    return delay(services);
  }

  /**
   * Query status tracking of a repair order by Order ID or Customer Phone Number
   */
  static async getOrdersByContact(queryStr: string): Promise<OrderItem[]> {
    const q = queryStr.trim().toUpperCase();
    if (!q) return delay([]);

    // Check if it looks like an Order ID (FIX-XXXXX) or a phone number
    const results = mockOrders.filter(order => 
      order.id.toUpperCase() === q || 
      order.phoneNumber.replace(/[\s.-]/g, '') === q.replace(/[\s.-]/g, '')
    );

    return delay(results);
  }

  /**
   * Submit a new repair booking registration
   */
  static async createBooking(data: {
    customerName: string;
    phoneNumber: string;
    deviceType: 'phone' | 'tablet' | 'laptop' | 'watch' | 'other';
    brand: string;
    deviceModel: string;
    symptoms: string;
    branchId: string;
  }): Promise<OrderItem> {
    // Generate a random 5-digit number order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `FIX-${randomNum}`;
    
    // Find expected pricing if we can match the device model & type, or defaults
    const matchedService = mockServices.find(s => 
      s.deviceModel.toLowerCase().includes(data.deviceModel.toLowerCase()) && 
      s.category === data.deviceType
    );
    const totalPrice = matchedService ? matchedService.price : 0;

    const newOrder: OrderItem = {
      ...data,
      id: orderId,
      status: 'received',
      totalPrice,
      dateCreated: new Date().toISOString(),
      technicianNotes: 'Đang xếp lịch kiểm tra sơ bộ thiết bị. Nhân viên chi nhánh sẽ sớm liên hệ xác nhận cuộc hẹn.',
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
          description: 'Kỹ thuật viên sẽ thực hiện tháo lắp và kiểm tra linh kiện trực tiếp trước sự chứng kiến của quý khách.',
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
          description: 'Tiến hành sửa chữa phần cứng/thay thế sau khi đạt thỏa thuận giá.',
          isCompleted: false
        },
        {
          status: 'completed',
          statusLabel: 'Hoàn thành & Bàn giao',
          description: 'Kiểm tra chức năng hậu sửa chữa, lập tem bảo hành điện tử và bàn giao máy.',
          isCompleted: false
        }
      ]
    };

    // Store in mock orders database temporarily
    mockOrders.unshift(newOrder);

    return delay(newOrder, 800, 1200); // slightly longer delay for creation write operation
  }
}
export default ApiClient;
