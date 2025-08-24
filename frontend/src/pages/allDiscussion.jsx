import React, { useEffect, useState, useRef } from "react";
import { 
  MessageSquare, Users, Search, Plus, TrendingUp, 
  Clock, Calendar, Tag, ArrowRight, Sparkles,
  MessageCircle, Eye, ChevronRight
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

const AllDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const discussionRefs = useRef([]);

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

    discussionRefs.current.forEach(ref => ref && observer.observe(ref));

    return () => {
      discussionRefs.current.forEach(ref => ref && observer.unobserve(ref));
    };
  }, [discussions]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await fetch("https://civiconnect-miii.onrender.com/discussion/all");
        const data = await res.json();
        setDiscussions(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load discussions.");
        setLoading(false);
      }
    };
    fetchDiscussions();
  }, []);

  const filteredDiscussions = discussions.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueTags = [...new Set(discussions.flatMap(d => d.tags || []))];

  const getTimeAgo = (date) => {
    const now = new Date();
    const then = new Date(date);
    const diffInHours = Math.floor((now - then) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return then.toLocaleDateString();
  };

  const handleDiscussionClick = (id) => {
    window.location.href = `/discussion/${id}`;
  };

  const handleNewDiscussion = () => {
    window.location.href = "/newdiscussion";
  };

  return (
    <>
    <Header />
      <style>{`
        @keyframes slide-up { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Header Placeholder */}
      <div className="h-16 bg-white shadow-lg"></div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Community Discussions
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Join the <span className="gradient-text">Conversation</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with your community members, share ideas, and collaborate on solutions 
            that make our neighborhood better for everyone.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              [discussions.length, "Active Discussions", MessageSquare],
              [discussions.reduce((acc, d) => acc + (d.commentCount || 0), 0), "Total Comments", MessageCircle],
              [uniqueTags.length, "Topics", Tag],
              [new Set(discussions.map(d => d.user?.name)).size, "Contributors", Users]
            ].map(([count, label, Icon], i) => (
              <div key={i} className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover-lift">
                  <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{count}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>

              {/* New Discussion Button */}
              <button
                onClick={handleNewDiscussion}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 flex items-center font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Start Discussion
              </button>
            </div>

            {/* Tags */}
            {uniqueTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                <button
                  onClick={() => setSelectedTag("all")}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedTag === "all"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  All Topics
                </button>
                {uniqueTags.slice(0, 8).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedTag === tag
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Discussions List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading discussions...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && filteredDiscussions.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No discussions found</h3>
              <p className="text-gray-500 mb-6">Be the first to start a conversation!</p>
              <button
                onClick={handleNewDiscussion}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Start Discussion
              </button>
            </div>
          )}

          {!loading && !error && filteredDiscussions.length > 0 && (
            <div className="space-y-6">
              {filteredDiscussions.map((discussion, index) => (
                <div
                  key={discussion._id}
                  ref={el => discussionRefs.current[index] = el}
                  className="opacity-0"
                >
                  <div
                    onClick={() => handleDiscussionClick(discussion._id)}
                    className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover-lift group border border-gray-100 cursor-pointer"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {discussion.title}
                          </h2>
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {discussion.description}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all ml-4" />
                      </div>

                      {/* Tags */}
                      {discussion.tags && discussion.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {discussion.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Meta Information */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
                              {(discussion.user?.name || "Anonymous").charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-700">
                              {discussion.user?.name || "Anonymous"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{getTimeAgo(discussion.createdAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span>{discussion.commentCount || 0} comments</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-blue-600 font-medium">
                          <span className="text-sm">Join Discussion</span>
                          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer Placeholder */}
      <Footer />
      <div className="h-16 bg-gray-900"></div>
    </>
  );
};

export default AllDiscussions;