
/* =====================================================
   TELESUPAR - SHARED USER DATA MODULE V1
   Common user cache for Chat, Explore and Profile
   Backend: https://telesupar.onrender.com
===================================================== */

(function () {
  "use strict";

  // Prevent accidental double installation
  if (window.TSUser && window.TSUser.__installed) return;

  const userCache = new Map();
  const followStatusCache = new Map();

  let originalApi = null;

  /* =====================================================
     USER NORMALIZATION
  ===================================================== */

  function normalizeUser(source) {
    if (!source || typeof source !== "object") return null;

    const id = source.id || source._id;

    if (!id || !source.username) return null;

    return {
      ...source,
      id: String(id),
      username: String(source.username || ""),
      displayName:
        source.displayName ||
        source.name ||
        source.username ||
        "User",
      bio: source.bio || "",
      avatar: source.avatar || "",
      isOnline: Boolean(source.isOnline),
      lastSeen: source.lastSeen || null
    };
  }

  /* =====================================================
     SHARED USER CACHE
  ===================================================== */

  function saveUser(source) {
    const normalized = normalizeUser(source);

    if (!normalized) return null;

    const id = normalized.id;
    const existing = userCache.get(id);

    if (existing) {
      // Update the existing shared object
      Object.assign(existing, normalized);
      return existing;
    }

    userCache.set(id, normalized);
    return normalized;
  }

  function getCachedUser(userId) {
    if (!userId) return null;
    return userCache.get(String(userId)) || null;
  }

  function getAllCachedUsers() {
    return Array.from(userCache.values());
  }

  function clearCache() {
    userCache.clear();
    followStatusCache.clear();
  }

  /* =====================================================
     SYNC USERS FROM API RESPONSES

     Existing modules already call window.api().
     This keeps their returned user records in one cache.
  ===================================================== */

  function syncResponse(value) {
    if (Array.isArray(value)) {
      return value.map(syncResponse);
    }

    if (!value || typeof value !== "object") {
      return value;
    }

    // First process nested user objects
    const processed = {};

    Object.keys(value).forEach(key => {
      processed[key] = syncResponse(value[key]);
    });

    // Then replace user-like objects with shared objects
    const normalized = normalizeUser(processed);

    if (normalized) {
      return saveUser(normalized);
    }

    return processed;
  }

  function updateCurrentUser(user) {
    const sharedUser = saveUser(user);

    if (!sharedUser) return null;

    if (window.AppState) {
      window.AppState.user = sharedUser;
    }

    try {
      localStorage.setItem(
        "ts_user",
        JSON.stringify(sharedUser)
      );
    } catch (error) {
      console.warn("Could not save current user:", error);
    }

    return sharedUser;
  }

  /* =====================================================
     INSTALL API RESPONSE SYNC
  ===================================================== */

  function installApiSync() {
    if (typeof window.api !== "function") {
      console.warn("TSUser: window.api not found.");
      return;
    }

    if (window.api.__tsUserWrapped) return;

    originalApi = window.api;

    const wrappedApi = async function (path, options = {}) {
      const response = await originalApi(path, options);

      const syncedResponse = syncResponse(response);

      // Keep logged-in user data synchronized
      if (
        typeof path === "string" &&
        path.split("?")[0] === "/api/me" &&
        syncedResponse &&
        syncedResponse.success &&
        syncedResponse.user
      ) {
        updateCurrentUser(syncedResponse.user);
      }

      return syncedResponse;
    };

    wrappedApi.__tsUserWrapped = true;
    window.api = wrappedApi;
  }

  /* =====================================================
     API HELPERS
  ===================================================== */

  async function getMe() {
    const response = await window.api("/api/me");

    if (response && response.success && response.user) {
      updateCurrentUser(response.user);
    }

    return response;
  }

  async function getUserProfile(userId) {
    if (!userId) {
      return {
        success: false,
        message: "User ID required"
      };
    }

    return window.api(
      `/api/users/${encodeURIComponent(userId)}/profile`
    );
  }

  async function searchUsers(query = "") {
    const response = await window.api(
      `/api/users?search=${encodeURIComponent(query)}`
    );

    if (response && response.success) {
      response.users = (response.users || [])
        .map(saveUser)
        .filter(Boolean);
    }

    return response;
  }

  async function getFollowers(userId) {
    if (!userId) {
      return { success: false, users: [] };
    }

    const response = await window.api(
      `/api/users/${encodeURIComponent(userId)}/followers`
    );

    if (response && response.success) {
      response.users = (response.users || [])
        .map(saveUser)
        .filter(Boolean);
    }

    return response;
  }

  async function getFollowing(userId) {
    if (!userId) {
      return { success: false, users: [] };
    }

    const response = await window.api(
      `/api/users/${encodeURIComponent(userId)}/following`
    );

    if (response && response.success) {
      response.users = (response.users || [])
        .map(saveUser)
        .filter(Boolean);
    }

    return response;
  }

  async function getFollowStatus(userId, forceRefresh = false) {
    if (!userId) {
      return { success: false };
    }

    const id = String(userId);

    if (!forceRefresh && followStatusCache.has(id)) {
      return followStatusCache.get(id);
    }

    const response = await window.api(
      `/api/users/${encodeURIComponent(id)}/follow-status`
    );

    if (response && response.success) {
      followStatusCache.set(id, response);
    }

    return response;
  }

  async function followUser(userId) {
    if (!userId) {
      return { success: false };
    }

    const response = await window.api(
      `/api/users/${encodeURIComponent(userId)}/follow`,
      { method: "POST" }
    );

    followStatusCache.delete(String(userId));

    return response;
  }

  async function unfollowUser(userId) {
    if (!userId) {
      return { success: false };
    }

    const response = await window.api(
      `/api/users/${encodeURIComponent(userId)}/follow`,
      { method: "DELETE" }
    );

    followStatusCache.delete(String(userId));

    return response;
  }

  async function updateProfile(displayName, bio) {
    const response = await window.api("/api/me", {
      method: "PATCH",
      body: JSON.stringify({
        displayName,
        bio
      })
    });

    if (response && response.success && response.user) {
      updateCurrentUser(response.user);
    }

    return response;
  }

  async function uploadAvatar(file) {
    if (!file) {
      return {
        success: false,
        message: "Please select an image"
      };
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await window.api("/api/me/avatar", {
      method: "POST",
      body: formData
    });

    if (response && response.success) {
      if (response.user) {
        updateCurrentUser(response.user);
      } else if (response.avatar) {
        const current = getCachedUser(
          window.AppState?.user?.id
        );

        if (current) {
          current.avatar = response.avatar;
          updateCurrentUser(current);
        }
      }
    }

    return response;
  }

  async function getFeedPosts() {
    return window.api("/api/posts/feed");
  }

  async function getFeedPostsByUser(userId) {
    const response = await getFeedPosts();

    if (!response || !response.success) {
      return response;
    }

    const posts = (response.posts || []).filter(post => {
      const ownerId = post.user?.id || post.userId;
      return String(ownerId) === String(userId);
    });

    return {
      ...response,
      posts
    };
  }

  /* =====================================================
     AVATAR HELPER
  ===================================================== */

  function avatar(user) {
    const sharedUser = normalizeUser(user) || user || {};

    if (typeof window.avatarUrl === "function") {
      return window.avatarUrl(sharedUser);
    }

    if (sharedUser.avatar) return sharedUser.avatar;

    const name = encodeURIComponent(
      sharedUser.displayName ||
      sharedUser.username ||
      "User"
    );

    return `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff&bold=true`;
  }

  /* =====================================================
     PUBLIC MODULE
  ===================================================== */

  window.TSUser = {
    __installed: true,

    // Cache
    save: saveUser,
    seed: updateCurrentUser,
    get: getCachedUser,
    getAll: getAllCachedUsers,
    clear: clearCache,

    // User data
    getMe,
    getUserProfile,
    searchUsers,
    getFollowers,
    getFollowing,

    // Follow system
    getFollowStatus,
    follow: followUser,
    unfollow: unfollowUser,

    // Profile
    updateProfile,
    uploadAvatar,

    // Posts
    getFeedPosts,
    getFeedPostsByUser,

    // Utility
    normalize: normalizeUser,
    avatar
  };

  /* =====================================================
     INITIALIZE
  ===================================================== */

  try {
    if (window.AppState && window.AppState.user) {
      updateCurrentUser(window.AppState.user);
    }
  } catch (error) {
    console.warn("TSUser initial cache error:", error);
  }

  installApiSync();

  console.log("TELESUPAR Shared User Module V1 loaded");
})();
