import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MessageCircle,
  PlusCircle,
  Search,
  TrendingUp,
  ArrowUp,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function CommunityHubStandalone() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch("https://civiconnect-miii.onrender.com/discussion/all")
      .then((res) => res.json())
      .then((data) => setDiscussions(data));

    fetch("https://civiconnect-miii.onrender.com/improvement/improvements")
      .then((res) => res.json())
      .then((data) => setTrending(data));
  }, []);

  const handleVote = async (id) => {
    try {
      const res = await fetch(
        `https://civiconnect-miii.onrender.com/improvement/${id}/vote`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Voting failed");

      const updatedRes = await fetch(
        "https://civiconnect-miii.onrender.com/improvement/improvements"
      );
      const updatedData = await updatedRes.json();
      setTrending(updatedData);
    } catch (error) {
      console.error("Vote error:", error);
      alert("Voting failed. Try again later.");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
              <p className="text-gray-600 mt-1">
                Connect with your community and collaborate on improvement
                projects.
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() => navigate("/newdiscussion")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center shadow"
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Start Discussion
              </button>
              <button
                onClick={() => navigate("/newproposal")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center shadow"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> New Proposal
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions and proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => navigate("/discussion")}
              className="bg-white border rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Discussions
            </button>
            <button
              onClick={() => navigate("/improvements")}
              className="bg-white border rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Improvement Proposals
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Discussions */}
            <div className="md:col-span-2 space-y-4">
              {discussions
                .filter((d) =>
                  d.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((d) => (
                  <Link
                    key={d._id}
                    to={`/discussion/${d._id}`}
                    className="block bg-white border rounded-lg p-5 hover:shadow-md transition"
                  >
                    <h2 className="font-semibold text-lg text-gray-900 mb-1">
                      {d.title}
                    </h2>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="font-medium text-gray-700">
                        {d.user?.name || "Anonymous"}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(d.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white border rounded-lg p-5 shadow-sm">
                <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-4">
                  <TrendingUp className="w-4 h-4 mr-2 text-orange-500" />
                  Trending Proposals
                </h3>
                {trending.length === 0 ? (
                  <p className="text-sm text-gray-500">No proposals yet.</p>
                ) : (
                  trending.slice(0, 5).map((t) => (
                    <div
                      key={t._id}
                      className="border-b last:border-0 pb-3 mb-3 last:pb-0 last:mb-0"
                    >
                      <p className="font-medium text-gray-900 text-sm mb-1">
                        {t.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600 flex items-center">
                          <ArrowUp className="w-3 h-3 mr-1 text-green-600" />{" "}
                          {t.votes?.length || 0} votes
                        </p>
                        <button
                          onClick={() => handleVote(t._id)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Vote
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
