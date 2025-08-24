import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { 
  ArrowLeft, MessageSquare, Clock, User, Send, 
  Heart, Share, Bookmark, Tag, Eye
} from "lucide-react";

export default function DiscussionDetail() {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch discussion
  const fetchDiscussion = async () => {
    try {
      const res = await fetch(`https://civiconnect-miii.onrender.com/discussion/${id}`);
      const data = await res.json();
      setDiscussion(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch discussion");
      setLoading(false);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`https://civiconnect-miii.onrender.com/comment/${id}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Fetch Comments Error:", err);
    }
  };

  // Post comment
  const handleCommentSubmit = async () => {
    try {
      const res = await fetch(`https://civiconnect-miii.onrender.com/comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: newComment }),
      });

      if (res.ok) {
        setNewComment("");
        fetchComments();
      } else {
        alert("Login required to post a comment.");
      }
    } catch (err) {
      console.error("Submit Comment Error:", err);
    }
  };

  // Helper: time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const then = new Date(date);
    const diffInHours = Math.floor((now - then) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return then.toLocaleDateString();
  };

  useEffect(() => {
    fetchDiscussion();
    fetchComments();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading discussion...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!discussion) return null;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          
          {/* Back Button */}
          <div className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <Link to="/community" className="text-blue-600 hover:underline">
              Back to Community
            </Link>
          </div>

          {/* Discussion Card */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{discussion.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {discussion.user?.name || "Anonymous"}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {getTimeAgo(discussion.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {comments.length} comments
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 leading-relaxed">{discussion.description}</p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t text-gray-500">
              <button className="flex items-center gap-2 hover:text-red-500">
                <Heart className="w-4 h-4" /> Like
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500">
                <Share className="w-4 h-4" /> Share
              </button>
              <button className="flex items-center gap-2 hover:text-yellow-500">
                <Bookmark className="w-4 h-4" /> Save
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Comments
            </h2>

            {comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet.</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((c) => (
                  <li key={c._id} className="border p-4 rounded-lg bg-gray-50">
                    <p className="text-sm mb-1 flex items-center gap-2">
                      <span className="font-medium">{c.user?.name || "User"}</span>
                      <span className="text-gray-500 text-xs">
                        {getTimeAgo(c.createdAt)}
                      </span>
                    </p>
                    <p className="text-gray-800">{c.content}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* Add Comment */}
            <div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border p-3 rounded-md min-h-[100px]"
              />
              <button
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
