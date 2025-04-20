import React from 'react';
import { Eye, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

export default function MyInvestments() {
  const investments = [
    {
      id: 1,
      property: 'Luxury Penthouse',
      investedAmount: '$60,000.00',
      dueAmount: '$6,000.00',
      status: 'Running',
      profit: '$0.00'
    },
    {
      id: 2,
      property: 'Signature Spires',
      investedAmount: '$20,000.00',
      dueAmount: '$0.00',
      status: 'Completed',
      profit: '$2,400.00'
    },
    {
      id: 3,
      property: 'Iconic Victorian',
      investedAmount: '$4,000.00',
      dueAmount: '$0.00',
      status: 'Completed',
      profit: '$480.00'
    },
    {
      id: 4,
      property: 'Signature Spires',
      investedAmount: '$20,000.00',
      dueAmount: '$0.00',
      status: 'Completed',
      profit: '$2,400.00'
    },
    {
      id: 5,
      property: 'Luxury Condominiums',
      investedAmount: '$12,000.00',
      dueAmount: '$1,200.00',
      status: 'Running',
      profit: '$0.00'
    },
    {
      id: 6,
      property: 'Infinity Gardens',
      investedAmount: '$10,000.00',
      dueAmount: '$0.00',
      status: 'Completed',
      profit: '$1,200.00'
    },
    {
      id: 7,
      property: 'Luxury Condominiums',
      investedAmount: '$12,000.00',
      dueAmount: '$0.00',
      status: 'Completed',
      profit: '$1,440.00'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="pl-64">
        <main className="p-8 pt-24">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Investments</h1>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Completed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Running</span>
              </div>
            </div>
          </div>

          {/* Investments Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Property</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Invested Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Due Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Profit</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {investments.map((investment) => (
                    <tr key={investment.id}>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        <Link 
                          to={`/properties/${investment.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-orange-500 dark:text-white"
                        >
                          {investment.property}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {investment.investedAmount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {investment.dueAmount}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          investment.status === 'Completed'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                        }`}>
                          {investment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {investment.profit}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/properties/${investment.id}`}
                            className="p-1 text-gray-400 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-300"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          {investment.dueAmount !== '$0.00' && (
                            <button
                              className="p-1 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                              title="Payment Due"
                            >
                              <AlertCircle className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 