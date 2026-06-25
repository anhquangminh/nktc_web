import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AttendanceRecord } from '../types';
import {
  Clock,
  Search,
  Filter,
  MoreVertical,
  X,
  MapPin,
  Camera,
  ShieldCheck,
  Award,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Download,
} from 'lucide-react';

interface AttendanceViewProps {
  globalSearchQuery?: string;
}

export default function AttendanceView({ globalSearchQuery = '' }: AttendanceViewProps) {
  const [searchTerm, setSearchTerm] = useState(globalSearchQuery);

  React.useEffect(() => {
    if (globalSearchQuery) {
      setSearchTerm(globalSearchQuery);
    }
  }, [globalSearchQuery]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  const stats = [
    { label: 'Tổng công lao động', value: '1,245 công', subtext: 'Tính lũy kế đến hôm nay', color: 'border-neutral-800' },
    { label: 'Số thợ đúng ca', value: '1,180 thợ', subtext: '94.7% Tỷ lệ hiện diện', color: 'border-emerald-500/20' },
    { label: 'Ngoại lệ đi trễ', value: '14 ca', subtext: 'Hệ thống đã gửi nhắc nhở', color: 'border-amber-500/20' },
  ];

  const records: AttendanceRecord[] = [
    {
      id: 'NV-2024-001',
      employeeId: 'NV-2024-001',
      name: 'Nguyễn Văn An',
      daysWorked: 24.5,
      otHours: 12,
      lateEarly: '02/01',
      status: 'full',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXR9T49oNDLH264aVWld0aPLHy1t_Qr09hidn8cdqVfvoyH7JtR3NmJxhs6HfWGgUpifzLw6liQlS_9Y9c4Z9l2968Z7g6Gj7zhr_drEZPtpCLNXz7Yn9QE7TOcoo6wvt_u4zJljXTuakrfqZL824---N0irV8NWhnZB8lJrYqpluABNVBZx3_T4B4EPCOn6zJTCN02zHB9PfKEDWGLbskA7aabEVQpXXdNLpo_S9fVfI9WjaLyBT57rSXpVjMsJbTqJo0NKrcURg',
    },
    {
      id: 'NV-2024-042',
      employeeId: 'NV-2024-042',
      name: 'Trần Thị Bích',
      daysWorked: 21.0,
      otHours: 0,
      lateEarly: '05/03',
      status: 'missing',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0u2qLFI-2JgGT06Gag6VS482_w4xEGm82Mk7rAhXiNlcPz3_WzXmCl0zYZhbYPGHmGJURhZ_u6YNyCDd9io2d-89oyYdW2sOLWMCX8o8ZePv9ZaGBpNvQZ2vR8KLLiH7dPKM2sJ0eXd5I7EH8YAc7QkpYpKFdvY6l0Znwtsv2h2h1AEzADR28SnFlkAg4pcqvGS-BiwQA9vl8J6eKsFZ-FLrT-VpexttdVWavuB5KOmqomaqcRd1oRSrN0zqS_XPNtJYxFywOuBY',
    },
    {
      id: 'NV-2024-118',
      employeeId: 'NV-2024-118',
      name: 'Lê Hoàng Nam',
      daysWorked: 26.0,
      otHours: 24,
      lateEarly: '00/00',
      status: 'full',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUueUaL6uXh8v7hScHvzPfQ04D4CW9pSV97jsxrDYysP5xG5Dhk_xxIbiGErmx1G3QcBj-Dt20vaznoZ7Uwi9GhXDwUIgR49nIw5cpTWnSFXLP-s1PqeCTEzJ7UEZciXjbAreaqJ6HoZdta01hQFwZr_xfNs5J6oBPAsZ2bkJtegVKzOCMBqM9i8_Nj8fB9rINJWuMUr6DAMPriUjYo_2TPFCZrIMIGNKhal4ea8bX7kOnHLGN9roIpmgZhp_W1GMILWDsmvtlaQE',
    },
    {
      id: 'NV-2024-085',
      employeeId: 'NV-2024-085',
      name: 'Phạm Minh Tuấn',
      daysWorked: 19.5,
      otHours: 4,
      lateEarly: '12/02',
      status: 'warning',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8wM679fIoVoif31EFpXW9fLrb6e1YV_ONWk3y68yFsQzVU1YVOzlf71iI6U7pzUwkefBwRARsnuB0aeRVHy6hu8hg21n6gd_ZrfOR6NG2mKGG1b96A88w-VhT3vDWqrBv_9jF_JOFfWARdM0_8vbrpi8gmBkxqSCtzBjRVoptnU37QFBkSkJJ0Nb7PNi9j4wEvR7gmi2ngTuiRhlYqFDNphhoAPc6n1L5EWfuoYIA9KPnEqjBNDLtUBiPMSWDwGkfm0cftDr8bOI',
    },
  ];

  const filteredRecords = records.filter((rec) => {
    const matchesSearch = rec.name.toLowerCase().includes(searchTerm.toLowerCase()) || rec.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 overflow-y-auto max-w-[1600px] mx-auto select-none relative"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            Bảng chấm công tổng hợp
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Đối soát sinh trắc học Face ID & định vị vệ tinh GPS thợ đổ móng hiện trường. Click vào nhân viên để xem hồ sơ check-in chi tiết.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 px-3 py-2 rounded-xl border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Xuất bảng chấm công</span>
          </button>
        </div>
      </div>

      {/* Stats KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {/* Main Table */}
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

          <div className="flex items-center space-x-1 bg-neutral-950 px-2 rounded-xl border border-neutral-800 self-start sm:self-auto">
            <Filter className="w-3.5 h-3.5 text-neutral-500 ml-1" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-xs text-neutral-300 py-2 px-1 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả tình trạng</option>
              <option value="full">Đủ công</option>
              <option value="missing">Thiếu công</option>
              <option value="warning">Cảnh báo đi trễ</option>
            </select>
          </div>
        </div>

        {/* Attendance Roster Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-850 bg-neutral-950/40 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-5">Họ tên nhân viên</th>
                <th className="py-3 px-5">Mã số thợ</th>
                <th className="py-3 px-5 text-right">Số ngày công (tháng này)</th>
                <th className="py-3 px-5 text-right">Tăng ca (OT - Giờ)</th>
                <th className="py-3 px-5 text-center">Đi trễ / Về sớm (Lượt)</th>
                <th className="py-3 px-5 text-center">Tổng hợp</th>
                <th className="py-3 px-5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {filteredRecords.map((rec) => (
                <tr
                  key={rec.id}
                  onClick={() => setSelectedRecord(rec)}
                  className="hover:bg-neutral-850/40 cursor-pointer transition-colors text-xs"
                >
                  <td className="py-3.5 px-5">
                    <div className="flex items-center space-x-3">
                      <img
                        src={rec.avatar}
                        alt={rec.name}
                        className="w-9 h-9 rounded-full object-cover border border-neutral-700 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">{rec.name}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">ID: {rec.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-neutral-400 font-bold">{rec.id}</td>
                  <td className="py-3.5 px-5 text-right font-mono font-extrabold text-neutral-200">
                    {rec.daysWorked}
                  </td>
                  <td className="py-3.5 px-5 text-right font-mono text-amber-400 font-bold">
                    {rec.otHours}h
                  </td>
                  <td className="py-3.5 px-5 text-center font-mono text-red-400 font-bold">
                    {rec.lateEarly}
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    {rec.status === 'full' && (
                      <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase">
                        Đủ công
                      </span>
                    )}
                    {rec.status === 'missing' && (
                      <span className="text-[9px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono uppercase">
                        Thiếu công
                      </span>
                    )}
                    {rec.status === 'warning' && (
                      <span className="text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono uppercase animate-pulse">
                        Cảnh báo
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
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

      {/* Slide-out detail drawer for employee check-in validation */}
      <AnimatePresence>
        {selectedRecord && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecord(null)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Slide-out Drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-neutral-900 border-l border-neutral-800 z-50 flex flex-col justify-between overflow-y-auto shadow-2xl"
            >
              {/* Drawer header */}
              <div className="p-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/40">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span className="text-xs font-bold text-neutral-200 uppercase tracking-widest font-mono">
                    ĐỐI SOÁT CHECK-IN THỰC TẾ
                  </span>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body content */}
              <div className="flex-1 p-6 space-y-6">
                {/* Profile row */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={selectedRecord.avatar}
                      alt={selectedRecord.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-neutral-750 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-[-4px] right-[-4px] bg-emerald-500 p-1 rounded-md text-black border border-neutral-900 shadow">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-black text-white tracking-tight leading-none">
                      {selectedRecord.name}
                    </h3>
                    <div className="text-xs text-neutral-400 font-mono mt-1">Mã NV: {selectedRecord.id}</div>
                    <div className="text-[10px] text-amber-500 font-bold uppercase mt-1 tracking-wider">
                      Đội thi công Cơ điện MEP
                    </div>
                  </div>
                </div>

                {/* Monthly summary cards */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850/80">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Số ngày công</div>
                    <div className="text-2xl font-display font-extrabold text-white mt-1">{selectedRecord.daysWorked} ngày</div>
                    <div className="text-[9px] text-emerald-400 font-semibold font-mono mt-0.5">Đủ định mức</div>
                  </div>
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850/80">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Tăng ca (OT)</div>
                    <div className="text-2xl font-display font-extrabold text-amber-400 mt-1">{selectedRecord.otHours} giờ</div>
                    <div className="text-[9px] text-neutral-500 font-semibold font-mono mt-0.5">Đóng hệ số x1.5</div>
                  </div>
                </div>

                {/* Live validation log */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2">
                    Lịch sử Check-in hôm nay
                  </h4>

                  {/* Log element Wednesday 18/10/2024 */}
                  <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850/80 space-y-4 relative">
                    <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono font-bold">
                      <span>THỨ TƯ • 18/10/2024</span>
                      <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                        XÁC MINH OK
                      </span>
                    </div>

                    {/* Timeline steps */}
                    <div className="space-y-3.5 relative pl-4 border-l border-neutral-800">
                      {/* Check-in */}
                      <div className="relative">
                        <div className="absolute left-[-20.5px] top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-neutral-950" />
                        <div className="text-xs font-bold text-white">Check-in: 07:55 AM</div>
                        <p className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-500" />
                          <span>Cổng 1 - Vệ tinh GPS khớp 100% ranh giới Landmark 81</span>
                        </p>
                      </div>

                      {/* Map picture */}
                      <div className="h-28 rounded-xl overflow-hidden relative border border-neutral-800 my-2">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAP3uRwVQCl_GS1v4EU011ZrL40t3_2-m_uRv88Zv0DsTo5ZjpCvBePxh0kZiRXB6bz9KC5HeQAnVB8dWd8XN99HGUIji2dhxl06xEUl5iqAWbgVpEeLm8hnr6auzFT3o9U8gdpGD2GcJ4oyCWldxMUxth-49Qna1S7brdPkUEISwG0ks-t6lG26TCRJuRtmxjbd6YCH04P12DC4kBMBnGVRTVFE0JtosXeRT6vtZs0SsgiF4-B8KECFY2BYpy4_ZuNmUUTDlPNa0"
                          alt="Satellite GPS verify"
                          className="w-full h-full object-cover filter brightness-90 saturate-75"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-neutral-950/20" />
                        <div className="absolute bottom-2 left-2 bg-neutral-900/80 backdrop-blur-md px-2 py-0.5 rounded border border-neutral-750 text-[8px] font-mono font-bold text-neutral-300">
                          COORDINATES: 10.7950° N, 106.7218° E
                        </div>
                      </div>

                      {/* Check-out */}
                      <div className="relative pt-2">
                        <div className="absolute left-[-20.5px] top-3 w-2.5 h-2.5 bg-blue-500 rounded-full ring-4 ring-neutral-950" />
                        <div className="text-xs font-bold text-white">Check-out: 17:10 PM</div>
                        <p className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-1">
                          <Camera className="w-3 h-3 text-neutral-500" />
                          <span>Face ID xác nhận trùng khớp 99.8% sinh trắc học cán bộ</span>
                        </p>
                      </div>

                      {/* Biometric circle overlap frame */}
                      <div className="flex items-center space-x-3 bg-neutral-900/80 border border-neutral-800 p-2 rounded-xl w-fit mt-1">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500/40">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALN7euF8JEicU_Q3ErmzFfaXdFwEXoZzMCXL-YhJJCLrFvn97oWHfzuTlZiuqFcjNo0kLy7GJE6JvYXTKobMwlgDBCO9pDi2fDPGzWtX_je0v3mHnm3fX5dnbboZEgoErvctANB3rjHuxkT5vZt-vBZmsHKw_34QR2G8EcBdyhkTpga5QoGXwfFMv0FNL7h5qIjoKXaA5h4gE5vxw-qJFVga2OJ5mi4nzV61giZPpeY7gGjpKz8w4kvI4z-iJprsuV8mNWLWKAdu0"
                            alt="Face ID Capture"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 border border-emerald-500 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                            BIOMETRIC ID MATCHED
                          </div>
                          <div className="text-[8px] text-neutral-500 font-mono">DEVICE: AI-CAM-GATE-01</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="p-5 border-t border-neutral-800 bg-neutral-950/40 flex items-center gap-2">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-full bg-neutral-850 hover:bg-neutral-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center border border-neutral-750"
                >
                  Đóng hồ sơ
                </button>
                <button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center">
                  Xác nhận giờ công
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
