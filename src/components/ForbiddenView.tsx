import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowLeft, Key, Lock, CheckCircle } from 'lucide-react';

interface ForbiddenViewProps {
  onBackToHome: () => void;
}

export default function ForbiddenView({ onBackToHome }: ForbiddenViewProps) {
  const [isRequested, setIsRequested] = useState(false);

  const handleRequestAccess = () => {
    setIsRequested(true);
    setTimeout(() => {
      setIsRequested(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center select-none bg-neutral-950"
    >
      {/* Toast banner for request success */}
      {isRequested && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-black px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 border border-amber-400 font-bold text-xs animate-bounce">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Yêu cầu mở khóa phân hệ "Công trình (Bản đồ)" đã được chuyển tới Admin hệ thống!</span>
        </div>
      )}

      {/* Warning Orb Visual */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl w-44 h-44 -translate-x-1/4 -translate-y-1/4" />
        <div className="relative w-32 h-32 mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl flex items-center justify-center shadow-2xl">
          <Lock className="w-14 h-14 text-red-500 animate-pulse" />
          <div className="absolute bottom-[-10px] right-[-10px] bg-red-500 text-black p-2 rounded-xl shadow-md border-2 border-neutral-950">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Error detail */}
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
            MÃ LỖI: 403 FORBIDDEN
          </span>
          <h2 className="text-2xl font-display font-extrabold text-white tracking-tight mt-4">
            Truy cập bị từ chối
          </h2>
          <p className="text-neutral-400 text-xs mt-2 leading-relaxed">
            Bạn không có đặc quyền truy cập phân hệ <strong className="text-white font-semibold">Công trình (Bản đồ)</strong> trên môi trường sản xuất. Chức năng này yêu cầu định danh vai trò <strong>Chỉ huy trưởng</strong> hoặc <strong>Giám đốc</strong>.
          </p>
        </div>

        {/* Current user photo bubble */}
        <div className="flex items-center justify-center space-x-3 bg-neutral-900/60 p-3 rounded-xl border border-neutral-850 w-fit mx-auto">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBSE50IWWRzs5NG0xNDmn0VgiXaj-epORunfOheLV4mPIE4sjV5sL1AJyioUN3scwdK8wMmAg1spVp6s6VVkA6k-FrPz-aahOOCduf3ttKpk5_kFqN5uEjhcq8p8wZdfaRAs6P8vJ85RVcqgm-H74qYD-4-HJvQEr4CMFDStkYcB4uncQkDZVb9TBG2Z4cLb5baKz8a4s2ozXeuYIu8wTDMlE6YO7M6lWIY4cuU1Fz3ykfFJOBWFhJ973S0noFyu38CVqukeC-GeY"
            alt="Current User headshot experiencing 403"
            className="w-8 h-8 rounded-full border border-neutral-800 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <div className="text-[10px] font-bold text-white">Trần Anh Tuấn</div>
            <div className="text-[9px] text-neutral-500">Vai trò hiện tại: Kỹ sư Hiện trường / Guest Admin</div>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-200 px-5 py-2.5 rounded-xl border border-neutral-800 transition-colors flex items-center justify-center gap-2 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </button>
          <button
            onClick={handleRequestAccess}
            className="w-full sm:w-auto text-xs bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Key className="w-4 h-4" />
            <span>Gửi yêu cầu quyền</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
