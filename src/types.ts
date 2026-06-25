export type ViewType =
  | 'login'
  | 'overview'
  | 'personnel'
  | 'budget'
  | 'inventory'
  | 'roles'
  | 'matrix'
  | 'users'
  | 'forbidden'
  | 'attendance'
  | 'construction-log';

export interface Employee {
  id: string;
  name: string;
  role: string;
  team: string;
  project: string;
  status: 'working' | 'leave' | 'resigned';
  avatar: string;
}

export interface BudgetTransaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface MaterialItem {
  code: string;
  name: string;
  unit: string;
  quantity: number;
  minAlert: number;
  status: 'safe' | 'warning' | 'out_of_stock';
}

export interface WarehouseHistory {
  code: string;
  type: 'import' | 'export';
  material: string;
  quantity: number;
  date: string;
  operator: string;
  status: 'completed' | 'pending';
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'locked';
  avatar: string;
}

export interface RoleConfig {
  id: string;
  name: string;
  usersCount: number;
  permissionsCount: number;
  description: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  daysWorked: number;
  otHours: number;
  lateEarly: string;
  status: 'full' | 'missing' | 'warning';
  avatar: string;
}

export type SimulatedRoleType = 'admin' | 'ac' | 'sv' | 'wh';

export interface SimulatedUser {
  name: string;
  label: string;
  avatar: string;
}

export const SIMULATED_USERS: Record<SimulatedRoleType, SimulatedUser> = {
  admin: {
    name: 'Trần Anh Tuấn',
    label: 'Super Admin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqvUPpQ_JsRqCklDc_MgRZHtwiZLo4ZKc2lK-z_IMuenC-xrnX940wxPDv72_R8JtupxiOBPjSXPvlkJlBdsZqkcBYeOBtGvUZheewA6iiQq_oLBztDpOd1TfBzNrSo6e063ZAPTAaSFic1ZPsl3aGlK9yKjzDI1JQ3d-CcwlWdO9mKLMtBm-eVI1wNAPKdY-EBzffv9s0gOiDHtaYu0k5Z0UDGgmOBhUvhH66cbg92ipU42P1_IE3_fmSfX5m2o7z22-YLgdUSRY',
  },
  ac: {
    name: 'Nguyễn Thị Mai',
    label: 'Kế toán Công trình (AC)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  sv: {
    name: 'Lê Hoàng Nam',
    label: 'Giám sát Công trình (SV)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  wh: {
    name: 'Phạm Văn Đức',
    label: 'Thủ kho Dự án (WH)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
};

export const ROLE_ALLOWED_VIEWS: Record<SimulatedRoleType, ViewType[]> = {
  admin: [
    'overview',
    'personnel',
    'attendance',
    'construction-log',
    'inventory',
    'budget',
    'matrix',
    'users',
    'roles',
  ],
  ac: ['overview', 'budget', 'inventory'],
  sv: ['overview', 'construction-log', 'personnel', 'attendance'],
  wh: ['overview', 'inventory'],
};


