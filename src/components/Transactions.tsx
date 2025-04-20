import React, { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Search, Calendar, Filter } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

interface Transaction {
  id: number;
  type: 'Deposit' | 'Withdrawal' | 'Investment' | 'Profit';
  amount: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  description: string;
}

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedTypes, setSelectedTypes] = useState<Transaction['type'][]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Transaction['status'][]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'Deposit',
      amount: '+$10,000.00',
      date: '2024-03-15',
      status: 'Completed',
      description: 'Bank Transfer Deposit'
    },
    {
      id: 2,
      type: 'Investment',
      amount: '-$8,000.00',
      date: '2024-03-14',
      status: 'Completed',
      description: 'Investment in Luxury Penthouse'
    },
    {
      id: 3,
      type: 'Profit',
      amount: '+$600.00',
      date: '2024-03-10',
      status: 'Completed',
      description: 'Monthly Return - Signature Spires'
    },
    {
      id: 4,
      type: 'Withdrawal',
      amount: '-$2,000.00',
      date: '2024-03-05',
      status: 'Pending',
      description: 'Withdrawal Request'
    }
  ];

  // Filter transactions based on search, date range, and filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      // Search filter
      const searchMatch = 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase());

      // Date range filter
      const transactionDate = new Date(transaction.date);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;
      const dateMatch = 
        (!startDate || transactionDate >= startDate) &&
        (!endDate || transactionDate <= endDate);

      // Type filter
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(transaction.type);

      // Status filter
      const statusMatch = selectedStatus.length === 0 || selectedStatus.includes(transaction.status);

      return searchMatch && dateMatch && typeMatch && statusMatch;
    });
  }, [transactions, searchTerm, dateRange, selectedTypes, selectedStatus]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const transactionTypes: Transaction['type'][] = ['Deposit', 'Withdrawal', 'Investment', 'Profit'];
  const statusTypes: Transaction['status'][] = ['Completed', 'Pending', 'Failed'];

  const handleTypeToggle = (type: Transaction['type']) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleStatusToggle = (status: Transaction['status']) => {
    setSelectedStatus(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setSelectedTypes([]);
    setSelectedStatus([]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="pl-64">
        <main className="p-8 pt-24">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">View all your account transactions</p>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search transactions..."
                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Filter className="h-5 w-5" />
                  Filters
                </button>
                {(searchTerm || dateRange.start || dateRange.end || selectedTypes.length > 0 || selectedStatus.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <span className="text-gray-500 dark:text-gray-400">to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transaction Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {transactionTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => handleTypeToggle(type)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedTypes.includes(type)
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {statusTypes.map(status => (
                        <button
                          key={status}
                          onClick={() => handleStatusToggle(status)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedStatus.includes(status)
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transactions Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{transaction.date}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 text-sm font-medium ${
                          transaction.type === 'Deposit' || transaction.type === 'Profit'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.type}
                          {transaction.amount.startsWith('+') ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{transaction.description}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${
                          transaction.amount.startsWith('+')
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'Completed'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : transaction.status === 'Pending'
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Show "No results found" message when filtered transactions is empty */}
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No transactions found matching your filters.</p>
              </div>
            )}

            {/* Pagination */}
            <div className="px-6 py-4 border-t dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
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
                        ? 'bg-orange-500 text-white border-orange-500 dark:bg-orange-600 dark:border-orange-600'
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
        </main>
      </div>
    </div>
  );
} 