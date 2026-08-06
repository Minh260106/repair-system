import { Branch, ServiceItem, OrderItem, Customer, Vehicle, Mechanic, Appointment, Invoice, AuthUser, PartItem, Review, NotificationItem } from '../../types';


export const mockBranches: Branch[] = [
  {
    id: 'hcm-q10',
    name: 'AutoFixAI Quận 10 (TP.HCM)',
    address: '123 Ba Tháng Hai, Phường 11, Quận 10, TP.HCM',
    workingHours: '08:00 - 20:00 (Cả CN & Ngày lễ)'
  },
  {
    id: 'hn-lb',
    name: 'AutoFixAI Long Biên (Hà Nội)',
    address: '456 Nguyễn Văn Cừ, Quận Long Biên, Hà Nội',
    workingHours: '08:00 - 20:00 (Cả CN & Ngày lễ)'
  }
];

export const mockServices: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Thay Nhớt & Bảo Dưỡng Động Cơ (Motul 300V / Castrol)',
    category: 'maintenance',
    price: 150000,
    warranty: '1 tháng',
    duration: '15 - 20 phút',
    popular: true,
    description: 'Vệ sinh cặn dầu, thay lọc nhớt, tra keo tản nhiệt nhẹ.'
  },
  {
    id: 'srv-2',
    name: 'Vệ Sinh Nồi & Kim Phun Xăng Điện Tử FI',
    category: 'repair',
    price: 250000,
    warranty: '3 tháng',
    duration: '35 - 45 phút',
    popular: true,
    description: 'Rửa sạch kim phun xăng FI bằng máy siêu âm, vệ sinh búa 3 càng.'
  },
  {
    id: 'srv-3',
    name: 'Thay Bố Phanh & Đĩa Phanh Trước/Sau',
    category: 'brakes',
    price: 180000,
    warranty: '6 tháng',
    duration: '25 phút',
    description: 'Bố phanh cao cấp chống cháy phíp, đĩa thép chịu nhiệt.'
  },
  {
    id: 'srv-4',
    name: 'Thay Bugi Iridium Chống Ngập Nước High-Performance',
    category: 'electrical',
    price: 220000,
    warranty: '6 tháng',
    duration: '15 phút',
    popular: true,
    description: 'Đánh lửa siêu nhạy, tiết kiệm xăng đến 8%.'
  },
  {
    id: 'srv-5',
    name: 'Gói Bảo Dưỡng Toàn Diện 20 Hạng Mục + Chẩn Đoán AI',
    category: 'maintenance',
    price: 450000,
    warranty: '12 tháng',
    duration: '60 phút',
    popular: true,
    description: 'Đo đọc dòng điện, kiểm tra phuộc nhún, vỏ xe, tra mỡ cổ xe.'
  },
  {
    id: 'srv-6',
    name: 'Cứu Hộ & Kiểm Tra Điện Ắc Quy Lưu Động',
    category: 'electrical',
    price: 100000,
    warranty: '12 tháng',
    duration: '30 phút',
    description: 'Xử lý xe chết máy giữa đường, kích bình ắc quy tận nơi.'
  }
];

