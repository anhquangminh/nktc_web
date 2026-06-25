import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SystemUser } from '../types';
import { Search, Filter, Plus, Mail, MoreVertical, ShieldAlert, CheckCircle, Trash2, Key } from 'lucide-react';

export default function UsersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users: SystemUser[] = [
    {
      id: 'USR-001',
      name: 'Phạm Minh Đức',
      email: 'duc.pm@aiconstruction.vn',
      role: 'Admin hệ thống',
      status: 'active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0JmozNiVUZHvR9hG8OGX0tZX0QtvDtmnHmzMtPNlylizyUes7JNEzHztNDtNrqgMJtsp1nqPO1Lh__RLwvnEb6ICi6546EkIcQhj7VA_8EPlHx8KIDQfHga76rviNeytiLZNoq_c_0EPwAKXM_H5YkYmU4G2HKEG6-_6fvRbW0RVf5-fWIJELR6rPXUpEFA1Q_rLD7yrW9v-exHgJNVQXZm9h5IXKNSqxUp2b0MsTnH1VMSCG3QcCOGkFe3Jm_4fosnlFjDBsh_Q',
    },
    {
      id: 'USR-002',
      name: 'Nguyễn Văn Hùng',
      email: 'hung.nv@aiconstruction.vn',
      role: 'Quản lý dự án',
      status: 'active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1f_Dzua82vDA-GtcQ5SuusgRvt8cFJiUIn8k4OtiJLSwv_0QnbddOaKv4Xsael82ROLHkUrP4Z1f4D30JayHhAfofYCg9oZ_fWt5zoW6Z_K9KbAOqXcCZN-yh5yBJkn_XzxTm7nqiVryADerDzF7i1f1NiHLCRM01mHZbQJHWJpF1cg8ayw-nNshFidsF5frJWn5PJC12MWOqJ8Cv5EDzsuSemda_spnqJfmIT06MCS17yjNZZI1hH_T2Hc-xz6F1uHfXZFr5sy4',
    },
    {
      id: 'USR-003',
      name: 'Lê Thị Minh Anh',
      email: 'anh.ltm@aiconstruction.vn',
      role: 'Kỹ sư hiện trường',
      status: 'active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO_Im3piDMz_dKn9NxUV9CTz6dxHCn8GWPsO9GdwEbCKwz0ZD_4WR2KNNgUNffdkKzzHlpXg6ICjYjvLmW0r4s8GC6e2EupJt_jHRkmBF8FRqp65mjI8cPyr0_zNY0U8YJXOaC26x2alLPESl4xaRBK63qAC2uRVF8Lao6_VJLbFPUg9BZdeO5i5LuO1y9PR2h20XAXf9ffMuHi6wiFfQd817Q8BLRVDXbkhzlFKyvZfCfrLkyNj0f9emKH9BNdiefftpU84ES5h0',
    },
    {
      id: 'USR-004',
      name: 'Trần Thanh Phong',
      email: 'phong.tt@aiconstruction.vn',
      role: 'Kế toán công trình',
      status: 'locked',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsdJ-3XAFRWtphw6NqeTCmyifdL7s1ckuubg__8NhpqWGXJtcxZ8j2E7BMKziN8J8N384A0oB8w3KLpiW61GlSwllMMw7w7L9bDGgKz7i0eXmz7eNr9fw7hcupEj_YKyUXPALm2bzqSpSxphf9IFfHPne62E3nonhUJIUb83CaBku9Fo1zXV-tc1iIqVHE_zgj2fvFY9pAsF0skXRRA1GPIKybkzPnwZOtcJnPfG4HndBwb6MuzDQbWc4spHfs4chYTKHgIFaDoxs',
    },
  ];

  const stats = [
    { label: 'Tổng số người dùng', value: '1,248', subtext: 'Có tài khoản hoạt động', color: 'border-neutral-800' },
    { label: 'Người dùng khả dụng', value: '1,102', subtext: 'Đang hoạt động tuần này', color: 'border-emerald-500/20' },
    { label: 'Tài khoản bị khóa', value: '14', subtext: 'Yêu cầu bảo mật cấp cao', color: 'border-red-500/20' },
  ];

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
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
            Quản lý Người dùng hệ thống
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Quản trị quyền truy cập, kích hoạt, khóa tài khoản cán bộ quản lý công trình.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/10">
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm người dùng mới</span>
          </button>
        </div>
      </div>

      {/* KPI stats */}
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

      {/* Users table list */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        {/* Filters bar */}
        <div className="p-5 border-b border-neutral-850 flex flex-col sm:flex-row sm:items-center gap-4 bg-neutral-950/20">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo họ tên, email cán bộ..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-neutral-600"
            />
          </div>

          <div className="flex items-center space-x-1 bg-neutral-950 px-2 rounded-xl border border-neutral-800 self-start sm:self-auto">
            <Filter className="w-3.5 h-3.5 text-neutral-500 ml-1" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent border-none text-xs text-neutral-300 py-2 px-1 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="Admin hệ thống">Admin hệ thống</option>
              <option value="Quản lý dự án">Quản lý dự án</option>
              <option value="Kỹ sư hiện trường">Kỹ sư hiện trường</option>
              <option value="Kế toán công trình">Kế toán công trình</option>
            </select>
          </div>
        </div>

        {/* Table list data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-850 bg-neutral-950/40 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-5">Tài khoản</th>
                <th className="py-3 px-5">Mã ID</th>
                <th className="py-3 px-5">Phân quyền</th>
                <th className="py-3 px-5">Trạng thái bảo mật</th>
                <th className="py-3 px-5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-neutral-850/30 transition-colors text-xs">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center space-x-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover border border-neutral-700 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">{u.name}</div>
                        <div className="text-[10px] text-neutral-500 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-neutral-600" />
                          <span>{u.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 font-mono font-bold text-neutral-400">{u.id}</td>
                  <td className="py-3.5 px-5">
                    <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    {u.status === 'active' ? (
                      <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase">
                        Đang hoạt động
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono uppercase">
                        Tài khoản Khóa
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer">
                        <Key className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
