import React, { useState } from 'react';
import { Plus, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: 'Open' | 'Closed' | 'Pending';
  date: string;
  lastUpdate: string;
}

export default function SupportTicket() {
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: ''
  });

  const tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Investment Inquiry',
      message: 'I need information about minimum investment requirements.',
      status: 'Open',
      date: '2024-03-15',
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      subject: 'Payment Confirmation',
      message: 'Waiting for confirmation of my recent payment.',
      status: 'Pending',
      date: '2024-03-14',
      lastUpdate: '1 day ago'
    },
    {
      id: 3,
      subject: 'Account Verification',
      message: 'Documents submitted for verification.',
      status: 'Closed',
      date: '2024-03-10',
      lastUpdate: '5 days ago'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('New ticket:', newTicket);
    setIsNewTicketOpen(false);
    setNewTicket({ subject: '', message: '' });
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'Pending':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'Closed':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'Open':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Closed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="pl-64">
        <main className="p-8 pt-24">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h1>
            <button
              onClick={() => setIsNewTicketOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>New Ticket</span>
            </button>
          </div>

          {/* New Ticket Form */}
          {isNewTicketOpen && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Ticket</h2>
                <button
                  onClick={() => setIsNewTicketOpen(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                >
                  <AlertCircle className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsNewTicketOpen(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tickets List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Subject</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Last Update</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">#{ticket.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{ticket.subject}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{ticket.message}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{ticket.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{ticket.lastUpdate}</td>
                      <td className="px-6 py-4">
                        <button
                          className="p-2 text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                          title="View Messages"
                        >
                          <MessageSquare className="h-5 w-5" />
                        </button>
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