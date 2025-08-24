import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  User, Mail, MapPin, Calendar, LogOut,
  Activity, TrendingUp, MessageSquare,
  FileText, Vote, Clock, Star
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const email = storedUser?.email;

    if (!email) {
      setError("No email found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://civiconnect-miii.onrender.com/user/profile/${email}`,
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Top Section */}
          <div className="bg-blue-600 p-8 text-white flex flex-col md:flex-row md:items-center gap-6">
            <div className="bg-blue-800 w-24 h-24 flex items-center justify-center rounded-full text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" /> {user.email}
              </p>
              <p className="flex items-center gap-2 mt-1">
                <User className="w-4 h-4" /> {user.role}
              </p>
              {user.address?.length > 0 && (
                <p className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4" /> 
                  {user.address[0].city}, {user.address[0].country}
                </p>
              )}
              <p className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4" /> Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              className="ml-auto bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
            >
              <LogOut className="w-4 h-4 inline mr-1" /> Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b flex">
            {["overview", "activity", "achievements"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-sm font-medium capitalize ${
                  activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-6">
                <StatCard icon={<FileText />} label="Issues Reported" value={user.issuesCount || 0} />
                <StatCard icon={<MessageSquare />} label="Discussions" value={user.discussionsCount || 0} />
                <StatCard icon={<TrendingUp />} label="Proposals" value={user.proposalsCount || 0} />
                <StatCard icon={<Vote />} label="Votes Given" value={user.votesCount || 0} />
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-4">
                {user.recentActivity?.length > 0 ? (
                  user.recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 border-b pb-3">
                      <Activity className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-800">{a.description}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(a.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No recent activity yet.</p>
                )}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="grid md:grid-cols-2 gap-6">
                <AchievementCard icon={<Star />} title="Active Citizen" desc="Posted your first discussion" />
                <AchievementCard icon={<Award />} title="Community Helper" desc="Commented on 5 discussions" />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 shadow flex items-center gap-4">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

function AchievementCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 shadow flex items-start gap-4">
      <div className="text-yellow-500">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
