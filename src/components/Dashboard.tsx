import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  History,
  Wallet,
  ArrowRight,
  Users,
  Settings,
  Lock,
  Shield,
  LogOut
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import DashboardSidebar from './DashboardSidebar';
import MonthyGainGauge from './MonthyGainGauge';

export default function Dashboard() {
  const { t } = useTranslation();
  const location = useLocation();

  const stats = [
    { label: t('dashboard.stats.balance'), value: '$20,250.00', icon: <Wallet className="h-6 w-6" /> },
    { label: t('dashboard.stats.totalDeposit'), value: '$101,150.00', icon: <ArrowRight className="h-6 w-6" /> },
    { label: t('dashboard.stats.totalWithdraw'), value: '$0.00', icon: <ArrowRight className="h-6 w-6 rotate-180" /> },
    { label: t('dashboard.stats.totalInvestment'), value: '$80,800.00', icon: <Package className="h-6 w-6" /> },
    { label: t('dashboard.stats.totalProfit'), value: '$0.00', icon: <History className="h-6 w-6" /> },
    { label: t('dashboard.stats.totalInvestedProperty'), value: '7', icon: <Package className="h-6 w-6" /> },
    { label: t('dashboard.stats.myReferrals'), value: '1', icon: <Users className="h-6 w-6" /> },
    { label: t('dashboard.stats.totalTicket'), value: '1', icon: <Package className="h-6 w-6" /> }
  ];

  const nextInstallment = {
    property: 'Luxury Penthouse',
    amount: '$1,000.00',
    date: '2024-07-11',
    status: t('dashboard.nextInstallment.statuses.due')
  };

  const nextProfit = {
    property: 'Luxury Condominiums',
    amount: '$0.00',
    date: '2024-05-30',
    daysFromNow: 2
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="pl-64">
        <main className="p-8 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                        <div className="text-orange-500">
                          {stat.icon}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <MonthyGainGauge />
            </div>
          </div>

          {/* Next Installment */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('dashboard.nextInstallment.title')}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('dashboard.nextInstallment.property')}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('dashboard.nextInstallment.amount')}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('dashboard.nextInstallment.date')}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('dashboard.nextInstallment.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('dashboard.nextInstallment.action')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{nextInstallment.property}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{nextInstallment.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{nextInstallment.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                        {nextInstallment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
                        {t('dashboard.nextInstallment.payNow')}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Next Profit Schedule */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('dashboard.nextProfit.title')}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('dashboard.nextProfit.property')}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('dashboard.nextProfit.totalProfit')}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('dashboard.nextProfit.nextDate')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{nextProfit.property}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{nextProfit.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {nextProfit.date}
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        ({nextProfit.daysFromNow} {t('dashboard.nextProfit.daysFromNow')})
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 