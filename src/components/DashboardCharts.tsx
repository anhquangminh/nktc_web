import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from 'recharts';
import { Sparkles, ArrowUpRight, TrendingUp, DollarSign, Cpu } from 'lucide-react';

// Highly-polished Custom Tooltip with glassmorphic style
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-950/95 border border-neutral-850 backdrop-blur-md p-3.5 rounded-xl shadow-2xl text-left select-none">
        <p className="text-[11px] font-bold text-neutral-400 font-mono uppercase tracking-wider mb-2 border-b border-neutral-850 pb-1.5">{label}</p>
        <div className="space-y-1.5">
          {payload.map((item: any, idx: number) => {
            const isPercent = item.unit === '%' || item.name.includes('Chênh lệch') || item.name.includes('Hiệu suất');
            const valueStr = formatter 
              ? formatter(item.value, item.name) 
              : isPercent 
                ? `${item.value}%` 
                : typeof item.value === 'number' 
                  ? item.value.toLocaleString() 
                  : item.value;
            
            return (
              <div key={idx} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color || item.fill }} />
                  <span className="text-[11px] text-neutral-400 font-medium">{item.name}:</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-white">
                  {valueStr}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardCharts() {
  const [activeTab, setActiveTab] = useState<'all' | 'progress' | 'budget' | 'resource'>('all');

  // Chart 1: Project Progress Trend over 6 months
  const progressData = [
    { month: 'T1/2026', 'Landmark 81': 15, 'Hầm Thủ Thiêm 2': 10, 'Vinhomes CP': 12 },
    { month: 'T2/2026', 'Landmark 81': 30, 'Hầm Thủ Thiêm 2': 22, 'Vinhomes CP': 25 },
    { month: 'T3/2026', 'Landmark 81': 50, 'Hầm Thủ Thiêm 2': 38, 'Vinhomes CP': 42 },
    { month: 'T4/2026', 'Landmark 81': 68, 'Hầm Thủ Thiêm 2': 55, 'Vinhomes CP': 60 },
    { month: 'T5/2026', 'Landmark 81': 82, 'Hầm Thủ Thiêm 2': 72, 'Vinhomes CP': 78 },
    { month: 'T6/2026', 'Landmark 81': 95, 'Hầm Thủ Thiêm 2': 88, 'Vinhomes CP': 92 },
  ];

  // Chart 2: Budget Variance (Planned vs Actual and Variance Line)
  const budgetData = [
    { name: 'Landmark 81', 'Kế hoạch': 5.0, 'Thực tế': 5.26, 'Chênh lệch': 5.2 }, // Tỷ VNĐ, chênh lệch %
    { name: 'Thủ Thiêm 2', 'Kế hoạch': 3.5, 'Thực tế': 3.42, 'Chênh lệch': -2.3 },
    { name: 'Vinhomes CP', 'Kế hoạch': 4.2, 'Thực tế': 4.15, 'Chênh lệch': -1.2 },
    { name: 'Sala Block C', 'Kế hoạch': 2.0, 'Thực tế': 2.18, 'Chênh lệch': 9.0 },
    { name: 'Aqua City', 'Kế hoạch': 1.5, 'Thực tế': 1.35, 'Chênh lệch': -10.0 },
  ];

  // Chart 3: Resource Utilization (Actual vs Optimal Thresholds)
  const resourceData = [
    { subject: 'Nhân lực', 'Đang dùng': 85, 'Tối ưu': 80 },
    { subject: 'Thiết bị nặng', 'Đang dùng': 74, 'Tối ưu': 85 },
    { subject: 'Sắt thép', 'Đang dùng': 92, 'Tối ưu': 90 },
    { subject: 'Bê tông', 'Đang dùng': 60, 'Tối ưu': 75 },
    { subject: 'Năng lượng', 'Đang dùng': 78, 'Tối ưu': 80 },
    { subject: 'Logistics', 'Đang dùng': 65, 'Tối ưu': 70 },
  ];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
      {/* Dashboard Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/40 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">
              Bảng điều khiển trực quan Recharts
            </h3>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Phân tích chuyên sâu tiến độ, ngân sách thực tế và hiệu năng phân bổ tài nguyên.
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-neutral-950/60 p-1 rounded-xl border border-neutral-850 self-start md:self-auto overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Tất cả biểu đồ' },
            { id: 'progress', label: 'Tiến độ dự án' },
            { id: 'budget', label: 'Biến động ngân sách' },
            { id: 'resource', label: 'Sử dụng tài nguyên' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Charts */}
      <div className={`grid grid-cols-1 ${activeTab === 'all' ? 'xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        
        {/* CHART 1: Project Progress (AreaChart with gradients) */}
        {(activeTab === 'all' || activeTab === 'progress') && (
          <div className="bg-neutral-950/40 border border-neutral-850 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  Xu hướng lũy kế Tiến độ (%)
                </h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">Tiến trình thi công chi tiết qua các tháng gần đây</p>
              </div>
              <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold font-mono">
                LŨY KẾ HÀNG THÁNG
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLandmark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.01}/>
                    </linearGradient>
                    <linearGradient id="colorThuThiem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01}/>
                    </linearGradient>
                    <linearGradient id="colorVinhomes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#525252" 
                    fontSize={9} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#525252" 
                    fontSize={9} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconSize={8}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', paddingTop: '10px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Landmark 81" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorLandmark)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Hầm Thủ Thiêm 2" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorThuThiem)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Vinhomes CP" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorVinhomes)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-[10px] text-neutral-500 font-medium pt-3 border-t border-neutral-850 mt-2 flex justify-between items-center">
              <span>Đo lường tự động qua camera & IoT thiết bị</span>
              <span className="text-amber-500 font-semibold hover:underline cursor-pointer">Báo cáo chi tiết &rarr;</span>
            </div>
          </div>
        )}

        {/* CHART 2: Budget Variance (ComposedChart - Bars & Line) */}
        {(activeTab === 'all' || activeTab === 'budget') && (
          <div className="bg-neutral-950/40 border border-neutral-850 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                  Chênh lệch Ngân sách so với Kế hoạch
                </h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">So sánh kế hoạch vs chi phí thực và % chênh lệch</p>
              </div>
              <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded font-bold font-mono">
                ĐƠN VỊ: TỶ VNĐ
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={budgetData} margin={{ top: 10, right: -10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#525252" 
                    fontSize={8} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  {/* Left Y-Axis for Budget */}
                  <YAxis 
                    yAxisId="left"
                    stroke="#525252" 
                    fontSize={9} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(v) => `${v}T`}
                  />
                  {/* Right Y-Axis for Variance percentage */}
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#ef4444" 
                    fontSize={9} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconSize={8}
                    wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', paddingTop: '10px' }}
                  />
                  <Bar yAxisId="left" dataKey="Kế hoạch" fill="#404040" radius={[4, 4, 0, 0]} barSize={14} name="Dự toán (Tỷ)" />
                  <Bar yAxisId="left" dataKey="Thực tế" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={14} name="Thực tế (Tỷ)" />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="Chênh lệch" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    dot={{ fill: '#ef4444', r: 3, strokeWidth: 1 }}
                    activeDot={{ r: 5 }}
                    name="Hụt/Vượt chi (%)" 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[10px] text-neutral-500 font-medium pt-3 border-t border-neutral-850 mt-2 flex justify-between items-center">
              <span>Đỏ: Vượt ngân sách dự phòng</span>
              <span className="text-amber-500 font-semibold hover:underline cursor-pointer">Cân đối ngân sách &rarr;</span>
            </div>
          </div>
        )}

        {/* CHART 3: Resource Utilization (RadarChart or Custom Stacked Bar) */}
        {(activeTab === 'all' || activeTab === 'resource') && (
          <div className="bg-neutral-950/40 border border-neutral-850 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Hiệu năng Sử dụng Tài nguyên
                </h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">So sánh hiệu suất hiện tại với ngưỡng tối ưu %</p>
              </div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold font-mono">
                KHAI THÁC THỰC TẾ
              </span>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={resourceData}>
                  <PolarGrid stroke="#262626" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#a3a3a3', fontSize: 9, fontWeight: 600 }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#525252', fontSize: 8 }}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Radar 
                    name="Đang khai thác" 
                    dataKey="Đang dùng" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.25} 
                  />
                  <Radar 
                    name="Ngưỡng tối ưu" 
                    dataKey="Tối ưu" 
                    stroke="#10b981" 
                    fill="transparent" 
                    strokeDasharray="3 3"
                    strokeWidth={1.5} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconSize={8}
                    wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', paddingTop: '10px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[10px] text-neutral-500 font-medium pt-3 border-t border-neutral-850 mt-2 flex justify-between items-center">
              <span>Đề xuất AI: Tối ưu hoá điều chuyển</span>
              <span className="text-amber-500 font-semibold hover:underline cursor-pointer">Bản đồ điều phối &rarr;</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
