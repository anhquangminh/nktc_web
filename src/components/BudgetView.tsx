import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BudgetTransaction } from '../types';
import {
  Wallet,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Cpu,
  Plus,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function BudgetView() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const stats = [
    { label: 'Tổng Ngân sách Dự án', value: '12.5 Tỷ VNĐ', subtext: 'Quy hoạch tài chính năm 2026', color: 'border-neutral-800' },
    { label: 'Đã giải ngân (Expended)', value: '8.24 Tỷ VNĐ', pct: '65.9%', subtext: 'Thực tế đối soát dòng tiền', color: 'border-neutral-800' },
    { label: 'Ngân sách còn lại', value: '4.26 Tỷ VNĐ', subtext: 'Khả dụng cho các thầu phụ', color: 'border-neutral-800' },
    { label: 'Cảnh báo mức chi', value: 'Vượt 12%', subtext: 'Hạng mục Vật tư phần thô', color: 'border-red-500/20', isCritical: true },
  ];

  const categories = [
    { name: 'Vật tư xây thô', pct: 40, color: '#f59e0b', amount: '3.29 Tỷ' },
    { name: 'Nhân lực trực tiếp', pct: 25, color: '#10b981', amount: '2.06 Tỷ' },
    { name: 'Khấu hao Máy móc', pct: 15, color: '#3b82f6', amount: '1.23 Tỷ' },
    { name: 'Quản lý dự án', pct: 10, color: '#8b5cf6', amount: '824 Triệu' },
    { name: 'Phát sinh khác', pct: 10, color: '#6b7280', amount: '824 Triệu' },
  ];

  const transactions: BudgetTransaction[] = [
    { id: 'EXP-2026-001', description: 'Ứng tiền mặt mua cát đá lót móng', category: 'Phát sinh khác', amount: 45000000, date: '2026-06-24', status: 'pending' },
    { id: 'EXP-2026-014', description: 'Thanh toán đợt 2 thầu phụ điện nước MEP', category: 'Nhân lực trực tiếp', amount: 120000000, date: '2026-06-22', status: 'approved' },
    { id: 'EXP-2026-025', description: 'Đặt hàng Thép Hòa Phát phi 18 móng hầm', category: 'Vật tư xây thô', amount: 350000000, date: '2026-06-18', status: 'approved' },
    { id: 'EXP-2026-029', description: 'Bảo trì máy ép cọc robot thủy lực dầm hầm', category: 'Khấu hao Máy móc', amount: 180000000, date: '2026-06-15', status: 'approved' },
  ];

  const trendData = [
    { month: 'T6', value: 450, isForecast: false },
    { month: 'T7', value: 620, isForecast: false },
    { month: 'T8', value: 850, isForecast: false },
    { month: 'T9', value: 1100, isForecast: false },
    { month: 'T10', value: 920, isForecast: false },
    { month: 'T11', value: 1250, isForecast: true },
    { month: 'T12', value: 1400, isForecast: true },
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === 'pending') return t.status === 'pending';
    if (activeTab === 'completed') return t.status === 'approved';
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 overflow-y-auto max-w-[1600px] mx-auto select-none"
    >
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            Quản lý Ngân sách & Chi phí
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Theo dõi kế toán công trình, dòng tiền thanh toán thầu phụ và dự trù biến động giá vật tư.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 px-3 py-2 rounded-xl border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Xuất Báo cáo</span>
          </button>
          <button className="text-xs bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Tạo Phiếu chi mới</span>
          </button>
        </div>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-neutral-900 border ${stat.color} p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-colors`}
          >
            <div className="flex justify-between items-start text-xs font-semibold text-neutral-400">
              <span>{stat.label}</span>
              {stat.pct && (
                <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 font-bold">
                  {stat.pct}
                </span>
              )}
            </div>
            <div className={`text-3xl font-display font-extrabold mt-3 ${stat.isCritical ? 'text-red-400' : 'text-white'}`}>
              {stat.value}
            </div>
            <div className="text-[10px] text-neutral-500 font-medium mt-1">{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Grid of doughnut allocation vs Flow Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cost Doughnut Allocation */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Phân bổ chi phí dòng vốn</h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">Biểu đồ cơ cấu giải ngân vốn 8.24 Tỷ VNĐ.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around py-6 gap-6">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-neutral-850" strokeWidth="12" />
                {/* 
                  Vật tư: 40 (dasharray 100.48, offset 0)
                  Nhân công: 25 (dasharray 62.8, offset 100.48)
                  Máy móc: 15 (dasharray 37.68, offset 163.28)
                  Quản lý: 10 (dasharray 25.12, offset 200.96)
                  Khác: 10 (dasharray 25.12, offset 226.08)
                */}
                <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-amber-500" strokeWidth="12" strokeDasharray="100.48 251.2" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-emerald-500" strokeWidth="12" strokeDasharray="62.8 251.2" strokeDashoffset="-100.48" />
                <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-blue-500" strokeWidth="12" strokeDasharray="37.68 251.2" strokeDashoffset="-163.28" />
                <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-violet-500" strokeWidth="12" strokeDasharray="25.12 251.2" strokeDashoffset="-200.96" />
                <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-neutral-500" strokeWidth="12" strokeDasharray="25.12 251.2" strokeDashoffset="-226.08" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[9px] font-bold text-neutral-500 uppercase">Tổng chi</span>
                <span className="text-lg font-display font-black text-white mt-0.5">8.24B</span>
              </div>
            </div>

            <div className="space-y-2.5 w-full sm:w-auto">
              {categories.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between gap-5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs text-neutral-300 font-medium">{cat.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono font-bold text-neutral-400">{cat.amount}</div>
                    <div className="text-[9px] text-neutral-500 font-medium font-mono">{cat.pct}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-neutral-500 font-medium pt-2 border-t border-neutral-850 text-center">
            Hạng mục vượt dự toán: Vật tư thô (Thép cuộn biến động giá +12% quý này).
          </div>
        </div>

        {/* Cashflow Transaction Tracking */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">Theo dõi dòng tiền</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">Các giao dịch thanh toán thầu phụ / nhà cấp hàng.</p>
              </div>

              {/* Toggles */}
              <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800 self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'all' ? 'bg-neutral-850 text-white' : 'text-neutral-500'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'pending' ? 'bg-neutral-850 text-white' : 'text-neutral-500'
                  }`}
                >
                  Chờ duyệt
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'completed' ? 'bg-neutral-850 text-white' : 'text-neutral-500'
                  }`}
                >
                  Đã duyệt
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-850 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-2 pb-3">Mã phiếu</th>
                    <th className="py-2 pb-3">Nội dung giải ngân</th>
                    <th className="py-2 pb-3 text-right">Số tiền (VNĐ)</th>
                    <th className="py-2 pb-3 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="text-xs hover:bg-neutral-850/20 transition-colors">
                      <td className="py-3 font-mono font-bold text-neutral-400 text-[10px]">{tx.id}</td>
                      <td className="py-3 pr-2">
                        <div className="font-semibold text-neutral-200">{tx.description}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">{tx.category} • {tx.date}</div>
                      </td>
                      <td className="py-3 text-right font-mono font-extrabold text-neutral-300">
                        {tx.amount.toLocaleString()} đ
                      </td>
                      <td className="py-3 text-right">
                        {tx.status === 'pending' ? (
                          <span className="text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono uppercase">
                            Chờ duyệt
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase">
                            Hoàn tất
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-[10px] text-neutral-500 font-semibold pt-4 border-t border-neutral-850 flex items-center justify-between mt-2">
            <span>Dòng tiền được mã hóa và đồng bộ sang hóa đơn điện tử VAT.</span>
            <span className="text-amber-500 hover:underline cursor-pointer">Sao kê sổ phụ ngân hàng &rarr;</span>
          </div>
        </div>
      </div>

      {/* AI recommendation & cost trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cost Optimization AI recommendation banner */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 group">
          {/* Card background styling image */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBij-6tHMMxbWGJ-OXNZK9sz7IbFSSpGyhKhF-ik7cOUnQJcdkzluPmz8RIRLWIrAR9A_KDtaoCNsYzPbVCWQbhR2N27Qcec5RzaQmorGwHz4bSrZsYqKqTsBlVibZFffJk1HN6LNtV0NlgZonVPcJm_QZWhRwzz_bV0KXDFtm9E1bOraXpy0G_H9sj6mhXE1AG2IQCznpelPWMXUSelKYL5lhULegRlLsJTJnJfci4lrUgFlL0KV10jNzKsGLPfrc5dNePz8QFYRg"
            alt="Cost pattern abstract"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.06] filter brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/90 to-transparent" />

          <div className="p-6 relative z-10 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 bg-neutral-950/80 border border-neutral-800 w-fit px-3 py-1 rounded-full">
                <Cpu className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-[10px] font-bold text-amber-400 tracking-wider font-mono uppercase">
                  TỐI ƯU HÓA CHI PHÍ THỜI GIAN THỰC
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-base font-display font-extrabold text-white tracking-tight">
                  Đề xuất Gói thầu mua chung Sắt thép Hòa Phát
                </h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed max-w-md">
                  Mô hình AI dự báo giá Thép hình sẽ tăng thêm 4% trong tháng 07 do nhu cầu xây dựng phục hồi. Kết hợp đặt hàng sỉ cùng Kho tổng Thầu Phụ có thể nhận chiết khấu <strong className="text-emerald-400 font-bold">giảm 12%</strong> trên đơn giá hiện hữu.
                </p>
              </div>

              {/* Advisor profile bubble */}
              <div className="flex items-center space-x-3 bg-neutral-950/60 p-3 rounded-xl border border-neutral-850 w-fit">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5Jjh-XjFG_XeLD0Kz5H7oBOWruChvkIAGa5AqZuOrGQnl6qV23riuTWsDpmBGMaKiMZAwIOFmhrIVIwjeWU6ZXHDJfkJQFPUgYDm9-OUhNjIx905ZQlDqQA6SkITRNjiA6DBpQDFBHkgOgpsFu7qU2xfooTCqd4Ddpa2z0O1S2E-dp7gJKPgaIEjWrYhF0fUxofpFO_OCdZGgIdnH1Nldl5UG5MGO2xH1WgrOWEx7j_u3dovWe1aJsZJ16Y2Lw76zdjfr93EBTTk"
                  alt="Financial Supervisor Advisor Headshot"
                  className="w-8 h-8 rounded-full border border-neutral-800 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-[10px] font-bold text-white">Lê Minh Trang</div>
                  <div className="text-[9px] text-neutral-500">Giám đốc Tài chính ERP</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button className="text-[10px] bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl font-bold transition-all shadow-md shadow-amber-500/10 cursor-pointer">
                Áp dụng đề xuất
              </button>
              <button className="text-[10px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-2 rounded-xl border border-neutral-750 transition-colors cursor-pointer">
                Bỏ qua
              </button>
            </div>
          </div>
        </div>

        {/* Cost Trend Vertical Bar Chart */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-6 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">Xu hướng Chi phí</h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">Thống kê lũy kế hàng tháng (Đơn vị: Triệu VNĐ).</p>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-semibold">
              <div className="flex items-center space-x-1">
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
                <span className="text-neutral-400">Thực chi</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2.5 h-2.5 bg-neutral-700/60 rounded-sm border border-dashed border-amber-500/20" />
                <span className="text-neutral-400">Dự báo AI</span>
              </div>
            </div>
          </div>

          <div className="h-36 flex items-end justify-between gap-4 pt-6 px-2">
            {trendData.map((item, idx) => {
              const heightPct = (item.value / 1500) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative">
                  <div className="w-full relative h-full flex items-end justify-center">
                    <div
                      className={`w-5 sm:w-7 rounded-t-md transition-all ${
                        item.isForecast
                          ? 'bg-neutral-800 border-2 border-dashed border-amber-500/30 text-amber-400/40'
                          : 'bg-gradient-to-t from-amber-600 to-amber-500 hover:from-amber-400'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <div className="absolute bottom-[105%] bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 font-mono">
                      {item.value}M
                    </div>
                  </div>
                  <span className={`text-[10px] mt-2 font-semibold ${item.isForecast ? 'text-neutral-500 font-bold' : 'text-neutral-400'}`}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-[10px] text-neutral-500 font-medium pt-3 border-t border-neutral-850">
            Dữ liệu dự báo tháng 11, 12 tính toán dựa trên tiến trình lắp đặt phần hoàn thiện cơ điện MEP.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
