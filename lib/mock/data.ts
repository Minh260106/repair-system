import { Branch, ServiceItem, OrderItem } from '../../types';

export const mockBranches: Branch[] = [
  {
    id: 'hcm-q10',
    name: 'FixCare Quận 10 (TP.HCM)',
    address: '147 Ba Tháng Hai, Phường 11, Quận 10, TP.HCM',
    hotline: '1800 2056',
    workingHours: '08:00 - 21:00 (Cả CN & Ngày lễ)',
    mapUrl: '#'
  },
  {
    id: 'hcm-q1',
    name: 'FixCare Quận 1 (TP.HCM)',
    address: '26 Trần Quang Khải, Phường Tân Định, Quận 1, TP.HCM',
    hotline: '1800 2057',
    workingHours: '08:00 - 21:00 (Cả CN & Ngày lễ)',
    mapUrl: '#'
  },
  {
    id: 'hn-cg',
    name: 'FixCare Cầu Giấy (Hà Nội)',
    address: '302 Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
    hotline: '1800 2058',
    workingHours: '08:00 - 21:00 (Cả CN & Ngày lễ)',
    mapUrl: '#'
  },
  {
    id: 'dn-hc',
    name: 'FixCare Hải Châu (Đà Nẵng)',
    address: '97 Hàm Nghi, Phường Vĩnh Trung, Quận Hải Châu, Đà Nẵng',
    hotline: '1800 2059',
    workingHours: '08:00 - 21:00 (Cả CN & Ngày lễ)',
    mapUrl: '#'
  }
];

export const mockServices: ServiceItem[] = [
  // iPhone 15 Pro Max
  {
    id: 's-ip15pm-screen',
    name: 'Thay màn hình Chính hãng Pisen',
    category: 'phone',
    brand: 'Apple',
    deviceModel: 'iPhone 15 Pro Max',
    price: 8900000,
    warranty: '12 tháng',
    time: '30 - 45 phút',
    popular: true
  },
  {
    id: 's-ip15pm-battery',
    name: 'Thay pin dung lượng cao Pisen',
    category: 'phone',
    brand: 'Apple',
    deviceModel: 'iPhone 15 Pro Max',
    price: 1850000,
    warranty: '12 tháng',
    time: '30 phút',
    popular: true
  },
  // iPhone 14 Pro
  {
    id: 's-ip14p-screen',
    name: 'Thay màn hình chính hãng Gen A',
    category: 'phone',
    brand: 'Apple',
    deviceModel: 'iPhone 14 Pro',
    price: 6500000,
    warranty: '6 tháng',
    time: '45 phút'
  },
  {
    id: 's-ip14p-battery',
    name: 'Thay pin linh kiện',
    category: 'phone',
    brand: 'Apple',
    deviceModel: 'iPhone 14 Pro',
    price: 1200000,
    warranty: '6 tháng',
    time: '30 phút'
  },
  // iPhone 13
  {
    id: 's-ip13-screen',
    name: 'Thay màn hình bóc máy chính hãng',
    category: 'phone',
    brand: 'Apple',
    deviceModel: 'iPhone 13',
    price: 4200000,
    warranty: '6 tháng',
    time: '40 phút',
    popular: true
  },
  {
    id: 's-ip13-battery',
    name: 'Thay pin chính hãng Orizin',
    category: 'phone',
    brand: 'Apple',
    deviceModel: 'iPhone 13',
    price: 950000,
    warranty: '12 tháng',
    time: '30 phút',
    popular: true
  },
  // Samsung S23 Ultra
  {
    id: 's-s23u-screen',
    name: 'Thay màn hình Samsung chính hãng (Full khung)',
    category: 'phone',
    brand: 'Samsung',
    deviceModel: 'Samsung Galaxy S23 Ultra',
    price: 5900000,
    warranty: '6 tháng',
    time: '60 phút',
    popular: true
  },
  {
    id: 's-s23u-glass',
    name: 'Ép mặt kính Gorilla Glass',
    category: 'phone',
    brand: 'Samsung',
    deviceModel: 'Samsung Galaxy S23 Ultra',
    price: 1450000,
    warranty: '12 tháng',
    time: '90 - 120 phút'
  },
  {
    id: 's-s23u-battery',
    name: 'Thay pin Samsung chính hãng',
    category: 'phone',
    brand: 'Samsung',
    deviceModel: 'Samsung Galaxy S23 Ultra',
    price: 850000,
    warranty: '6 tháng',
    time: '40 phút'
  },
  // MacBook Pro 2020 M1
  {
    id: 's-mbpm1-keyboard',
    name: 'Thay bàn phím MacBook chính hãng',
    category: 'laptop',
    brand: 'Apple',
    deviceModel: 'MacBook Pro 2020 M1',
    price: 2400000,
    warranty: '6 tháng',
    time: '3 - 4 tiếng',
    popular: true
  },
  {
    id: 's-mbpm1-screen',
    name: 'Thay cụm màn hình MacBook Retina',
    category: 'laptop',
    brand: 'Apple',
    deviceModel: 'MacBook Pro 2020 M1',
    price: 7800000,
    warranty: '12 tháng',
    time: '2 - 3 tiếng'
  },
  {
    id: 's-mbpm1-battery',
    name: 'Thay pin MacBook chính hãng',
    category: 'laptop',
    brand: 'Apple',
    deviceModel: 'MacBook Pro 2020 M1',
    price: 2100000,
    warranty: '12 tháng',
    time: '60 - 90 phút',
    popular: true
  },
  // Laptop Dell XPS
  {
    id: 's-dellxps-win',
    name: 'Cài đặt hệ điều hành Windows + Vệ sinh chuyên sâu',
    category: 'laptop',
    brand: 'Dell',
    deviceModel: 'Dell XPS 13',
    price: 450000,
    warranty: '1 tháng (hỗ trợ từ xa)',
    time: '60 phút'
  },
  {
    id: 's-dellxps-battery',
    name: 'Thay pin Dell XPS chính hãng',
    category: 'laptop',
    brand: 'Dell',
    deviceModel: 'Dell XPS 13',
    price: 1650000,
    warranty: '6 tháng',
    time: '45 phút'
  },
  // iPad Pro M1
  {
    id: 's-ipadprom1-glass',
    name: 'Ép kính cảm ứng iPad Pro',
    category: 'tablet',
    brand: 'Apple',
    deviceModel: 'iPad Pro 11 inch M1',
    price: 1950000,
    warranty: '6 tháng',
    time: '2 - 3 tiếng'
  },
  {
    id: 's-ipadprom1-battery',
    name: 'Thay pin iPad dung lượng chuẩn',
    category: 'tablet',
    brand: 'Apple',
    deviceModel: 'iPad Pro 11 inch M1',
    price: 1350000,
    warranty: '6 tháng',
    time: '90 phút'
  },
  // Apple Watch Series 8
  {
    id: 's-aw8-glass',
    name: 'Thay mặt kính Apple Watch',
    category: 'watch',
    brand: 'Apple',
    deviceModel: 'Apple Watch Series 8',
    price: 950000,
    warranty: '12 tháng',
    time: '60 - 90 phút'
  },
  {
    id: 's-aw8-battery',
    name: 'Thay pin Apple Watch',
    category: 'watch',
    brand: 'Apple',
    deviceModel: 'Apple Watch Series 8',
    price: 650000,
    warranty: '6 tháng',
    time: '45 phút'
  }
];