export const mockMechanics: Mechanic[] = [
  {
    id: 'mech-1',
    name: 'Nguyễn Văn Nam',
    phone: '0901 234 567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    skillLevel: 'Trưởng Nhóm',
    status: 'đang làm',
    currentOrderId: 'ORD-8892',
    completedOrdersCount: 142
  },
  {
    id: 'mech-2',
    name: 'Lê Hoàng Anh',
    phone: '0902 345 678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    skillLevel: 'Thợ Chính',
    status: 'rảnh',
    completedOrdersCount: 98
  },
  {
    id: 'mech-3',
    name: 'Trần Văn Hoàng',
    phone: '0903 456 789',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    skillLevel: 'Chuyên Gia AI',
    status: 'đang làm',
    currentOrderId: 'ORD-8894',
    completedOrdersCount: 215
  },
  {
    id: 'mech-4',
    name: 'Phạm Đức Thắng',
    phone: '0904 567 890',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    skillLevel: 'Thợ Phụ',
    status: 'nghỉ phép',
    completedOrdersCount: 45
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Nguyễn Minh Tuấn',
    phone: '0988 123 456',
    email: 'tuan.nguyen@gmail.com',
    address: '147 Lý Thường Kiệt, Q.11, TP.HCM',
    totalSpent: 3050000,
    totalOrders: 4,
    joinedDate: '15/01/2026'
  },
  {
    id: 'cust-2',
    name: 'Lê Thị Thanh Hương',
    phone: '0912 345 678',
    email: 'huong.le@yahoo.com',
    address: '88 Nguyễn Trãi, Q.5, TP.HCM',
    totalSpent: 2800000,
    totalOrders: 5,
    joinedDate: '02/02/2026'
  },
  {
    id: 'cust-3',
    name: 'Trần Quốc Bảo',
    phone: '0977 888 999',
    email: 'bao.tran@gmail.com',
    address: '25 Lê Văn Sỹ, Q.3, TP.HCM',
    totalSpent: 920000,
    totalOrders: 2,
    joinedDate: '10/03/2026'
  },
  {
    id: 'cust-4',
    name: 'Phạm Hoàng Yến',
    phone: '0933 111 222',
    email: 'yen.pham@outlook.com',
    address: '52 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',
    totalSpent: 3100000,
    totalOrders: 5,
    joinedDate: '20/04/2026'
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: 'veh-1',
    licensePlate: '59-P1 888.88',
    model: 'SH 150i ABS',
    brand: 'Honda',
    year: 2023,
    customerId: 'cust-1',
    customerName: 'Nguyễn Minh Tuấn',
    customerPhone: '0988 123 456',
    odometer: 12500,
    lastServiceDate: '12/07/2026'
  },
  {
    id: 'veh-2',
    licensePlate: '59-S2 666.66',
    model: 'Vespa Sprint 125',
    brand: 'Piaggio',
    year: 2022,
    customerId: 'cust-2',
    customerName: 'Lê Thị Thanh Hương',
    customerPhone: '0912 345 678',
    odometer: 8400,
    lastServiceDate: '28/06/2026'
  },
  {
    id: 'veh-3',
    licensePlate: '59-F1 999.99',
    model: 'Exciter 155 VVA',
    brand: 'Yamaha',
    year: 2024,
    customerId: 'cust-3',
    customerName: 'Trần Quốc Bảo',
    customerPhone: '0977 888 999',
    odometer: 5200,
    lastServiceDate: '01/08/2026'
  },
  {
    id: 'veh-4',
    licensePlate: '59-K1 123.45',
    model: 'Lead 125',
    brand: 'Honda',
    year: 2021,
    customerId: 'cust-4',
    customerName: 'Phạm Hoàng Yến',
    customerPhone: '0933 111 222',
    odometer: 18900,
    lastServiceDate: '15/07/2026'
  }
];

