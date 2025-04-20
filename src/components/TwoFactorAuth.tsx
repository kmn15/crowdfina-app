import React, { useState } from 'react';
import { Shield, Copy } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import Notification from './Notification';

export default function TwoFactorAuth() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Mock QR code URL - in production, this would come from your backend
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Example:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example';

  const handleEnable2FA = async () => {
    try {
      // API call to initiate 2FA setup would go here
      setShowQRCode(true);
      // Mock backup codes - in production, these would come from your backend
      setBackupCodes([
        '1234-5678',
        '2345-6789',
        '3456-7890',
        '4567-8901',
        '5678-9012',
        '6789-0123',
      ]);
    } catch {
      setNotification({
        type: 'error',
        message: 'Failed to enable 2FA. Please try again.',
      });
    }
  };

  const handleVerifyAndEnable = async () => {
    try {
      // API call to verify code and enable 2FA would go here
      if (verificationCode.length === 6) {
        setIs2FAEnabled(true);
        setShowQRCode(false);
        setNotification({
          type: 'success',
          message: '2FA has been successfully enabled!',
        });
      } else {
        throw new Error('Invalid code');
      }
    } catch {
      setNotification({
        type: 'error',
        message: 'Invalid verification code. Please try again.',
      });
    }
  };

  const handleDisable2FA = async () => {
    try {
      // API call to disable 2FA would go here
      setIs2FAEnabled(false);
      setNotification({
        type: 'success',
        message: '2FA has been disabled',
      });
    } catch {
      setNotification({
        type: 'error',
        message: 'Failed to disable 2FA. Please try again.',
      });
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setNotification({
      type: 'success',
      message: 'Backup codes copied to clipboard',
    });
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Two-Factor Authentication</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Add an extra layer of security to your account
            </p>
          </div>

          <div className="max-w-xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              {/* 2FA Status */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield className={`h-6 w-6 ${is2FAEnabled ? 'text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
                  <div>
                    <h2 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {is2FAEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={is2FAEnabled ? handleDisable2FA : handleEnable2FA}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    is2FAEnabled
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40'
                      : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40'
                  }`}
                >
                  {is2FAEnabled ? 'Disable' : 'Enable'}
                </button>
              </div>

              {/* QR Code Setup */}
              {showQRCode && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Setup Instructions</h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400 mb-6">
                    <li>Download an authenticator app (Google Authenticator, Authy, etc.)</li>
                    <li>Scan the QR code below with your authenticator app</li>
                    <li>Enter the 6-digit code from your authenticator app</li>
                  </ol>

                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={qrCodeUrl}
                      alt="2FA QR Code"
                      className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                    />
                    <div className="w-full max-w-xs">
                      <input
                        type="text"
                        maxLength={6}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <button
                        onClick={handleVerifyAndEnable}
                        className="w-full mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600"
                      >
                        Verify and Enable
                      </button>
                    </div>
                  </div>

                  {/* Backup Codes */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">Backup Codes</h3>
                      <button
                        onClick={copyBackupCodes}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        <Copy className="h-4 w-4" />
                        Copy All
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Save these backup codes in a secure place. You can use them to access your account if you lose your authenticator device.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {backupCodes.map((code, index) => (
                        <div
                          key={index}
                          className="font-mono text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600 dark:text-white"
                        >
                          {code}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 