'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 z-50 bg-white w-6 h-6 rounded-full border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Logo */}
        <div className={`p-6 ${isCollapsed ? 'px-4' : ''}`}>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Tavily Logo" width={24} height={24} />
            <span className={`text-xl font-semibold text-gray-900 transition-opacity duration-200 ${
              isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
            }`}>
              dandi
            </span>
          </Link>
        </div>

        {/* Account Selector */}
        <div className={`px-3 mb-6 ${isCollapsed ? 'px-2' : ''}`}>
          <button className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}>
            <span className="w-5 h-5 flex items-center justify-center text-xs bg-gray-200 rounded-full flex-shrink-0">
              H
            </span>
            <span className={`transition-opacity duration-200 ${
              isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
            }`}>
              Personal
            </span>
            <svg className={`w-4 h-4 ml-auto text-gray-400 transition-opacity duration-200 ${
              isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 px-3 ${isCollapsed ? 'px-2' : ''}`}>
          <div className="space-y-1">
            {[
              { href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Overview' },
              { href: '/account', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'My Account', hasDropdown: true },
              { href: '/playground', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'API Playground' },
              { href: '/use-cases', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', label: 'Use Cases' },
              { href: '/docs', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: 'Documentation', hasExternal: true }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                </svg>
                <span className={`transition-opacity duration-200 ${
                  isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
                }`}>
                  {item.label}
                </span>
                {(item.hasDropdown || item.hasExternal) && !isCollapsed && (
                  <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.hasExternal ? "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className={`p-3 mt-auto border-t ${isCollapsed ? 'px-2' : ''}`}>
          <div className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center' : ''
          }`}>
            <span className="w-8 h-8 flex items-center justify-center text-sm bg-gray-200 rounded-full flex-shrink-0">
              HS
            </span>
            <div className={`flex-1 transition-opacity duration-200 ${
              isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
            }`}>
              <div className="font-medium text-gray-900">Hussam Salah</div>
              <div className="text-xs text-gray-500">View Profile</div>
            </div>
            <svg className={`w-5 h-5 text-gray-400 transition-opacity duration-200 ${
              isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 