export const mockOrders: OrderItem[] = [
  {
    id: 'ord-1',
    orderNumber: 'ORD-8892',
    customerId: 'cust-1',
    customerName: 'Nguyễn Minh Tuấn',
    customerPhone: '0988 123 456',
    vehiclePlate: '59-P1 888.88',
    vehicleModel: 'Honda SH 150i ABS',
    symptoms: 'Xe bị hụp ga khi tăng tốc, phanh sau kêu rét rét',
    branchId: 'hcm-q10',
    status: 'inspecting',
    assignedMechanicId: 'mech-1',
    assignedMechanicName: 'Nguyễn Văn Nam',
    assignmentStatus: 'pending_acceptance',
    services: [
      { serviceId: 'srv-1', serviceName: 'Thay Nhớt & Bảo Dưỡng Động Cơ', price: 150000 },
      { serviceId: 'srv-2', serviceName: 'Vệ Sinh Nồi & Kim Phun Xăng Điện Tử FI', price: 250000 }
    ],
    totalPrice: 400000,
    dateCreated: '05/08/2026 08:30',
    estimatedCompletion: '05/08/2026 09:30',
    aiDiagnosticCause: '70% do Bugi quá cũ, Lọc gió bám bụi hoặc tắc Kim phun xăng',
    timeline: [
      { status: 'received', statusLabel: 'Tiếp nhận xe', timestamp: '08:30', description: 'Lập phiếu tiếp nhận', isCompleted: true },
      { status: 'inspecting', statusLabel: 'Đang kiểm tra', timestamp: '08:45', description: 'Kỹ thuật tháo nồi & đo máy đọc lỗi AI', isCompleted: true },
      { status: 'quoted', statusLabel: 'Báo giá', timestamp: '09:00', description: 'Xác nhận giá với khách', isCompleted: false },
      { status: 'repairing', statusLabel: 'Đang sửa', timestamp: '09:15', description: 'Thay thế phụ tùng & súc kim phun', isCompleted: false },
      { status: 'ready_to_deliver', statusLabel: 'Chờ giao xe', timestamp: '09:45', description: 'Vệ sinh xe sạch sẽ', isCompleted: false }
    ]
  },
  {
    id: 'ord-2',
    orderNumber: 'ORD-8893',
    customerId: 'cust-2',
    customerName: 'Lê Thị Thanh Hương',
    customerPhone: '0912 345 678',
    vehiclePlate: '59-S2 666.66',
    vehicleModel: 'Vespa Sprint 125',
    symptoms: 'Bảo dưỡng toàn diện 20 hạng mục',
    branchId: 'hcm-q10',
    status: 'repairing',
    assignedMechanicId: 'mech-2',
    assignedMechanicName: 'Lê Hoàng Anh',
    services: [
      { serviceId: 'srv-5', serviceName: 'Gói Bảo Dưỡng Toàn Diện 20 Hạng Mục', price: 450000 }
    ],
    totalPrice: 450000,
    dateCreated: '05/08/2026 09:15',
    estimatedCompletion: '05/08/2026 10:15',
    timeline: [
      { status: 'received', statusLabel: 'Tiếp nhận xe', timestamp: '09:15', description: 'Lập phiếu tiếp nhận', isCompleted: true },
      { status: 'inspecting', statusLabel: 'Đang kiểm tra', timestamp: '09:25', description: 'Chẩn đoán 20 hạng mục', isCompleted: true },
      { status: 'quoted', statusLabel: 'Báo giá', timestamp: '09:35', description: 'Khách hàng đồng ý sửa', isCompleted: true },
      { status: 'repairing', statusLabel: 'Đang sửa', timestamp: '09:40', description: 'Bảo dưỡng bộ nồi & tra mỡ', isCompleted: true },
      { status: 'ready_to_deliver', statusLabel: 'Chờ giao xe', timestamp: '10:15', description: 'Chờ khách lại lấy', isCompleted: false }
    ]
  },
  {
    id: 'ord-3',
    orderNumber: 'ORD-8894',
    customerId: 'cust-4',
    customerName: 'Phạm Hoàng Yến',
    customerPhone: '0933 111 222',
    vehiclePlate: '59-K1 123.45',
    vehicleModel: 'Honda Lead 125',
    symptoms: 'Thay bình ắc quy GS chính hãng + thay bugi Iridium',
    branchId: 'hcm-q10',
    status: 'ready_to_deliver',
    assignedMechanicId: 'mech-3',
    assignedMechanicName: 'Trần Văn Hoàng',
    services: [
      { serviceId: 'srv-4', serviceName: 'Thay Bugi Iridium High-Performance', price: 220000 },
      { serviceId: 'srv-6', serviceName: 'Cứu Hộ & Thay Ắc Quy', price: 380000 }
    ],
    totalPrice: 600000,
    dateCreated: '05/08/2026 07:45',
    estimatedCompletion: '05/08/2026 08:30',
    timeline: [
      { status: 'received', statusLabel: 'Tiếp nhận xe', timestamp: '07:45', description: 'Lập phiếu', isCompleted: true },
      { status: 'repairing', statusLabel: 'Đang sửa', timestamp: '08:00', description: 'Thay bình ắc quy & bugi', isCompleted: true },
      { status: 'ready_to_deliver', statusLabel: 'Chờ giao xe', timestamp: '08:25', description: 'Sẵn sàng bàn giao', isCompleted: true }
    ]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    customerName: 'Vũ Quốc Khánh',
    phone: '0966 777 888',
    vehicleModel: 'Honda Winner X',
    symptoms: 'Nổ máy kêu lách cách ở xích cam, muốn kiểm tra nồi',
    scheduledDate: '2026-08-06',
    scheduledTime: '09:00',
    status: 'confirmed',
    createdAt: '05/08/2026 10:15'
  },
  {
    id: 'apt-2',
    customerName: 'Trần Thị Mai',
    phone: '0944 555 666',
    vehicleModel: 'Yamaha Grande Hybrid',
    symptoms: 'Thay nhớt máy & kiểm tra hệ thống phun xăng',
    scheduledDate: '2026-08-06',
    scheduledTime: '10:30',
    status: 'pending',
    createdAt: '05/08/2026 11:20'
  },
  {
    id: 'apt-3',
    customerName: 'Bùi Văn Hùng',
    phone: '0911 222 333',
    vehicleModel: 'Honda Air Blade 160',
    symptoms: 'Rung đầu khi bắt đầu vặn ga',
    scheduledDate: '2026-08-07',
    scheduledTime: '14:00',
    status: 'pending',
    createdAt: '05/08/2026 14:00'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2026-001',
    orderId: 'ORD-8890',
    customerName: 'Nguyễn Minh Tuấn',
    customerPhone: '0988 123 456',
    vehiclePlate: '59-P1 888.88',
    servicesCost: 400000,
    partsCost: 150000,
    discount: 55000, // 10% discount for online booking
    finalAmount: 495000,
    paymentMethod: 'transfer',
    status: 'paid',
    createdAt: '04/08/2026 16:45'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2026-002',
    orderId: 'ORD-8891',
    customerName: 'Phạm Hoàng Yến',
    customerPhone: '0933 111 222',
    vehiclePlate: '59-K1 123.45',
    servicesCost: 600000,
    partsCost: 0,
    discount: 60000,
    finalAmount: 540000,
    paymentMethod: 'cash',
    status: 'paid',
    createdAt: '05/08/2026 08:35'
  }
];

