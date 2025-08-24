import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { 
  TrendingUp, Vote, Clock, DollarSign, 
  Search, Filter, Plus, Target
} from "lucide-react";

export default function ImprovementsList() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("votes");
  const proposalRefs = useRef([]);

  const fetchProposals = async () => {
    try {
      const res = await fetch("https://civiconnect-miii.onrender.com/improvement/improvements");
      const data = await res.json();
      setProposals(data);
    } catch (err) {
      console.error("Failed to load improvements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleVote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to vote");
      return;
    }

    try {
      const res = await fetch(`https://civiconnect-miii.onrender.com/improvement/${id}/vote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIXED auth header
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Vote failed");
        return;
      }

      fetchProposals(); // refresh list
    } catch (err) {
      console.error("Vote error:", err);
      alert("Voting failed. Try again later.");
    }
  };

  const filteredAndSorted = proposals
    .filter((p) => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "votes": return b.votes.length - a.votes.length;
        case "budget": return a.estimated_budget - b.estimated_budget;
        case "time": return a.estimated_time - b.estimated_time;
        case "newest": return new Date(b.createdAt) - new Date(a.createdAt);
        default: return 0;
      }
    });

  const userId = localStorage.getItem("userId");

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Shape Our <span className="gradient-text">Future</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Vote on community improvement proposals, suggest new ideas, and help prioritize 
            the projects that will make the biggest impact on our neighborhood.
          </p>
          <div className="mt-8">
            <button
              onClick={() => window.location.href = "/newproposal"}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center text-lg font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Submit New Proposal
            </button>
          </div>
        </div>
      </section>

      {/* Search & Sort */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100 flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search proposals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2"
              >
                <option value="votes">Most Voted</option>
                <option value="budget">Lowest Budget</option>
                <option value="time">Shortest Time</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Proposals */}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredAndSorted.map((item, i) => {
                const alreadyVoted = item.votes?.some((v) => {
                  const voteId = typeof v === "object" && v._id ? v._id : v;
                  return String(voteId) === String(userId);
                });

                return (
                  <div
                    key={item._id}
                    ref={(el) => (proposalRefs.current[i] = el)}
                    className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 opacity-0"
                  >
                    <h2 className="text-xl font-semibold text-blue-800">{item.title}</h2>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Impact: {item.impact}</p>
                    <p className="text-sm text-gray-500">⏳ {item.estimated_time} days</p>
                    <p className="text-sm text-gray-500">💰 ₹{item.estimated_budget}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => handleVote(item._id)}
                        className={`px-4 py-2 text-sm rounded-lg text-white font-medium ${
                          alreadyVoted ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {alreadyVoted ? "Undo Vote" : "Vote"}
                      </button>
                      <p className="text-sm text-gray-700">{item.votes?.length || 0} votes</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
