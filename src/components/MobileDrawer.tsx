import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 border-b">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="py-4">
          <nav className="space-y-1">
            <Link 
              to="/" 
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              onClick={onClose}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              onClick={onClose}
            >
              Properties
            </Link>
            <Link 
              to="/how-it-works" 
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              onClick={onClose}
            >
              How it Works
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              onClick={onClose}
            >
              About
            </Link>
          </nav>

          <div className="border-t mt-4 pt-4 px-6 space-y-3">
            <Link 
              to="/login"
              className="block w-full px-4 py-2 text-gray-700 hover:text-orange-500 font-medium rounded-lg border border-gray-200 hover:border-orange-500 transition-colors text-center"
              onClick={onClose}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-center"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 