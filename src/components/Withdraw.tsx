import React, { useState } from 'react';
import { Wallet, History } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import Notification from './Notification';

interface WithdrawHistory {
  id: number;
  amount: string;
  method: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  txId: string;
}

export default function Withdraw() {
  const [activeTab, setActiveTab] = useState<'withdraw' | 'history'>('withdraw');
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const withdrawMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'card', name: 'Credit Card', icon: '💳' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿' }
  ];

  const withdrawHistory: WithdrawHistory[] = [
    {
      id: 1,
      amount: '$5,000.00',
      method: 'Bank Transfer',
      date: '2024-03-15',
      status: 'Completed',
      txId: 'WD123456789'
    },
    {
      id: 2,
      amount: '$3,000.00',
      method: 'Cryptocurrency',
      date: '2024-03-10',
      status: 'Pending',
      txId: 'WD987654321'
    }
  ];

  const totalPages = Math.ceil(withdrawHistory.length / itemsPerPage);
  const paginatedHistory = withdrawHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Withdraw:', { amount, selectedMethod });
      setNotification({
        type: 'success',
        message: 'Withdrawal request submitted successfully!'
      });
      setAmount('');
      setSelectedMethod('');
    } catch {
      setNotification({
        type: 'error',
        message: 'Failed to process withdrawal. Please try again.'
      });
    }
  };

  const getStatusColor = (status: WithdrawHistory['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'Pending':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'Failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Withdraw</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Withdraw funds from your investment account</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'withdraw'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
              }`}
            >
              <Wallet className="h-5 w-5" />
              <span>Make Withdrawal</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'history'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
              }`}
            >
              <History className="h-5 w-5" />
              <span>Withdrawal History</span>
            </button>
          </div>

          {/* Withdraw Form */}
          {activeTab === 'withdraw' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Withdrawal Method
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {withdrawMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          selectedMethod === method.id
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-400'
                        }`}
                      >
                        <span className="text-2xl mb-2">{method.icon}</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{method.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!amount || !selectedMethod}
                  className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Request Withdrawal
                </button>
              </form>
            </div>
          )}

          {/* Withdrawal History */}
          {activeTab === 'history' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Method</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Transaction ID</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedHistory.map((withdraw) => (
                      <tr key={withdraw.id}>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{withdraw.date}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{withdraw.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{withdraw.method}</td>
                        <td className="px-6 py-4 text-sm font-mono bg-gray-50 dark:bg-gray-700 rounded dark:text-white">{withdraw.txId}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(withdraw.status)}`}>
                            {withdraw.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t dark:border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, withdrawHistory.length)} of {withdrawHistory.length} entries
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded-lg text-sm ${
                        currentPage === page
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'text-gray-600 dark:text-gray-400 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 