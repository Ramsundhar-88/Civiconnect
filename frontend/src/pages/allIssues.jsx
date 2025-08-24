import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { 
  PlusCircle, Search, MapPin, Grid, List, 
  Calendar, User, Tag, ArrowRight, Eye, MessageSquare,
  TrendingUp, Clock, AlertCircle, CheckCircle, XCircle
} from "lucide-react";

import Header from "../components/header";
import Footer from "../components/footer";

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const issueRefs = useRef([]);

  /** IntersectionObserver for card animations */
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

    issueRefs.current.forEach(ref => ref && observer.observe(ref));

    return () => {
      issueRefs.current.forEach(ref => ref && observer.unobserve(ref));
    };
  }, [issues, searchTerm, selectedCategory]);

  /** Fetch Issues */
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://civiconnect-miii.onrender.com/issue/all", {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setIssues(data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  /** Filtered Issues */
  const filtered = useMemo(() => {
    if (!Array.isArray(issues)) return [];
    return issues.filter(issue =>
      (issue.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (issue.description1 || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (issue.location || "").toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(issue => 
      selectedCategory === "all" ||
      (issue.category || "").toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [issues, searchTerm, selectedCategory]);

  /** Categories */
  const categories = useMemo(() => {
    const unique = [...new Set(issues.map(issue => issue.category || "Uncategorized"))];
    return ["all", ...unique];
  }, [issues]);

  /** Status Helpers */
  const getStatusIcon = useCallback((status) => {
    switch (status?.toLowerCase()) {
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-blue-500" />;
    }
  }, []);

  const getStatusColor = useCallback((status) => {
    switch (status?.toLowerCase()) {
      case 'resolved': return 'from-green-500 to-green-600';
      case 'in-progress': return 'from-yellow-500 to-yellow-600';
      case 'rejected': return 'from-red-500 to-red-600';
      default: return 'from-blue-500 to-blue-600';
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .gradient-text { background: linear-gradient(135deg, #3B82F6, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Community <span className="gradient-text">Issues</span>
          </h1>
          <p className="text-lg text-gray-600">
            Browse, track, and engage with issues reported by citizens.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
          {[
            ["Total Issues", issues.length, TrendingUp],
            ["Resolved", issues.filter(i => i.status === 'resolved').length, CheckCircle],
            ["In Progress", issues.filter(i => i.status === 'in-progress').length, Clock],
            ["Categories", categories.length - 1, Tag]
          ].map(([label, count, Icon], i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition">
              <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{count}</div>
              <p className="text-gray-600 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Report Button */}
        <div className="text-center mt-8">
          <a href="/report" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg inline-flex items-center">
            <PlusCircle className="mr-2 h-5 w-5" />
            Report New Issue
          </a>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-white shadow text-blue-600" : "text-gray-600"}`}
              >
                <Grid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-white shadow text-blue-600" : "text-gray-600"}`}
              >
                <List />
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && <p className="text-center text-gray-600">Loading issues...</p>}

          {/* Error */}
          {error && !loading && <p className="text-center text-red-500">Error: {error}</p>}

          {/* No Results */}
          {!loading && !error && filtered.length === 0 && (
            <p className="text-center text-gray-600">No issues found.</p>
          )}

          {/* Issue List */}
          {!loading && !error && filtered.length > 0 && (
            <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : ""}`}>
              {filtered.map((issue, index) => (
                <div
                  key={issue._id || index}
                  ref={el => issueRefs.current[index] = el}
                  className="opacity-0 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={issue.image ? `https://civiconnect-miii.onrender.com${issue.image}` : "https://via.placeholder.com/300"}
                    alt={issue.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{issue.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{issue.description1}</p>
                    <a href={`/issue/${issue._id}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 inline-flex items-center">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
