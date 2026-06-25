import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Building2, ShieldCheck, Cpu, Wallet, ClipboardCheck, Warehouse } from 'lucide-react';
import { SimulatedRoleType } from '../types';

interface LoginViewProps {
  onLoginSuccess: (role: SimulatedRoleType) => void;
}

const ROLE_TEMPLATES = [
  {
    id: 'admin' as SimulatedRoleType,
    label: 'Super Admin',
    desc: 'Toàn quyền quản trị',
    email: 'admin@aierp.vn',
    password: 'password123',
    icon: ShieldCheck,
    activeColor: 'border-amber-500 bg-amber-500/10 text-amber-400 ring-2 ring-amber-500/20'
  },
  {
    id: 'ac' as SimulatedRoleType,
    label: 'Kế toán (AC)',
    desc: 'Ngân sách & Vật tư',
    email: 'ketoan@aierp.vn',
    password: 'password123',
    icon: Wallet,
    activeColor: 'border-blue-500 bg-blue-500/10 text-blue-400 ring-2 ring-blue-500/20'
  },
  {
    id: 'sv' as SimulatedRoleType,
    label: 'Giám sát (SV)',
    desc: 'Nhật ký & Chấm công',
    email: 'giamsat@aierp.vn',
    password: 'password123',
    icon: ClipboardCheck,
    activeColor: 'border-emerald-500 bg-emerald-500/10 text-emerald-400 ring-2 ring-emerald-500/20'
  },
  {
    id: 'wh' as SimulatedRoleType,
    label: 'Thủ kho (WH)',
    desc: 'Vật tư & Kho bãi',
    email: 'thukho@aierp.vn',
    password: 'password123',
    icon: Warehouse,
    activeColor: 'border-purple-500 bg-purple-500/10 text-purple-400 ring-2 ring-purple-500/20'
  }
];

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<SimulatedRoleType>('admin');
  const [email, setEmail] = useState('admin@aierp.vn');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (roleId: SimulatedRoleType) => {
    const template = ROLE_TEMPLATES.find(r => r.id === roleId);
    if (template) {
      setSelectedRole(roleId);
      setEmail(template.email);
      setPassword(template.password);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading for realistic premium transition
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 1200);
  };


  return (
    <div id="login-container" className="min-h-screen flex bg-neutral-900 text-neutral-100 font-sans">
      {/* Left side: Premium Image Banner with overlays */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-950">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5eLW9C5YFRRCo83-t0YUDDdYw_AWwjBsHM6UzkzbuocpJu3XMdH8S5jmisTlB2MbLjTJQ3jFPeySv2Jftlzy75MGj6aZnwFBwy_1iK05G_NBDtsvCkOObvcWoxU1s_kRMlAIh8WirXrujrACZziUrh_k18TpsBys_EWi5RjrBrRP8PhE0aaJzQjwavJ09-rFG0XGRxvRaE8ERCa8xE83DCM2QWrCh2chtoUx6ob_LOmgr_SVLZhQHbBRom1ThdW_MQ9fs44BlvZY"
          alt="Construction site"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 filter brightness-90 saturate-75"
          referrerPolicy="no-referrer"
        />
        {/* Dark linear gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/20" />

        {/* Floating tech accents */}
        <div className="absolute top-12 left-12 flex items-center space-x-3 bg-neutral-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800">
          <Cpu className="w-5 h-5 text-amber-500 animate-pulse" />
          <span className="font-display font-medium text-xs tracking-wider text-neutral-300">AI CORE ENGINE v2.0.4</span>
        </div>

        {/* Lower promotional content */}
        <div className="absolute bottom-16 left-16 right-16 z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl xl:text-5xl font-display font-bold leading-tight text-white tracking-tight">
              Xây dựng tương lai <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-transparent">
                bằng trí tuệ nhân tạo.
              </span>
            </h1>
            <p className="text-neutral-300 text-sm xl:text-base leading-relaxed max-w-lg">
              Nền tảng quản lý công trình thông minh, tối ưu hóa tiến độ và chất lượng cho mọi quy mô dự án. Tự động hóa kiểm soát chi phí & phân phối nguồn lực tức thời.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-800/60">
            <div>
              <div className="text-2xl font-display font-bold text-amber-400">98.4%</div>
              <div className="text-xs text-neutral-400">Độ chính xác AI</div>
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-amber-400">30%</div>
              <div className="text-xs text-neutral-400">Tiết kiệm chi phí</div>
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-amber-400">24/7</div>
              <div className="text-xs text-neutral-400">Báo cáo thời gian thực</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-16 md:px-24 xl:px-36 bg-neutral-950 relative">
        <div className="absolute top-12 right-12 text-xs text-neutral-400 font-mono hidden sm:block">
          SECURE CONNECTED • SSL 256-BIT
        </div>

        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/20 text-black">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-wider bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                AI CONSTRUCTION ERP
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">Đăng nhập hệ thống</h2>
              <p className="text-neutral-400 text-xs mt-1">Chào mừng bạn quay lại. Vui lòng đăng nhập để tiếp tục quản trị dự án.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Simulated Role Selector */}
            <div className="space-y-2 pb-3 border-b border-neutral-900">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Vai trò trải nghiệm hệ thống
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ROLE_TEMPLATES.map((tpl) => {
                  const Icon = tpl.icon;
                  const isSelected = selectedRole === tpl.id;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleRoleSelect(tpl.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                        isSelected
                          ? tpl.activeColor
                          : 'border-neutral-850 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-800 text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                          {tpl.label}
                        </span>
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? '' : 'text-neutral-500'}`} />
                      </div>
                      <span className="text-[9px] text-neutral-500 leading-tight line-clamp-2">
                        {tpl.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email-input" className="text-xs font-medium text-neutral-300 block">
                Email công việc
              </label>
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-neutral-600"
                placeholder="admin@aierp.vn"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password-input" className="text-xs font-medium text-neutral-300 block">
                  Mật khẩu
                </label>
                <a href="#forgot" className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-neutral-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  id="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-amber-500 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                />
                <span className="text-xs text-neutral-400">Ghi nhớ đăng nhập</span>
              </label>
              <div className="flex items-center text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                <span>AI Core v2.0.4</span>
              </div>
            </div>

            <button
              type="submit"
              id="btn-login-submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-sm py-3 px-4 rounded-xl shadow-lg shadow-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all cursor-pointer flex justify-center items-center"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Đang kết nối...</span>
                </div>
              ) : (
                'Đăng nhập hệ thống'
              )}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-neutral-900">
            <span className="text-xs text-neutral-500">
              Yêu cầu tài khoản mới?{' '}
              <a href="#register" className="text-amber-400 hover:text-amber-300 font-medium">
                Gửi yêu cầu cấp tài khoản
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
