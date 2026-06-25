import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, KeySquare, HelpCircle, Save, CheckCircle, RefreshCw } from 'lucide-react';

export default function MatrixView() {
  const [permissionType, setPermissionType] = useState<'read' | 'write' | 'delete'>('read');
  const [showToast, setShowToast] = useState(false);

  // List of roles (columns)
  const roles = [
    'ADMIN',
    'GIÁM ĐỐC',
    'QUẢN LÝ DỰ ÁN',
    'CHỈ HUY TRƯỞNG',
    'KỸ SƯ',
    'KẾ TOÁN',
    'ĐỘI TRƯỞNG',
    'CÔNG NHÂN',
  ];

  // List of modules (rows)
  const modules = [
    { id: 'DASHBOARD', label: 'TỔNG QUAN HỆ THỐNG' },
    { id: 'PROJECT', label: 'DANH MỤC CÔNG TRÌNH' },
    { id: 'DIARY', label: 'NHẬT KÝ THI CÔNG' },
    { id: 'ATTENDANCE', label: 'CHẤM CÔNG LAO ĐỘNG' },
    { id: 'MATERIAL', label: 'VẬT TƯ & KHO BÃI' },
    { id: 'SYSTEM', label: 'CÀI ĐẶT HỆ THỐNG' },
  ];

  // Permissions state representation
  // true = checked, false = unchecked
  const [matrixState, setMatrixState] = useState<Record<string, Record<string, boolean>>>({
    DASHBOARD: { ADMIN: true, 'GIÁM ĐỐC': true, 'QUẢN LÝ DỰ ÁN': true, 'CHỈ HUY TRƯỞNG': true, 'KỸ SƯ': true, 'KẾ TOÁN': true, 'ĐỘI TRƯỞNG': true, 'CÔNG NHÂN': false },
    PROJECT: { ADMIN: true, 'GIÁM ĐỐC': true, 'QUẢN LÝ DỰ ÁN': true, 'CHỈ HUY TRƯỞNG': true, 'KỸ SƯ': true, 'KẾ TOÁN': false, 'ĐỘI TRƯỞNG': false, 'CÔNG NHÂN': false },
    DIARY: { ADMIN: true, 'GIÁM ĐỐC': true, 'QUẢN LÝ DỰ ÁN': true, 'CHỈ HUY TRƯỞNG': true, 'KỸ SƯ': true, 'KẾ TOÁN': false, 'ĐỘI TRƯỞNG': true, 'CÔNG NHÂN': false },
    ATTENDANCE: { ADMIN: true, 'GIÁM ĐỐC': true, 'QUẢN LÝ DỰ ÁN': true, 'CHỈ HUY TRƯỞNG': true, 'KỸ SƯ': false, 'KẾ TOÁN': true, 'ĐỘI TRƯỞNG': true, 'CÔNG NHÂN': false },
    MATERIAL: { ADMIN: true, 'GIÁM ĐỐC': true, 'QUẢN LÝ DỰ ÁN': true, 'CHỈ HUY TRƯỞNG': true, 'KỸ SƯ': true, 'KẾ TOÁN': true, 'ĐỘI TRƯỞNG': false, 'CÔNG NHÂN': false },
    SYSTEM: { ADMIN: true, 'GIÁM ĐỐC': false, 'QUẢN LÝ DỰ ÁN': false, 'CHỈ HUY TRƯỞNG': false, 'KỸ SƯ': false, 'KẾ TOÁN': false, 'ĐỘI TRƯỞNG': false, 'CÔNG NHÂN': false },
  });

  const toggleCheckbox = (moduleId: string, roleName: string) => {
    setMatrixState((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [roleName]: !prev[moduleId]?.[roleName],
      },
    }));
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleReset = () => {
    // Basic reset
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 overflow-y-auto max-w-[1600px] mx-auto select-none relative"
    >
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 border border-emerald-400 font-bold text-xs animate-bounce">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Cập nhật Ma trận Phân quyền thành công! Hệ thống đã ghi nhận các thay đổi.</span>
        </div>
      )}

      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            Ma trận Phân quyền
            <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
              SECURITY AUDIT
            </span>
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Thiết lập vai trò nội bộ và phân chia đặc quyền tương tác của từng bộ phận nhân sự công trình.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 px-3 py-2 rounded-xl border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Khôi phục mẫu</span>
          </button>
          <button
            onClick={handleSave}
            className="text-xs bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/10"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Lưu cấu hình quyền</span>
          </button>
        </div>
      </div>

      {/* Control Category Tabs & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-950/40 p-4 rounded-xl border border-neutral-850">
        <div className="flex space-x-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800 self-start sm:self-auto">
          <button
            onClick={() => setPermissionType('read')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              permissionType === 'read' ? 'bg-amber-500 text-black shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Quyền xem (Read)
          </button>
          <button
            onClick={() => setPermissionType('write')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              permissionType === 'write' ? 'bg-amber-500 text-black shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Quyền sửa (Write)
          </button>
          <button
            onClick={() => setPermissionType('delete')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              permissionType === 'delete' ? 'bg-amber-500 text-black shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Quyền xóa (Delete)
          </button>
        </div>

        <div className="flex items-center space-x-4 text-[10px] font-bold text-neutral-400 font-mono">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 bg-neutral-850 border border-neutral-750 flex items-center justify-center text-emerald-400 font-bold rounded">
              ✓
            </div>
            <span>Được phép</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 bg-neutral-900 border border-neutral-800 rounded" />
            <span>Chặn truy cập</span>
          </div>
        </div>
      </div>

      {/* Main Grid Matrix Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-850 bg-neutral-950/60">
                <th className="py-4 px-6 text-left text-neutral-400 text-xs font-bold uppercase tracking-wider font-display">
                  Phân hệ chức năng
                </th>
                {roles.map((r, index) => (
                  <th
                    key={index}
                    className="py-4 px-3 text-center text-neutral-300 text-[10px] font-bold uppercase tracking-wider font-mono border-l border-neutral-850/60 min-w-[110px]"
                  >
                    {r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850/60">
              {modules.map((m) => (
                <tr key={m.id} className="hover:bg-neutral-850/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2.5">
                      <KeySquare className="w-4 h-4 text-amber-500 shrink-0" />
                      <div className="font-bold text-xs text-neutral-200 tracking-wide">
                        {m.label}
                      </div>
                    </div>
                  </td>

                  {roles.map((role, idx) => {
                    const isChecked = matrixState[m.id]?.[role] ?? false;
                    return (
                      <td
                        key={idx}
                        className="py-4 px-3 border-l border-neutral-850/60 text-center"
                      >
                        <div className="flex justify-center">
                          <label className="relative flex items-center justify-center p-1 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleCheckbox(m.id, role)}
                              className="sr-only"
                            />
                            {/* Visual toggle custom square */}
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all duration-200 ${
                                isChecked
                                  ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-extrabold shadow-sm'
                                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-transparent'
                              }`}
                            >
                              {isChecked && '✓'}
                            </div>
                          </label>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advisory section at bottom */}
      <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl mt-0.5 shrink-0">
            <Shield className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Chính sách bảo mật dữ liệu công trình</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed max-w-2xl">
              Quyền hạn cấp phát tại đây sẽ trực tiếp điều chỉnh phạm vi hành vi khả dụng trong API Gateway nội bộ của ERP. Mọi lượt truy cập bất thường của vai trò không đủ đặc quyền sẽ kích hoạt mã phản hồi <strong className="text-red-400">403 Forbidden</strong> và gửi cảnh báo trực tiếp về trung tâm bảo mật Admin.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-850 text-[10px] font-semibold text-neutral-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Tìm hiểu về cơ chế Audit Logs</span>
        </div>
      </div>
    </motion.div>
  );
}
