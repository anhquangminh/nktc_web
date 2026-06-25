import React from 'react';
import { motion } from 'motion/react';
import DashboardCharts from './DashboardCharts';
import KanbanBoard from './KanbanBoard';
import {
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  Award,
  Clock,
  CheckCircle,
  Play,
  Cpu,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Zap,
  ShieldAlert,
  Package,
} from 'lucide-react';

export default function OverviewView() {
  const kpiRow1 = [
    { title: 'Tổng số công trình', value: '24', trend: '+12% so với tháng trước', isTrendPositive: true, color: 'border-amber-500/20' },
    { title: 'Tổng nhân sự', value: '1,245', trend: '+85 nhân viên mới', isTrendPositive: true, color: 'border-neutral-800' },
    { title: 'Chi phí tháng này', value: '4.2 Tỷ', trend: '+15% so với dự tính', isTrendPositive: false, color: 'border-neutral-800' },
    { title: 'Vật tư sắp hết', value: '12 loại', trend: 'Cần đặt hàng khẩn cấp', isTrendWarning: true, color: 'border-red-500/20' },
  ];

  const kpiRow2 = [
    { title: 'Ngân sách sử dụng', value: '68%', progress: 68, suffix: 'Đã chi / Tổng 12.5 Tỷ' },
    { title: 'Đang thi công', value: '18 công trình', progress: 75, suffix: 'Tiến độ trung bình 75%' },
    { title: 'Dự án hoàn thành', value: '4 công trình', progress: 100, suffix: 'Bàn giao đúng hạn 100%' },
    { title: 'Chậm tiến độ', value: '2 công trình', progress: 15, suffix: 'Cần bổ sung nhân sự gấp', isCritical: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 overflow-y-auto max-w-[1600px] mx-auto select-none"
    >
      {/* Dynamic Dashboard Title Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            Tổng quan hệ thống
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
              AI ENGINE CORE V2
            </span>
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Báo cáo phân tích tự động dữ liệu công trình toàn quốc. Cập nhật mới nhất lúc 10 giây trước.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl self-start md:self-auto">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-semibold text-neutral-200">Gợi ý AI đang khả dụng (3)</span>
          <ChevronRight className="w-4 h-4 text-neutral-500" />
        </div>
      </div>

      {/* KPI Row 1: Status Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiRow1.map((card, idx) => (
          <div
            key={idx}
            className={`bg-neutral-900 border ${card.color} p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-neutral-400">{card.title}</span>
              {idx === 0 && <TrendingUp className="w-4 h-4 text-amber-500" />}
              {idx === 1 && <Users className="w-4 h-4 text-amber-500" />}
              {idx === 2 && <DollarSign className="w-4 h-4 text-amber-500" />}
              {idx === 3 && <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />}
            </div>
            <div className="mt-4">
              <span className="text-3xl font-display font-extrabold text-white tracking-tight">
                {card.value}
              </span>
            </div>
            <div className="mt-2 text-[11px] flex items-center font-medium">
              {card.isTrendPositive ? (
                <span className="text-emerald-400 font-semibold">{card.trend}</span>
              ) : card.isTrendWarning ? (
                <span className="text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  {card.trend}
                </span>
              ) : (
                <span className="text-amber-400 font-semibold">{card.trend}</span>
              )}
            </div>
            {/* Absolute background card accent */}
            <div className="absolute right-[-10px] bottom-[-10px] text-white/[0.01] text-8xl font-black select-none pointer-events-none font-display">
              {idx + 1}
            </div>
          </div>
        ))}
      </div>

      {/* KPI Row 2: Analytical Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiRow2.map((card, idx) => (
          <div
            key={idx}
            className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-colors"
          >
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-neutral-400">
                <span>{card.title}</span>
                {idx === 0 && <Clock className="w-3.5 h-3.5 text-neutral-500" />}
                {idx === 1 && <Play className="w-3.5 h-3.5 text-neutral-500" />}
                {idx === 2 && <Award className="w-3.5 h-3.5 text-neutral-500" />}
                {idx === 3 && <ShieldAlert className="w-3.5 h-3.5 text-red-500" />}
              </div>
              <div className="text-xl font-display font-bold text-white mt-2">
                {card.value}
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full ${
                    card.isCritical ? 'bg-red-500 animate-pulse' : idx === 2 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${card.progress}%` }}
                />
              </div>
              <div className="text-[10px] text-neutral-500 font-mono font-semibold">
                {card.suffix}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recharts Analytics Dashboard */}
      <DashboardCharts />

      {/* Kanban Board Task Management */}
      <KanbanBoard />

      {/* Warning/Alert Board Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex items-center justify-between border-b border-neutral-850 pb-4 mb-4">
          <div className="flex items-center space-x-2.5">
            <Cpu className="w-4 h-4 text-amber-400 animate-pulse" />
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Phân tích & Cảnh báo thông minh (Version 2)
            </h3>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold font-mono">
            3 MÔ HÌNH HOẠT ĐỘNG
          </span>
        </div>

        {/* Bulletins Feed */}
        <div className="space-y-3.5">
          {/* Item 1 */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-neutral-950/60 rounded-xl border border-neutral-850 hover:border-red-500/20 transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-500/10 text-red-400 rounded-lg shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Vượt mức Ngân sách Dự toán</span>
                  <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                    Nguy cấp
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Công trình <strong className="text-neutral-200">Landmark 81</strong> đang vượt dự toán chi tiêu 5.2% trong tuần này, chủ yếu do phát sinh chi phí mua thép cuộn Hòa Phát đột xuất.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <button className="text-[10px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg font-bold border border-neutral-750 transition-colors cursor-pointer">
                Xem chi tiết
              </button>
              <button className="text-[10px] bg-amber-500 hover:bg-amber-400 text-black px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer">
                Phê duyệt lại
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-neutral-950/60 rounded-xl border border-neutral-850 hover:border-amber-500/20 transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Hụt nhân công xây dựng cơ bản</span>
                  <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                    Cảnh báo
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Hạng mục lắp đặt bê tông móng tại <strong className="text-neutral-200">Block C - Sala</strong> thiếu hụt 15 công nhân cơ bản, đe dọa làm chậm 2 ngày tiến độ đổ sàn.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <button className="text-[10px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg font-bold border border-neutral-750 transition-colors cursor-pointer">
                Báo cáo ca trực
              </button>
              <button className="text-[10px] bg-amber-500 hover:bg-amber-400 text-black px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer">
                Điều động ngay
              </button>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-neutral-950/60 rounded-xl border border-neutral-850 hover:border-blue-500/20 transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg shrink-0 mt-0.5">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Vật tư phần cứng dưới định mức an toàn</span>
                  <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                    Đề xuất
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Tồn kho Thép phi 10 tại <strong className="text-neutral-200">Kho Thủ Thiêm</strong> còn 10.0 tấn, tiệm cận ngưỡng báo động. Trí tuệ nhân tạo đề xuất tạo đơn hàng 35 tấn mới.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <button className="text-[10px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg font-bold border border-neutral-750 transition-colors cursor-pointer">
                Xem định mức
              </button>
              <button className="text-[10px] bg-amber-500 hover:bg-amber-400 text-black px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer">
                Đặt hàng khẩn cấp
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
