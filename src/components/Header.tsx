import React, { useState, useEffect, useRef } from 'react';
import { ViewType } from '../types';
import {
  Bell,
  Search,
  Globe,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  Building,
  Users,
  Clock,
  Package,
  ArrowRight,
  TrendingUp,
  Sun,
  Moon,
  Menu,
  X,
  BellOff,
  AlertTriangle,
  AlertCircle,
  Check,
  Trash2,
  Sparkles,
  CheckSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface SearchItem {
  id: string;
  name: string;
  type: 'project' | 'personnel' | 'attendance' | 'inventory';
  subtext: string;
  view: ViewType;
  targetTerm: string;
}

const SEARCH_DATABASE: SearchItem[] = [
  // 1. Projects
  { id: 'PROJ-01', name: 'Landmark 81', type: 'project', subtext: 'Siêu dự án • Bình Thạnh, TP.HCM', view: 'overview', targetTerm: '' },
  { id: 'PROJ-02', name: 'Hầm Thủ Thiêm 2', type: 'project', subtext: 'Công trình giao thông • Quận 1 - Quận 2', view: 'overview', targetTerm: '' },
  { id: 'PROJ-03', name: 'Vinhomes Central Park', type: 'project', subtext: 'Khu đô thị cao cấp • TP.HCM', view: 'overview', targetTerm: '' },
  { id: 'PROJ-04', name: 'Diamond Tower', type: 'project', subtext: 'Tòa nhà văn phòng thương mại • Quận 1', view: 'inventory', targetTerm: 'Diamond Tower' },
  { id: 'PROJ-05', name: 'VSIP Hải Phòng', type: 'project', subtext: 'Khu công nghiệp • Hải Phòng', view: 'inventory', targetTerm: 'VSIP Hải Phòng' },
  { id: 'PROJ-06', name: 'Cầu Sông Hàn', type: 'project', subtext: 'Dự án hạ tầng • Đà Nẵng', view: 'inventory', targetTerm: 'Cầu Sông Hàn' },
  { id: 'PROJ-07', name: 'Aqua City', type: 'project', subtext: 'Đô thị sinh thái • Đồng Nai', view: 'overview', targetTerm: '' },
  { id: 'PROJ-08', name: 'Meyhomes Phú Quốc', type: 'project', subtext: 'Dự án nghỉ dưỡng • Kiên Giang', view: 'personnel', targetTerm: 'Meyhomes Phú Quốc' },

  // 2. Personnel
  { id: 'NV-2023-441', name: 'Nguyễn Minh Đức', type: 'personnel', subtext: 'Kỹ sư hiện trường • Đội Kết cấu 02 • Landmark 81', view: 'personnel', targetTerm: 'Nguyễn Minh Đức' },
  { id: 'NV-2023-112', name: 'Lê Thị Thanh Huyền', type: 'personnel', subtext: 'Giám sát An toàn • Đội HSE • Hầm Thủ Thiêm 2', view: 'personnel', targetTerm: 'Lê Thị Thanh Huyền' },
  { id: 'NV-2023-085', name: 'Phạm Văn Hùng', type: 'personnel', subtext: 'Thợ điện bậc 5 • Đội MEP 01 • Vinhomes Central Park', view: 'personnel', targetTerm: 'Phạm Văn Hùng' },
  { id: 'NV-2023-229', name: 'Võ Hoàng Yến', type: 'personnel', subtext: 'Hành chính - Nhân sự • Văn phòng chính', view: 'personnel', targetTerm: 'Võ Hoàng Yến' },

  // 3. Attendance Personnel
  { id: 'NV-2024-001', name: 'Nguyễn Văn An', type: 'attendance', subtext: 'Bảng chấm công • Đủ công (24.5 ngày) • ID: NV-2024-001', view: 'attendance', targetTerm: 'Nguyễn Văn An' },
  { id: 'NV-2024-042', name: 'Trần Thị Bích', type: 'attendance', subtext: 'Bảng chấm công • Thiếu công (21.0 ngày) • ID: NV-2024-042', view: 'attendance', targetTerm: 'Trần Thị Bích' },
  { id: 'NV-2024-118', name: 'Lê Hoàng Nam', type: 'attendance', subtext: 'Bảng chấm công • Đủ công (26.0 ngày) • ID: NV-2024-118', view: 'attendance', targetTerm: 'Lê Hoàng Nam' },
  { id: 'NV-2024-085', name: 'Phạm Minh Tuấn', type: 'attendance', subtext: 'Bảng chấm công • Cảnh báo trễ (19.5 ngày) • ID: NV-2024-085', view: 'attendance', targetTerm: 'Phạm Minh Tuấn' },

  // 4. Inventory / Materials
  { id: 'MS-TH-001', name: 'Thép Hòa Phát D10', type: 'inventory', subtext: 'Vật tư xây dựng • Tồn kho: 45.5 Tấn • MS-TH-001', view: 'inventory', targetTerm: 'MS-TH-001' },
  { id: 'MS-XM-023', name: 'Xi măng Bỉm Sơn PCB40', type: 'inventory', subtext: 'Vật tư xây dựng • Tồn kho: 120 Bao • MS-XM-023', view: 'inventory', targetTerm: 'MS-XM-023' },
  { id: 'MS-CT-045', name: 'Cát xây tô sệt', type: 'inventory', subtext: 'Vật tư san lấp • Tồn kho: 15.0 m3 • MS-CT-045', view: 'inventory', targetTerm: 'MS-CT-045' },
  { id: 'MS-DA-012', name: 'Đá dăm bê tông 1x2', type: 'inventory', subtext: 'Cốt liệu bê tông • Hết hàng • MS-DA-012', view: 'inventory', targetTerm: 'MS-DA-012' }
];

export interface ERPNotification {
  id: string;
  type: 'milestone' | 'budget' | 'inventory';
  title: string;
  message: string;
  time: string;
  read: boolean;
  severity: 'info' | 'warning' | 'error';
  projectName: string;
  targetView: ViewType;
  targetQuery?: string;
}

const INITIAL_NOTIFICATIONS: ERPNotification[] = [
  {
    id: 'notif-1',
    type: 'inventory',
    title: 'Sắp hết hàng: Thép Hòa Phát D10',
    message: 'Thép Hòa Phát D10 tại Kho phụ hầm B1 Landmark 81 chỉ còn 2.5 tấn (định mức tối thiểu là 5.0 tấn). Cần nhập gấp.',
    time: '2 phút trước',
    read: false,
    severity: 'warning',
    projectName: 'Landmark 81',
    targetView: 'inventory',
    targetQuery: 'MS-TH-001',
  },
  {
    id: 'notif-2',
    type: 'budget',
    title: 'Vượt ngân sách: Hạng mục thép tấm',
    message: 'Hạng mục mua sắm thép tấm tại Landmark 81 đã chi 1.25 tỷ VNĐ, vượt định mức ngân sách phê duyệt ban đầu 12.5%.',
    time: '15 phút trước',
    read: false,
    severity: 'error',
    projectName: 'Landmark 81',
    targetView: 'budget',
  },
  {
    id: 'notif-3',
    type: 'milestone',
    title: 'Đạt cột mốc: Đổ bê tông móng Landmark 81',
    message: 'Dự án Landmark 81 đã hoàn thành xuất sắc đợt đổ bê tông móng hầm B1 (12,000m3) đúng tiến độ cam kết.',
    time: '45 phút trước',
    read: false,
    severity: 'info',
    projectName: 'Landmark 81',
    targetView: 'overview',
  },
  {
    id: 'notif-4',
    type: 'inventory',
    title: 'Hết hàng: Xi măng Holcim',
    message: 'Xi măng Holcim tại Kho trung tâm đã chạm mức 0 bao (tối thiểu 100 bao). Các công việc đổ bê tông dầm sàn sẽ bị hoãn nếu không cung cấp kịp thời.',
    time: '2 giờ trước',
    read: true,
    severity: 'error',
    projectName: 'Hầm Thủ Thiêm 2',
    targetView: 'inventory',
    targetQuery: 'MS-XM-023',
  },
  {
    id: 'notif-5',
    type: 'budget',
    title: 'Cảnh báo chi phí: Cát xây tô sệt',
    message: 'Phát sinh chi phí 120,000,000đ vận chuyển cát đổ dầm từ mỏ cát Đồng Nai về công trình do đơn giá khai thác tăng đột biến.',
    time: '5 giờ trước',
    read: true,
    severity: 'warning',
    projectName: 'Diamond Tower',
    targetView: 'budget',
  },
  {
    id: 'notif-6',
    type: 'milestone',
    title: 'Nghiệm thu: Hầm Thủ Thiêm 2',
    message: 'Hoàn tất ký kết biên bản nghiệm thu giai đoạn 1 (kết cấu thô nhánh phía Đông) giữa nhà thầu chính và ban quản lý dự án.',
    time: '1 ngày trước',
    read: true,
    severity: 'info',
    projectName: 'Hầm Thủ Thiêm 2',
    targetView: 'overview',
  }
];

const SIMULATION_POOL = [
  {
    type: 'inventory' as const,
    title: 'Cảnh báo tồn kho: Đá dăm bê tông 1x2',
    message: 'Đá dăm bê tông 1x2 tại bãi tập kết dự án Diamond Tower đã hết hàng (0 m3), cần bổ sung ngay để tiếp tục thi công móng dầm.',
    severity: 'error' as const,
    projectName: 'Diamond Tower',
    targetView: 'inventory' as const,
    targetQuery: 'MS-DA-012',
  },
  {
    type: 'budget' as const,
    title: 'Phê duyệt ngân sách phát sinh',
    message: 'Ban Quản Lý dự án VSIP Hải Phòng đã duyệt bổ sung 450,000,000đ ngân sách xử lý nền đất yếu khu vực nhà xưởng B.',
    severity: 'info' as const,
    projectName: 'VSIP Hải Phòng',
    targetView: 'budget' as const,
  },
  {
    type: 'milestone' as const,
    title: 'Khởi công lắp đặt kết cấu thép',
    message: 'Bắt đầu lắp đặt hệ giàn không gian kết cấu thép vòm mái tại Sân bay Long Thành trước 2 ngày so với kế hoạch.',
    severity: 'info' as const,
    projectName: 'Sân bay Long Thành',
    targetView: 'overview' as const,
  },
  {
    type: 'inventory' as const,
    title: 'Đạt giới hạn: Xi măng Bỉm Sơn PCB40',
    message: 'Xi măng Bỉm Sơn PCB40 tại kho chính Vinhomes Central Park đã chạm ngưỡng cảnh báo tối thiểu (120 bao).',
    severity: 'warning' as const,
    projectName: 'Vinhomes Central Park',
    targetView: 'inventory' as const,
    targetQuery: 'MS-XM-023',
  },
  {
    type: 'budget' as const,
    title: 'Cảnh báo ngân sách chạm trần',
    message: 'Tổng chi phí thi công móng cọc tại dự án Aqua City đã đạt 98.7% hạn mức ngân sách được duyệt.',
    severity: 'warning' as const,
    projectName: 'Aqua City',
    targetView: 'budget' as const,
  },
  {
    type: 'milestone' as const,
    title: 'Hợp long nhịp cầu chính',
    message: 'Dự án Cầu Sông Hàn đã hoàn thành hợp long nhịp dầm treo thép nhịp giữa sông Hàn an toàn, chính xác tuyệt đối.',
    severity: 'info' as const,
    projectName: 'Cầu Sông Hàn',
    targetView: 'overview' as const,
  }
];

interface HeaderProps {
  currentView: ViewType;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onViewChange?: (view: ViewType, query?: string) => void;
  onMenuToggle?: () => void;
}

export default function Header({ currentView, theme = 'dark', onToggleTheme, onViewChange, onMenuToggle }: HeaderProps) {
  const [time, setTime] = useState('');
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'milestone' | 'budget' | 'inventory'>('all');
  const [notifications, setNotifications] = useState<ERPNotification[]>(() => {
    const saved = localStorage.getItem('erp_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('erp_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Real-time automatic alert generator simulation (runs every 45s to add realism)
  useEffect(() => {
    const interval = setInterval(() => {
      const randomItem = SIMULATION_POOL[Math.floor(Math.random() * SIMULATION_POOL.length)];
      const newNotif: ERPNotification = {
        id: `notif-auto-${Date.now()}`,
        type: randomItem.type,
        title: randomItem.title,
        message: randomItem.message,
        time: 'Vừa xong',
        read: false,
        severity: randomItem.severity,
        projectName: randomItem.projectName,
        targetView: randomItem.targetView,
        targetQuery: randomItem.targetQuery,
      };
      setNotifications(prev => [newNotif, ...prev]);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (notificationFilter === 'all') return true;
    return n.type === notificationFilter;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const simulateNewNotification = () => {
    const randomItem = SIMULATION_POOL[Math.floor(Math.random() * SIMULATION_POOL.length)];
    const newNotif: ERPNotification = {
      id: `notif-sim-${Date.now()}`,
      type: randomItem.type,
      title: randomItem.title,
      message: randomItem.message,
      time: 'Vừa xong',
      read: false,
      severity: randomItem.severity,
      projectName: randomItem.projectName,
      targetView: randomItem.targetView,
      targetQuery: randomItem.targetQuery,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Listen to keyboard ESC key to close search or clear it
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuery('');
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'overview':
        return ['Hệ thống', 'Tổng quan'];
      case 'personnel':
        return ['Quản trị', 'Quản lý Nhân sự'];
      case 'attendance':
        return ['Vận hành', 'Bảng Chấm công'];
      case 'construction-log':
        return ['Vận hành', 'Nhật ký & Tiến độ'];
      case 'inventory':
        return ['Kho & Logistics', 'Vật tư & Kho'];
      case 'budget':
        return ['Kế toán', 'Ngân sách & Chi phí'];
      case 'matrix':
        return ['Bảo mật', 'Cấu hình Ma trận Phân quyền'];
      case 'users':
        return ['Bảo mật', 'Quản lý Người dùng'];
      case 'roles':
        return ['Bảo mật', 'Vai trò & Quyền hạn'];
      case 'forbidden':
        return ['Vận hành', 'Truy cập bị từ chối'];
      default:
        return ['AI ERP'];
    }
  };

  const removeAccents = (str: string): string => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  const filteredItems = query.trim() === ''
    ? []
    : SEARCH_DATABASE.filter((item) => {
        const normalizedQuery = removeAccents(query.toLowerCase());
        const nameMatch = removeAccents(item.name.toLowerCase()).includes(normalizedQuery);
        const subtextMatch = removeAccents(item.subtext.toLowerCase()).includes(normalizedQuery);
        const idMatch = item.id.toLowerCase().includes(normalizedQuery);
        return nameMatch || subtextMatch || idMatch;
      });

  const breadcrumbs = getBreadcrumbs();

  return (
    <header id="app-header" className="h-16 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between px-4 sm:px-6 shrink-0 backdrop-blur-md select-none sticky top-0 z-30">
      {/* Left side: Breadcrumbs & View indicator */}
      <div className="flex items-center space-x-3 text-xs">
        {/* Hamburger Menu Toggle for Mobile/Tablet */}
        <button
          onClick={onMenuToggle}
          className="p-1.5 -ml-1 bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-850 lg:hidden cursor-pointer transition-colors"
          title="Mở menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-1.5 text-neutral-500 font-medium">
          <span className="hidden sm:inline">AI Construction ERP</span>
          <span className="hidden sm:inline">/</span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="hidden sm:inline">/</span>}
              <span className={`${idx === breadcrumbs.length - 1 ? 'text-neutral-200 font-semibold' : 'hidden sm:inline'}`}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right side: Global Actions, Clock, Notifications */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* UTC Time Display - hidden on small devices */}
        <div className="hidden md:flex items-center space-x-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800/60">
          <Globe className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-mono text-xs font-semibold text-neutral-300 tracking-wider">
            {time || '2026-06-24 10:20:00 UTC'}
          </span>
        </div>

        {/* Mobile Search Trigger Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
              isMobileSearchOpen
                ? 'bg-amber-500 text-black border-amber-500/20'
                : 'bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-850'
            }`}
          >
            {isMobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        {/* Global Search Bar */}
        <div ref={containerRef} className="relative hidden lg:block w-80">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="global-search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Tìm công trình, vật tư, nhân sự..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-12 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-neutral-600"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-[10px] bg-neutral-900 hover:bg-neutral-800 px-1.5 py-0.5 rounded font-mono transition-all"
              >
                ESC
              </button>
            )}
          </div>

          {/* Search Dropdown Panel */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-[420px] bg-neutral-900/95 backdrop-blur-lg border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {query.trim() === '' ? (
                /* Search Suggestions */
                <div className="p-4 space-y-3">
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span>Gợi ý tìm kiếm phổ biến</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Siêu dự án Landmark 81', view: 'overview', term: '' },
                      { name: 'Kỹ sư Nguyễn Minh Đức', view: 'personnel', term: 'Nguyễn Minh Đức' },
                      { name: 'Thép Hòa Phát D10', view: 'inventory', term: 'MS-TH-001' },
                      { name: 'Chấm công Nguyễn Văn An', view: 'attendance', term: 'Nguyễn Văn An' },
                    ].map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (onViewChange) {
                            onViewChange(sug.view as ViewType, sug.term);
                          }
                          setQuery('');
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-950 hover:bg-neutral-850 border border-neutral-800/40 text-left transition-colors cursor-pointer group text-xs"
                      >
                        <span className="text-neutral-300 font-medium group-hover:text-white transition-colors truncate pr-1">
                          {sug.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-amber-500 transition-colors transform group-hover:translate-x-0.5 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Live Search Results */
                <div className="max-h-[380px] overflow-y-auto divide-y divide-neutral-850">
                  {filteredItems.length === 0 ? (
                    <div className="p-8 text-center space-y-2">
                      <Search className="w-8 h-8 text-neutral-600 mx-auto animate-bounce" />
                      <div className="text-xs text-neutral-300 font-semibold">Không tìm thấy kết quả</div>
                      <p className="text-[10px] text-neutral-500 max-w-[240px] mx-auto leading-relaxed">
                        Thử tìm kiếm với từ khóa khác như "Hòa Phát", "Đức", "Landmark" hoặc mã số thợ.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Categorized results */}
                      {(['project', 'personnel', 'attendance', 'inventory'] as const).map((category) => {
                        const items = filteredItems.filter((i) => i.type === category);
                        if (items.length === 0) return null;

                        const categoryLabel = {
                          project: 'Dự án & Công trình',
                          personnel: 'Nhân sự & Kỹ sư',
                          attendance: 'Bảng chấm công',
                          inventory: 'Kho & Vật tư',
                        }[category];

                        return (
                          <div key={category} className="p-2">
                            <div className="px-3 py-1.5 text-[9px] font-bold text-neutral-500 uppercase tracking-widest bg-neutral-950/30 rounded-md">
                              {categoryLabel}
                            </div>
                            <div className="space-y-0.5 mt-1">
                              {items.map((item) => {
                                const Icon = {
                                  project: Building,
                                  personnel: Users,
                                  attendance: Clock,
                                  inventory: Package,
                                }[item.type];

                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      if (onViewChange) {
                                        onViewChange(item.view, item.targetTerm);
                                      }
                                      setQuery('');
                                      setIsOpen(false);
                                    }}
                                    className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-neutral-850 text-left transition-colors cursor-pointer group"
                                  >
                                    <div className="p-1.5 bg-neutral-950 rounded-md border border-neutral-800 text-neutral-400 group-hover:text-amber-500 group-hover:border-amber-500/20 transition-all shrink-0">
                                      <Icon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                                          {item.name}
                                        </span>
                                        <span className="text-[9px] font-mono text-neutral-500 font-bold tracking-wider shrink-0 ml-2">
                                          {item.id}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                                        {item.subtext}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
              {/* Dropdown footer info */}
              <div className="p-2.5 bg-neutral-950 border-t border-neutral-850 flex justify-between items-center text-[9px] text-neutral-500 font-medium">
                <span>Nhấn ESC để đóng hoặc xóa</span>
                <span className="font-mono bg-neutral-900 px-1 py-0.2 rounded border border-neutral-800">
                  {filteredItems.length} kết quả
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Mode */}
        <div className="relative">
          <button
            id="btn-theme-toggle"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
            className="p-2 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-850 transition-all cursor-pointer flex items-center justify-center shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>
        </div>

        {/* Notification Badge */}
        <div className="relative">
          <button
            id="btn-notifications"
            onClick={() => setIsNotificationOpen(true)}
            title="Xem thông báo cảnh báo"
            className="p-2 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-850 transition-all relative cursor-pointer flex items-center justify-center shadow-sm hover:scale-105 active:scale-95"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-2 ring-neutral-900 font-mono animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* User Dropdown */}
        <div className="flex items-center space-x-2 border-l border-neutral-800 pl-2 sm:pl-4">
          <div className="flex items-center space-x-2">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">Trần Anh Tuấn</div>
              <div className="text-[9px] text-amber-500 font-bold tracking-wider uppercase font-mono">
                System Administrator
              </div>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqvUPpQ_JsRqCklDc_MgRZHtwiZLo4ZKc2lK-z_IMuenC-xrnX940wxPDv72_R8JtupxiOBPjSXPvlkJlBdsZqkcBYeOBtGvUZheewA6iiQq_oLBztDpOd1TfBzNrSo6e063ZAPTAaSFic1ZPsl3aGlK9yKjzDI1JQ3d-CcwlWdO9mKLMtBm-eVI1wNAPKdY-EBzffv9s0gOiDHtaYu0k5Z0UDGgmOBhUvhH66cbg92ipU42P1_IE3_fmSfX5m2o7z22-YLgdUSRY"
              alt="User profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-700 shadow-md object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay Bar */}
      {isMobileSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-neutral-900 border-b border-neutral-800 p-3 z-40 lg:hidden flex flex-col space-y-2 animate-in slide-in-from-top duration-150 shadow-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Tìm công trình, vật tư, nhân sự..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-12 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-neutral-600"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Render mobile search dropdown inline if open */}
          {isOpen && (
            <div className="bg-neutral-950 border border-neutral-850 rounded-xl overflow-hidden max-h-[300px] overflow-y-auto divide-y divide-neutral-850 shadow-inner">
              {query.trim() === '' ? (
                <div className="p-3 text-[10px] text-neutral-500">Nhập từ khóa để tìm kiếm...</div>
              ) : filteredItems.length === 0 ? (
                <div className="p-4 text-center text-xs text-neutral-500">Không tìm thấy kết quả</div>
              ) : (
                filteredItems.map((item) => {
                  const Icon = {
                    project: Building,
                    personnel: Users,
                    attendance: Clock,
                    inventory: Package,
                  }[item.type];

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (onViewChange) {
                          onViewChange(item.view, item.targetTerm);
                        }
                        setQuery('');
                        setIsOpen(false);
                        setIsMobileSearchOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-neutral-900 transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-neutral-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white truncate">{item.name}</span>
                          <span className="text-[9px] font-mono text-neutral-500 font-bold shrink-0 ml-2">{item.id}</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 truncate">{item.subtext}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

      {/* Notifications Slide-over Panel */}
      <AnimatePresence>
        {isNotificationOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotificationOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-neutral-900 border-l border-neutral-800/40 shadow-[0_0_50px_rgba(0,0,0,0.6)] z-50 flex flex-col h-full text-white"
            >
              {/* Header */}
              <div className="p-4.5 border-b border-neutral-800/30 flex items-center justify-between bg-neutral-950/90 backdrop-blur-md shadow-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-amber-500 animate-pulse" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] font-bold text-white h-4 w-4 rounded-full flex items-center justify-center font-mono animate-bounce">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Cảnh báo Thời gian thực</h2>
                    <p className="text-[10px] text-neutral-400 font-semibold">Cột mốc dự án, ngân sách & vật tư</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={simulateNewNotification}
                    className="flex items-center space-x-1 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg text-[10px] font-bold text-amber-400 cursor-pointer transition-all active:scale-95 shadow-xs"
                    title="Mô phỏng phát sinh một cảnh báo thời gian thực ngẫu nhiên"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Mô phỏng</span>
                  </button>
                  <button
                    onClick={() => setIsNotificationOpen(false)}
                    className="p-1.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 cursor-pointer transition-all shadow-xs"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action tabs / Filter */}
              <div className="px-4.5 py-3 border-b border-neutral-800/30 bg-neutral-950 flex items-center justify-between text-xs text-neutral-300 select-none">
                <div className="flex space-x-1.5 overflow-x-auto scrollbar-none py-0.5">
                  {(['all', 'milestone', 'budget', 'inventory'] as const).map((filter) => {
                    const label = {
                      all: 'Tất cả',
                      milestone: 'Cột mốc',
                      budget: 'Ngân sách',
                      inventory: 'Vật tư',
                    }[filter];

                    const count = filter === 'all'
                      ? notifications.length
                      : notifications.filter(n => n.type === filter).length;

                    return (
                      <button
                        key={filter}
                        onClick={() => setNotificationFilter(filter)}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer shrink-0 ${
                          notificationFilter === filter
                            ? 'bg-amber-500 text-black shadow-md'
                            : 'bg-neutral-800/40 hover:bg-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {label} ({count})
                      </button>
                    );
                  })}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] font-bold text-amber-500 hover:text-amber-400 flex items-center space-x-1 cursor-pointer transition-colors shrink-0 ml-2"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Đọc tất cả</span>
                  </button>
                )}
              </div>

              {/* Notifications Scroll Container */}
              <div className="flex-1 min-h-[500px] overflow-y-auto p-4.5 space-y-4 bg-neutral-950 border-b border-neutral-800/30">
                {filteredNotifications.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-8">
                    <div className="p-3 bg-neutral-950 rounded-full border border-neutral-800 text-neutral-500">
                      <BellOff className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-neutral-300">Không có thông báo nào</h3>
                      <p className="text-[10px] text-neutral-400 max-w-[220px] mt-1 leading-relaxed">
                        Các hoạt động của hệ thống đang diễn ra bình thường. Nhấn nút "Mô phỏng" để giả lập phát sinh cảnh báo mới.
                      </p>
                    </div>
                  </div>
                ) : (
                  filteredNotifications.map((notif) => {
                    const Icon = {
                      milestone: CheckCircle2,
                      budget: AlertCircle,
                      inventory: AlertTriangle,
                    }[notif.type];

                    const iconBgClass = {
                      milestone: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
                      budget: 'bg-red-500/15 border-red-500/30 text-red-400',
                      inventory: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
                    }[notif.type];

                    // Determine background & borders dynamically to maximize legibility and depth
                    const getCardStyle = () => {
                      if (notif.read) {
                        return 'bg-neutral-900/50 border-neutral-800/40 opacity-60 hover:opacity-100 hover:border-neutral-700 shadow-xs text-neutral-400';
                      }
                      switch (notif.type) {
                        case 'milestone':
                          return 'bg-neutral-900 border-emerald-800/60 shadow-md hover:scale-[1.01] hover:border-emerald-700 transition-all text-white';
                        case 'budget':
                          return 'bg-neutral-900 border-red-800/60 shadow-md hover:scale-[1.01] hover:border-red-700 transition-all text-white';
                        case 'inventory':
                          return 'bg-neutral-900 border-amber-800/60 shadow-md hover:scale-[1.01] hover:border-amber-700 transition-all text-white';
                        default:
                          return 'bg-neutral-900 border-neutral-800 shadow-md text-white';
                      }
                    };

                    return (
                      <div
                        key={notif.id}
                        className={`relative p-5 rounded-xl border transition-all duration-200 flex flex-col space-y-3.5 text-left ${getCardStyle()}`}
                      >
                        {/* Pulse dot for unread */}
                        {!notif.read && (
                          <span className="absolute top-4.5 right-4.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        )}

                        <div className="flex items-start space-x-3.5">
                          <div className={`p-2 rounded-lg border shrink-0 ${iconBgClass}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider font-mono truncate max-w-[150px]">
                                {notif.projectName}
                              </span>
                              <span className="text-[9px] font-semibold text-neutral-400 shrink-0">
                                {notif.time}
                              </span>
                            </div>
                            <h4 className={`text-xs sm:text-sm font-extrabold truncate mt-1 ${notif.read ? 'text-neutral-500' : 'text-white'}`}>
                              {notif.title}
                            </h4>
                          </div>
                        </div>

                        <div className={`p-4 rounded-xl border min-h-[110px] sm:min-h-[125px] flex items-center transition-all shadow-inner ${
                          notif.read
                            ? 'bg-neutral-950/50 border-neutral-800/30 text-neutral-400'
                            : {
                                milestone: 'bg-emerald-950/40 border-emerald-800/50 text-emerald-100',
                                budget: 'bg-red-950/40 border-red-800/50 text-red-100',
                                inventory: 'bg-amber-950/40 border-amber-800/50 text-amber-100',
                              }[notif.type]
                        }`}>
                          <p className="text-[11.5px] sm:text-[13px] leading-relaxed font-semibold">
                            {notif.message}
                          </p>
                        </div>

                        {/* Actions for notification */}
                        <div className="pt-2.5 border-t border-neutral-800 flex items-center justify-between">
                          <button
                            onClick={() => {
                              if (onViewChange) {
                                onViewChange(notif.targetView, notif.targetQuery);
                              }
                              markAsRead(notif.id);
                              setIsNotificationOpen(false);
                            }}
                            className="flex items-center space-x-1.5 text-[10px] font-bold text-amber-400 hover:text-amber-300 bg-neutral-950 hover:bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800 cursor-pointer transition-all active:scale-95 shadow-sm"
                          >
                            <span>Xem chi tiết</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>

                          <div className="flex items-center space-x-2">
                            {!notif.read && (
                              <button
                                onClick={() => markAsRead(notif.id)}
                                className="text-[9px] font-bold text-neutral-400 hover:text-white flex items-center space-x-1 bg-neutral-900 hover:bg-neutral-850 px-2 py-1 rounded border border-neutral-800 cursor-pointer transition-all shadow-sm"
                              >
                                <Check className="w-2.5 h-2.5" />
                                <span>Đọc</span>
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notif.id)}
                              className="text-[9px] font-bold text-neutral-500 hover:text-red-400 p-1.5 rounded hover:bg-neutral-850 transition-colors cursor-pointer"
                              title="Xóa cảnh báo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer info */}
              <div className="p-3 bg-neutral-950 border-t border-neutral-800/30 flex items-center justify-center space-x-1.5 text-[9px] text-neutral-400 font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Hệ thống giám sát IoT đang hoạt động</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
