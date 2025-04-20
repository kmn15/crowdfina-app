import React, { useState } from 'react';
import { Users, Copy, Gift, DollarSign, UserPlus, User } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import Notification from './Notification';

interface Referral {
  id: number;
  name: string;
  email: string;
  date: string;
  status: 'Active' | 'Pending';
  investments: number;
  commission: string;
}

export default function Referrals() {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [referralLink] = useState('https://crowdfina.com/ref/123456');

  interface StatItem {
    title: string;
    value: string;
    icon: React.ReactNode;
    change: string;
    status?: 'increase' | 'decrease';
  }

  const stats: StatItem[] = [
    {
      title: 'Total Referrals',
      value: '12',
      icon: <Users className="h-6 w-6 text-gray-500 dark:text-gray-200" />,
      change: '+2 this month'
    },
    {
      title: 'Active Investors',
      value: '8',
      icon: <UserPlus className="h-6 w-6 text-gray-500 dark:text-gray-200" />,
      change: '66% conversion'
    },
    {
      title: 'Total Commission',
      value: '$1,240.00',
      icon: <DollarSign className="h-6 w-6 text-gray-500 dark:text-gray-200" />,
      change: '+$320 this month'
    },
    {
      title: 'Commission Rate',
      value: '5%',
      icon: <Gift className="h-6 w-6 text-gray-500 dark:text-gray-200" />,
      change: 'Per investment'
    }
  ];

  const referrals: Referral[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      date: '2024-03-15',
      status: 'Active',
      investments: 3,
      commission: '$450.00'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      date: '2024-03-10',
      status: 'Active',
      investments: 2,
      commission: '$280.00'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      date: '2024-03-05',
      status: 'Pending',
      investments: 0,
      commission: '$0.00'
    }
  ];

  const handleCopyClick = () => {
    navigator.clipboard.writeText(referralLink);
    setNotification({
      type: 'success',
      message: 'Referral link copied to clipboard!'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="pl-64">
        <main className="p-8 pt-24">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Referrals</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Share your referral link and earn rewards</p>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
                <div className={`flex items-center ${item.status === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  <span>{item.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Referral Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Referral Link</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="w-full pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  onClick={handleCopyClick}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleCopyClick}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Share Link
              </button>
            </div>
          </div>

          {/* Referral History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Referral History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">User</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Investments</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {referrals.map((referral) => (
                    <tr key={referral.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{referral.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{referral.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{referral.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          referral.status === 'Active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : referral.status === 'Pending'
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{referral.investments}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{referral.commission}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How it Works */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">1. Share Your Link</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Share your unique referral link with friends and colleagues</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">2. They Invest</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">When they sign up and make their first investment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">3. Earn Commission</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive 5% commission on their investment amount</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 