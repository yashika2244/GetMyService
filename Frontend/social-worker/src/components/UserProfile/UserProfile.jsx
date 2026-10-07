import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth, useAccounts } from "../../context/AppContext";
import { BASE_URL } from "../../config";
import ProfileSkeleton from "./components/ProfileSkeleton";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import ProfileBioCard from "./components/ProfileBioCard";
import ProfileDetailsCard from "./components/ProfileDetailsCard";
import ActivityTimeline from "./components/ActivityTimeline";
import ConnectedServices from "./components/ConnectedServices";
import QuickActionsSidebar from "./components/QuickActionsSidebar";
import EmptyState from "./components/EmptyState";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser, dispatch } = useAuth();
  const { accounts = [], accountsLoading } = useAccounts();

  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);

  // Determine if viewing own profile
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const effectiveUserId = id || storedUser?._id || authUser?._id;
  const isOwnProfile =
    Boolean(effectiveUserId) &&
    (effectiveUserId === storedUser?._id || effectiveUserId === authUser?._id);

  /* ---------------- FETCH USER PROFILE ---------------- */
  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Check local storage / context for instant loading if it's the current user
      if (
        storedUser &&
        (!effectiveUserId || storedUser._id === effectiveUserId)
      ) {
        setUser(storedUser);
        setBio(storedUser.bio || "");
      }

      // 2. Fetch from backend API
      const token = localStorage.getItem("token");
      const apiUrl = `${BASE_URL || "http://localhost:5000"}/api/users/${effectiveUserId}`;

      const res = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (res.ok) {
        const data = await res.json();
        const fetchedUser = data.user || data;
        setUser(fetchedUser);
        setBio(fetchedUser.bio || storedUser?.bio || "");

        // If it's the active logged-in user, keep local storage in sync
        if (isOwnProfile) {
          const merged = { ...storedUser, ...fetchedUser };
          localStorage.setItem("user", JSON.stringify(merged));
          if (dispatch) {
            dispatch({ type: "UPDATE_USER", payload: merged });
          }
        }
      } else if (!user && !storedUser) {
        // If fetch failed and no local fallback
        throw new Error("Unable to locate user profile");
      }
    } catch (err) {
      console.error("Error loading user profile:", err);
      // If we don't already have local user data, set error
      if (!user && !storedUser) {
        setError(err.message || "Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  }, [effectiveUserId, isOwnProfile, dispatch]);

  /* ---------------- FETCH USER CONVERSATIONS (REAL ACTIVITY) ---------------- */
  const fetchConversations = useCallback(async (userId, role) => {
    if (!userId) return;
    try {
      const token = localStorage.getItem("token");
      const userRole = role || "customer";
      const res = await fetch(
        `${BASE_URL || "http://localhost:5000"}/api/chat/chat-users/${userId}/${userRole}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setConversations(data);
        }
      }
    } catch (err) {
      console.warn("Could not fetch user conversations:", err);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (user?._id) {
      fetchConversations(user._id, user.role);
    }
  }, [user?._id, user?.role, fetchConversations]);

  /* ---------------- SAVE BIO (PRESERVES EXISTING FEATURE) ---------------- */
  const handleSaveBio = (newBio) => {
    setBio(newBio);
    const updated = { ...user, bio: newBio };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    if (dispatch) {
      dispatch({ type: "UPDATE_USER", payload: updated });
    }
    toast.success("Bio updated successfully!");
  };

  /* ---------------- LOGOUT HANDLER (PRESERVES EXISTING FEATURE) ---------------- */
  const handleLogout = async () => {
    try {
      const res = await fetch(`${BASE_URL || "http://localhost:5000"}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        if (dispatch) dispatch({ type: "LOGOUT" });
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (err) {
      toast.error("Error during logout");
    }
  };

  /* ---------------- COMPUTE STATS & MILESTONES ---------------- */
  // Member since calculation from MongoDB ObjectId
  const getMemberSince = (userId) => {
    if (!userId || typeof userId !== "string" || userId.length < 8)
      return "Active Member";
    try {
      const timestamp = parseInt(userId.substring(0, 8), 16) * 1000;
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "Active Member";
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Active Member";
    }
  };

  // Profile completion meter
  const calculateCompletion = (u, currentBio) => {
    if (!u) return 0;
    const checks = [
      Boolean(u.name),
      Boolean(u.email),
      Boolean(u.photo),
      Boolean(u.phone),
      Boolean(u.location),
      Boolean(u.age),
      Boolean(u.gender),
      Boolean(currentBio && currentBio.trim().length > 0),
    ];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  };

  const memberSince = getMemberSince(user?._id);
  const completionPercentage = calculateCompletion(user, bio);

  /* ---------------- LOADING STATE ---------------- */
  if (loading && !user) {
    return <ProfileSkeleton />;
  }

  /* ---------------- ERROR STATE ---------------- */
  if (error && !user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#071A33] mb-2">
            Profile Unavailable
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            {error || "We could not find the requested user profile. It may have been removed or is temporarily unreachable."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={fetchUserProfile}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-sm font-semibold transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 text-sm font-semibold transition"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN DASHBOARD RENDER ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#F8FAFC] pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. PROFILE HEADER / COVER */}
        <ProfileHeader
          user={user}
          isOwnProfile={isOwnProfile}
          onLogout={handleLogout}
          memberSince={memberSince}
        />

        {/* 2. REAL METRIC STATS */}
        <ProfileStats
          completionPercentage={completionPercentage}
          activeChatsCount={conversations.length}
          availableProvidersCount={accounts.length}
          userRole={user?.role}
        />

        {/* 3. RESPONSIVE DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN CONTENT COLUMN (Left 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-2">
            {/* Bio & Summary Card */}
            <ProfileBioCard
              bio={bio}
              onSaveBio={handleSaveBio}
              isOwnProfile={isOwnProfile}
              user={user}
            />

            {/* Account Details 2-Column Grid Card */}
            <ProfileDetailsCard
              user={user}
              memberSince={memberSince}
            />

            {/* Recent Activity Timeline Feed */}
            <ActivityTimeline
              conversations={conversations}
              memberSince={memberSince}
              userName={user?.name}
            />

            {/* Connected Specialists Directory & Quick Message */}
            <ConnectedServices
              accounts={accounts}
              conversations={conversations}
              currentUserId={user?._id}
            />
          </div>

          {/* SIDEBAR COLUMN (Right 1 col on desktop) */}
          <div className="space-y-6">
            <QuickActionsSidebar
              user={user}
              isOwnProfile={isOwnProfile}
              onLogout={handleLogout}
              completionPercentage={completionPercentage}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
