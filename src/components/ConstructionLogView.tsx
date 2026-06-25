import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Calendar,
  CloudSun,
  Thermometer,
  Users,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  TrendingUp,
  MapPin,
  ChevronRight,
  Sparkles,
  Layers,
  CheckSquare,
  PenTool,
  Info,
  Sliders,
  Trash2,
  Camera,
  Image as ImageIcon,
  Eye,
  X,
  Check
} from 'lucide-react';

interface ConstructionLog {
  id: string;
  project: string;
  date: string;
  shift: 'Sáng' | 'Chiều' | 'Đêm';
  weather: 'Nắng ráo' | 'Mưa ẩm' | 'Nhiều mây' | 'Mưa bão';
  temperature: number;
  supervisor: string;
  manpower: number;
  safetyStatus: 'An toàn' | 'Có sự cố' | 'Cảnh báo';
  content: string;
  issues: string;
  status: 'Approved' | 'Pending';
  images?: string[];
}

interface Milestone {
  id: string;
  name: string;
  weight: number; // weight in %
  completed: boolean;
  dueDate: string;
  image?: string;       // Unsplash image URL for visual timeline
  description?: string; // Rich description for timeline
  actualDate?: string;  // Date of completion
}

interface ProjectProgress {
  id: string;
  name: string;
  location: string;
  overallProgress: number; // 0-100
  startDate: string;
  targetDate: string;
  milestones: Milestone[];
}

