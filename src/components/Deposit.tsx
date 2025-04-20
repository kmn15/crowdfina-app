import React, { useState } from 'react';
import { Wallet, History, Copy, CheckCircle2 } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import Notification from './Notification';

interface DepositHistory {
  id: number;
  amount: string;
  method: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  txId: string;
}

export default function Deposit() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'history'>('deposit');
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const depositMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'card', name: 'Credit Card', icon: '💳' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿' }
  ];

  const depositHistory: DepositHistory[] = [
    {
      id: 1,
      amount: '$10,000.00',
      method: 'Bank Transfer',
      date: '2024-03-15',
      status: 'Completed',
      txId: 'TX123456789'
    },
    {
      id: 2,
      amount: '$5,000.00',
      method: 'Credit Card',
      date: '2024-03-10',
      status: 'Completed',
      txId: 'TX987654321'
    },
    {
      id: 3,
      amount: '$2,000.00',
      method: 'Cryptocurrency',
      date: '2024-03-05',
      status: 'Pending',
      txId: 'TX543216789'
    },
    {
      id: 4,
      amount: '$3,000.00',
      method: 'Bank Transfer',
      date: '2024-03-01',
      status: 'Completed',
      txId: 'TX111222333'
    },
    {
      id: 5,
      amount: '$7,000.00',
      method: 'Credit Card',
      date: '2024-02-28',
      status: 'Failed',
      txId: 'TX444555666'
    },
    {
      id: 6,
      amount: '$4,500.00',
      method: 'Cryptocurrency',
      date: '2024-02-25',
      status: 'Completed',
      txId: 'TX777888999'
    }
  ];

  const totalPages = Math.ceil(depositHistory.length / itemsPerPage);
  const paginatedHistory = depositHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Deposit:', { amount, selectedMethod });
      setNotification({
        type: 'success',
        message: 'Deposit initiated successfully!'
      });
      setAmount('');
      setSelectedMethod('');
    } catch {
      setNotification({
        type: 'error',
        message: 'Failed to process deposit. Please try again.'
      });
    }
  };

  const getStatusColor = (status: DepositHistory['status']) => {
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deposit</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Add funds to your investment account</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'deposit'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
              }`}
            >
              <Wallet className="h-5 w-5" />
              <span>Make Deposit</span>
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
              <span>Deposit History</span>
            </button>
          </div>

          {/* Deposit Form */}
          {activeTab === 'deposit' && (
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
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {depositMethods.map((method) => (
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

                {selectedMethod && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Payment Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Account Number</span>
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-white dark:bg-gray-800 px-2 py-1 rounded dark:text-white">1234567890</code>
                          <button
                            type="button"
                            onClick={() => handleCopy('1234567890')}
                            className="text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                          >
                            {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Bank Name</span>
                        <span className="text-sm text-gray-900 dark:text-white">Example Bank</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!amount || !selectedMethod}
                  className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed with Deposit
                </button>
              </form>
            </div>
          )}

          {/* Deposit History */}
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
                    {paginatedHistory.map((deposit) => (
                      <tr key={deposit.id}>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{deposit.date}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{deposit.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{deposit.method}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded dark:text-white">{deposit.txId}</code>
                            <button
                              onClick={() => handleCopy(deposit.txId)}
                              className="text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deposit.status)}`}>
                            {deposit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t dark:border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, depositHistory.length)} of {depositHistory.length} entries
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