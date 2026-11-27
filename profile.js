
/* =========================================================
   TELESUPAR - PROFILE V4
   Next-Generation Profile + Fullscreen Settings
   Fullscreen Followers / Following
   Smart Follow + Follow Back + Message
   Existing TSUser and API compatibility
========================================================= */

(function () {
  "use strict";

  if (window.__TS_PROFILE_V4__) return;
  window.__TS_PROFILE_V4__ = true;

  /* =========================================================
     1. STYLES
  ========================================================= */

  const style = document.createElement("style");

  style.textContent = `

    @keyframes tspFade {
      from { opacity:0; transform:translateY(7px); }
      to { opacity:1; transform:translateY(0); }
    }

    .tsp-wrap {
      width:100%;
      min-height:100%;
      padding-bottom:30px;
      color:#f8fafc;
      animation:tspFade .25s ease;
    }

    .tsp-top {
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:18px 18px 12px;
    }

    .tsp-top h2 {
      font-size:21px;
      font-weight:850;
      letter-spacing:-.5px;
      margin:0;
    }

    .tsp-top small {
      color:#94a3b8;
      font-size:11px;
      display:block;
      margin-top:3px;
    }

    .tsp-top-actions {
      display:flex;
      gap:8px;
    }

    .tsp-icon-btn {
      width:42px;
      height:42px;
      border:1px solid rgba(255,255,255,.1);
      background:rgba(30,41,59,.8);
      color:#fff;
      border-radius:14px;
      font-size:19px;
      cursor:pointer;
    }

    .tsp-card {
      margin:10px 14px;
      padding:20px 16px;
      border-radius:25px;
      border:1px solid rgba(255,255,255,.09);
      background:
        radial-gradient(circle at 90% 0%,rgba(139,92,246,.19),transparent 42%),
        linear-gradient(145deg,#151d30,#101827);
      box-shadow:0 12px 30px rgba(0,0,0,.18);
    }

    .tsp-profile-head {
      display:flex;
      align-items:center;
      gap:17px;
    }

    .tsp-avatar-wrap {
      position:relative;
      width:94px;
      height:94px;
      flex-shrink:0;
      padding:3px;
      border-radius:50%;
      background:linear-gradient(140deg,#38bdf8,#8b5cf6,#ec4899);
    }

    .tsp-avatar {
      width:100%;
      height:100%;
      object-fit:cover;
      border-radius:50%;
      border:3px solid #111827;
      display:block;
    }

    .tsp-camera {
      position:absolute;
      right:-2px;
      bottom:0;
      width:31px;
      height:31px;
      border-radius:50%;
      background:#6366f1;
      color:white;
      border:3px solid #111827;
      display:grid;
      place-items:center;
      cursor:pointer;
      font-size:13px;
    }

    .tsp-identity {
      min-width:0;
      flex:1;
    }

    .tsp-name {
      font-size:19px;
      font-weight:850;
      overflow-wrap:anywhere;
    }

    .tsp-username {
      color:#a78bfa;
      font-size:13px;
      margin-top:4px;
    }

    .tsp-online {
      display:inline-flex;
      align-items:center;
      gap:5px;
      color:#4ade80;
      font-size:11px;
      margin-top:8px;
    }

    .tsp-online-dot {
      width:7px;
      height:7px;
      background:#4ade80;
      border-radius:50%;
    }

    .tsp-bio {
      color:#cbd5e1;
      font-size:13px;
      line-height:1.6;
      margin-top:17px;
      overflow-wrap:anywhere;
    }

    .tsp-stats {
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:9px;
      margin-top:20px;
    }

    .tsp-stat {
      background:rgba(255,255,255,.045);
      border:1px solid rgba(255,255,255,.07);
      padding:13px 5px;
      border-radius:16px;
      text-align:center;
      cursor:pointer;
      color:white;
      transition:.2s;
    }

    .tsp-stat:active {
      transform:scale(.96);
    }

    .tsp-stat strong {
      display:block;
      font-size:19px;
      font-weight:850;
    }

    .tsp-stat span {
      color:#94a3b8;
      font-size:11px;
      margin-top:4px;
      display:block;
    }

    .tsp-actions {
      display:flex;
      gap:9px;
      margin-top:17px;
    }

    .tsp-btn {
      flex:1;
      min-height:43px;
      border:1px solid rgba(255,255,255,.1);
      border-radius:13px;
      background:#202b40;
      color:white;
      font-size:13px;
      font-weight:750;
      cursor:pointer;
    }

    .tsp-btn.primary {
      background:linear-gradient(110deg,#6366f1,#a855f7);
      border:0;
    }

    .tsp-section-head {
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:20px 17px 12px;
    }

    .tsp-section-head h3 {
      font-size:15px;
      font-weight:800;
      margin:0;
    }

    .tsp-section-head span {
      font-size:11px;
      color:#94a3b8;
    }

    .tsp-post-tabs {
      display:flex;
      border-bottom:1px solid rgba(255,255,255,.08);
      margin:0 14px;
    }

    .tsp-post-tab {
      flex:1;
      padding:13px;
      text-align:center;
      color:#94a3b8;
      font-size:12px;
      font-weight:800;
      border:0;
      border-bottom:2px solid transparent;
      background:transparent;
      cursor:pointer;
    }

    .tsp-post-tab.active {
      color:white;
      border-color:#a78bfa;
    }

    .tsp-grid {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:3px;
      padding:3px;
    }

    .tsp-post {
      aspect-ratio:1;
      position:relative;
      overflow:hidden;
      background:#172033;
      cursor:pointer;
      border:0;
      padding:0;
      width:100%;
      color:inherit;
      text-align:left;
      font:inherit;
    }

    .tsp-post img,
    .tsp-post video {
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }

    .tsp-post-text {
      padding:9px;
      font-size:11px;
      color:#cbd5e1;
      line-height:1.5;
      overflow:hidden;
      display:-webkit-box;
      -webkit-line-clamp:7;
      -webkit-box-orient:vertical;
    }

    .tsp-video-mark {
      position:absolute;
      right:7px;
      top:7px;
      background:rgba(0,0,0,.6);
      padding:4px 6px;
      border-radius:7px;
      font-size:10px;
    }

    .tsp-empty {
      grid-column:1/-1;
      padding:40px 20px;
      text-align:center;
      color:#94a3b8;
    }

    .tsp-empty-icon {
      font-size:32px;
      margin-bottom:10px;
    }

    .tsp-empty strong {
      color:#e2e8f0;
      display:block;
      font-size:14px;
      margin-bottom:5px;
    }

    .tsp-loading {
      text-align:center;
      padding:50px 20px;
      color:#94a3b8;
      font-size:13px;
    }

    /* EDIT PROFILE MODAL */

    .tsp-overlay {
      position:fixed;
      inset:0;
      z-index:2147482000;
      background:rgba(0,0,0,.78);
      backdrop-filter:blur(10px);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:18px;
    }

    .tsp-modal {
      width:100%;
      max-width:420px;
      max-height:90vh;
      overflow:auto;
      background:#111827;
      border:1px solid rgba(255,255,255,.1);
      border-radius:23px;
      padding:21px;
      box-shadow:0 25px 70px rgba(0,0,0,.5);
      animation:tspFade .2s ease;
    }

    .tsp-modal-head {
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:20px;
    }

    .tsp-modal-head h3 {
      font-size:18px;
      font-weight:850;
      margin:0;
    }

    .tsp-close {
      border:0;
      background:#263248;
      color:white;
      width:34px;
      height:34px;
      border-radius:10px;
      font-size:20px;
      cursor:pointer;
    }

    .tsp-field {
      margin-bottom:16px;
    }

    .tsp-field label {
      display:block;
      color:#94a3b8;
      font-size:12px;
      margin-bottom:8px;
    }

    .tsp-field input,
    .tsp-field textarea {
      width:100%;
      padding:13px;
      border-radius:12px;
      background:#1e293b;
      border:1px solid rgba(255,255,255,.08);
      color:white;
      outline:none;
      font-size:14px;
      resize:vertical;
      box-sizing:border-box;
    }

    .tsp-field textarea {
      min-height:95px;
    }

    .tsp-field input:focus,
    .tsp-field textarea:focus {
      border-color:#8b5cf6;
    }

    .tsp-char-count {
      text-align:right;
      color:#64748b;
      font-size:10px;
      margin-top:5px;
    }

    /* =====================================================
       FULLSCREEN SETTINGS + CONNECTIONS
       Important: These screens must cover the whole viewport.
    ===================================================== */

    .tsp-settings-screen,
    .tsp-ff-screen {
      position:fixed !important;
      top:0 !important;
      right:0 !important;
      bottom:0 !important;
      left:0 !important;

      width:100vw !important;
      max-width:none !important;
      min-width:0 !important;

      height:100vh !important;
      height:100dvh !important;
      min-height:0 !important;

      margin:0 !important;
      padding:0 0 35px !important;

      display:block !important;
      overflow-x:hidden !important;
      overflow-y:auto !important;

      background:#080d17 !important;
      color:#f8fafc !important;

      z-index:2147483647 !important;
      isolation:isolate;

      box-sizing:border-box !important;
      overscroll-behavior:contain;
      -webkit-overflow-scrolling:touch;

      animation:tspFade .2s ease;
    }

    .tsp-settings-screen *,
    .tsp-settings-screen *::before,
    .tsp-settings-screen *::after,
    .tsp-ff-screen *,
    .tsp-ff-screen *::before,
    .tsp-ff-screen *::after {
      box-sizing:border-box;
    }

    .tsp-ff-header,
    .tsp-settings-header {
      position:sticky !important;
      top:0 !important;
      z-index:20 !important;

      display:flex;
      align-items:center;
      gap:14px;

      width:100%;
      min-height:66px;
      padding:13px 17px;

      background:rgba(9,13,22,.97) !important;
      border-bottom:1px solid rgba(255,255,255,.08);

      backdrop-filter:blur(18px);
      -webkit-backdrop-filter:blur(18px);
    }

    .tsp-ff-back,
    .tsp-settings-back {
      width:auto !important;
      min-width:65px !important;
      height:40px !important;
      padding:0 13px !important;

      border-radius:12px;
      background:#1e293b;
      color:white;
      border:1px solid rgba(255,255,255,.08);

      font-size:13px;
      font-weight:750;
      cursor:pointer;
      flex-shrink:0;
    }

    .tsp-ff-title,
    .tsp-settings-title {
      font-size:16px;
      font-weight:850;
      min-width:0;
      overflow-wrap:anywhere;
    }

    /* FOLLOWERS / FOLLOWING */

    .tsp-ff-tabs {
      display:flex;
      border-bottom:1px solid rgba(255,255,255,.08);
    }

    .tsp-ff-tab {
      flex:1;
      text-align:center;
      padding:14px 5px;
      color:#94a3b8;
      font-size:13px;
      font-weight:750;
      border-bottom:2px solid transparent;
      cursor:pointer;
    }

    .tsp-ff-tab.active {
      color:white;
      border-color:#a78bfa;
    }

    .tsp-ff-search {
      padding:13px 15px;
    }

    .tsp-ff-search input {
      width:100%;
      box-sizing:border-box;
      background:#1e293b;
      border:1px solid rgba(255,255,255,.07);
      border-radius:12px;
      padding:12px 14px;
      color:white;
      outline:none;
      font-size:13px;
    }

    .tsp-ff-category {
      margin:5px 14px;
      padding:13px;
      display:flex;
      align-items:center;
      gap:12px;
      background:#141e30;
      border:1px solid rgba(255,255,255,.07);
      border-radius:15px;
      cursor:pointer;
    }

    .tsp-ff-category-icon {
      width:42px;
      height:42px;
      border-radius:13px;
      background:#26334b;
      display:grid;
      place-items:center;
      font-size:18px;
      flex-shrink:0;
    }

    .tsp-ff-category strong {
      display:block;
      font-size:13px;
    }

    .tsp-ff-category small {
      color:#94a3b8;
      font-size:11px;
      display:block;
      margin-top:4px;
    }

    .tsp-ff-sort {
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:10px;
      padding:17px;
      font-size:12px;
      color:#cbd5e1;
      font-weight:750;
    }

    .tsp-ff-user {
      display:flex;
      align-items:center;
      gap:11px;
      padding:12px 15px;
      width:100%;
      min-width:0;
    }

    .tsp-ff-avatar {
      width:47px;
      height:47px;
      object-fit:cover;
      border-radius:50%;
      border:2px solid #8b5cf6;
      flex-shrink:0;
    }

    .tsp-ff-info {
      flex:1;
      min-width:0;
    }

    .tsp-ff-info strong {
      display:block;
      font-size:13px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    .tsp-ff-info small {
      display:block;
      color:#94a3b8;
      font-size:11px;
      margin-top:3px;
    }

    .tsp-ff-actions {
      display:flex;
      align-items:center;
      justify-content:flex-end;
      flex-wrap:wrap;
      gap:7px;
      flex-shrink:0;
    }

    .tsp-ff-action {
      border:0;
      border-radius:9px;
      padding:9px 11px;
      background:#263248;
      color:white;
      font-size:11px;
      font-weight:750;
      cursor:pointer;
      white-space:nowrap;
    }

    .tsp-ff-action.follow {
      background:linear-gradient(110deg,#4f46e5,#9333ea);
    }

    .tsp-ff-action.following {
      background:rgba(148,163,184,.13);
      color:#cbd5e1;
    }

    .tsp-ff-action:disabled {
      opacity:.5;
      cursor:wait;
    }

    /* SETTINGS */

    .tsp-settings-intro {
      padding:22px 18px 12px;
    }

    .tsp-settings-intro h2 {
      font-size:22px;
      margin:0 0 6px;
      font-weight:850;
    }

    .tsp-settings-intro p {
      font-size:12px;
      color:#94a3b8;
      margin:0;
      line-height:1.5;
    }

    .tsp-settings-group {
      margin:14px 14px 18px;
    }

    .tsp-settings-label {
      font-size:11px;
      color:#8b9bb4;
      font-weight:800;
      letter-spacing:1px;
      margin:0 5px 9px;
      text-transform:uppercase;
    }

    .tsp-settings-card {
      border:1px solid rgba(255,255,255,.08);
      background:linear-gradient(145deg,rgba(24,35,55,.96),rgba(15,23,39,.96));
      border-radius:18px;
      overflow:hidden;
    }

    .tsp-setting-row {
      width:100%;
      display:flex;
      align-items:center;
      gap:12px;
      padding:14px 13px;
      background:transparent;
      border:0;
      border-bottom:1px solid rgba(255,255,255,.055);
      color:#f8fafc;
      text-align:left;
      cursor:pointer;
    }

    .tsp-setting-row:last-child {
      border-bottom:0;
    }

    .tsp-setting-icon {
      width:38px;
      height:38px;
      display:grid;
      place-items:center;
      border-radius:12px;
      background:rgba(139,92,246,.15);
      font-size:17px;
      flex-shrink:0;
    }

    .tsp-setting-copy {
      flex:1;
      min-width:0;
    }

    .tsp-setting-copy strong {
      display:block;
      font-size:13px;
      font-weight:750;
    }

    .tsp-setting-copy small {
      display:block;
      color:#94a3b8;
      font-size:10px;
      margin-top:4px;
      line-height:1.4;
    }

    .tsp-setting-arrow {
      color:#64748b;
      font-size:20px;
      flex-shrink:0;
    }

    .tsp-setting-detail {
      margin:14px;
      padding:17px;
      border-radius:17px;
      background:#131e31;
      border:1px solid rgba(167,139,250,.2);
    }

    .tsp-setting-detail h3 {
      font-size:15px;
      margin:0 0 8px;
    }

    .tsp-setting-detail p {
      font-size:12px;
      color:#aab7ca;
      line-height:1.6;
      margin:0 0 12px;
    }

    .tsp-coming {
      display:inline-block;
      font-size:10px;
      color:#c4b5fd;
      background:rgba(139,92,246,.15);
      padding:6px 9px;
      border-radius:20px;
      font-weight:800;
    }

    .tsp-logout-row {
      display:block;
      margin:0 14px 35px;
      width:calc(100% - 28px);
      padding:15px;
      border:1px solid rgba(248,113,113,.22);
      border-radius:15px;
      background:rgba(127,29,29,.15);
      color:#fca5a5;
      font-size:13px;
      font-weight:800;
      cursor:pointer;
    }

    /* POST VIEWER */

    .tsp-post-viewer {
      position:fixed;
      inset:0;
      z-index:2147482500;
      background:rgba(2,6,15,.97);
      display:flex;
      flex-direction:column;
      color:white;
    }

    .tsp-viewer-head {
      height:58px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 15px;
      border-bottom:1px solid rgba(255,255,255,.08);
    }

    .tsp-viewer-close {
      width:38px;
      height:38px;
      border:0;
      border-radius:12px;
      background:#1e293b;
      color:white;
      font-size:22px;
    }

    .tsp-viewer-content {
      flex:1;
      min-height:0;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:12px;
    }

    .tsp-viewer-content img,
    .tsp-viewer-content video {
      max-width:100%;
      max-height:100%;
      object-fit:contain;
    }

    .tsp-viewer-caption {
      padding:14px 18px 25px;
      color:#cbd5e1;
      font-size:13px;
      line-height:1.5;
      max-height:25vh;
      overflow:auto;
    }

    @media(max-width:420px) {
      .tsp-ff-user {
        gap:8px;
        padding:11px 10px;
      }

      .tsp-ff-avatar {
        width:42px;
        height:42px;
      }

      .tsp-ff-action {
        padding:8px 9px;
        font-size:10px;
      }
    }

    @media(max-width:360px) {
      .tsp-card {
        margin:8px;
        padding:16px 12px;
      }

      .tsp-avatar-wrap {
        width:78px;
        height:78px;
      }

      .tsp-name {
        font-size:16px;
      }
    }

  `;

  document.head.appendChild(style);


   
/* =========================================
   PROFILE POST ACTION MENU STYLES
========================================= */

const tspPostActionStyle = document.createElement("style");

tspPostActionStyle.textContent = `
  .tsp-post-wrap {
    position:relative;
    aspect-ratio:1;
    min-width:0;
    overflow:hidden;
    background:#172033;
  }

  .tsp-post-wrap .tsp-post {
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
    aspect-ratio:auto;
  }

  .tsp-post-menu {
    position:absolute;
    top:7px;
    right:7px;
    z-index:5;
    width:34px;
    height:34px;
    border:1px solid rgba(255,255,255,.2);
    border-radius:11px;
    background:rgba(8,13,25,.82);
    color:#fff;
    font-size:23px;
    line-height:1;
    display:grid;
    place-items:center;
    cursor:pointer;
    backdrop-filter:blur(10px);
  }

  .tsp-post-action-btn {
    width:100%;
    padding:15px;
    border:0;
    border-radius:13px;
    background:#202b40;
    color:#f8fafc;
    font-size:14px;
    font-weight:750;
    text-align:left;
    margin-top:9px;
    cursor:pointer;
  }

  .tsp-post-action-btn.danger {
    color:#fca5a5;
    background:rgba(127,29,29,.22);
  }

  .tsp-post-edit-area {
    width:100%;
    min-height:130px;
    box-sizing:border-box;
    padding:13px;
    border-radius:13px;
    background:#1e293b;
    border:1px solid rgba(255,255,255,.12);
    color:#fff;
    font:inherit;
    font-size:14px;
    line-height:1.6;
    resize:vertical;
  }

  html[data-ts-theme="light"] .tsp-post-action-btn {
    background:#e2e8f0;
    color:#172033;
  }

  html[data-ts-theme="light"] .tsp-post-action-btn.danger {
    background:#fee2e2;
    color:#b91c1c;
  }

  html[data-ts-theme="light"] .tsp-post-edit-area {
    background:#f8fafc;
    color:#172033;
    border-color:#cbd5e1;
  }
`;

document.head.appendChild(tspPostActionStyle);


     /* =========================================
     TELESUPAR GLOBAL THEME SYSTEM
  ========================================= */

  const TS_THEME_KEY = "telesupar_app_theme";

  function getTelesuparTheme() {
    return localStorage.getItem(TS_THEME_KEY) || "dark";
  }

  function applyTelesuparTheme(theme) {
    const selectedTheme = theme === "light" ? "light" : "dark";

    document.documentElement.setAttribute(
      "data-ts-theme",
      selectedTheme
    );

    localStorage.setItem(TS_THEME_KEY, selectedTheme);
  }

  applyTelesuparTheme(getTelesuparTheme());

   
  /* =========================================
     TELESUPAR GLOBAL LIGHT MODE
  ========================================= */

  const globalThemeStyle = document.createElement("style");
  globalThemeStyle.id = "ts-global-theme-style";

  globalThemeStyle.textContent = `
    html[data-ts-theme="light"] {
      color-scheme: light;

      --bg-main: #f1f5f9;
      --bg-card: #ffffff;
      --bg-elevated: #e2e8f0;
      --border: rgba(15,23,42,.12);
      --text-primary: #172033;
      --text-secondary: #64748b;

      --ts-bg: #f1f5f9;
      --ts-card: #ffffff;
      --ts-border: rgba(15,23,42,.12);
      --ts-muted: #64748b;
      --ts-text: #172033;
    }

    html[data-ts-theme="light"] body,
    html[data-ts-theme="light"] #app-container,
    html[data-ts-theme="light"] #main-view {
      background: #f1f5f9 !important;
      color: #172033 !important;
    }

    /* Main header and navigation */
    html[data-ts-theme="light"] .top-header,
    html[data-ts-theme="light"] .bottom-nav {
      background: rgba(255,255,255,.94) !important;
      color: #172033 !important;
      border-color: #e2e8f0 !important;
    }

    /* HOME */
    html[data-ts-theme="light"] .stories-bar {
      background: #ffffff !important;
      border-color: #e2e8f0 !important;
    }

    html[data-ts-theme="light"] .story-name,
    html[data-ts-theme="light"] .home-section-heading strong {
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .post-card {
      background: #ffffff !important;
      border-color: #e2e8f0 !important;
      color: #172033 !important;
    }

    /* EXPLORE */
    html[data-ts-theme="light"] .explore-container,
    html[data-ts-theme="light"] .explore-cats,
    html[data-ts-theme="light"] .explore-grid {
      background: #f1f5f9 !important;
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .explore-top-bar {
      background: rgba(255,255,255,.95) !important;
      border-color: #e2e8f0 !important;
    }

    html[data-ts-theme="light"] .explore-search-box,
    html[data-ts-theme="light"] .explore-cat-pill {
      background: #ffffff !important;
      color: #172033 !important;
      border-color: #dbe2ea !important;
    }

    html[data-ts-theme="light"] .explore-search-box input {
      color: #172033 !important;
    }

    /* CHAT */
    html[data-ts-theme="light"] .ts-chat-app {
      background: #f1f5f9 !important;
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .ts-chat-item,
    html[data-ts-theme="light"] .ts-search-box,
    html[data-ts-theme="light"] .ts-filter {
      background: #ffffff !important;
      color: #172033 !important;
      border-color: #e2e8f0 !important;
    }

    html[data-ts-theme="light"] .ts-chat-name,
    html[data-ts-theme="light"] .ts-empty-state strong {
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .ts-search-box input {
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .ts-chat-room {
      background: #f8fafc !important;
      color: #172033 !important;
    }

    /* CHANNELS */
    html[data-ts-theme="light"] .ts-ig-app {
      background: #f1f5f9 !important;
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .ts-ig-top,
    html[data-ts-theme="light"] .ts-search-box,
    html[data-ts-theme="light"] .ts-group-box {
      background: rgba(255,255,255,.96) !important;
      border-color: #e2e8f0 !important;
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .ts-back-btn,
    html[data-ts-theme="light"] .ts-glass-btn {
      background: #e2e8f0 !important;
      color: #172033 !important;
      border-color: #cbd5e1 !important;
    }

    html[data-ts-theme="light"] .ts-search-input {
      background: #f8fafc !important;
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .ts-row-btn {
      color: #172033 !important;
      border-color: #e2e8f0 !important;
    }

    /* PROFILE */
    html[data-ts-theme="light"] .tsp-wrap {
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .tsp-card,
    html[data-ts-theme="light"] .tsp-setting-detail {
      background: #ffffff !important;
      background-image: none !important;
      border-color: #e2e8f0 !important;
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .tsp-name,
    html[data-ts-theme="light"] .tsp-section-head,
    html[data-ts-theme="light"] .tsp-stat,
    html[data-ts-theme="light"] .tsp-setting-row {
      color: #172033 !important;
    }

    html[data-ts-theme="light"] .tsp-icon-btn {
      background: #ffffff !important;
      color: #172033 !important;
      border-color: #dbe2ea !important;
    }

    /* Inputs and overlays */
    html[data-ts-theme="light"] input,
    html[data-ts-theme="light"] textarea {
      color: #172033;
    }

    html[data-ts-theme="light"] .tsp-modal,
    html[data-ts-theme="light"] .tsp-settings-screen {
      background: #ffffff !important;
      color: #172033 !important;
    }
  `;

  document.head.appendChild(globalThemeStyle);


  function toggleTelesuparTheme(button) {
    const nextTheme =
      getTelesuparTheme() === "dark" ? "light" : "dark";

    applyTelesuparTheme(nextTheme);

    if (button) {
      button.textContent = nextTheme === "dark" ? "🌙" : "☀️";
      button.title = nextTheme === "dark"
        ? "Switch to Light Mode"
        : "Switch to Dark Mode";
    }
  }

  /* =========================================================
     2. HELPERS
  ========================================================= */

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;"
    })[char]);
  }

  function getAvatar(user) {
    if (window.TSUser?.avatar) {
      return window.TSUser.avatar(user);
    }

    return typeof window.avatarUrl === "function"
      ? window.avatarUrl(user)
      : "";
  }

  function getUserId(user) {
    return String(user?.id || user?._id || "");
  }

  function getPostId(post) {
    return String(post?._id || post?.id || post?.postId || "");
  }

  function getPostUserId(post) {
    return String(
      post?.user?.id ||
      post?.user?._id ||
      post?.userId ||
      post?.authorId ||
      ""
    );
  }

  function showMessage(message) {
    alert(message);
  }

  function logout() {
    if (!confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem("ts_token");
    localStorage.removeItem("ts_user");
    location.reload();
  }

  function postIsMedia(post) {
    return !!post?.mediaUrl && post.mediaType !== "text";
  }

  function lockBodyScroll() {
    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return function unlock() {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
    };
  }

  /* =========================================================
     3. POST GRID
  ========================================================= */

  function renderPostTiles(posts) {
    if (!posts.length) {
      return `
        <div class="tsp-empty">
          <div class="tsp-empty-icon">▧</div>
          <strong>No posts here yet</strong>
          <span>Your shared posts will appear here.</span>
        </div>
      `;
    }

    return posts.map(post => {
      const id = getPostId(post);
      const url = post.mediaUrl || "";
      const video = post.mediaType === "video";

      return `
        <button
          type="button"
          class="tsp-post"
          data-open-post="${esc(id)}"
          aria-label="Open post"
        >
          ${
            url
              ? video
                ? `
                  <video
                    src="${esc(url)}"
                    muted
                    playsinline
                    preload="metadata"
                  ></video>
                  <span class="tsp-video-mark">▶</span>
                `
                : `
                  <img
                    src="${esc(url)}"
                    loading="lazy"
                    alt="Post"
                  />
                `
              : `
                <div class="tsp-post-text">
                  ${esc(post.caption || "Text post")}
                </div>
              `
          }
        </button>
      `;
    }).join("");
  }

  function openFallbackPost(post) {
    const overlay = document.createElement("div");
    overlay.className = "tsp-post-viewer";

    const media = post.mediaUrl
      ? post.mediaType === "video"
        ? `
          <video
            src="${esc(post.mediaUrl)}"
            controls
            autoplay
            playsinline
          ></video>
        `
        : `<img src="${esc(post.mediaUrl)}" alt="Post"/>`
      : `
        <div style="
          max-width:520px;
          padding:25px;
          font-size:17px;
          line-height:1.7;
          white-space:pre-wrap
        ">
          ${esc(post.caption || "Text post")}
        </div>
      `;

    overlay.innerHTML = `
      <div class="tsp-viewer-head">
        <strong>Post</strong>
        <button class="tsp-viewer-close" type="button">×</button>
      </div>

      <div class="tsp-viewer-content">
        ${media}
      </div>

      <div class="tsp-viewer-caption">
        ${esc(post.caption || "")}
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".tsp-viewer-close").onclick = () => {
      overlay.remove();
    };
  }

  function openPost(post) {
    const id = getPostId(post);

    if (
      id &&
      typeof window.openFullscreenPostViewer === "function"
    ) {
      window.openFullscreenPostViewer(id);
      return;
    }

    openFallbackPost(post);
  }

  /* =========================================================
     4. PROFILE RENDER
  ========================================================= */

  window.renderProfile = async function (container) {
    if (!container) return;

    container.innerHTML = `
      <div class="tsp-loading">
        Loading your profile...
      </div>
    `;

    try {
      const meRes = window.TSUser
        ? await window.TSUser.getMe()
        : await window.api("/api/me");

      const user =
        meRes?.user ||
        window.AppState?.user;

      if (!user) {
        container.innerHTML = `
          <div class="tsp-loading">
            Unable to load profile. Please login again.
          </div>
        `;
        return;
      }

      const sharedUser = window.TSUser
        ? (window.TSUser.seed(user) || user)
        : user;

      if (window.AppState) {
        window.AppState.user = sharedUser;
      }

      const userId = getUserId(sharedUser);

      const [followStats, feedRes] = await Promise.all([
        window.TSUser
          ? window.TSUser.getFollowStatus(userId, true)
          : window.api(`/api/users/${userId}/follow-status`),

        window.TSUser
          ? window.TSUser.getFeedPosts()
          : window.api("/api/posts/feed")
      ]);

      const allPosts = feedRes?.posts || [];

      const myPosts = allPosts.filter(post => {
        return getPostUserId(post) === userId;
      });

      const followersCount = followStats?.followersCount || 0;
      const followingCount = followStats?.followingCount || 0;

      container.innerHTML = `
        <div class="tsp-wrap">

          <div class="tsp-top">
            <div>
              <h2>My Profile</h2>
              <small>Your TELESUPAR space</small>
            </div>

            <div class="tsp-top-actions">
              <button
  class="tsp-icon-btn"
  id="tsp-theme-toggle"
  type="button"
  title="Switch Theme"
>
  ${getTelesuparTheme() === "dark" ? "🌙" : "☀️"}
</button>

              <button
                class="tsp-icon-btn"
                id="tsp-settings"
                title="Profile settings"
              >⚙</button>
            </div>
          </div>

          <section class="tsp-card">

            <div class="tsp-profile-head">

              <div class="tsp-avatar-wrap">
                <img
                  class="tsp-avatar"
                  id="tsp-avatar"
                  src="${esc(getAvatar(sharedUser))}"
                  alt="Profile photo"
                />

                <label class="tsp-camera" title="Change profile photo">
                  ✎
                  <input
                    type="file"
                    id="tsp-avatar-input"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    hidden
                  />
                </label>
              </div>

              <div class="tsp-identity">
                <div class="tsp-name">
                  ${esc(sharedUser.displayName || sharedUser.username || "User")}
                </div>

                <div class="tsp-username">
                  @${esc(sharedUser.username || "")}
                </div>

                ${
                  sharedUser.isOnline
                    ? `
                      <div class="tsp-online">
                        <span class="tsp-online-dot"></span>
                        Active now
                      </div>
                    `
                    : ""
                }
              </div>

            </div>

            <div class="tsp-bio">
              ${esc(sharedUser.bio || "Hey there! I am using TELESUPAR.")}
            </div>

            <div class="tsp-stats">

              <button class="tsp-stat" type="button" id="tsp-post-count">
                <strong>${myPosts.length}</strong>
                <span>Posts</span>
              </button>

              <button class="tsp-stat" type="button" id="tsp-followers">
                <strong>${followersCount}</strong>
                <span>Followers</span>
              </button>

              <button class="tsp-stat" type="button" id="tsp-following">
                <strong>${followingCount}</strong>
                <span>Following</span>
              </button>

            </div>

            <div class="tsp-actions">
              <button class="tsp-btn primary" id="tsp-edit">
                ✎ Edit Profile
              </button>
            </div>

          </section>

          <div class="tsp-section-head">
            <h3>My Posts</h3>
            <span id="tsp-post-count-label">
              ${myPosts.length} posts loaded
            </span>
          </div>

          <div class="tsp-post-tabs">
            <button
              type="button"
              class="tsp-post-tab active"
              data-post-tab="posts"
            >▦ &nbsp; POSTS</button>

            <button
              type="button"
              class="tsp-post-tab"
              data-post-tab="media"
            >▤ &nbsp; MEDIA</button>
          </div>

          <div class="tsp-grid" id="tsp-post-grid">
            ${renderPostTiles(myPosts)}
          </div>

        </div>
      `;

      const grid = container.querySelector("#tsp-post-grid");

      function bindPostTiles() {
        grid.querySelectorAll("[data-open-post]").forEach(tile => {
          tile.onclick = () => {
            const post = myPosts.find(item => {
              return getPostId(item) === tile.dataset.openPost;
            });

            if (post) openPost(post);
          };
        });
      }

      function updatePostTab(tab) {
        container.querySelectorAll("[data-post-tab]").forEach(btn => {
          btn.classList.toggle("active", btn.dataset.postTab === tab);
        });

        const shown = tab === "media"
          ? myPosts.filter(postIsMedia)
          : myPosts;

        grid.innerHTML = renderPostTiles(shown);

        container.querySelector("#tsp-post-count-label").textContent =
          tab === "media"
            ? `${shown.length} media posts`
            : `${shown.length} posts loaded`;

        bindPostTiles();
      }

      bindPostTiles();

      container.querySelectorAll("[data-post-tab]").forEach(btn => {
        btn.onclick = () => updatePostTab(btn.dataset.postTab);
      });

      const themeButton = container.querySelector("#tsp-theme-toggle");

if (themeButton) {
  themeButton.onclick = () => {
    toggleTelesuparTheme(themeButton);
  };
}

      container.querySelector("#tsp-settings").onclick = () => {
        openProfileSettings(sharedUser, container);
      };

      container.querySelector("#tsp-post-count").onclick = () => {
        updatePostTab("posts");

        container.querySelector("#tsp-post-grid")?.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });
      };

      container.querySelector("#tsp-followers").onclick = () => {
        window.openFollowersFollowingPage(
          sharedUser,
          "followers",
          () => window.renderProfile(container)
        );
      };

      container.querySelector("#tsp-following").onclick = () => {
        window.openFollowersFollowingPage(
          sharedUser,
          "following",
          () => window.renderProfile(container)
        );
      };

      container.querySelector("#tsp-edit").onclick = () => {
        openEditProfile(sharedUser, container);
      };

      container.querySelector("#tsp-avatar-input").onchange = async event => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
          showMessage("Please select an image.");
          return;
        }

        const camera = container.querySelector(".tsp-camera");

        camera.textContent = "…";

        try {
          const result = window.TSUser
            ? await window.TSUser.uploadAvatar(file)
            : await uploadAvatarFallback(file);

          if (!result?.success) {
            throw new Error(result?.message || "Photo upload failed");
          }

          showMessage("Profile photo updated successfully!");

          await window.renderProfile(container);

        } catch (error) {
          showMessage(error.message || "Photo upload failed.");
          camera.textContent = "✎";
        }
      };

    } catch (error) {
      console.error("PROFILE LOAD ERROR:", error);

      container.innerHTML = `
        <div class="tsp-loading">
          <div style="font-size:30px;margin-bottom:12px">⚠️</div>
          Unable to load profile.
          <br><br>
          <button class="tsp-btn primary" id="tsp-retry">
            Try Again
          </button>
        </div>
      `;

      container.querySelector("#tsp-retry").onclick = () => {
        window.renderProfile(container);
      };
    }
  };

  /* =========================================================
     5. AVATAR FALLBACK
  ========================================================= */

  async function uploadAvatarFallback(file) {
    const fd = new FormData();
    fd.append("file", file);

    return window.api("/api/me/avatar", {
      method:"POST",
      body:fd
    });
  }

  /* =========================================================
     6. EDIT PROFILE
  ========================================================= */

  function openEditProfile(user, container) {
    const overlay = document.createElement("div");
    overlay.className = "tsp-overlay";

    overlay.innerHTML = `
      <div class="tsp-modal">

        <div class="tsp-modal-head">
          <h3>Edit Profile</h3>
          <button class="tsp-close" id="tsp-edit-close">×</button>
        </div>

        <form id="tsp-edit-form">

          <div class="tsp-field">
            <label>Display Name</label>
            <input
              id="tsp-edit-name"
              type="text"
              maxlength="40"
              minlength="2"
              required
              value="${esc(user.displayName || "")}"
              placeholder="Your name"
            />
          </div>

          <div class="tsp-field">
            <label>Username</label>
            <input
              type="text"
              value="@${esc(user.username || "")}"
              disabled
            />
          </div>

          <div class="tsp-field">
            <label>Bio</label>
            <textarea
              id="tsp-edit-bio"
              maxlength="160"
              placeholder="Write something about yourself..."
            >${esc(user.bio || "")}</textarea>

            <div class="tsp-char-count">
              <span id="tsp-bio-count">${(user.bio || "").length}</span>/160
            </div>
          </div>

          <button
            class="tsp-btn primary"
            id="tsp-save-profile"
            type="submit"
          >Save Changes</button>

        </form>
      </div>
    `;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();

    overlay.querySelector("#tsp-edit-close").onclick = close;

    overlay.onclick = event => {
      if (event.target === overlay) close();
    };

    const bio = overlay.querySelector("#tsp-edit-bio");

    bio.oninput = () => {
      overlay.querySelector("#tsp-bio-count").textContent =
        bio.value.length;
    };

    overlay.querySelector("#tsp-edit-form").onsubmit = async event => {
      event.preventDefault();

      const name = overlay.querySelector("#tsp-edit-name").value.trim();
      const bioValue = bio.value.trim();
      const save = overlay.querySelector("#tsp-save-profile");

      if (name.length < 2 || name.length > 40) {
        showMessage("Name must be between 2 and 40 characters.");
        return;
      }

      if (bioValue.length > 160) {
        showMessage("Bio must be under 160 characters.");
        return;
      }

      save.disabled = true;
      save.textContent = "Saving...";

      try {
        const result = window.TSUser
          ? await window.TSUser.updateProfile(name, bioValue)
          : await window.api("/api/me", {
              method:"PATCH",
              body:JSON.stringify({
                displayName:name,
                bio:bioValue
              })
            });

        if (!result?.success) {
          throw new Error(result?.message || "Could not update profile");
        }

        if (result.user && window.TSUser) {
          window.TSUser.seed(result.user);
        }

        close();
        await window.renderProfile(container);

      } catch (error) {
        showMessage(error.message || "Profile update failed.");
        save.disabled = false;
        save.textContent = "Save Changes";
      }
    };
  }

  /* =========================================================
     7. PROFILE SETTINGS
  ========================================================= */

  function openProfileSettings(user, container) {
    const screen = document.createElement("div");
    screen.className = "tsp-settings-screen";

    const groups = [
      {
        label:"Your account",
        items:[
          {
            id:"edit",
            icon:"👤",
            title:"Edit profile",
            desc:"Update your name and personal bio"
          },
          {
            id:"account",
            icon:"🪪",
            title:"Account information",
            desc:"Username and account details"
          },
          {
            id:"privacy",
            icon:"🔒",
            title:"Privacy",
            desc:"Profile visibility and audience controls"
          }
        ]
      },
      {
        label:"Experience",
        items:[
          {
            id:"notifications",
            icon:"🔔",
            title:"Notifications",
            desc:"Manage alerts and notification preferences"
          },
          {
            id:"appearance",
            icon:"🎨",
            title:"Appearance",
            desc:"Theme and display preferences"
          },
          {
            id:"language",
            icon:"🌐",
            title:"Language",
            desc:"Choose your app language"
          },
          {
            id:"content",
            icon:"❤️",
            title:"Your activity",
            desc:"Liked posts, saved posts and archive"
          }
        ]
      },
      {
        label:"Security & support",
        items:[
          {
            id:"security",
            icon:"🛡️",
            title:"Security",
            desc:"Password and active sessions"
          },
          {
            id:"data",
            icon:"💾",
            title:"Data and storage",
            desc:"Storage and account data controls"
          },
          {
            id:"help",
            icon:"❔",
            title:"Help and support",
            desc:"Get help with TELESUPAR"
          },
          {
            id:"report",
            icon:"🚩",
            title:"Report a problem",
            desc:"Send feedback about an issue"
          },
          {
            id:"about",
            icon:"ℹ️",
            title:"About TELESUPAR",
            desc:"App information"
          }
        ]
      }
    ];

    const descriptions = {
      account:"Your username and account information are shown on your profile. More account controls will be connected when the required backend support is added.",
      privacy:"Privacy controls are planned for a future update. Your current profile and follow behavior will continue working as before.",
      notifications:"Notification preferences are planned. No notification settings have been changed.",
      appearance:"Appearance preferences will be added in a future update. TELESUPAR currently uses its existing dark interface.",
      language:"Language selection will be connected in a future update.",
      content:"Liked posts, saved posts and archive need dedicated backend routes. These sections are reserved for those features.",
      security:"Password changes and session management require secure backend endpoints. They are not enabled in this frontend-only update.",
      data:"Storage and data-management controls will be added after backend integration.",
      help:"Help and support options will be connected in a future update.",
      report:"Problem reporting will be connected to a support endpoint in a future update.",
      about:"TELESUPAR is your social space. This settings page is part of the profile interface update."
    };

    function renderDetail(id, title) {
      const existing = screen.querySelector(".tsp-setting-detail");
      if (existing) existing.remove();

      if (id === "edit") {
        closeSettings();
        openEditProfile(user, container);
        return;
      }

      const box = document.createElement("div");
      box.className = "tsp-setting-detail";

      box.innerHTML = `
        <h3>${esc(title)}</h3>
        <p>${esc(descriptions[id] || "This option will be available in a future update.")}</p>
        <span class="tsp-coming">
          ${id === "about" ? "TELESUPAR" : "COMING SOON · BACKEND REQUIRED"}
        </span>
      `;

      screen.querySelector(".tsp-settings-intro").after(box);

      box.scrollIntoView({
        behavior:"smooth",
        block:"nearest"
      });
    }

    screen.innerHTML = `
      <div class="tsp-settings-header">

        <button
          class="tsp-settings-back"
          id="tsp-settings-back"
          type="button"
        >Back</button>

        <div class="tsp-settings-title">
          Profile Settings
        </div>

      </div>

      <div class="tsp-settings-intro">
        <h2>Settings</h2>
        <p>Manage your TELESUPAR profile and app preferences.</p>
      </div>

      ${groups.map(group => `
        <section class="tsp-settings-group">

          <div class="tsp-settings-label">
            ${esc(group.label)}
          </div>

          <div class="tsp-settings-card">

            ${group.items.map(item => `
              <button
                type="button"
                class="tsp-setting-row"
                data-setting="${esc(item.id)}"
              >

                <span class="tsp-setting-icon">
                  ${item.icon}
                </span>

                <span class="tsp-setting-copy">
                  <strong>${esc(item.title)}</strong>
                  <small>${esc(item.desc)}</small>
                </span>

                <span class="tsp-setting-arrow">›</span>

              </button>
            `).join("")}

          </div>
        </section>
      `).join("")}

      <button
        type="button"
        class="tsp-logout-row"
        id="tsp-settings-logout"
      >↪ &nbsp; Log out</button>
    `;

    document.body.appendChild(screen);

    const unlockScroll = lockBodyScroll();
    let settingsClosed = false;

    function closeSettings() {
      if (settingsClosed) return;

      settingsClosed = true;
      screen.remove();
      unlockScroll();
    }

    screen.querySelector("#tsp-settings-back").onclick = closeSettings;

    screen.querySelectorAll("[data-setting]").forEach(button => {
      button.onclick = () => {
        const id = button.dataset.setting;

        const item = groups
          .flatMap(group => group.items)
          .find(entry => entry.id === id);

        if (item) {
          renderDetail(id, item.title);
        }
      };
    });

    screen.querySelector("#tsp-settings-logout").onclick = logout;
  }

  /* =========================================================
     8. FOLLOWERS / FOLLOWING
     Fullscreen + Current User Follow Status
  ========================================================= */

  window.openFollowersFollowingPage = async function (
    user,
    initialTab,
    onClose
  ) {
    const screen = document.createElement("div");
    screen.className = "tsp-ff-screen";

    screen.innerHTML = `
      <div class="tsp-loading">
        Loading connections...
      </div>
    `;

    document.body.appendChild(screen);

    const unlockScroll = lockBodyScroll();

    let screenClosed = false;

    function closeScreen() {
      if (screenClosed) return;

      screenClosed = true;
      screen.remove();
      unlockScroll();

      if (typeof onClose === "function") {
        onClose();
      }
    }

    let followersList = [];
    let followingList = [];

    let activeTab =
      initialTab === "following"
        ? "following"
        : "followers";

    let searchQuery = "";
    let filterNotBack = false;
    let filterMutual = false;
    let sortMode = "Default";

    const userId = getUserId(user);

    /* Current logged-in user */

    let currentUser = window.AppState?.user || null;

    if (window.TSUser?.getMe) {
      try {
        const meRes = await window.TSUser.getMe();

        if (meRes?.user) {
          currentUser = meRes.user;
        }
      } catch (error) {
        console.warn("Could not refresh current user:", error);
      }
    }

    if (!currentUser) {
      try {
        currentUser = JSON.parse(
          localStorage.getItem("ts_user") || "null"
        );
      } catch (error) {
        currentUser = null;
      }
    }

    const currentUserId = getUserId(currentUser);

    const isOwnProfile = Boolean(
      currentUserId &&
      userId &&
      currentUserId === userId
    );

    /* Follow status cache for the logged-in user */

    const followStatusCache = new Map();

    async function getMyFollowStatus(targetId) {
      if (!targetId) return null;

      if (followStatusCache.has(targetId)) {
        return followStatusCache.get(targetId);
      }

      try {
        const result = await window.api(
          `/api/users/${encodeURIComponent(targetId)}/follow-status`
        );

        if (!result?.success) {
          followStatusCache.set(targetId, null);
          return null;
        }

        const status = {
          following:!!result.following,
          followsYou:!!result.followsYou
        };

        followStatusCache.set(targetId, status);

        return status;

      } catch (error) {
        console.warn("FOLLOW STATUS ERROR:", targetId, error);
        followStatusCache.set(targetId, null);
        return null;
      }
    }

    /* Load lists */

    try {
      const [followersRes, followingRes] = await Promise.all([
        window.TSUser
          ? window.TSUser.getFollowers(userId)
          : window.api(`/api/users/${userId}/followers`),

        window.TSUser
          ? window.TSUser.getFollowing(userId)
          : window.api(`/api/users/${userId}/following`)
      ]);

      followersList = followersRes?.success
        ? followersRes.users || []
        : [];

      followingList = followingRes?.success
        ? followingRes.users || []
        : [];

    } catch (error) {
      console.error("CONNECTIONS ERROR:", error);

      screen.innerHTML = `
        <div class="tsp-loading">
          Could not load connections.
          <br><br>
          <button class="tsp-ff-action" id="tsp-ff-close">
            Back
          </button>
        </div>
      `;

      screen.querySelector("#tsp-ff-close").onclick = closeScreen;
      return;
    }

    /* =====================================================
       RENDER CONNECTIONS
    ===================================================== */

    let renderVersion = 0;

    async function renderScreen() {
      const thisRender = ++renderVersion;

      const followingIds = new Set(
        followingList.map(getUserId)
      );

      const followersIds = new Set(
        followersList.map(getUserId)
      );

      const notFollowingBack = followersList.filter(person => {
        return !followingIds.has(getUserId(person));
      });

      const mutuals = followingList.filter(person => {
        return followersIds.has(getUserId(person));
      });

      let displayList = activeTab === "followers"
        ? [...followersList]
        : [...followingList];

      if (activeTab === "followers" && filterNotBack) {
        displayList = [...notFollowingBack];
      }

      if (activeTab === "following" && filterMutual) {
        displayList = [...mutuals];
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();

        displayList = displayList.filter(person =>
          (person.username || "").toLowerCase().includes(query) ||
          (person.displayName || "").toLowerCase().includes(query)
        );
      }

      if (sortMode === "A-Z") {
        displayList.sort((a, b) =>
          (a.username || "").localeCompare(b.username || "")
        );
      }

      /*
        Get the logged-in user's follow status for each visible user.
        This makes Follow buttons correct on another user's connections too.
      */

      await Promise.all(
        displayList.map(person => {
          return getMyFollowStatus(getUserId(person));
        })
      );

      if (thisRender !== renderVersion || screenClosed) {
        return;
      }

      screen.innerHTML = `
        <div class="tsp-ff-header">

          <button
            class="tsp-ff-back"
            id="tsp-ff-back"
            type="button"
          >Back</button>

          <div class="tsp-ff-title">
            @${esc(user.username || "")} connections
          </div>

        </div>

        <div class="tsp-ff-tabs">

          <div
            class="tsp-ff-tab ${activeTab === "followers" ? "active" : ""}"
            data-tab="followers"
          >
            ${followersList.length} Followers
          </div>

          <div
            class="tsp-ff-tab ${activeTab === "following" ? "active" : ""}"
            data-tab="following"
          >
            ${followingList.length} Following
          </div>

        </div>

        <div class="tsp-ff-search">
          <input
            id="tsp-ff-search"
            placeholder="Search connections..."
            value="${esc(searchQuery)}"
          />
        </div>

        ${
          activeTab === "followers"
            ? `
              <div class="tsp-ff-category" id="tsp-not-back">

                <div class="tsp-ff-category-icon">👥</div>

                <div>
                  <strong>People you don't follow back</strong>
                  <small>${notFollowingBack.length} people</small>
                </div>

              </div>
            `
            : `
              <div class="tsp-ff-category" id="tsp-mutual">

                <div class="tsp-ff-category-icon">🤝</div>

                <div>
                  <strong>Mutual connections</strong>
                  <small>${mutuals.length} people follow you back</small>
                </div>

              </div>
            `
        }

        <div class="tsp-ff-sort">

          <span>
            ${
              filterNotBack
                ? "People you don't follow back"
                : filterMutual
                  ? "Mutual connections"
                  : "All connections"
            }
          </span>

          <button class="tsp-ff-action" id="tsp-ff-sort">
            ${sortMode === "Default" ? "Sort A–Z" : "Default"}
          </button>

        </div>

        <div id="tsp-ff-list">

          ${
            displayList.length
              ? displayList.map(person => {
                  const pid = getUserId(person);

                  const status = followStatusCache.get(pid);

                  /*
                    On own profile, the Following list itself confirms
                    that the logged-in user follows these people.
                  */

                  const iFollow = isOwnProfile
                    ? followingIds.has(pid)
                    : !!status?.following;

                  const followsMe = !!status?.followsYou;

                  const showFollowButton = !iFollow;

                  const followLabel = followsMe
                    ? "Follow back"
                    : "Follow";

                  return `
                    <div class="tsp-ff-user">

                      <img
                        class="tsp-ff-avatar"
                        src="${esc(getAvatar(person))}"
                        alt=""
                      />

                      <div class="tsp-ff-info">

                        <strong>
                          ${esc(person.displayName || person.username || "User")}
                        </strong>

                        <small>
                          @${esc(person.username || "")}
                        </small>

                      </div>

                      <div class="tsp-ff-actions">

                        <button
                          class="tsp-ff-action"
                          data-message="${esc(pid)}"
                          type="button"
                        >Message</button>

                        ${
                          isOwnProfile &&
                          activeTab === "following"
                            ? `
                              <button
                                class="tsp-ff-action"
                                data-unfollow="${esc(pid)}"
                                type="button"
                              >Unfollow</button>
                            `
                            : showFollowButton
                              ? `
                                <button
                                  class="tsp-ff-action follow"
                                  data-follow="${esc(pid)}"
                                  type="button"
                                >${followLabel}</button>
                              `
                              : `
                                <button
                                  class="tsp-ff-action following"
                                  type="button"
                                  disabled
                                >Following</button>
                              `
                        }

                      </div>

                    </div>
                  `;
                }).join("")
              : `
                <div class="tsp-empty">
                  <div class="tsp-empty-icon">👤</div>
                  <strong>No users found</strong>
                  <span>Try another search.</span>
                </div>
              `
          }

        </div>
      `;

      /* Back */

      screen.querySelector("#tsp-ff-back").onclick = closeScreen;

      /* Tabs */

      screen.querySelectorAll(".tsp-ff-tab").forEach(tab => {
        tab.onclick = () => {
          activeTab = tab.dataset.tab;
          filterNotBack = false;
          filterMutual = false;
          renderScreen();
        };
      });

      /* Search */

      const search = screen.querySelector("#tsp-ff-search");

      search.oninput = () => {
        searchQuery = search.value;

        const pos = search.selectionStart;

        renderScreen().then(() => {
          const next = screen.querySelector("#tsp-ff-search");

          if (next) {
            next.focus();
            next.setSelectionRange(pos, pos);
          }
        });
      };

      /* People you don't follow back */

      const notBack = screen.querySelector("#tsp-not-back");

      if (notBack) {
        notBack.onclick = () => {
          filterNotBack = !filterNotBack;
          filterMutual = false;
          renderScreen();
        };
      }

      /* Mutual connections */

      const mutual = screen.querySelector("#tsp-mutual");

      if (mutual) {
        mutual.onclick = () => {
          filterMutual = !filterMutual;
          filterNotBack = false;
          renderScreen();
        };
      }

      /* Sort */

      screen.querySelector("#tsp-ff-sort").onclick = () => {
        sortMode = sortMode === "Default"
          ? "A-Z"
          : "Default";

        renderScreen();
      };

      /* Message */

      screen.querySelectorAll("[data-message]").forEach(button => {
        button.onclick = () => {
          const targetId = button.dataset.message;

          closeScreen();

          if (typeof window.openDirectChat === "function") {
            window.openDirectChat(targetId);
          } else {
            showMessage("Chat is not available right now.");
          }
        };
      });

      /* Follow / Follow Back */

      screen.querySelectorAll("[data-follow]").forEach(button => {
        button.onclick = async () => {
          const targetId = button.dataset.follow;

          if (!targetId) return;

          button.disabled = true;
          button.textContent = "...";

          try {
            const result = window.TSUser?.follow
              ? await window.TSUser.follow(targetId)
              : await window.api(`/api/users/${targetId}/follow`, {
                  method:"POST"
                });

            if (!result?.success) {
              throw new Error(result?.message || "Follow failed");
            }

            followStatusCache.set(targetId, {
              following:true,
              followsYou:!!followStatusCache.get(targetId)?.followsYou
            });

            /*
              When viewing own Followers list, update own Following list
              so the counters and mutual filters stay correct.
            */

            if (isOwnProfile) {
              const added = followersList.find(person => {
                return getUserId(person) === targetId;
              });

              if (
                added &&
                !followingList.some(person => getUserId(person) === targetId)
              ) {
                followingList.unshift(added);
              }
            }

            renderScreen();

          } catch (error) {
            showMessage(error.message || "Follow failed.");

            button.disabled = false;

            const oldStatus = followStatusCache.get(targetId);
            button.textContent = oldStatus?.followsYou
              ? "Follow back"
              : "Follow";
          }
        };
      });

      /* Unfollow - only on own Following page */

      screen.querySelectorAll("[data-unfollow]").forEach(button => {
        button.onclick = async () => {
          if (!isOwnProfile || activeTab !== "following") {
            return;
          }

          const targetId = button.dataset.unfollow;

          if (!confirm("Unfollow this user?")) {
            return;
          }

          button.disabled = true;
          button.textContent = "...";

          try {
            const result = window.TSUser?.unfollow
              ? await window.TSUser.unfollow(targetId)
              : await window.api(`/api/users/${targetId}/follow`, {
                  method:"DELETE"
                });

            if (!result?.success) {
              throw new Error(result?.message || "Unfollow failed");
            }

            followingList = followingList.filter(person => {
              return getUserId(person) !== targetId;
            });

            followStatusCache.set(targetId, {
              following:false,
              followsYou:!!followStatusCache.get(targetId)?.followsYou
            });

            renderScreen();

          } catch (error) {
            showMessage(error.message || "Unfollow failed.");

            button.disabled = false;
            button.textContent = "Unfollow";
          }
        };
      });
    }

    renderScreen();
  };

  /* =========================================================
     9. READY
  ========================================================= */

  console.log("TELESUPAR Profile V4 loaded successfully");

})();