const PRESET_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop', label: 'Cốt móng & Hố đào' },
  { url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop', label: 'Đổ bê tông dầm sàn' },
  { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', label: 'Giàn giáo & Hàn cốt thép' },
  { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', label: 'Lắp kính facade tháp' },
  { url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop', label: 'Cơ điện MEP & Thiết bị' },
];

const initialLogs: ConstructionLog[] = [
  {
    id: 'log-1',
    project: 'Landmark 81',
    date: '2026-06-24',
    shift: 'Sáng',
    weather: 'Nắng ráo',
    temperature: 32,
    supervisor: 'Trần Anh Tuấn',
    manpower: 245,
    safetyStatus: 'An toàn',
    content: 'Thi công cốt thép sàn tầng 72 tháp trung tâm. Đổ bê tông dầm chuyển móng phân khu Đông. Kiểm tra hệ thống giàn giáo bao che ngoài tháp.',
    issues: 'Không có phát sinh đặc biệt. Vật tư thép dự phòng đáp ứng tốt.',
    status: 'Approved',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'log-2',
    project: 'Hầm Thủ Thiêm 2',
    date: '2026-06-24',
    shift: 'Chiều',
    weather: 'Nhiều mây',
    temperature: 30,
    supervisor: 'Nguyễn Văn Hùng',
    manpower: 120,
    safetyStatus: 'Cảnh báo',
    content: 'Đúc đốt hầm số 4 bờ quận 1. Vận hành bơm hút nước ngầm hố móng sâu. Gia cố vách ngăn chống sạt lở tạm thời.',
    issues: 'Mực nước ngầm dâng cao nhẹ do triều cường, đã tăng cường thêm 2 máy bơm dự phòng.',
    status: 'Approved',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'log-3',
    project: 'Vinhomes CP',
    date: '2026-06-23',
    shift: 'Đêm',
    weather: 'Mưa ẩm',
    temperature: 26,
    supervisor: 'Lê Hoàng Nam',
    manpower: 85,
    safetyStatus: 'An toàn',
    content: 'Thi công cơ điện MEP trục đứng block B1. Luồn cáp điện động lực tầng hầm B2. Lắp ráp hệ thống ống thông gió HVAC hành lang.',
    issues: 'Mưa nhỏ lúc nửa đêm gây gián đoạn nhẹ việc bốc dỡ vật tư ngoài trời, công tác thi công cơ điện trong nhà vẫn diễn ra bình thường.',
    status: 'Approved',
    images: [
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'log-4',
    project: 'Sala Block C',
    date: '2026-06-24',
    shift: 'Sáng',
    weather: 'Nắng ráo',
    temperature: 33,
    supervisor: 'Phạm Đức Duy',
    manpower: 140,
    safetyStatus: 'An toàn',
    content: 'Đóng cọc đại trà móng phân khu C2. San lấp cát nền móng cốt chuẩn. Lắp dựng cốp pha cột vách hầm 1.',
    issues: 'Không có sự cố phát sinh. Tiến độ ép cọc đạt 105% chỉ tiêu ngày.',
    status: 'Pending',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'log-5',
    project: 'Aqua City',
    date: '2026-06-23',
    shift: 'Chiều',
    weather: 'Mưa bão',
    temperature: 25,
    supervisor: 'Vũ Thị Mai',
    manpower: 60,
    safetyStatus: 'Có sự cố',
    content: 'Tạm dừng công tác xây tô ngoài trời tháp A do giông bão lớn nguy hiểm. Di chuyển thợ vào khu vực an toàn bên trong tòa nhà để làm vệ sinh công nghiệp và sơn bả lót trong.',
    issues: 'Sét đánh hỏng tạm thời tủ điện thi công nhánh phân khu A3. Đã cô lập dòng điện và tiến hành sửa chữa thay thế át-tô-mát.',
    status: 'Approved',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
    ]
  }
];

const initialProjects: ProjectProgress[] = [
  {
    id: 'proj-1',
    name: 'Landmark 81',
    location: 'Quận Bình Thạnh, TP.HCM',
    overallProgress: 95,
    startDate: '2024-01-10',
    targetDate: '2026-08-30',
    milestones: [
      { id: 'ms-1-1', name: 'Giải phóng mặt bằng & Ép cọc nhồi', weight: 15, completed: true, dueDate: '2024-04-15', actualDate: '2024-04-11', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop', description: 'Hoàn thành khoan 120 cọc nhồi đường kính 2.0m sâu 75m dưới lòng đất, đảm bảo tải trọng cho tháp siêu cao tầng.' },
      { id: 'ms-1-2', name: 'Đổ bê tông móng khối lớn (Hầm)', weight: 20, completed: true, dueDate: '2024-10-20', actualDate: '2024-10-18', image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop', description: 'Đổ bê tông liên tục kỷ lục 17,000 m3 móng đài dày 4m diễn ra suôn sẻ trong 48 giờ liên tiếp.' },
      { id: 'ms-1-3', name: 'Xây thô khung bê tông cốt thép tháp', weight: 30, completed: true, dueDate: '2025-12-15', actualDate: '2025-12-12', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', description: 'Thi công cất nóc phần thô bê tông đến tầng 81. Vận hành cẩu tháp siêu trọng leo ngoài sàn nhà.' },
      { id: 'ms-1-4', name: 'Lắp đặt hệ thống kính facade hộp', weight: 15, completed: true, dueDate: '2026-04-30', actualDate: '2026-04-25', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', description: 'Gắn toàn bộ kính hộp cản nhiệt Low-E nhập khẩu từ Bỉ cho toàn bộ bề mặt tháp, hoàn thành bao che kín.' },
      { id: 'ms-1-5', name: 'Hoàn thiện nội thất & Lắp cơ điện MEP', weight: 15, completed: false, dueDate: '2026-07-15', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop', description: 'Lắp đặt hệ thống điều hòa không khí Chiller, dây nguồn động lực và nội thất căn hộ dịch vụ.' },
      { id: 'ms-1-6', name: 'Kiểm nghiệm PCCC & Nghiệm thu bàn giao', weight: 5, completed: false, dueDate: '2026-08-30', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop', description: 'Tiến hành kiểm thử cảm biến khói, áp lực nước Sprinkler vòi phun tự động và diễn tập sơ tán.' }
    ]
  },
  {
    id: 'proj-2',
    name: 'Hầm Thủ Thiêm 2',
    location: 'Quận 1 - TP. Thủ Đức, TP.HCM',
    overallProgress: 88,
    startDate: '2024-03-15',
    targetDate: '2026-10-15',
    milestones: [
      { id: 'ms-2-1', name: 'Khảo sát địa chất & Đào hố móng dẫn', weight: 15, completed: true, dueDate: '2024-07-10', actualDate: '2024-07-08', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop', description: 'Giải phóng lòng sông, khoan thăm dò địa tầng và ép cọc ván thép cừ Larsen quây giữ hố móng đầu cầu.' },
      { id: 'ms-2-2', name: 'Đúc các đốt hầm bê tông cốt thép ngầm', weight: 25, completed: true, dueDate: '2025-05-20', actualDate: '2025-05-18', image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop', description: 'Thi công đúc 4 đốt hầm bê tông cốt thép siêu trường siêu trọng tại bãi đúc Nhơn Trạch đảm bảo tuyệt đối chống thấm.' },
      { id: 'ms-2-3', name: 'Lai dắt và dìm các đốt hầm xuống lòng sông', weight: 25, completed: true, dueDate: '2025-11-30', actualDate: '2025-11-28', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', description: 'Dùng tàu kéo lai dắt các đốt hầm nặng hàng chục ngàn tấn dọc sông Sài Gòn và định vị dìm chuẩn xác xuống đáy sông.' },
      { id: 'ms-2-4', name: 'Hợp long nối các đốt hầm', weight: 15, completed: true, dueDate: '2026-03-10', actualDate: '2026-03-08', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop', description: 'Bơm hút nước, xử lý gioăng cao su kỹ thuật và đổ bê tông liên kết hầm giữa các đốt hầm ngầm sông.' },
      { id: 'ms-2-5', name: 'Trải nhựa mặt đường & Lắp cơ điện hầm', weight: 15, completed: false, dueDate: '2026-08-20', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop', description: 'Tiến hành thảm nhựa bê tông hạt mịn mặt đường hầm, lắp đặt hệ thống đèn chiếu sáng dẫn đường thông minh.' },
      { id: 'ms-2-6', name: 'Hệ thống thông gió & Kiểm duyệt an toàn', weight: 5, completed: false, dueDate: '2026-10-01', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', description: 'Lắp quạt phản lực hướng trục, kiểm soát nồng độ khí thải CO và thử nghiệm tủ điều khiển trung tâm.' }
    ]
  },
  {
    id: 'proj-3',
    name: 'Vinhomes CP',
    location: 'Quận Bình Thạnh, TP.HCM',
    overallProgress: 92,
    startDate: '2024-02-01',
    targetDate: '2026-07-20',
    milestones: [
      { id: 'ms-3-1', name: 'Thi công cọc nhồi móng block cao tầng', weight: 20, completed: true, dueDate: '2024-06-15', actualDate: '2024-06-11', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop', description: 'Khoan cọc và làm sạch hố khoan, thả lồng thép và đổ bê tông cọc móng phân khu Central Park.' },
      { id: 'ms-3-2', name: 'Hoàn thành 3 tầng hầm liên thông', weight: 20, completed: true, dueDate: '2025-01-10', actualDate: '2025-01-09', image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop', description: 'Đào đất hầm sâu, đổ sàn tầng hầm B1, B2, B3 và xây dựng hệ thống phòng bơm nước kỹ thuật ngầm.' },
      { id: 'ms-3-3', name: 'Cất nóc khối nhà căn hộ', weight: 25, completed: true, dueDate: '2025-10-05', actualDate: '2025-10-02', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', description: 'Hoàn thành thi công phần kết cấu bê tông thô tầng mái, dựng cột ăng ten trang trí đỉnh tháp.' },
      { id: 'ms-3-4', name: 'Sơn phủ & Lắp đặt thiết bị vệ sinh', weight: 15, completed: true, dueDate: '2026-04-15', actualDate: '2026-04-12', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop', description: 'Sơn hoàn thiện mặt dựng ngoài tòa nhà, chống thấm lô gia và bồn hoa, lắp thiết bị vệ sinh cao cấp.' },
      { id: 'ms-3-5', name: 'Hoàn thiện hạ tầng cảnh quan & Sân đường', weight: 15, completed: false, dueDate: '2026-06-30', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', description: 'Trồng cây xanh bóng mát, lát đá granite đường đi dạo, thi công hồ bơi vô cực ngoài trời.' },
      { id: 'ms-3-6', name: 'Bàn giao chìa khóa cho cư dân đợt 1', weight: 5, completed: false, dueDate: '2026-07-20', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop', description: 'Tổ chức nghiệm thu khối căn hộ với Ban Quản lý, tiến hành thủ tục bàn giao chìa khóa cho đợt cư dân đầu tiên.' }
    ]
  },
  {
    id: 'proj-4',
    name: 'Sala Block C',
    location: 'Quận 2, TP.HCM',
    overallProgress: 42,
    startDate: '2025-05-10',
    targetDate: '2027-02-28',
    milestones: [
      { id: 'ms-4-1', name: 'Khoan cọc và tường vây tầng hầm', weight: 20, completed: true, dueDate: '2025-09-15', actualDate: '2025-09-12', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop', description: 'Thi công ép dầm quây bê tông tường vây xung quanh khu đất móng để ngăn chặn sạt lở đất sụt lún xung quanh.' },
      { id: 'ms-4-2', name: 'Đào đất đổ bê tông móng đài giằng', weight: 20, completed: true, dueDate: '2026-02-20', actualDate: '2026-02-17', image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop', description: 'Đào đất hố móng móng bằng máy đào cần dài, cắt đầu cọc bê tông khoan nhồi và đan sắt đổ móng bè dày 2.5m.' },
      { id: 'ms-4-3', name: 'Thi công dầm sàn hầm vách tầng hầm', weight: 20, completed: false, dueDate: '2026-07-10', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', description: 'Dựng giàn giáo chống sàn hầm, đan lưới thép 2 lớp dầm sàn và tiến hành đổ bê tông tươi thương phẩm.' },
      { id: 'ms-4-4', name: 'Thi công khung bê tông từ tầng 1-15', weight: 20, completed: false, dueDate: '2026-11-30', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', description: 'Đóng cốp pha vách cột dầm sàn bê tông cốt thép định hình từng tầng, đạt tiến độ 5 ngày hoàn thiện 1 mặt sàn.' },
      { id: 'ms-4-5', name: 'Xây tường bao che & Trát trong ngoài', weight: 10, completed: false, dueDate: '2027-01-15', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop', description: 'Xây tường bằng gạch không nung nhẹ bọt khí, thi công tô trát phẳng bề mặt chuẩn bị sơn bả lót.' },
      { id: 'ms-4-6', name: 'Bàn giao mặt bằng kỹ thuật', weight: 10, completed: false, dueDate: '2027-02-28', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop', description: 'Dọn dẹp vệ sinh công nghiệp toàn khu, nghiệm thu hạ tầng kỹ thuật nguồn nước nguồn điện tổng.' }
    ]
  },
  {
    id: 'proj-5',
    name: 'Aqua City',
    location: 'TP. Biên Hòa, Đồng Nai',
    overallProgress: 78,
    startDate: '2024-08-01',
    targetDate: '2026-09-30',
    milestones: [
      { id: 'ms-5-1', name: 'Làm đường trục chính & San lấp mặt bằng', weight: 15, completed: true, dueDate: '2024-11-15', actualDate: '2024-11-12', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop', description: 'San gạt cốt nền toàn khu đô thị sinh thái, lu lèn đá dăm nền đường trục lộ giới rộng 45m.' },
      { id: 'ms-5-2', name: 'Hệ thống thoát nước ngầm toàn khu', weight: 15, completed: true, dueDate: '2025-03-20', actualDate: '2025-03-18', image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop', description: 'Lắp đặt các đốt cống hộp đúc sẵn kích thước lớn dọc các tuyến phố, xây hố ga kỹ thuật thoát mưa nước thải riêng.' },
      { id: 'ms-5-3', name: 'Xây thô dãy Shophouse trục đường chính', weight: 25, completed: true, dueDate: '2025-11-10', actualDate: '2025-11-05', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', description: 'Dựng kết cấu khung bê tông kết hợp tường gạch xây cho 150 căn Shophouse thương mại trục đại lộ chính.' },
      { id: 'ms-5-4', name: 'Sơn trát mặt ngoài đồng bộ châu Âu', weight: 15, completed: true, dueDate: '2026-04-05', actualDate: '2026-04-02', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', description: 'Tạo hình phào chỉ tân cổ điển mặt ngoài, sơn lót kháng kiềm chống thấm, sơn phủ màu kem đồng bộ.' },
      { id: 'ms-5-5', name: 'Lắp đặt đèn đường, cây xanh cảnh quan', weight: 20, completed: false, dueDate: '2026-08-15', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', description: 'Dựng cột đèn đường năng lượng mặt trời, lót đá vỉa hè, trồng thảm cỏ lá tre cùng cây chà là hoàng gia.' },
      { id: 'ms-5-6', name: 'Nghiệm thu toàn khu đô thị sinh thái', weight: 10, completed: false, dueDate: '2026-09-30', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop', description: 'Các cơ quan ban ngành kiểm tra cơ sở hạ tầng giao thông kết nối, đấu nối xả thải và bàn giao sử dụng.' }
    ]
  }
];

export default function ConstructionLogView() {
  const [activeTab, setActiveTab] = useState<'logs' | 'progress'>('logs');
  
  // States for Logs tab
  const [logs, setLogs] = useState<ConstructionLog[]>(initialLogs);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all');
  const [selectedSafetyFilter, setSelectedSafetyFilter] = useState<string>('all');
  const [searchLogQuery, setSearchLogQuery] = useState('');
  
  // Log Creation state
  const [isCreatingLog, setIsCreatingLog] = useState(false);
  const [newLogProject, setNewLogProject] = useState('Landmark 81');
  const [newLogShift, setNewLogShift] = useState<'Sáng' | 'Chiều' | 'Đêm'>('Sáng');
  const [newLogWeather, setNewLogWeather] = useState<'Nắng ráo' | 'Mưa ẩm' | 'Nhiều mây' | 'Mưa bão'>('Nắng ráo');
  const [newLogTemperature, setNewLogTemperature] = useState(30);
  const [newLogManpower, setNewLogManpower] = useState(150);
  const [newLogSafety, setNewLogSafety] = useState<'An toàn' | 'Có sự cố' | 'Cảnh báo'>('An toàn');
  const [newLogContent, setNewLogContent] = useState('');
  const [newLogIssues, setNewLogIssues] = useState('');
  const [newLogImages, setNewLogImages] = useState<string[]>([]);

  // States for Progress tab
  const [projects, setProjects] = useState<ProjectProgress[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-1');

  // Lightbox modal state for viewing images in high resolution
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  // Selected log for detailed view modal (combining project progress details)
  const [selectedDetailLog, setSelectedDetailLog] = useState<ConstructionLog | null>(null);
  
  // Filter logs list
  const filteredLogs = logs.filter(log => {
    const matchesProject = selectedProjectFilter === 'all' || log.project === selectedProjectFilter;
    const matchesSafety = selectedSafetyFilter === 'all' || log.safetyStatus === selectedSafetyFilter;
    const matchesSearch = log.content.toLowerCase().includes(searchLogQuery.toLowerCase()) ||
                          log.supervisor.toLowerCase().includes(searchLogQuery.toLowerCase()) ||
                          log.issues.toLowerCase().includes(searchLogQuery.toLowerCase());
    return matchesProject && matchesSafety && matchesSearch;
  });

  // Handle submit log
  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogContent.trim()) return;

    const newLog: ConstructionLog = {
      id: `log-${Date.now()}`,
      project: newLogProject,
      date: new Date().toISOString().split('T')[0],
      shift: newLogShift,
      weather: newLogWeather,
      temperature: Number(newLogTemperature),
      supervisor: 'Trần Anh Tuấn', // Logged-in administrator
      manpower: Number(newLogManpower),
      safetyStatus: newLogSafety,
      content: newLogContent.trim(),
      issues: newLogIssues.trim() || 'Không có phát sinh đặc biệt.',
      status: 'Pending',
      images: newLogImages.length > 0 ? newLogImages : [PRESET_PHOTOS[1].url]
    };

    setLogs([newLog, ...logs]);
    // Reset Form
    setNewLogContent('');
    setNewLogIssues('');
    setNewLogImages([]);
    setIsCreatingLog(false);
  };

  const togglePresetPhotoInNewLog = (url: string) => {
    setNewLogImages(prev => 
      prev.includes(url) ? prev.filter(img => img !== url) : [...prev, url]
    );
  };

  // Toggle log approval status
  const toggleLogApproval = (id: string) => {
    setLogs(prev => prev.map(l => {
      if (l.id === id) {
        return {
          ...l,
          status: l.status === 'Approved' ? 'Pending' : 'Approved'
        };
      }
      return l;
    }));
  };

  // Delete Log
  const handleDeleteLog = (id: string) => {
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  // Progress Update logic
  const toggleMilestone = (projId: string, milestoneId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            const isNowCompleted = !m.completed;
            return {
              ...m,
              completed: isNowCompleted,
              actualDate: isNowCompleted ? new Date().toISOString().split('T')[0] : undefined
            };
          }
          return m;
        });

        // Calculate new overall progress based on completed milestones weights
        const totalWeightCompleted = updatedMilestones
          .filter(m => m.completed)
          .reduce((sum, m) => sum + m.weight, 0);
        
        return {
          ...p,
          milestones: updatedMilestones,
          overallProgress: Math.min(100, Math.max(0, totalWeightCompleted))
        };
      }
      return p;
    }));
  };

  // Direct Slider progress update
  const handleSliderProgressChange = (projId: string, value: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          overallProgress: value
        };
      }
      return p;
    }));
  };

  const getSafetyBadgeStyle = (safety: 'An toàn' | 'Có sự cố' | 'Cảnh báo') => {
    switch (safety) {
      case 'An toàn':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Cảnh báo':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Có sự cố':
        return 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse';
    }
  };

  const getWeatherIcon = (weather: 'Nắng ráo' | 'Mưa ẩm' | 'Nhiều mây' | 'Mưa bão') => {
    switch (weather) {
      case 'Nắng ráo':
        return '☀️ Nắng ráo';
      case 'Mưa ẩm':
        return '🌧️ Mưa ẩm';
      case 'Nhiều mây':
        return '☁️ Nhiều mây';
      case 'Mưa bão':
        return '⛈️ Giông bão';
    }
  };

  const currentSelectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 select-none">
      
      {/* Banner Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md text-[10px] font-bold font-mono tracking-wide">
              MÔ ĐUN HIỆN TRƯỜNG & DÒNG THỜI GIAN
            </span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            Nhật ký thi công & Tiến độ trực quan
          </h1>
          <p className="text-xs text-neutral-400 max-w-2xl">
            Cập nhật tình hình thi công thực tế tại công trường, điều kiện thời tiết, lượng nhân sự, kiểm soát an toàn lao động và dòng thời gian tiến độ có hình ảnh thực tế sinh động.
          </p>
        </div>

        {/* Navigation Tabs (Logs vs Progress) */}
        <div className="flex bg-neutral-950/60 p-1 rounded-xl border border-neutral-850 self-start md:self-auto overflow-x-auto scrollbar-none z-10 shrink-0">
          {[
            { id: 'logs', label: 'Nhật ký hàng ngày', icon: FileText },
            { id: 'progress', label: 'Bản đồ Tiến độ & Timeline', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'logs' ? (
          <motion.div
            key="logs-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Logs Filtering / Search Controls */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Search Log */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Tìm nhật ký thi công..."
                    value={searchLogQuery}
                    onChange={(e) => setSearchLogQuery(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 placeholder-neutral-500 transition-colors"
                  />
                </div>

                {/* Project selector filter */}
                <div className="flex items-center space-x-2 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 shrink-0">
                  <Filter className="w-3.5 h-3.5 text-neutral-500" />
                  <select
                    value={selectedProjectFilter}
                    onChange={(e) => setSelectedProjectFilter(e.target.value)}
                    className="bg-transparent border-none text-xs text-neutral-300 focus:outline-none font-medium cursor-pointer"
                  >
                    <option value="all">Tất cả dự án</option>
                    <option value="Landmark 81">Landmark 81</option>
                    <option value="Hầm Thủ Thiêm 2">Hầm Thủ Thiêm 2</option>
                    <option value="Vinhomes CP">Vinhomes CP</option>
                    <option value="Sala Block C">Sala Block C</option>
                    <option value="Aqua City">Aqua City</option>
                  </select>
                </div>

                {/* Safety filter */}
                <div className="flex items-center space-x-2 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                  <select
                    value={selectedSafetyFilter}
                    onChange={(e) => setSelectedSafetyFilter(e.target.value)}
                    className="bg-transparent border-none text-xs text-neutral-300 focus:outline-none font-medium cursor-pointer"
                  >
                    <option value="all">Tất cả mức độ an toàn</option>
                    <option value="An toàn">An toàn</option>
                    <option value="Cảnh báo">Cảnh báo</option>
                    <option value="Có sự cố">Có sự cố</option>
                  </select>
                </div>
              </div>

              {/* Add log action */}
              <button
                onClick={() => setIsCreatingLog(!isCreatingLog)}
                className="w-full md:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Ghi nhật ký thi công mới</span>
              </button>
            </div>

            {/* Daily Log Form Card */}
            {isCreatingLog && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-neutral-900 border border-amber-500/20 rounded-2xl p-6 overflow-hidden shadow-inner"
              >
                <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-neutral-800">
                  <PenTool className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Phiếu Ghi Nhật Ký Hiện Trường</h3>
                </div>

                <form onSubmit={handleCreateLog} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Dự án công trình</label>
                      <select
                        value={newLogProject}
                        onChange={(e) => setNewLogProject(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-xl px-3 py-2 text-neutral-200 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="Landmark 81">Landmark 81</option>
                        <option value="Hầm Thủ Thiêm 2">Hầm Thủ Thiêm 2</option>
                        <option value="Vinhomes CP">Vinhomes CP</option>
                        <option value="Sala Block C">Sala Block C</option>
                        <option value="Aqua City">Aqua City</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Ca làm việc</label>
                      <div className="flex bg-neutral-950 rounded-xl p-1 border border-neutral-800">
                        {(['Sáng', 'Chiều', 'Đêm'] as const).map(shift => (
                          <button
                            key={shift}
                            type="button"
                            onClick={() => setNewLogShift(shift)}
                            className={`flex-1 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-colors ${
                              newLogShift === shift ? 'bg-amber-500 text-black' : 'text-neutral-400'
                            }`}
                          >
                            {shift}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Thời tiết hiện tại</label>
                      <select
                        value={newLogWeather}
                        onChange={(e) => setNewLogWeather(e.target.value as any)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-xl px-3 py-2 text-neutral-200 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="Nắng ráo">☀️ Nắng ráo</option>
                        <option value="Mưa ẩm">🌧️ Mưa ẩm</option>
                        <option value="Nhiều mây">☁️ Nhiều mây</option>
                        <option value="Mưa bão">⛈️ Giông bão</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Nhiệt độ (°C)</label>
                        <input
                          type="number"
                          value={newLogTemperature}
                          onChange={(e) => setNewLogTemperature(Number(e.target.value))}
                          className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-xl px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                          min={10}
                          max={50}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Nhân lực (thợ)</label>
                        <input
                          type="number"
                          value={newLogManpower}
                          onChange={(e) => setNewLogManpower(Number(e.target.value))}
                          className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-xl px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                          min={1}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preset Photos Attachment selector */}
                  <div className="space-y-1.5 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                      <Camera className="w-3.5 h-3.5 text-amber-500" />
                      <span>Đính kèm hình ảnh thực tế hiện trường</span>
                    </label>
                    <p className="text-[9.5px] text-neutral-500">Nhấp chọn các bức ảnh thực tế vừa chụp từ camera công trường của ca làm việc này để đính kèm vào nhật ký:</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
                      {PRESET_PHOTOS.map((photo, idx) => {
                        const isSelected = newLogImages.includes(photo.url);
                        return (
                          <div 
                            key={idx}
                            onClick={() => togglePresetPhotoInNewLog(photo.url)}
                            className={`relative aspect-video rounded-lg overflow-hidden border cursor-pointer group transition-all ${
                              isSelected 
                                ? 'border-amber-500 ring-2 ring-amber-500/20 scale-95' 
                                : 'border-neutral-800 hover:border-neutral-600'
                            }`}
                          >
                            <img 
                              src={photo.url} 
                              alt={photo.label}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className={`absolute inset-0 bg-black/60 flex flex-col justify-end p-1.5 transition-all ${
                              isSelected ? 'opacity-100 bg-black/40' : 'opacity-80 group-hover:opacity-100'
                            }`}>
                              <span className="text-[8.5px] font-bold text-white leading-tight truncate">
                                {photo.label}
                              </span>
                            </div>

                            {isSelected && (
                              <div className="absolute top-1 right-1 bg-amber-500 text-black p-0.5 rounded-full">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Độ an toàn lao động</label>
                      <div className="flex flex-col space-y-1.5">
                        {(['An toàn', 'Cảnh báo', 'Có sự cố'] as const).map(safety => (
                          <label key={safety} className="flex items-center space-x-2.5 text-xs text-neutral-300 cursor-pointer">
                            <input
                              type="radio"
                              name="safetyStatus"
                              checked={newLogSafety === safety}
                              onChange={() => setNewLogSafety(safety)}
                              className="text-amber-500 focus:ring-0 bg-neutral-950 border-neutral-800 w-3.5 h-3.5"
                            />
                            <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${getSafetyBadgeStyle(safety)}`}>
                              {safety}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-3 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Nội dung thi công chi tiết</label>
                        <textarea
                          value={newLogContent}
                          onChange={(e) => setNewLogContent(e.target.value)}
                          placeholder="Mô tả các hạng mục đã hoàn thành, máy móc thiết bị vận hành, công tác nghiệm thu..."
                          className="w-full h-20 bg-neutral-950 border border-neutral-800 text-xs rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none placeholder-neutral-600 resize-none"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Phát sinh / Sự cố / Vấn đề cần lưu ý (Nếu có)</label>
                        <input
                          type="text"
                          value={newLogIssues}
                          onChange={(e) => setNewLogIssues(e.target.value)}
                          placeholder="Nhập các sự cố hư hỏng điện, chậm vật tư hoặc ghi chú an toàn (nếu có)..."
                          className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-xl px-3 py-2 text-white focus:border-amber-500 focus:outline-none placeholder-neutral-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setIsCreatingLog(false)}
                      className="px-4 py-2 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 rounded-xl text-xs font-bold text-neutral-400 cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-xl font-bold text-xs cursor-pointer shadow-md shadow-amber-500/10"
                    >
                      Ghi nhận nhật ký
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Logs List Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLogs.length === 0 ? (
                <div className="col-span-2 bg-neutral-900/50 border border-dashed border-neutral-800 rounded-3xl p-16 text-center flex flex-col items-center justify-center">
                  <FileText className="w-12 h-12 text-neutral-700 mb-3" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Không tìm thấy nhật ký</h3>
                  <p className="text-xs text-neutral-500 mt-1">Vui lòng điều chỉnh bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    layoutId={log.id}
                    onClick={() => setSelectedDetailLog(log)}
                    className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-5 hover:border-amber-500/35 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-200 flex flex-col justify-between group relative cursor-pointer"
                  >
                    {/* Header line */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-black text-amber-500 uppercase font-mono tracking-wider">
                            {log.project}
                          </span>
                          <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                          <span className="text-[10px] text-neutral-400 font-bold font-mono">
                            {log.date}
                          </span>
                          <span className="px-1.5 py-0.5 bg-neutral-800 text-neutral-300 rounded text-[9px] font-bold font-mono">
                            Ca {log.shift}
                          </span>
                        </div>

                        {/* Approved vs Pending status clickable */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLogApproval(log.id);
                          }}
                          className={`px-2 py-0.5 rounded text-[8.5px] font-bold border font-mono transition-colors cursor-pointer ${
                            log.status === 'Approved'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                          }`}
                          title="Click để thay đổi trạng thái phê duyệt"
                        >
                          {log.status === 'Approved' ? 'ĐÃ PHÊ DUYỆT' : 'CHỜ DUYỆT'}
                        </button>
                      </div>

                      {/* Weather & Temp line */}
                      <div className="flex items-center space-x-4 mb-4 bg-neutral-950/60 rounded-xl px-3 py-1.5 border border-neutral-850">
                        <span className="text-[10.5px] font-bold text-neutral-300">
                          {getWeatherIcon(log.weather)}
                        </span>
                        <div className="w-[1px] h-3 bg-neutral-800" />
                        <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                          <Thermometer className="w-3 h-3 text-red-400" />
                          Nhiệt độ: <strong className="text-neutral-200 font-mono">{log.temperature}°C</strong>
                        </span>
                        <div className="w-[1px] h-3 bg-neutral-800" />
                        <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                          <Users className="w-3 h-3 text-amber-400" />
                          Nhân lực: <strong className="text-neutral-200 font-mono">{log.manpower} thợ</strong>
                        </span>
                      </div>

                      {/* Log text description */}
                      <p className="text-[11.5px] text-neutral-300 leading-relaxed font-medium mb-4 whitespace-pre-line">
                        {log.content}
                      </p>

                      {/* Attached images layout inside log card */}
                      {log.images && log.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {log.images.map((img, idx) => (
                            <div 
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxImage({ url: img, title: `Ảnh báo cáo thực địa ca ${log.shift}`, subtitle: `${log.project} • ${log.date}` });
                              }}
                              className="relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-800 cursor-zoom-in group/img"
                            >
                              <img 
                                src={img} 
                                alt={`Bản vẽ hoặc ảnh hiện trường ${idx + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Issue banner */}
                      {log.issues && (
                        <div className="bg-neutral-950/40 border border-neutral-850 p-2.5 rounded-xl flex items-start space-x-2 text-[10px] text-neutral-400 mb-4">
                          <AlertTriangle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${log.safetyStatus === 'An toàn' ? 'text-neutral-500' : 'text-amber-500'}`} />
                          <div>
                            <span className="font-bold text-neutral-300 block mb-0.5">Vấn đề & Phát sinh:</span>
                            <span>{log.issues}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-850/60 mt-auto text-[10px] text-neutral-400 font-medium">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Giám sát viên: <strong>{log.supervisor}</strong></span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${getSafetyBadgeStyle(log.safetyStatus)}`}>
                          {log.safetyStatus}
                        </span>

                        {/* Delete button on hover */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLog(log.id);
                          }}
                          className="p-1 text-neutral-500 hover:text-red-500 hover:bg-neutral-850 rounded transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Xóa bản ghi nhật ký này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="progress-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left sidebar: Projects List selector */}
            <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-2 mb-3">
                Danh sách dự án thi công
              </h3>

              <div className="space-y-2">
                {projects.map((proj) => {
                  const isActive = selectedProjectId === proj.id;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer block relative overflow-hidden group ${
                        isActive
                          ? 'bg-amber-500 border-amber-600 text-black shadow-md'
                          : 'bg-neutral-950/40 border-neutral-850 hover:border-neutral-800 hover:bg-neutral-900 text-neutral-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="min-w-0 pr-4">
                          <h4 className={`text-xs font-black truncate tracking-wide ${isActive ? 'text-black' : 'text-white'}`}>
                            {proj.name}
                          </h4>
                          <span className={`text-[9.5px] font-medium flex items-center gap-1 mt-0.5 truncate ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`}>
                            <MapPin className="w-3 h-3 shrink-0" />
                            {proj.location}
                          </span>
                        </div>
                        <span className={`text-xs font-bold font-mono tracking-tighter ${isActive ? 'text-black' : 'text-amber-500'}`}>
                          {proj.overallProgress}%
                        </span>
                      </div>

                      {/* Small progress line */}
                      <div className={`w-full h-1 rounded-full overflow-hidden ${isActive ? 'bg-black/20' : 'bg-neutral-900'}`}>
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${isActive ? 'bg-black' : 'bg-amber-500'}`}
                          style={{ width: `${proj.overallProgress}%` }}
                        />
                      </div>

                      {/* Extra info */}
                      <div className="flex justify-between items-center mt-3 text-[8.5px] font-semibold">
                        <span className={isActive ? 'text-neutral-900/80' : 'text-neutral-500'}>
                          Bắt đầu: {proj.startDate}
                        </span>
                        <span className={isActive ? 'text-neutral-900/80 font-bold' : 'text-neutral-400 font-bold'}>
                          Target: {proj.targetDate}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Detailed milestones checklist & Timeline Gantt style */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
                {/* Active Project Overview */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-850 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-amber-500 animate-pulse" />
                      <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                        Bản đồ Tiến độ: {currentSelectedProject.name}
                      </h3>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Khảo sát địa lý, đào móng sâu, dầm sắt liên hoàn, bao che bề ngoài kính Low-E, thi công MEP và nghiệm thu PCCC.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 bg-neutral-950 border border-neutral-850 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                    <span className="text-[10px] text-neutral-400 font-bold">LŨY KẾ HOÀN THÀNH:</span>
                    <span className="text-xs font-mono font-black text-amber-500">{currentSelectedProject.overallProgress}%</span>
                  </div>
                </div>

                {/* Interactive Progress Slider */}
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <Sliders className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-[10.5px] font-bold text-neutral-300 uppercase tracking-wide">Điều chỉnh tiến độ dự án</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 font-semibold">Cập nhật nhanh lượng hoàn thành thực tế</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentSelectedProject.overallProgress}
                      onChange={(e) => handleSliderProgressChange(currentSelectedProject.id, Number(e.target.value))}
                      className="flex-1 accent-amber-500 bg-neutral-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold text-white w-12 text-right">
                      {currentSelectedProject.overallProgress}%
                    </span>
                  </div>

                  <p className="text-[9.5px] text-neutral-500">
                    ⚠️ Lưu ý: Khi bật/tắt trạng thái hoàn thành của từng cột mốc mốc bên dưới hoặc dòng thời gian, phần trăm tổng thể sẽ tự động cập nhật tương ứng theo tỷ trọng.
                  </p>
                </div>

                {/* Gantt / Milestone Visual Step Timeline */}
                <div className="space-y-3">
                  <h4 className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    Sơ đồ Phân đoạn Mốc Thi công (Gantt-Style)
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 bg-neutral-950/40 p-2.5 rounded-xl border border-neutral-850/60 overflow-x-auto scrollbar-none">
                    {currentSelectedProject.milestones.map((ms, index) => {
                      const isCompleted = ms.completed;
                      return (
                        <div 
                          key={ms.id} 
                          onClick={() => toggleMilestone(currentSelectedProject.id, ms.id)}
                          className={`p-2 rounded-lg border transition-all text-center relative flex flex-col justify-between cursor-pointer select-none group/gantt ${
                            isCompleted 
                              ? 'bg-amber-500/10 border-amber-500/30' 
                              : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                          }`}
                        >
                          <span className="text-[8px] font-mono font-bold text-neutral-500 uppercase block mb-1">
                            Phase {index + 1}
                          </span>
                          <p className={`text-[9.5px] font-bold leading-tight line-clamp-2 ${isCompleted ? 'text-amber-400' : 'text-neutral-400 group-hover/gantt:text-neutral-300'}`}>
                            {ms.name}
                          </p>
                          <div className="mt-2 flex items-center justify-center">
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-neutral-700 bg-neutral-900 group-hover/gantt:border-neutral-500" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Milestone Checklist Table */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
                      Bảng kiểm soát các mốc chi tiết ({currentSelectedProject.milestones.length})
                    </h4>
                    <span className="text-[9px] text-neutral-500 font-semibold">Tích chọn để cập nhật trạng thái</span>
                  </div>

                  <div className="bg-neutral-950 border border-neutral-850 rounded-xl overflow-hidden divide-y divide-neutral-850">
                    {currentSelectedProject.milestones.map((ms) => (
                      <div 
                        key={ms.id}
                        onClick={() => toggleMilestone(currentSelectedProject.id, ms.id)}
                        className="p-3 flex items-center justify-between hover:bg-neutral-900/60 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3 pr-4">
                          <div className="relative shrink-0">
                            <input
                              type="checkbox"
                              checked={ms.completed}
                              onChange={() => {}} // handled by onClick on wrapper
                              className="rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-0 focus:ring-offset-0 w-4.5 h-4.5 cursor-pointer"
                            />
                          </div>
                          <div>
                            <p className={`text-xs font-bold leading-tight ${ms.completed ? 'text-neutral-400 line-through' : 'text-white'}`}>
                              {ms.name}
                            </p>
                            <span className="text-[9.5px] text-neutral-500 font-medium">
                              Tỷ trọng đóng góp vào tiến độ: <strong className="text-neutral-400 font-mono">{ms.weight}%</strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0 font-mono text-[10px]">
                          <span className="text-neutral-400">Hạn chót:</span>
                          <span className={`font-bold ${ms.completed ? 'text-neutral-500' : 'text-amber-500'}`}>
                            {ms.dueDate}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-amber-500 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* NEW ADDITION: Visually Rich Interactive Photo Timeline Section */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-850 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-500 animate-spin-slow" />
                      Dòng thời gian thi công thực tế (Photo Timeline)
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Theo dõi dòng lịch sử hoàn thành dự án trực quan kèm hình chụp trực địa và báo cáo phân đoạn.
                    </p>
                  </div>
                  <span className="text-[9.5px] font-bold font-mono text-amber-500/80 bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/10 mt-2 sm:mt-0">
                    {currentSelectedProject.name}
                  </span>
                </div>

                {/* Vertical Timeline implementation */}
                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-amber-500 before:via-neutral-800 before:to-neutral-900">
                  {currentSelectedProject.milestones.map((ms, index) => {
                    const isCompleted = ms.completed;
                    return (
                      <div key={ms.id} className="relative group/timeline-item">
                        {/* Milestone Node Dot */}
                        <div 
                          onClick={() => toggleMilestone(currentSelectedProject.id, ms.id)}
                          className={`absolute -left-[23px] sm:-left-[27px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer shadow-lg z-10 ${
                            isCompleted 
                              ? 'bg-amber-500 border-amber-500 text-black scale-110 shadow-amber-500/20 hover:scale-125' 
                              : 'bg-neutral-950 border-neutral-800 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300'
                          }`}
                          title={`Click để chuyển trạng thái: ${ms.name}`}
                        >
                          {isCompleted ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <span className="text-[9px] font-mono font-bold">{index + 1}</span>
                          )}
                        </div>

                        {/* Timeline Main Card Content */}
                        <div className={`bg-neutral-950 border rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
                          isCompleted 
                            ? 'border-amber-500/20 hover:border-amber-500/40 bg-neutral-950' 
                            : 'border-neutral-850/70 hover:border-neutral-800'
                        }`}>
                          
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              
                              {/* Header tags inside milestone */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2 py-0.5 bg-neutral-900 rounded text-[9px] font-bold font-mono text-neutral-400">
                                  PHASE {index + 1}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-bold ${
                                  isCompleted 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                    : 'bg-neutral-900 text-neutral-500 border border-neutral-850'
                                }`}>
                                  {isCompleted ? 'ĐÃ NGHIỆM THU' : 'CHƯA TRIỂN KHAI'}
                                </span>
                                {isCompleted && ms.actualDate && (
                                  <span className="text-[9.5px] text-amber-500 font-bold font-mono">
                                    ✓ Ngày {ms.actualDate}
                                  </span>
                                )}
                              </div>

                              {/* Milestone title */}
                              <h4 className={`text-sm font-bold tracking-tight ${isCompleted ? 'text-white' : 'text-neutral-400'}`}>
                                {ms.name}
                              </h4>

                              {/* Technical details description */}
                              <p className="text-[11.5px] leading-relaxed text-neutral-400">
                                {ms.description || 'Chưa cập nhật chi tiết nội dung phân kỳ thi công và phương án nghiệm thu từ đơn vị thầu.'}
                              </p>

                              <div className="flex items-center space-x-4 pt-1">
                                <span className="text-[10px] text-neutral-500">
                                  Tỷ trọng: <strong className="text-neutral-400 font-mono">{ms.weight}%</strong>
                                </span>
                                <span className="text-[10px] text-neutral-500">•</span>
                                <span className="text-[10px] text-neutral-500">
                                  Hạn định: <strong className="text-neutral-400 font-mono">{ms.dueDate}</strong>
                                </span>
                              </div>
                            </div>

                            {/* Milestone Image Card with Zoom Feature */}
                            {ms.image && (
                              <div 
                                onClick={() => setLightboxImage({ 
                                  url: ms.image!, 
                                  title: ms.name, 
                                  subtitle: `Phase ${index + 1} • Dự án ${currentSelectedProject.name} (Hạn chót: ${ms.dueDate})` 
                                })}
                                className="w-full md:w-44 shrink-0 aspect-video md:aspect-square rounded-xl overflow-hidden border border-neutral-850 bg-neutral-900 cursor-zoom-in relative group/img-timeline"
                              >
                                <img 
                                  src={ms.image} 
                                  alt={ms.name} 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img-timeline:scale-105"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img-timeline:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-1 p-2">
                                  <Eye className="w-5 h-5 text-amber-500" />
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-200">
                                    Xem chi tiết ảnh
                                  </span>
                                </div>
                              </div>
                            )}

                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for Image Zoom */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[999] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full transition-all cursor-pointer border border-neutral-700/50 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video w-full relative bg-neutral-950 flex items-center justify-center">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 border-t border-neutral-850 bg-neutral-900/50 space-y-1">
                <h4 className="text-sm font-black text-white uppercase tracking-wider">
                  {lightboxImage.title}
                </h4>
                {lightboxImage.subtitle && (
                  <p className="text-xs text-amber-500 font-mono font-medium">
                    {lightboxImage.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Project Log & Progress Modal */}
      <AnimatePresence>
        {selectedDetailLog && (() => {
          const associatedProj = projects.find(p => p.name === selectedDetailLog.project);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetailLog(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[85vh] max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDetailLog(null)}
                  className="absolute top-4 right-4 p-2 bg-neutral-950/80 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer border border-neutral-800 z-50 shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* LEFT COLUMN: Construction Log Detail */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col justify-between scrollbar-none">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[9px] font-bold font-mono tracking-wider">
                        CHI TIẾT NHẬT KÝ
                      </span>
                      <span className="text-[10px] text-neutral-400 font-bold font-mono">{selectedDetailLog.date}</span>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">
                      {selectedDetailLog.project}
                    </h3>

                    {/* Badges Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-850 flex items-center space-x-3">
                        <div className="p-2 bg-neutral-900 rounded-lg text-amber-500">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[9px] text-neutral-500 font-bold uppercase">Ca làm việc</p>
                          <p className="text-xs font-bold text-neutral-200">Ca {selectedDetailLog.shift}</p>
                        </div>
                      </div>

                      <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-850 flex items-center space-x-3">
                        <div className="p-2 bg-neutral-900 rounded-lg text-amber-500">
                          <Thermometer className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[9px] text-neutral-500 font-bold uppercase">Thời tiết & Nhiệt độ</p>
                          <p className="text-xs font-bold text-neutral-200">
                            {selectedDetailLog.weather} ({selectedDetailLog.temperature}°C)
                          </p>
                        </div>
                      </div>

                      <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-850 flex items-center space-x-3">
                        <div className="p-2 bg-neutral-900 rounded-lg text-amber-500">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[9px] text-neutral-500 font-bold uppercase">Tổng nhân lực</p>
                          <p className="text-xs font-mono font-bold text-neutral-200">{selectedDetailLog.manpower} thợ</p>
                        </div>
                      </div>

                      <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-850 flex items-center space-x-3">
                        <div className="p-2 bg-neutral-900 rounded-lg text-amber-500">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[9px] text-neutral-500 font-bold uppercase">An toàn lao động</p>
                          <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold border font-mono ${getSafetyBadgeStyle(selectedDetailLog.safetyStatus)}`}>
                            {selectedDetailLog.safetyStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rich log content */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <h4 className="text-[10px] text-neutral-400 font-black uppercase tracking-wider">Nội dung thi công chi tiết</h4>
                        <p className="text-xs text-neutral-200 bg-neutral-950/40 p-3.5 rounded-xl border border-neutral-850/80 leading-relaxed font-medium whitespace-pre-line">
                          {selectedDetailLog.content}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-[10px] text-neutral-400 font-black uppercase tracking-wider">Sự cố / Lưu ý hiện trường</h4>
                        <div className="bg-neutral-950/40 p-3.5 rounded-xl border border-neutral-850/80 flex items-start space-x-2 text-xs text-neutral-300">
                          <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${selectedDetailLog.safetyStatus === 'An toàn' ? 'text-neutral-500' : 'text-amber-500 animate-pulse'}`} />
                          <span>{selectedDetailLog.issues || 'Không ghi nhận sự cố đặc biệt nào.'}</span>
                        </div>
                      </div>

                      {/* Attached Photos */}
                      {selectedDetailLog.images && selectedDetailLog.images.length > 0 && (
                        <div className="space-y-1.5">
                          <h4 className="text-[10px] text-neutral-400 font-black uppercase tracking-wider">Ảnh báo cáo thực tế</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {selectedDetailLog.images.map((img, idx) => (
                              <div 
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLightboxImage({ url: img, title: `Ảnh hiện trường ca ${selectedDetailLog.shift}`, subtitle: `${selectedDetailLog.project} • ${selectedDetailLog.date}` });
                                }}
                                className="relative aspect-video rounded-lg overflow-hidden border border-neutral-800 cursor-zoom-in group/detail-img"
                              >
                                <img 
                                  src={img} 
                                  alt="Ảnh hiện trường" 
                                  className="w-full h-full object-cover group-hover/detail-img:scale-105 transition-transform"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-850/60 mt-6 flex items-center justify-between text-[10px] text-neutral-500">
                    <span>Giám sát ca: <strong className="text-neutral-300">{selectedDetailLog.supervisor}</strong></span>
                    <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${selectedDetailLog.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      Trạng thái: {selectedDetailLog.status === 'Approved' ? 'ĐÃ DUYỆT' : 'CHỜ DUYỆT'}
                    </span>
                  </div>
                </div>

                {/* RIGHT COLUMN: Associated Project Progress & Milestones */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-neutral-950/30 flex flex-col justify-between scrollbar-none">
                  {associatedProj ? (
                    <div className="space-y-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-bold font-mono tracking-wider">
                            TIẾN ĐỘ DỰ ÁN LIÊN QUAN
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">
                          {associatedProj.name}
                        </h3>
                        <p className="text-[11px] text-neutral-400 mb-4">
                          Cập nhật tiến độ của dự án trực thuộc từ danh mục các cột mốc thi công.
                        </p>

                        {/* Progress Bar Display */}
                        <div className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-4 mb-5 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10.5px] font-bold text-neutral-300 uppercase">TIẾN ĐỘ THỰC TẾ LŨY KẾ</span>
                            <span className="text-xs font-mono font-black text-amber-500">{associatedProj.overallProgress}%</span>
                          </div>
                          <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-850">
                            <div 
                              className="h-full bg-amber-500 rounded-full transition-all duration-300"
                              style={{ width: `${associatedProj.overallProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono font-semibold">
                            <span>Khởi công: {associatedProj.startDate}</span>
                            <span>Hoàn thành mục tiêu: {associatedProj.targetDate}</span>
                          </div>
                        </div>

                        {/* Interactive Milestones Timeline inside the Modal */}
                        <div className="space-y-3">
                          <h4 className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
                            Danh sách mốc thi công ({associatedProj.milestones.length})
                          </h4>
                          <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                            {associatedProj.milestones.map((ms, idx) => {
                              const isCompleted = ms.completed;
                              return (
                                <div 
                                  key={ms.id}
                                  onClick={() => toggleMilestone(associatedProj.id, ms.id)}
                                  className={`p-3 rounded-xl border flex items-center justify-between hover:bg-neutral-900/60 transition-colors cursor-pointer group ${
                                    isCompleted ? 'border-emerald-500/10 bg-neutral-900/30' : 'border-neutral-850'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2.5 min-w-0 pr-3">
                                    <div className="shrink-0">
                                      <input
                                        type="checkbox"
                                        checked={isCompleted}
                                        onChange={() => {}}
                                        className="rounded border-neutral-750 bg-neutral-900 text-amber-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p className={`text-[11px] font-bold leading-tight truncate ${isCompleted ? 'text-neutral-400 line-through' : 'text-white'}`}>
                                        {ms.name}
                                      </p>
                                      <span className="text-[9px] text-neutral-500 font-medium font-mono">Tỷ trọng: {ms.weight}%</span>
                                    </div>
                                  </div>
                                  <span className="text-[9px] font-mono text-neutral-500 shrink-0">Hạn: {ms.dueDate}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* AI recommendations */}
                      <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3 text-[10px] text-neutral-400 leading-relaxed mt-4">
                        <p className="font-bold text-amber-400 mb-0.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 shrink-0" />
                          Phân tích từ trợ lý AI:
                        </p>
                        <span>
                          Dự án đang triển khai đạt chỉ tiêu tích lũy <strong className="text-neutral-300 font-mono">{associatedProj.overallProgress}%</strong>. Dựa trên nhật ký của ca làm việc, công trình có xu hướng hoàn thành đúng thời hạn dự kiến vào <strong className="text-neutral-300 font-mono">{associatedProj.targetDate}</strong>. Khuyên dùng tiếp tục giữ vững mật độ thi công và kiểm tra định kỳ an toàn kỹ thuật.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500 py-12">
                      <FileText className="w-10 h-10 mb-2 text-neutral-700" />
                      <p className="text-xs font-bold uppercase tracking-wider">Không tìm thấy thông tin tiến độ</p>
                      <p className="text-[11px] text-neutral-600 mt-1">Dự án này chưa được khởi tạo bảng tiến độ.</p>
                    </div>
                  )}
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
