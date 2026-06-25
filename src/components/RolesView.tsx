import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, KeySquare, Edit, Plus, ChevronRight, HelpCircle } from 'lucide-react';

export default function RolesView() {
  const roles = [
    {
      id: 'PM',
      name: 'QUẢN LÝ DỰ ÁN',
      usersCount: 3,
      permissionsCount: 42,
      description: 'Toàn quyền điều phối dòng tiền, nhân sự hiện trường và ký kết đơn hàng vật tư sỉ.',
    },
    {
      id: 'AC',
      name: 'KẾ TOÁN CÔNG TRÌNH',
      usersCount: 5,
      permissionsCount: 12,
      description: 'Đối soát sổ phụ ngân hàng, duyệt chứng từ chi, lập báo cáo dòng tiền và quyết toán thuế.',
    },
    {
      id: 'SV',
      name: 'GIÁM SÁT CÔNG TRÌNH',
      usersCount: 14,
      permissionsCount: 8,
      description: 'Theo dõi tiến độ, khai báo biên bản nghiệm thu hạng mục, kiểm tra an toàn lao động HSE.',
    },
    {
      id: 'WH',
      name: 'THỦ KHO DỰ ÁN',
      usersCount: 8,
      permissionsCount: 6,
      description: 'Khai báo phiếu nhập/xuất kho vật tư, kiểm kê thực tế định mức an toàn định kỳ.',
    },
  ];

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
            Vai trò & Quyền hạn
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Thiết lập danh mục chức vụ cơ bản và quản lý nhanh số lượng quyền hạn gán trực tiếp.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/10">
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm vai trò mới</span>
          </button>
        </div>
      </div>

      {/* Grid roles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {roles.map((r, idx) => (
          <div
            key={r.id}
            className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between h-[230px] group hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold text-amber-500 tracking-wider">
                  ROLE CODE: {r.id}
                </span>
                <ShieldCheck className="w-5 h-5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
              </div>

              <h3 className="text-sm font-bold text-white mt-3 font-display tracking-tight">
                {r.name}
              </h3>
              <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                {r.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-850/60 flex items-center justify-between z-10">
              <div className="flex space-x-3 text-[10px] font-bold text-neutral-400 font-mono">
                <span className="flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{r.usersCount} users</span>
                </span>
                <span className="flex items-center space-x-1">
                  <KeySquare className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{r.permissionsCount} rights</span>
                </span>
              </div>

              <button className="text-[10px] bg-neutral-800 hover:bg-amber-500 hover:text-black text-neutral-300 px-2.5 py-1.5 rounded-lg font-bold border border-neutral-750 hover:border-transparent transition-all flex items-center gap-1 cursor-pointer">
                <Edit className="w-3 h-3" />
                <span>Sửa quyền</span>
              </button>
            </div>

            {/* Absolute visual touch */}
            <div className="absolute right-[-20px] bottom-[-20px] text-neutral-950 text-9xl font-black font-display pointer-events-none opacity-50">
              {r.id}
            </div>
          </div>
        ))}
      </div>

      {/* Security note */}
      <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-1.5 bg-neutral-950 text-amber-400 border border-neutral-850 rounded-lg shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Bạn cần gia hạn danh mục phân vai đặc thù?</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Hệ thống ERP hỗ trợ cấp phát tối đa 64 vai trò tùy biến để ngăn chặn chồng chéo nhiệm vụ thực tế tại công trường.
            </p>
          </div>
        </div>
        <button className="text-xs bg-neutral-800 hover:bg-neutral-750 text-white px-3.5 py-2 rounded-xl border border-neutral-750 transition-colors shrink-0 font-semibold cursor-pointer flex items-center gap-1">
          <span>Xem tài liệu bảo mật</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
