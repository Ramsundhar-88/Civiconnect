import React, { useState, useEffect } from "react";
import { Menu, X, Bell, User, Search } from "lucide-react";
import Signup from './pages/signup';
import Login from './pages/Login';
import NewIssue from './pages/newIssue';
import AllIssues from './pages/allIssues';
import NewDiscussion from './pages/newDiscussion';
import AllDiscussions from './pages/allDiscussion';
import Home from "./pages/home";
import CommunityPage from './pages/community';
import NewProposal from './pages/newProposal';
import UserProfile from './pages/profile';
import ImprovementsList from './pages/improvementList';
import DiscussionDetail from './pages/discussionDetail';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // You can replace this with your auth logic
  const [notifications, setNotifications] = useState(3); // Example notification count

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock auth check - replace with your actual auth logic
  useEffect(() => {
    // setLoggedIn(isLoggedIn()); // Your auth function here
    setLoggedIn(false); // Default to not logged in for demo
  }, []);

  const NavLink = ({ href, children, className = "", onClick, mobile = false }) => (
    <a 
      href={href} 
      className={`${className} ${mobile ? 'block py-2 px-4' : ''}`} 
      onClick={onClick}
    >
      {children}
    </a>
  );

  return (
    <>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #3B82F6, #1D4ED8, #7C3AED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .header-blur {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #EF4444;
          color: white;
          font-size: 10px;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      `}</style>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 header-blur shadow-lg' 
          : 'bg-white/90 header-blur shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo */}
            <NavLink href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="text-2xl font-bold gradient-text">CivicConnect</span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <NavLink 
                  href="/issues" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Browse Issues
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </NavLink>
                
                <NavLink 
                  href="/community" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Community
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </NavLink>
                
                <NavLink 
                  href="/report" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Report Issue
                </NavLink>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                />
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-4">
                {loggedIn ? (
                  <>
                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      <Bell className="w-5 h-5" />
                      {notifications > 0 && (
                        <span className="notification-badge">{notifications}</span>
                      )}
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative group">
                      <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">Profile</span>
                      </button>
                      
                      {/* Dropdown Menu - You can implement this with proper state management */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="py-2">
                          <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">My Profile</a>
                          <a href="/my-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">My Reports</a>
                          <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Settings</a>
                          <hr className="my-1" />
                          <a href="/logout" className="block px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">Logout</a>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink 
                      href="/login" 
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                    >
                      Login
                    </NavLink>
                    <NavLink 
                      href="/signup" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="py-4 border-t border-gray-200 bg-white/95 rounded-b-xl">
              {/* Search Bar Mobile */}
              <div className="px-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search issues..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <NavLink 
                  href="/issues" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  mobile
                >
                  Browse Issues
                </NavLink>
                <NavLink 
                  href="/community" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  mobile
                >
                  Community
                </NavLink>
                <NavLink 
                  href="/report" 
                  className="text-blue-600 hover:bg-blue-50 font-medium transition-colors duration-200"
                  mobile
                >
                  Report Issue
                </NavLink>

                {loggedIn ? (
                  <>
                    <hr className="my-2 mx-4" />
                    <NavLink 
                      href="/profile" 
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 flex items-center"
                      mobile
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </NavLink>
                    <NavLink 
                      href="/notifications" 
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-between"
                      mobile
                    >
                      <div className="flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                      </div>
                      {notifications > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {notifications}
                        </span>
                      )}
                    </NavLink>
                    <NavLink 
                      href="/logout" 
                      className="text-red-600 hover:bg-red-50 transition-colors duration-200"
                      mobile
                    >
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    <hr className="my-2 mx-4" />
                    <NavLink 
                      href="/login" 
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                      mobile
                    >
                      Login
                    </NavLink>
                    <div className="px-4 pt-2">
                      <NavLink 
                        href="/signup" 
                        className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-full font-medium hover:shadow-lg transition-all duration-200"
                      >
                        Sign Up
                      </NavLink>
                    </div>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;