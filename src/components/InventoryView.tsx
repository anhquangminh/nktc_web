import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MaterialItem, WarehouseHistory } from '../types';
import {
  Search,
  Filter,
  Package,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  MoreVertical,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Flame,
  Download,
  Database,
} from 'lucide-react';

interface InventoryViewProps {
  globalSearchQuery?: string;
}

export default function InventoryView({ globalSearchQuery = '' }: InventoryViewProps) {
  const [activeTab, setActiveTab] = useState<'materials' | 'history'>('materials');
  const [searchTerm, setSearchTerm] = useState(globalSearchQuery);

  React.useEffect(() => {
    if (globalSearchQuery) {
      setSearchTerm(globalSearchQuery);
      setActiveTab('materials');
    }
  }, [globalSearchQuery]);
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    { label: 'Tổng giá trị tồn kho', value: '12.5 Tỷ VNĐ', subtext: 'Tính theo giá FOB quý II/2026', color: 'border-neutral-800' },
    { label: 'Mã hàng sắp hết', value: '15 mã hàng', subtext: 'Cần nạp định mức ngay', color: 'border-red-500/20' },
    { label: 'Phiếu xuất chờ duyệt', value: '5 phiếu', subtext: 'Đang đợi Chỉ huy trưởng ký', color: 'border-amber-500/20' },
  ];

  const materials: MaterialItem[] = [
    { code: 'MS-TH-001', name: 'Thép Hòa Phát D10', unit: 'Tấn', quantity: 45.5, minAlert: 10.0, status: 'safe' },
    { code: 'MS-XM-023', name: 'Xi măng Bỉm Sơn PCB40', unit: 'Bao', quantity: 120, minAlert: 500, status: 'warning' },
    { code: 'MS-CT-045', name: 'Cát xây tô sệt', unit: 'm3', quantity: 15.0, minAlert: 5.0, status: 'safe' },
    { code: 'MS-DA-012', name: 'Đá dăm bê tông 1x2', unit: 'm3', quantity: 0.0, minAlert: 20.0, status: 'out_of_stock' },
  ];

  const histories: WarehouseHistory[] = [
    { code: 'PNK-2026-1108-01', type: 'import', material: 'Thép Hòa Phát D10', quantity: 35, date: '2026-06-24 08:30', operator: 'Nguyễn Văn Kho', status: 'pending' },
    { code: 'PXK-2026-1108-05', type: 'export', material: 'Xi măng Bỉm Sơn', quantity: 150, date: '2026-06-23 14:15', operator: 'Trần Thế Kho', status: 'completed' },
    { code: 'PNK-2026-1107-02', type: 'import', material: 'Cát xây tô sệt', quantity: 50, date: '2026-06-22 10:00', operator: 'Nguyễn Văn Kho', status: 'completed' },
  ];

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.code.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const projectsWarehouse = [
    { name: 'Diamond Tower', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhlPfMN96I8mwpEYwM7PnA8Hx71Q82SbpK_ig_1TgdP4bIqEAsATgx92MX_rEgTjqWn-yswCw-e9Ev6mNRd5x8liW2MEPPhb2KxEDvRCZ7pRo99Iuf1VvrDtODqI7TDSn6QuksynNJMvhD00DeZosP9lLOoWbcM6U9BXz2I3w28zAoVquwv7hTJO56ep_bluqfDfJsE9YT0CGz1CRgiz_UaTV3DDZi4WxEvSxHuHvNtJiKOSHrWS9MrTtluberpnFUArQFwS5s0Sk', stockLevel: 78, status: 'An toàn' },
    { name: 'VSIP Hải Phòng', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUjgn2IOaYd6qTUW_tXNID-HWB68ka14nYQpj04JMx_9dM4sI2li5xquVrRShIAOTiHePD3dDbrjODQ8jijubxxrcYjmojE6T5EL3pScyTsrRlDiHeUGeanJtHCM1ntUF33Gqy4mNqmtfz3CxbUPrtRHdj_Fu96n0tdYfsNFTt-MmN-deBMjiNKIEZuaqYl9ATIF3jBMhT87kYTktqkpR5xkBpskJkxwI2mGdKT7m3_sYlSoCan8Tkgx7d_j5ihMPraJMBDNTGHPI', stockLevel: 42, status: 'Báo động', isLow: true },
    { name: 'Cầu Sông Hàn', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-QZ62DxhBNK9TcylvixoAEzOJFA8JmEf87Xfvz6TP9hCep-TVaSZNdLTL4ZttoKOWn0imEeJOwNuFrDWqcJZGH6jZ2TKy91HD-RdWkfWlpZ2C_uIeNv2PHgxPfF5rKh8MaJTIUr1Qj_dGFiLNNyh1thR0vte-FdXt709o4Uos8S0n8JPIxGS9jBXqcH-ehqnY5YS2xtVnNf9rj3l0nboQcYDdV8yQ5i5IcDF5NqFNlzU6r-M67YUwyZfV5VPn5omhpxPz0r-L9JU', stockLevel: 92, status: 'Dồi dào' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 overflow-y-auto max-w-[1600px] mx-auto select-none"
    >
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            Vật tư & Kho
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Quản trị chuỗi cung ứng công trình, kiểm soát tồn kho thực tế, lập phiếu nhập xuất tự động.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 px-3 py-2 rounded-xl border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Xuất báo cáo tồn</span>
          </button>
          <button className="text-xs bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Tạo vận đơn mới</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-colors"
          >
            <div className="text-xs font-semibold text-neutral-400">{stat.label}</div>
            <div className="text-3xl font-display font-extrabold text-white mt-3">{stat.value}</div>
            <div className="text-[10px] text-neutral-500 font-medium mt-1">{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Custom Tabs */}
      <div className="flex space-x-1.5 bg-neutral-950 p-1.5 rounded-xl border border-neutral-850 w-fit">
        <button
          onClick={() => setActiveTab('materials')}
          className={`text-xs px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'materials'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Danh sách vật tư</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`text-xs px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'history'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Lịch sử nhập/xuất</span>
        </button>
      </div>

      {/* Dynamic Content based on tabs */}
      {activeTab === 'materials' ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
          {/* Table Filters */}
          <div className="p-5 border-b border-neutral-850 flex flex-col sm:flex-row sm:items-center gap-4 bg-neutral-950/20">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm mã vật tư, tên vật liệu xây dựng..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-neutral-600"
              />
            </div>

            <div className="flex items-center space-x-1 bg-neutral-950 px-2 rounded-xl border border-neutral-800 self-start sm:self-auto">
              <Filter className="w-3.5 h-3.5 text-neutral-500 ml-1" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none text-xs text-neutral-300 py-2 px-1 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả định mức</option>
                <option value="safe">Mức an toàn</option>
                <option value="warning">Mức cảnh báo</option>
                <option value="out_of_stock">Đã hết hàng</option>
              </select>
            </div>
          </div>

          {/* Materials Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-850 bg-neutral-950/40 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-5">Mã vật tư</th>
                  <th className="py-3 px-5">Tên vật liệu</th>
                  <th className="py-3 px-5">Đơn vị</th>
                  <th className="py-3 px-5 text-right">Tồn kho thực tế</th>
                  <th className="py-3 px-5 text-right">Định mức tối thiểu</th>
                  <th className="py-3 px-5 text-center">Trạng thái</th>
                  <th className="py-3 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850">
                {filteredMaterials.map((m) => (
                  <tr key={m.code} className="hover:bg-neutral-850/30 transition-colors text-xs">
                    <td className="py-3.5 px-5 font-mono font-bold text-neutral-400 text-[11px]">{m.code}</td>
                    <td className="py-3.5 px-5 font-bold text-neutral-200">{m.name}</td>
                    <td className="py-3.5 px-5 text-neutral-400">{m.unit}</td>
                    <td className="py-3.5 px-5 text-right font-mono font-extrabold text-neutral-200">{m.quantity}</td>
                    <td className="py-3.5 px-5 text-right font-mono text-neutral-500">{m.minAlert}</td>
                    <td className="py-3.5 px-5 text-center">
                      {m.status === 'safe' && (
                        <span className="text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-mono">
                          An toàn
                        </span>
                      )}
                      {m.status === 'warning' && (
                        <span className="text-[9px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-mono animate-pulse">
                          Cảnh báo
                        </span>
                      )}
                      {m.status === 'out_of_stock' && (
                        <span className="text-[9px] font-bold bg-red-500/15 text-red-400 border border-red-500/20 px-2 py-0.5 rounded uppercase font-mono font-black">
                          Hết hàng
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button className="p-1 hover:bg-neutral-800 text-neutral-500 hover:text-white rounded transition-colors cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
          {/* History Flow */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-850 bg-neutral-950/40 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-5">Mã vận đơn</th>
                  <th className="py-3 px-5">Loại chứng từ</th>
                  <th className="py-3 px-5">Vật liệu phát sinh</th>
                  <th className="py-3 px-5 text-right">Khối lượng</th>
                  <th className="py-3 px-5">Thời gian</th>
                  <th className="py-3 px-5">Cán bộ phụ trách</th>
                  <th className="py-3 px-5 text-center">Đối soát</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850">
                {histories.map((h) => (
                  <tr key={h.code} className="hover:bg-neutral-850/30 transition-colors text-xs">
                    <td className="py-3.5 px-5 font-mono font-bold text-neutral-400 text-[11px]">{h.code}</td>
                    <td className="py-3.5 px-5">
                      {h.type === 'import' ? (
                        <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                          <ArrowDownLeft className="w-3.5 h-3.5" />
                          <span>Phiếu nhập kho</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1.5 text-blue-400 font-bold">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>Phiếu xuất kho</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-neutral-200">{h.material}</td>
                    <td className="py-3.5 px-5 text-right font-mono font-extrabold text-neutral-300">
                      {h.quantity} tấn
                    </td>
                    <td className="py-3.5 px-5 text-neutral-400 font-medium">{h.date}</td>
                    <td className="py-3.5 px-5 text-neutral-300 font-semibold">{h.operator}</td>
                    <td className="py-3.5 px-5 text-center">
                      {h.status === 'pending' ? (
                        <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">
                          Kế toán duyệt
                        </span>
                      ) : (
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">
                          Đã ký nhận
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bento Bottom: Inventory variance & Project warehouses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Biến động tồn kho custom SVG chart */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Biến động tồn kho (30 ngày)</h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">Xu hướng nhập sỉ Xi măng PCB40 (Đơn vị: Tấn).</p>
          </div>

          <div className="h-36 flex items-end justify-between gap-4 pt-6">
            {[12, 18, 25, 45, 30, 22, 10, 50, 42, 60].map((val, idx) => {
              const heightPct = (val / 60) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative">
                  <div
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-sm group-hover:from-amber-400 transition-all shadow-md shadow-amber-500/5"
                    style={{ height: `${heightPct}%` }}
                  />
                  <div className="absolute bottom-[105%] bg-neutral-950 border border-neutral-800 px-1 py-0.5 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 font-mono">
                    {val}t
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[10px] text-neutral-500 font-semibold pt-3 border-t border-neutral-850">
            Dự báo: Cần bổ sung 45 tấn Cát sệt trước tuần đầu tiên của tháng 07.
          </div>
        </div>

        {/* Kho công trình trọng điểm */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              Tồn kho Công trình Trọng điểm
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {projectsWarehouse.map((p, idx) => (
                <div key={idx} className="bg-neutral-950 rounded-xl overflow-hidden border border-neutral-850 flex flex-col justify-between">
                  <div className="h-20 relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover filter brightness-75"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[11px] font-bold text-white tracking-tight drop-shadow-md">
                      {p.name}
                    </span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-neutral-400">
                      <span>Mức dự trữ</span>
                      <span className={p.isLow ? 'text-red-400 font-bold animate-pulse' : 'text-emerald-400 font-bold'}>
                        {p.stockLevel}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-1 overflow-hidden">
                      <div
                        className={`h-1 rounded-full ${p.isLow ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${p.stockLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-neutral-500 font-semibold pt-4 border-t border-neutral-850 flex items-center justify-between mt-3">
            <span>Giám sát định mức bởi:</span>
            <div className="flex items-center space-x-1.5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFb0sLpsYY4gKeDTuIOGlv7FCTzHWnSQuElTGiV5eN0tKM73tdsVJwKUiNrshQdgt4Zx59g2bBQsjOcGmKmf3Ih-nH-Kd9Blcvxd-jeydW6_1lajpThVLcjkdOUSm1b2tsnvVoeBcgkDhyGvVmmEXA5Akd4J8v1_aBUD-EdD8wo9UXQXQZ99gg-Gi0gZKaRgZSMI90AfaNxHH12H-acWNz7rnur-xp7j7xZZ0vevjh5laVmIJlsYNNv3tyHnhBjIl-1dolmXf30ww"
                alt="Warehouse Supervisor Headshot"
                className="w-5 h-5 rounded-full object-cover border border-neutral-800"
                referrerPolicy="no-referrer"
              />
              <span className="text-neutral-400">Phạm Văn Trọng</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
