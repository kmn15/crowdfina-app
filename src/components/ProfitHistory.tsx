import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

interface ProfitRecord {
  id: number;
  property: string;
  amount: string;
  type: 'Profit' | 'Loss';
  date: string;
  status: 'Completed' | 'Pending';
  profitPercentage: string;
}

export default function ProfitHistory() {
  const stats = [
    {
      title: 'Total Profit',
      value: '$8,920.00',
      change: '+12.5%',
      isPositive: true
    },
    {
      title: 'Monthly Average',
      value: '$743.33',
      change: '+8.2%',
      isPositive: true
    },
    {
      title: 'Last Month',
      value: '$920.00',
      change: '-2.3%',
      isPositive: false
    },
    {
      title: 'This Month',
      value: '$1,240.00',
      change: '+15.8%',
      isPositive: true
    }
  ];

  const profitHistory: ProfitRecord[] = [
    {
      id: 1,
      property: 'Luxury Penthouse',
      amount: '$1,200.00',
      type: 'Profit',
      date: '2024-03-15',
      status: 'Completed',
      profitPercentage: '8.5%'
    },
    {
      id: 2,
      property: 'City View Apartment',
      amount: '-$300.00',
      type: 'Loss',
      date: '2024-03-10',
      status: 'Completed',
      profitPercentage: '-2.1%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="pl-64">
        <main className="p-8 pt-24">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profit History</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Track your investment returns and profit details</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-500" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm ${
                    stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                    {stat.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  </span>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Profit History Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Property</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Profit %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {profitHistory.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{record.property}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={record.type === 'Profit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {record.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.type === 'Profit'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{record.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === 'Completed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={record.profitPercentage.startsWith('-') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                        {record.profitPercentage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}