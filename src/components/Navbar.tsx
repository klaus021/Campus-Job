import { Search, Bell, MessageSquare, Menu, X, LogOut, User, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store';

export function Navbar() {
  const { currentUser, currentPage, setPage, logout, searchQuery, setSearchQuery, notifications } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => n.userId === currentUser?.id && !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage !== 'gigs' && currentPage !== 'jobs') {
      setPage('gigs');
    }
  };

  const navItems = [
    { label: 'Home', page: 'home' as const },
    { label: 'Browse Gigs', page: 'gigs' as const },
    { label: 'Find Jobs', page: 'jobs' as const },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">UGV<span className="text-emerald-600">Market</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => setPage(item.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search gigs, jobs, skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>

            {currentUser ? (
              <>
                {/* Post buttons */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => setPage('create-gig')}
                    className="px-3 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Post Gig
                  </button>
                  <button
                    onClick={() => setPage('create-job')}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Post Job
                  </button>
                </div>

                {/* Notifications */}
                <button
                  onClick={() => setPage('notifications')}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifs > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadNotifs}
                    </span>
                  )}
                </button>

                {/* Messages */}
                <button
                  onClick={() => setPage('messages')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <span className="hidden sm:block text-sm font-medium text-gray-700">{currentUser.name.split(' ')[0]}</span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
                      {currentUser.name.charAt(0)}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                  </button>

                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-medium text-gray-900">{currentUser.name}</p>
                          <p className="text-sm text-gray-500">{currentUser.email}</p>
                        </div>
                        <button onClick={() => { setPage('dashboard'); setProfileOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </button>
                        <button onClick={() => { setPage('profile'); setProfileOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <User className="w-4 h-4" /> My Profile
                        </button>
                        <button onClick={() => { setPage('orders'); setProfileOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <LayoutDashboard className="w-4 h-4" /> My Orders
                        </button>
                        <button onClick={() => { setPage('payments'); setProfileOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <LayoutDashboard className="w-4 h-4" /> Payments
                        </button>
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button onClick={() => { logout(); setProfileOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage('login')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setPage('register')}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Join Now
                </button>
              </div>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="lg:hidden pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gigs, jobs, skills..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-2">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => { setPage(item.page); setMobileOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg ${
                  currentPage === item.page ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {currentUser && (
              <>
                <button onClick={() => { setPage('create-gig'); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                  Post a Gig
                </button>
                <button onClick={() => { setPage('create-job'); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                  Post a Job
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
