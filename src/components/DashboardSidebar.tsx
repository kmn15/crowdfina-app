import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LifeBuoy, 
  History, 
  LineChart, 
  Upload, 
  Users, 
  Settings, 
  KeyRound, 
  Shield, 
  LogOut,
  Download,
  ArrowLeftRight
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/logout');
    }
  };

  const sidebarLinks = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: t('dashboard.sidebar.dashboard'), path: '/dashboard' },
    { icon: <LineChart className="h-5 w-5" />, label: t('dashboard.sidebar.myInvestments'), path: '/investments' },
    { icon: <History className="h-5 w-5" />, label: t('dashboard.sidebar.profitHistory'), path: '/profit-history' },
    { icon: <Download className="h-5 w-5" />, label: t('dashboard.sidebar.deposit'), path: '/deposit' },
    { icon: <Upload className="h-5 w-5" />, label: t('dashboard.sidebar.withdraw'), path: '/withdraw' },
    { icon: <ArrowLeftRight className="h-5 w-5" />, label: t('dashboard.sidebar.transactions'), path: '/transactions' },
    { icon: <Users className="h-5 w-5" />, label: t('dashboard.sidebar.manageReferral'), path: '/referrals' },
    { icon: <LifeBuoy className="h-5 w-5" />, label: t('dashboard.sidebar.supportTicket'), path: '/support' },
    { icon: <Settings className="h-5 w-5" />, label: t('dashboard.sidebar.profileSettings'), path: '/settings' },
    { icon: <KeyRound className="h-5 w-5" />, label: t('dashboard.sidebar.changePassword'), path: '/change-password' },
    { icon: <Shield className="h-5 w-5" />, label: t('dashboard.sidebar.twoFactorAuth'), path: '/2fa' }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm fixed top-16 bottom-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-orange-500" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.title')}
          </span>
        </Link>
      </div>
      <nav className="p-4 space-y-1">
        {sidebarLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === link.path
                ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-500'
                : 'text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500 dark:hover:text-orange-500'
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
        
        {/* Separate logout button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-5 w-5" />
          <span>{t('dashboard.sidebar.logout')}</span>
        </button>
      </nav>
    </aside>
  );
} 