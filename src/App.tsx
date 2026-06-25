import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ViewType, SimulatedRoleType } from './types';
import LoginView from './components/LoginView';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewView from './components/OverviewView';
import PersonnelView from './components/PersonnelView';
import BudgetView from './components/BudgetView';
import InventoryView from './components/InventoryView';
import MatrixView from './components/MatrixView';
import UsersView from './components/UsersView';
import RolesView from './components/RolesView';
import ForbiddenView from './components/ForbiddenView';
import AttendanceView from './components/AttendanceView';
import ConstructionLogView from './components/ConstructionLogView';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [simulatedRole, setSimulatedRole] = useState<SimulatedRoleType>('admin');
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  // Apply theme to document root element
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoginSuccess = (role: SimulatedRoleType) => {
    setSimulatedRole(role);
    setIsLoggedIn(true);
    setCurrentView('overview');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };


  const renderActiveView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView />;
      case 'personnel':
        return <PersonnelView globalSearchQuery={globalSearchQuery} />;
      case 'attendance':
        return <AttendanceView globalSearchQuery={globalSearchQuery} />;
      case 'budget':
        return <BudgetView />;
      case 'inventory':
        return <InventoryView globalSearchQuery={globalSearchQuery} />;
      case 'matrix':
        return <MatrixView />;
      case 'users':
        return <UsersView />;
      case 'roles':
        return <RolesView />;
      case 'forbidden':
        return <ForbiddenView onBackToHome={() => setCurrentView('overview')} />;
      case 'construction-log':
        return <ConstructionLogView />;
      default:
        return <OverviewView />;
    }
  };

  if (!isLoggedIn) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div id="erp-app-shell" className="min-h-screen bg-neutral-950 text-neutral-100 flex overflow-hidden font-sans relative">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          id="sidebar-backdrop"
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* App Left Sidebar Container with Mobile-First Drawer behavior */}
      <div
        id="sidebar-container"
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 h-screen shrink-0`}
      >
        <Sidebar
          currentView={currentView}
          simulatedRole={simulatedRole}
          onSimulatedRoleChange={setSimulatedRole}
          onViewChange={(view) => {
            setCurrentView(view);
            setGlobalSearchQuery('');
            setIsSidebarOpen(false); // Auto-close sidebar drawer on view changes
          }}
          onLogout={handleLogout}
        />
      </div>

      {/* App Main Area (Header + Scroll View content) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <Header
          currentView={currentView}
          theme={theme}
          onToggleTheme={toggleTheme}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onViewChange={(view, query) => {
            setCurrentView(view);
            if (query !== undefined) {
              setGlobalSearchQuery(query);
            }
            setIsSidebarOpen(false); // Make sure search matches close the menu
          }}
        />

        {/* Content Panel Scroll Wrapper */}
        <main className="flex-1 overflow-y-auto bg-neutral-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="h-full"
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
