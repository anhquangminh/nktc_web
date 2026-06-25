import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Clock,
  Package,
  Wallet,
  Building,
  KeySquare,
  UsersRound,
  ShieldAlert,
  LogOut,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileText,
  Lock,
} from 'lucide-react';

import { ViewType, SimulatedRoleType, SIMULATED_USERS, ROLE_ALLOWED_VIEWS } from '../types';

interface SidebarProps {
  currentView: ViewType;
  simulatedRole: SimulatedRoleType;
  onSimulatedRoleChange: (role: SimulatedRoleType) => void;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
}

export default function Sidebar({ currentView, simulatedRole, onSimulatedRoleChange, onViewChange, onLogout }: SidebarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const currentUser = SIMULATED_USERS[simulatedRole];
  const allowedViews = ROLE_ALLOWED_VIEWS[simulatedRole];

  const categories = [
    {
      title: 'Giám sát & Tiến độ',
      items: [
        { id: 'overview' as ViewType, label: 'Tổng quan hệ thống', icon: LayoutDashboard },
        { id: 'construction-log' as ViewType, label: 'Nhật ký & Tiến độ', icon: FileText },
        { id: 'forbidden' as ViewType, label: 'Công trình (Bản đồ)', icon: Building },
      ],
    },
    {
      title: 'Vật tư & Tài chính',
      items: [
        { id: 'inventory' as ViewType, label: 'Vật tư & Kho bãi', icon: Package },
        { id: 'budget' as ViewType, label: 'Ngân sách & Chi phí', icon: Wallet },
      ],
    },
    {
      title: 'Lực lượng thi công',
      items: [
        { id: 'personnel' as ViewType, label: 'Quản lý Nhân sự', icon: Users },
        { id: 'attendance' as ViewType, label: 'Bảng Chấm công', icon: Clock },
      ],
    },
  ];

  const settingItems = [
    { id: 'matrix' as ViewType, label: 'Ma trận Phân quyền', icon: KeySquare },
    { id: 'users' as ViewType, label: 'Quản lý Người dùng', icon: UsersRound },
    { id: 'roles' as ViewType, label: 'Vai trò & Quyền hạn', icon: ShieldCheck },
  ];

  const handleItemClick = (viewId: ViewType) => {
    // If the view is 'forbidden', let it go to show forbidden demo page
    if (viewId === 'forbidden') {
      onViewChange('forbidden');
      return;
    }
    
    // Otherwise, check simulated role permissions
    const isAllowed = allowedViews.includes(viewId);
    if (isAllowed) {
      onViewChange(viewId);
    } else {
      onViewChange('forbidden');
    }
  };

  return (
    <aside id="sidebar" className="w-64 h-full bg-neutral-900 border-r border-neutral-800 flex flex-col text-neutral-300 select-none">
      {/* Brand Logo */}
      <div className="p-5 border-b border-neutral-800 flex items-center space-x-3 bg-neutral-950/40">
        <div className="p-2 bg-amber-500 rounded-lg text-black shadow-md shadow-amber-500/10">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-black text-white text-sm tracking-widest leading-none">
            AI CONSTRUCTION
          </span>
          <span className="text-[10px] text-amber-500 font-bold mt-1 tracking-wider uppercase">
            ERP CORE V2
          </span>
        </div>
      </div>


      {/* Main Navigation Scroll Area */}
      <nav className="flex-1 px-4 py-2 space-y-4 overflow-y-auto scrollbar-none">
        
        {categories.map((category) => (
          <div key={category.title} className="space-y-1">
            <div className="text-[9px] font-bold text-neutral-500 tracking-wider uppercase px-3 mb-1.5">
              {category.title}
            </div>
            
            {category.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              // If the view is specifically 'forbidden', simulate locked view check for roles other than admin
              const isAllowed = item.id === 'forbidden' ? (simulatedRole === 'admin') : allowedViews.includes(item.id);
              
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer group ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/10 font-semibold'
                      : 'hover:bg-neutral-800 hover:text-white text-neutral-400'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : isAllowed ? 'text-neutral-500 group-hover:text-neutral-300' : 'text-neutral-600'}`} />
                    <span className={`truncate ${!isAllowed && 'text-neutral-500 line-through decoration-neutral-700'}`}>
                      {item.label}
                    </span>
                  </div>
                  
                  {!isAllowed && (
                    <Lock className="w-3 h-3 text-red-500/70" />
                  )}
                  {item.id === 'forbidden' && isAllowed && (
                    <span className="text-[9px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold ml-auto font-mono shrink-0">
                      MAP
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Cấu hình / Settings Accordion */}
        <div className="pt-2 border-t border-neutral-850/60">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-neutral-500 tracking-wider uppercase hover:text-neutral-300 transition-colors cursor-pointer"
          >
            <span>CẤU HÌNH & BẢO MẬT</span>
            {isSettingsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {isSettingsOpen && (
            <div className="mt-1.5 space-y-1 pl-1">
              {settingItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                const isAllowed = allowedViews.includes(item.id);
                
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-neutral-800 text-amber-400 font-semibold border-l-2 border-amber-500 rounded-l-none pl-2.5'
                        : 'hover:bg-neutral-800/60 hover:text-white text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400' : isAllowed ? 'text-neutral-500' : 'text-neutral-600'}`} />
                      <span className={`truncate ${!isAllowed && 'text-neutral-500 line-through decoration-neutral-700'}`}>
                        {item.label}
                      </span>
                    </div>
                    {!isAllowed && (
                      <Lock className="w-3 h-3 text-red-500/60" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* User Info / Logout Button at Footer */}
      <div className="p-4 border-t border-neutral-800 bg-neutral-950/20">
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-neutral-700 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-neutral-900" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-white truncate">{currentUser.name}</h4>
            <p className="text-[10px] text-neutral-500 font-mono truncate uppercase">{currentUser.label}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          id="btn-logout"
          className="w-full flex items-center justify-center space-x-2 bg-neutral-800/40 hover:bg-red-500/10 hover:text-red-400 text-neutral-400 text-xs py-2 px-3 rounded-lg border border-neutral-800 hover:border-red-500/20 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng xuất hệ thống</span>
        </button>
      </div>
    </aside>
  );
}
