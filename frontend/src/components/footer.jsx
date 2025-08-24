import React from "react";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #3B82F6, #1D4ED8, #7C3AED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .social-hover {
          transition: all 0.3s ease;
        }
        .social-hover:hover {
          transform: translateY(-2px);
        }
        .link-hover {
          position: relative;
          transition: color 0.3s ease;
        }
        .link-hover:hover {
          color: #3B82F6;
        }
        .link-hover::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background: linear-gradient(135deg, #3B82F6, #7C3AED);
          transition: width 0.3s ease;
        }
        .link-hover:hover::after {
          width: 100%;
        }
        .footer-bg {
          background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%);
        }
        .footer-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <footer className="footer-bg text-white py-16 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Enhanced Brand Section */}
            <div className="md:col-span-2 space-y-6">
              <a href="/" className="inline-flex items-center gap-3 group">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl group-hover:scale-105 transition-transform duration-200">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">CivicConnect</span>
              </a>
              
              <p className="text-gray-300 text-base leading-relaxed max-w-md">
                Empowering citizens to improve their communities through transparent reporting and accountable governance. 
                Building stronger neighborhoods, one issue at a time.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <a href="mailto:contact@civicconnect.org" className="hover:text-blue-400 transition-colors">
                    contact@civicconnect.org
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="bg-purple-600/20 p-2 rounded-lg">
                    <Phone className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <h4 className="font-medium text-lg mb-4 text-white">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "Twitter",
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 19c7.5 0 11.6-6.3 11.6-11.7v-.5A8.4 8.4 0 0022 4.5a8.2 8.2 0 01-2.4.7A4.1 4.1 0 0021.4 3a8.2 8.2 0 01-2.6 1A4.1 4.1 0 0016 3a4.1 4.1 0 00-4 5.1A11.7 11.7 0 014 4s-4 9 5 13a12 12 0 01-7 2c9 5 20 0 20-11.5a8.6 8.6 0 000-.9A6 6 0 0022 6a8.3 8.3 0 01-2.4.7z"/>
                        </svg>
                      ),
                      color: "hover:bg-blue-500"
                    },
                    {
                      name: "Facebook",
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .1 2 .1v2.3h-1.2c-1.2 0-1.6.8-1.6 1.6v2h2.8l-.4 3H13v7A10 10 0 0022 12z"/>
                        </svg>
                      ),
                      color: "hover:bg-blue-700"
                    },
                    {
                      name: "Instagram",
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.2c3.2 0 3.6 0 4.8.1a6.5 6.5 0 014.7 4.7c.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8a6.5 6.5 0 01-4.7 4.7c-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1a6.5 6.5 0 01-4.7-4.7C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8A6.5 6.5 0 017 2.5C8.2 2.3 8.6 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1A9 9 0 001.1 7.1C1 8.3 1 8.7 1 12s0 3.7.1 4.9a9 9 0 006 6c1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1a9 9 0 006-6c.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9a9 9 0 00-6-6C15.7 0 15.3 0 12 0z"/>
                          <path d="M12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-10.9a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z"/>
                        </svg>
                      ),
                      color: "hover:bg-pink-500"
                    },
                    {
                      name: "GitHub",
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7 0-.7 0-.7 1.1.1 1.6 1.2 1.6 1.2 1 .1.8-1 .8-1-.8-.1-1.6-.4-1.6-1.8s.4-1.4 1-1.7c-.2-.5-.4-1.3 0-2a4.2 4.2 0 011.4 0c.4-.1.9-.1 1.4-.1s1 .1 1.4.1a4.2 4.2 0 011.4 0c.4.7.2 1.5 0 2 .6.3 1 .8 1 1.7s-.8 1.7-1.6 1.8c.2.2.8 1.1.8 2.2v3.2c0 .3.2.6.7.5A10 10 0 0012 2z"/>
                        </svg>
                      ),
                      color: "hover:bg-gray-700"
                    }
                  ].map(({ name, icon, color }) => (
                    <a
                      key={name}
                      href="#"
                      className={`bg-gray-800 p-3 rounded-full text-gray-300 social-hover ${color} hover:text-white transition-all duration-200`}
                      aria-label={name}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-card p-6 rounded-xl">
              <h4 className="font-medium text-lg mb-6 text-white flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Browse Issues", href: "/issues" },
                  { name: "Report an Issue", href: "/report" },
                  { name: "Community", href: "/community" },
                  { name: "Analytics", href: "/analytics" }
                ].map(({ name, href }) => (
                  <li key={name}>
                    <a href={href} className="text-gray-300 link-hover text-sm">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-card p-6 rounded-xl">
              <h4 className="font-medium text-lg mb-6 text-white flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Resources
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Help Center", href: "/help" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Privacy Policy", href: "/privacy" }
                ].map(({ name, href }) => (
                  <li key={name}>
                    <a href={href} className="text-gray-300 link-hover text-sm">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>&copy; {currentYear} CivicConnect. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a href="/privacy" className="link-hover">Privacy Policy</a>
                <a href="/terms" className="link-hover">Terms of Service</a>
                <a href="/cookies" className="link-hover">Cookie Policy</a>
              </div>

              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400" />
                <span>for communities</span>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { count: "5K+", label: "Issues Resolved" },
                { count: "25+", label: "Communities" },
                { count: "10K+", label: "Active Users" },
                { count: "99%", label: "Uptime" }
              ].map(({ count, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{count}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;