export const mockUsers: AuthUser[] = [
  {
    id: 'usr-admin',
    name: 'Đỗ Hoàng Admin',
    email: 'admin@autofixai.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '0909 000 111'
  },
  {
    id: 'usr-manager',
    name: 'Trần Văn Quản Lý',
    email: 'manager@autofixai.com',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '0909 222 333'
  },
  {
    id: 'usr-tech',
    name: 'Nguyễn Văn Nam (Kỹ Thuật)',
    email: 'tech@autofixai.com',
    role: 'technician',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '0901 234 567'
  },
  {
    id: 'cust-1',
    name: 'Nguyễn Minh Tuấn',
    email: 'khach@gmail.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    phone: '0988 123 456',
    address: '147 Lý Thường Kiệt, Q.11, TP.HCM'
  }
];

export const mockParts: PartItem[] = [
  {
    id: 'prt-1',
    name: 'Bugi NGK Iridium CPR8EAG-9',
    sku: 'BG-NGK-IRD-01',
    quantity: 24,
    minQuantity: 10,
    unitPrice: 220000,
    supplier: 'NGK Việt Nam',
    lastRestockDate: '01/08/2026'
  },
  {
    id: 'prt-2',
    name: 'Nhớt Động Cơ Motul 300V FL Road 10W40 (1L)',
    sku: 'OIL-MTL-300V-1L',
    quantity: 15,
    minQuantity: 8,
    unitPrice: 450000,
    supplier: 'Motul Global',
    lastRestockDate: '28/07/2026'
  },
  {
    id: 'prt-3',
    name: 'Bố Phanh Nissin Trước SH 150i/125i',
    sku: 'BP-NIS-SH-FR',
    quantity: 3,
    minQuantity: 5,
    unitPrice: 180000,
    supplier: 'Phụ tùng Honda Chính Hãng',
    lastRestockDate: '15/07/2026'
  },
  {
    id: 'prt-4',
    name: 'Bình Ắc Quy GS GTZ6V (12V-5Ah)',
    sku: 'AQ-GS-GTZ6V',
    quantity: 2,
    minQuantity: 6,
    unitPrice: 380000,
    supplier: 'Ắc quy GS Việt Nam',
    lastRestockDate: '10/07/2026'
  },
  {
    id: 'prt-5',
    name: 'Dây Curoa Bando Vespa Sprint 125',
    sku: 'DC-BD-VESPA-125',
    quantity: 12,
    minQuantity: 4,
    unitPrice: 320000,
    supplier: 'Bando Belts Co.',
    lastRestockDate: '02/08/2026'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    orderId: 'ORD-8890',
    customerId: 'cust-1',
    customerName: 'Nguyễn Minh Tuấn',
    rating: 5,
    comment: 'Dịch vụ chẩn đoán AI rất chuẩn xác! Xe mình bảo dưỡng xong chạy cực êm, thợ tư vấn nhiệt tình.',
    isPublic: true,
    createdAt: '04/08/2026 18:00'
  },
  {
    id: 'rev-2',
    orderId: 'ORD-8891',
    customerId: 'cust-4',
    customerName: 'Phạm Hoàng Yến',
    rating: 5,
    comment: 'Cứu hộ thay ắc quy lưu động siêu nhanh. Chưa đầy 20 phút thợ đã tới tận nơi kích bình!',
    isPublic: true,
    createdAt: '05/08/2026 09:30'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'cust-1',
    title: 'Xe của bạn đang kiểm tra',
    message: 'Kỹ thuật viên Nguyễn Văn Nam bắt đầu tháo lắp & chẩn đoán xe SH 150i (#ORD-8892).',
    type: 'info',
    isRead: false,
    createdAt: '05/08/2026 08:45',
    link: '/portal/orders/ord-1'
  },
  {
    id: 'notif-2',
    userId: 'cust-1',
    title: 'Hóa đơn sẵn sàng thanh toán',
    message: 'Hóa đơn #INV-2026-001 trị giá 495.000đ đã hoàn tất. Bạn có thể quét mã QR thanh toán ngay.',
    type: 'success',
    isRead: false,
    createdAt: '04/08/2026 16:50',
    link: '/portal/invoices'
  },
  {
    id: 'notif-3',
    userId: 'usr-admin',
    title: 'Lịch hẹn mới #APT-301',
    message: 'Khách hàng Vũ Quốc Khánh đã đặt lịch bảo dưỡng xe Honda Winner X lúc 09:00.',
    type: 'warning',
    isRead: false,
    createdAt: '05/08/2026 10:15',
    link: '/admin/appointments'
  },
  {
    id: 'notif-4',
    userId: 'usr-admin',
    title: 'Cảnh báo phụ tùng sắp hết',
    message: 'Bố Phanh Nissin Trước SH (SKU: BP-NIS-SH-FR) chỉ còn 3 cái trong kho.',
    type: 'error',
    isRead: false,
    createdAt: '05/08/2026 07:00',
    link: '/admin/inventory'
  }
];