export const mockOrders: OrderItem[] = [
  {
    id: 'FIX-12345',
    customerName: 'Nguyễn Văn Hùng',
    phoneNumber: '0987654321',
    deviceType: 'phone',
    brand: 'Apple',
    deviceModel: 'iPhone 13',
    symptoms: 'Màn hình bị sọc xanh, liệt cảm ứng góc dưới phải sau khi rơi.',
    branchId: 'hcm-q10',
    status: 'repairing',
    totalPrice: 4200000,
    dateCreated: '2026-07-15T09:30:00+07:00',
    technicianNotes: 'Đã nhận máy, tháo rời màn hình hỏng. Đang lắp và dán keo chống nước màn hình chính hãng mới. Tiến hành test cảm ứng.',
    timeline: [
      {
        status: 'received',
        statusLabel: 'Tiếp nhận thiết bị',
        timestamp: '2026-07-15T09:35:00+07:00',
        description: 'Đã nhận máy từ khách hàng tại quầy Quận 10. Ngoại quan kính vỡ nhẹ góc, ghi nhận đúng lỗi sọc màn hình.',
        isCompleted: true
      },
      {
        status: 'inspecting',
        statusLabel: 'Đang kiểm tra',
        timestamp: '2026-07-15T10:15:00+07:00',
        description: 'Kỹ thuật viên kiểm tra mainboard và các chức năng phụ (Face ID, Camera, sạc không dây). Mọi chức năng bình thường ngoại trừ màn hình hỏng.',
        isCompleted: true
      },
      {
        status: 'waiting_parts',
        statusLabel: 'Chờ linh kiện',
        timestamp: '2026-07-15T10:30:00+07:00',
        description: 'Linh kiện màn hình bóc máy chính hãng đã sẵn sàng trong kho. Không cần chờ nhập thêm.',
        isCompleted: true
      },
      {
        status: 'repairing',
        statusLabel: 'Đang tiến hành sửa',
        timestamp: '2026-07-15T14:00:00+07:00',
        description: 'Đang thực hiện thay thế màn hình chính hãng bóc máy, chuyển IC màn hình gốc để giữ hiển thị True Tone.',
        isCompleted: true
      },
      {
        status: 'completed',
        statusLabel: 'Hoàn thành & Bàn giao',
        description: 'Dự kiến hoàn thành vào 16:30 cùng ngày. Nhân viên sẽ liên hệ ngay khi kiểm tra xong.',
        isCompleted: false
      }
    ]
  },
  {
    id: 'FIX-67890',
    customerName: 'Trần Thị Mai',
    phoneNumber: '0912345678',
    deviceType: 'laptop',
    brand: 'Apple',
    deviceModel: 'MacBook Pro 2020 M1',
    symptoms: 'Pin báo bảo trì, thời gian dùng chỉ được 1 tiếng, máy bị nóng nhanh.',
    branchId: 'hn-cg',
    status: 'completed',
    totalPrice: 2100000,
    dateCreated: '2026-07-14T08:15:00+07:00',
    technicianNotes: 'Đã hoàn thành thay pin MacBook chính hãng mới. Pin chạy ổn định, sạc xả 1 chu kỳ kiểm tra đạt 100% dung lượng thiết kế. Vệ sinh bụi và tra keo tản nhiệt MX-4 miễn phí.',
    timeline: [
      {
        status: 'received',
        statusLabel: 'Tiếp nhận thiết bị',
        timestamp: '2026-07-14T08:20:00+07:00',
        description: 'Tiếp nhận MacBook Pro 2020 M1 màu Gray. Ngoại quan đẹp, không cấn móp.',
        isCompleted: true
      },
      {
        status: 'inspecting',
        statusLabel: 'Đang kiểm tra',
        timestamp: '2026-07-14T09:00:00+07:00',
        description: 'Xác nhận pin chai 69%, số lần sạc 890 lần. Các linh kiện khác không phát hiện lỗi.',
        isCompleted: true
      },
      {
        status: 'waiting_parts',
        statusLabel: 'Chờ linh kiện',
        timestamp: '2026-07-14T09:10:00+07:00',
        description: 'Linh kiện pin chuẩn hãng sẵn kho.',
        isCompleted: true
      },
      {
        status: 'repairing',
        statusLabel: 'Đang tiến hành sửa',
        timestamp: '2026-07-14T10:00:00+07:00',
        description: 'Tiến hành tháo pin cũ (keo bám chắc, tháo an toàn) và vệ sinh lồng quạt tản nhiệt, bôi keo tản nhiệt mới.',
        isCompleted: true
      },
      {
        status: 'completed',
        statusLabel: 'Hoàn thành & Bàn giao',
        timestamp: '2026-07-14T11:30:00+07:00',
        description: 'Khách hàng đã kiểm tra máy trực tiếp, nhận hóa đơn bảo hành 12 tháng điện tử và thanh toán thành công.',
        isCompleted: true
      }
    ]
  },
  {
    id: 'FIX-11111',
    customerName: 'Lê Hoàng Hải',
    phoneNumber: '0933333333',
    deviceType: 'phone',
    brand: 'Samsung',
    deviceModel: 'Samsung Galaxy S23 Ultra',
    symptoms: 'Nứt kính lưng sau khi rơi nhẹ, camera sau lấy nét chậm.',
    branchId: 'dn-hc',
    status: 'inspecting',
    totalPrice: 1450000,
    dateCreated: '2026-07-16T10:00:00+07:00',
    technicianNotes: 'Đang mở máy kiểm tra ống kính camera zoom quang học để xem có bị lệch thấu kính hay không trước khi báo giá cuối cùng.',
    timeline: [
      {
        status: 'received',
        statusLabel: 'Tiếp nhận thiết bị',
        timestamp: '2026-07-16T10:05:00+07:00',
        description: 'Tiếp nhận Samsung S23 Ultra nứt kính lưng. Đã chụp ảnh hiện trạng kính nứt.',
        isCompleted: true
      },
      {
        status: 'inspecting',
        statusLabel: 'Đang kiểm tra',
        timestamp: '2026-07-16T10:20:00+07:00',
        description: 'Đang kiểm tra chi tiết linh kiện bên trong, đặc biệt là cụm module chống rung OIS của camera.',
        isCompleted: true
      },
      {
        status: 'waiting_parts',
        statusLabel: 'Chờ linh kiện',
        description: 'Đang xác minh sự phù hợp của linh kiện camera.',
        isCompleted: false
      },
      {
        status: 'repairing',
        statusLabel: 'Đang tiến hành sửa',
        description: 'Sẽ bắt đầu sau khi hoàn tất kiểm tra và khách hàng đồng ý bảng giá.',
        isCompleted: false
      },
      {
        status: 'completed',
        statusLabel: 'Hoàn thành & Bàn giao',
        description: 'Ước tính thời gian giao máy sau 2 tiếng.',
        isCompleted: false
      }
    ]
  }
];
