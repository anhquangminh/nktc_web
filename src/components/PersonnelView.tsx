import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Employee } from '../types';
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Check,
  AlertCircle,
  Bell,
  Calendar,
  Briefcase,
  Users2,
  Building,
} from 'lucide-react';

interface PersonnelViewProps {
  globalSearchQuery?: string;
}

export default function PersonnelView({ globalSearchQuery = '' }: PersonnelViewProps) {
  const [searchTerm, setSearchTerm] = useState(globalSearchQuery);

  React.useEffect(() => {
    if (globalSearchQuery) {
      setSearchTerm(globalSearchQuery);
    }
  }, [globalSearchQuery]);
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    { label: 'Tổng nhân sự', value: '1,245', subtext: '350 Biên chế | 895 Thời vụ', color: 'border-neutral-800' },
    { label: 'Biên chế chính thức', value: '350', subtext: 'Kỹ sư & Ban Quản lý', color: 'border-neutral-800' },
    { label: 'Công nhân thời vụ', value: '895', subtext: 'Các tổ đội trực tiếp', color: 'border-neutral-800' },
    { label: 'Đang có mặt tại dự án', value: '1,180', subtext: '94.7% Tỉ lệ đi làm', color: 'border-amber-500/20' },
  ];

  const initialEmployees: Employee[] = [
    {
      id: 'NV-2023-441',
      name: 'Nguyễn Minh Đức',
      role: 'Kỹ sư hiện trường',
      team: 'Đội Kết cấu 02',
      project: 'Landmark 81',
      status: 'working',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtrvsB9y88fCkwq6rza0kOj9D--Pyidsh0LMG3CBvxzXgExoIzgH-XwbXdnwoDJ6WQCSy4xGafsg5wcsgPOzWAXD8Qm3y1xn2-fxFCLsRpdoWWW-26-9FaE-pS9YHhv5YM47MA4OY_P6lNT8iNmSFDD05DfIN1F1EsAf2ktpMXHMkGG8mSk4JNOKycCBphKW1jurKB4aV8CwLXlJsT6BIwb01-nMqef93Bx2eWK2GPcN1_hgsoSCeo5EsOIN8inozg8rI3XhXY_3c',
    },
    {
      id: 'NV-2023-112',
      name: 'Lê Thị Thanh Huyền',
      role: 'Giám sát An toàn',
      team: 'Đội HSE',
      project: 'Hầm Thủ Thiêm 2',
      status: 'leave',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW0L3S3OVkldfEqWKOMsAIgZIMwCQ4ataGZWwc5tTNeQ8J-Ns6eazy6Nw9dW6X2ZKL5I-AmkcO7gmWtjCRa3mvIjsJp_aBbQmtdaENei-G6r4LBOCgSXOjsCDEQ9B2tkU5V_vzys6tCLpcSLVVxv8ANPxjnAkZbgAFfL2J_zZHTL9DJ7LhT31ys4ynLauiN8Lth0r1tqHF2QIY7xbW9x7OeRVsBhdDWbdM1Wwknp07lFvGd9Wg8arM2ObR6EDgSvjkXlRe9osbKbY',
    },
    {
      id: 'NV-2023-085',
      name: 'Phạm Văn Hùng',
      role: 'Thợ điện bậc 5',
      team: 'Đội MEP 01',
      project: 'Vinhomes Central Park',
      status: 'working',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9NGBjZ-PRfPHfdAJzxDGKU_4891YNGQb8mRnTqPpGUewzTXHql3xRmayWf94H40NlBulSdT-TEPHfH1bKrThcTo7glC6U21ROy1RQIJlT2uPXkI14zDVDUdF4qzzStlmPX7_p7feMU4r7C1-sonPAaqvaq38_j1AN016VY6oAM937oDIeM7KzHDUuYHpw3z8A5Tx4IvLZnA8K56Z76d56SHTzFoepz3xeE02ErVHcInGcEJHyPmIiixI7qJdKb3-WTtfMmC7bU24',
    },
    {
      id: 'NV-2023-229',
      name: 'Võ Hoàng Yến',
      role: 'Hành chính - Nhân sự',
      team: 'Văn phòng chính',
      project: 'Trụ sở chính',
      status: 'resigned',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5LggAc77eqJ0lEtrSB-Mj-PYFrcr6eckTbYY3KiHWBgmWTP_Ouyb6kRyMf9VXHKtOasLkYLNWlBYkvlUEUz7a3fDSEoP39PsiUtVtN1rhz7HmITHBGwa4iTl_QYouWKvLW2OfIPucLgycvD-8YohUD7Dc5Joe9QRSTtsMWQb42mb9oxJRsczAK-xI7st8pKkl7ri1S-Obq6-e5tcTUftW7Ax4LJsWMT9ViI2luvpHd5--7Eia-9Wyv-8g_Rt2VYu4ZqtkpIYaJGs',
    },
  ];

  const allocationData = [
    { project: 'Landmark 81', count: 320, pct: '32%' },
    { project: 'Hầm Thủ Thiêm 2', count: 245, pct: '24.5%' },
    { project: 'Vinhomes Central Park', count: 410, pct: '41%' },
    { project: 'Aqua City', count: 180, pct: '18%' },
    { project: 'Meyhomes Phú Quốc', count: 90, pct: '9%' },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Hết hạn chứng chỉ An toàn lao động',
      desc: 'Giám sát Lê Thị Thanh Huyền cần gia hạn chứng chỉ nhóm 2 trước ngày 30/10.',
      time: '2 giờ trước',
      type: 'warning',
    },
    {
      id: 2,
      title: 'Tổ kết cấu 02 nộp đề xuất thêm người',
      desc: 'Đội trưởng đề xuất bổ sung thêm 5 thợ sắt cho ca đổ móng đêm tại Landmark 81.',
      time: '1 ngày trước',
      type: 'info',
    },
    {
      id: 3,
      title: 'Hoàn tất chấm công tháng 09',
      desc: 'Hệ thống AI chấm công đã đối soát thành công 12,450 giờ công trực tiếp không sai lệch.',
      time: '2 ngày trước',
      type: 'success',
    },
  ];

  const filteredEmployees = initialEmployees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.id.includes(searchTerm);
    const matchesProject = projectFilter === 'all' || emp.project === projectFilter;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    return matchesSearch && matchesProject && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 overflow-y-auto max-w-[1600px] mx-auto select-none"
    >
      {/* Title section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            Quản lý Nhân sự
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Theo dõi, định vị, và chấm công tự động lực lượng lao động toàn hệ thống.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 px-3 py-2 rounded-xl border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Xuất Excel</span>
          </button>
          <button className="text-xs bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm nhân sự mới</span>
          </button>
        </div>
      </div>

      {/* Cards stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-neutral-900 border ${stat.color} p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-colors`}
          >
            <div className="text-xs font-semibold text-neutral-400">{stat.label}</div>
            <div className="text-3xl font-display font-extrabold text-white mt-3">{stat.value}</div>
            <div className="text-[10px] text-neutral-500 font-medium mt-1">{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Table section & Filters */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        {/* Filters bar */}
        <div className="p-5 border-b border-neutral-850 flex flex-col sm:flex-row sm:items-center gap-4 bg-neutral-950/20">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo mã, họ tên nhân viên..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-neutral-600"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center space-x-1 bg-neutral-950 px-2 rounded-xl border border-neutral-800">
              <Filter className="w-3.5 h-3.5 text-neutral-500 ml-1" />
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="bg-transparent border-none text-xs text-neutral-300 py-2 px-1 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả dự án</option>
                <option value="Landmark 81">Landmark 81</option>
                <option value="Hầm Thủ Thiêm 2">Hầm Thủ Thiêm 2</option>
                <option value="Vinhomes Central Park">Vinhomes Central Park</option>
              </select>
            </div>

            <div className="flex items-center space-x-1 bg-neutral-950 px-2 rounded-xl border border-neutral-800">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none text-xs text-neutral-300 py-2 px-2 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="working">Đang làm việc</option>
                <option value="leave">Nghỉ phép</option>
                <option value="resigned">Đã nghỉ việc</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-850 bg-neutral-950/40 text-neutral-400 text-[11px] font-bold tracking-wider uppercase">
                <th className="py-3 px-5">Nhân viên</th>
                <th className="py-3 px-5">Mã nhân sự</th>
                <th className="py-3 px-5">Chức vụ / Tổ đội</th>
                <th className="py-3 px-5">Công trình</th>
                <th className="py-3 px-5">Trạng thái</th>
                <th className="py-3 px-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-neutral-850/30 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center space-x-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-9 h-9 rounded-full object-cover border border-neutral-700 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-xs font-semibold text-white">{emp.name}</div>
                          <div className="text-[10px] text-neutral-500 font-mono">Bảo hiểm xã hội: OK</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 font-mono text-[11px] font-bold text-neutral-400">
                      {emp.id}
                    </td>
                    <td className="py-3 px-5">
                      <div className="text-xs font-semibold text-neutral-200">{emp.role}</div>
                      <div className="text-[10px] text-neutral-500">{emp.team}</div>
                    </td>
                    <td className="py-3 px-5 text-xs text-neutral-300 font-medium">
                      {emp.project}
                    </td>
                    <td className="py-3 px-5">
                      {emp.status === 'working' && (
                        <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wide">
                          Đang làm việc
                        </span>
                      )}
                      {emp.status === 'leave' && (
                        <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-wide">
                          Nghỉ phép
                        </span>
                      )}
                      {emp.status === 'resigned' && (
                        <span className="text-[10px] font-bold bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-wide">
                          Đã nghỉ việc
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500 text-xs font-medium">
                    Không tìm thấy nhân viên nào phù hợp với bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Bento row: Allocation Chart + Recent notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Allocation */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-6">
          <h3 className="text-sm font-semibold text-white tracking-wide mb-4 flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-500" />
            Phân bổ Nhân sự theo Công trình
          </h3>

          <div className="space-y-4">
            {allocationData.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-300">{item.project}</span>
                  <span className="text-neutral-400 font-mono">{item.count} Thợ ({item.pct})</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-1.5 rounded-full"
                    style={{ width: item.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500 animate-swing" />
              Thông báo mới nhất
            </h3>

            <div className="space-y-3.5">
              {notifications.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-neutral-950/30 rounded-xl border border-neutral-850 hover:border-neutral-750 transition-colors">
                  <div className={`p-1.5 rounded-lg shrink-0 ${
                    item.type === 'warning' ? 'bg-red-500/10 text-red-400' :
                    item.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-200">{item.title}</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    <span className="text-[10px] text-neutral-500 font-medium font-mono mt-1 block">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-neutral-500 font-semibold text-center mt-4 pt-3 border-t border-neutral-850">
            Hệ thống giám sát an toàn kết nối camera AI hiện trường.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
