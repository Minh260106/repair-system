export interface Branch {
  id: string;
  name: string;
  address: string;
  hotline: string;
  mapUrl?: string;
  workingHours: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'phone' | 'tablet' | 'laptop' | 'watch' | 'other';
  brand: string;
  deviceModel: string;
  price: number;
  warranty: string; // e.g., "6 tháng", "12 tháng"
  time: string;     // e.g., "30 - 45 phút", "1 - 2 ngày"
  popular?: boolean;
}

export interface TimelineEvent {
  status: 'received' | 'inspecting' | 'waiting_parts' | 'repairing' | 'completed';
  statusLabel: string;
  timestamp?: string;
  description: string;
  isCompleted: boolean;
}

export interface OrderItem {
  id: string;
  customerName: string;
  phoneNumber: string;
  deviceType: 'phone' | 'tablet' | 'laptop' | 'watch' | 'other';
  brand: string;
  deviceModel: string;
  symptoms: string;
  branchId: string;
  status: 'received' | 'inspecting' | 'waiting_parts' | 'repairing' | 'completed';
  timeline: TimelineEvent[];
  totalPrice: number;
  dateCreated: string;
  technicianNotes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  isDisclaimer?: boolean;
}
