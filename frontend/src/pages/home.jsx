import { useRef, useEffect, useState } from "react";
import React from "react";

import AllDiscussion from "./allDiscussion"
import Issues from "./allIssues"
import Community from "./community"
import DiscussionDetail from "./discussionDetail"
import ImprovementList from "./improvementList"
import Login from "./Login"
import NewDiscussion from "./newDiscussion"
import Report from "./newIssue"     
import NewProposal from "./newProposal"
import Profile from "./profile"
import Signup from "./signup"

import {
  ArrowRight, CheckCircle, MapPin, BarChart2, ContactRound,
  MessageSquare, ShieldCheck, FileText, Users, Github, Twitter, Facebook, Instagram,
  Phone, Mail, Menu, X, Star, TrendingUp, Clock, Award
} from "lucide-react";

import { NavLink } from "react-router-dom";




const Index = () => {
  const featureRefs = useRef([]);
  const statsRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    featureRefs.current.forEach(ref => ref && observer.observe(ref));
    statsRef.current && observer.observe(statsRef.current);

    return () => {
      featureRefs.current.forEach(ref => ref && observer.unobserve(ref));
      statsRef.current && observer.unobserve(statsRef.current);
    };
  }, []);

  const NavLink = ({ href, children, className = "", onClick }) => (
    <a href={href} className={className} onClick={onClick}>{children}</a>
  );

  return (
    <div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .gradient-text {
          background: linear-gradient(135deg, #3B82F6, #1D4ED8, #7C3AED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Enhanced Header with Mobile Menu */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <NavLink href="/" className="text-2xl font-bold gradient-text flex items-center">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl mr-3">
              <ContactRound className="text-white w-6 h-6" />
            </div>
            CivicConnect
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-gray-700">
            <NavLink href="/issues" className="hover:text-blue-600 transition-colors font-medium">Issues</NavLink>
            <NavLink href="/Community" className="hover:text-blue-600 transition-colors font-medium">Community</NavLink>
            <NavLink href="/NewIssue" className="hover:text-blue-600 transition-colors font-medium">Report</NavLink>
            <NavLink href="/Profile" className="hover:text-blue-600 transition-colors font-medium">Profile</NavLink>
            
            {!loggedIn && (
              <>
                <NavLink href="/Login" className="hover:text-blue-600 transition-colors font-medium">Login</NavLink>
                <NavLink href="/Signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105">
                  Sign Up
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3 px-4">
              <NavLink href="Issues" className="text-gray-700 hover:text-blue-600 py-2">Issues</NavLink>
              <NavLink href="/Community" className="text-gray-700 hover:text-blue-600 py-2">Community</NavLink>
              <NavLink href="/report" className="text-gray-700 hover:text-blue-600 py-2">Report</NavLink>
              <NavLink href="/Profile" className="text-gray-700 hover:text-blue-600 py-2">Profile</NavLink>
              {!loggedIn && (
                <>
                  <NavLink href="/Login" className="text-gray-700 hover:text-blue-600 py-2">Login</NavLink>
                  <NavLink href="/Signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center">Sign Up</NavLink>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 text-center px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              🏆 Trusted by 25+ Communities
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            Creating a <span className="gradient-text">Better City</span>
            <br />
            <span className="text-gray-600 text-2xl md:text-4xl font-normal">Together</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Report issues, track resolutions, and collaborate with your community and local government. 
            Join thousands making their neighborhoods better, one issue at a time.
          </p>
          
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            <NavLink href="/report" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all transform hover:scale-105 flex items-center text-lg font-medium">
              Report an Issue <ArrowRight className="ml-2 w-5 h-5" />
            </NavLink>
            <NavLink href="/Issues" className="glass-effect text-blue-600 px-8 py-4 rounded-full hover:bg-white/20 transition-all flex items-center text-lg font-medium border border-blue-200">
              Browse Issues
            </NavLink>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              ["5K+", "Issues Solved", TrendingUp],
              ["85%", "Success Rate", Award],
              ["25+", "Communities", Users],
              ["<24h", "Avg Response", Clock]
            ].map(([stat, label, Icon], i) => (
              <div key={i} className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover-lift">
                  <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{stat}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to make your community better
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200"></div>
            
            {[
              {
                title: "Report Issues",
                icon: MapPin,
                desc: "Submit issues with photos, location, and detailed descriptions. Our smart categorization helps route your report to the right authorities.",
                color: "from-blue-500 to-blue-600",
                step: "01"
              },
              {
                title: "Track Progress", 
                icon: BarChart2,
                desc: "Get real-time updates and follow the resolution process. Transparent communication keeps you informed every step of the way.",
                color: "from-purple-500 to-purple-600",
                step: "02"
              },
              {
                title: "Verify Resolution",
                icon: CheckCircle,
                desc: "Confirm when issues are fixed and rate the service. Your feedback helps improve the system for everyone.",
                color: "from-green-500 to-green-600",
                step: "03"
              }
            ].map(({ title, icon: Icon, desc, color, step }, i) => (
              <div key={i} className="relative hover-lift">
                <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <div className="relative mb-6">
                    <div className={`bg-gradient-to-br ${color} p-4 rounded-2xl inline-block mb-4 relative z-10`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-20">
                      {step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Roles Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold gradient-text mb-4">Built for Everyone</h2>
          <p className="text-xl text-gray-600 mb-16">Different roles, powerful features for all</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "Citizens", 
                icon: Users, 
                features: ["Report & track issues", "Vote on community priorities", "Get resolution updates", "Join local discussions"],
                color: "from-blue-500 to-blue-600"
              },
              {
                role: "Officials", 
                icon: FileText, 
                features: ["Manage incoming reports", "Update resolution status", "Communicate with citizens", "Generate insights"],
                color: "from-purple-500 to-purple-600"
              },
              {
                role: "Moderators", 
                icon: ShieldCheck, 
                features: ["Review reported content", "Maintain platform quality", "Ensure community guidelines", "Support user experience"],
                color: "from-green-500 to-green-600"
              }
            ].map(({ role, icon: Icon, features, color }, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover-lift border border-gray-100">
                <div className="text-center mb-6">
                  <div className={`bg-gradient-to-br ${color} p-4 rounded-2xl inline-block mb-4`}>
                    <Icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{role}</h3>
                </div>
                <div className="text-left">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center mb-3 last:mb-0">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} mr-3 flex-shrink-0`}></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats */}
      <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-purple-800 text-white py-20 px-4 relative overflow-hidden" ref={statsRef}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Making Real Impact</h2>
            <p className="text-blue-100 text-xl">Numbers that matter to communities</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { count: "5,000+", label: "Issues Reported", icon: FileText },
              { count: "85%", label: "Resolution Rate", icon: CheckCircle },
              { count: "25+", label: "Communities", icon: Users },
              { count: "10,000+", label: "Active Users", icon: Star }
            ].map(({ count, label, icon: Icon }, i) => (
              <div key={i} className="hover-lift">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Icon className="w-8 h-8 mx-auto mb-4 text-blue-200" />
                  <div className="text-4xl font-bold mb-2">{count}</div>
                  <div className="text-blue-100">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold gradient-text mb-6">Ready to Transform Your Community?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of citizens already making their neighborhoods better. Start your journey today!
          </p>
          
          <div className="flex justify-center gap-6 flex-wrap mb-8">
            <NavLink href="/Signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all transform hover:scale-105 text-lg font-medium">
              Get Started Free
            </NavLink>
            <NavLink href="/Issues" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all text-lg font-medium">
              Explore Platform
            </NavLink>
          </div>
          
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Free to use
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Instant setup
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl mr-3">
                  <ContactRound className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold gradient-text">CivicConnect</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering citizens to create transparent, responsive, and thriving communities through technology and collaboration.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Github, href: "#", label: "GitHub" }
                ].map(({ icon: Icon, href, label }, i) => (
                  <a key={i} href={href} className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors" aria-label={label}>
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Platform</h4>
              <ul className="text-gray-400 space-y-2">
                <li><NavLink href="#issues" className="hover:text-white transition-colors">Browse Issues</NavLink></li>
                <li><NavLink href="#report" className="hover:text-white transition-colors">Report Issue</NavLink></li>
                <li><NavLink href="#community" className="hover:text-white transition-colors">Community</NavLink></li>
                <li><NavLink href="#analytics" className="hover:text-white transition-colors">Analytics</NavLink></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="text-gray-400 space-y-2">
                <li><NavLink href="#about" className="hover:text-white transition-colors">About Us</NavLink></li>
                <li><NavLink href="#faq" className="hover:text-white transition-colors">FAQ</NavLink></li>
                <li><NavLink href="#help" className="hover:text-white transition-colors">Help Center</NavLink></li>
                <li><NavLink href="#contact" className="hover:text-white transition-colors">Contact</NavLink></li>
              </ul>
              
              <div className="mt-6">
                <div className="flex items-center text-gray-400 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">contact@civicconnect.org</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} CivicConnect. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <NavLink href="#privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink>
              <NavLink href="#terms" className="hover:text-white transition-colors">Terms of Service</NavLink>
              <NavLink href="#cookies" className="hover:text-white transition-colors">Cookie Policy</NavLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;