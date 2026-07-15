import { useState, useEffect } from "react";
import { 
  Bell, Send, Calendar, Clock, Trash2, RefreshCw, CheckCircle, 
  Smartphone, Sparkles, TrendingUp, Users, Check, AlertCircle, 
  ExternalLink, FileText, Database, Wifi, ChevronRight, X, AlertTriangle
} from "lucide-react";
import { 
  getSentNotifications, getScheduledNotifications, getSubscriberStats,
  addSentNotification, addScheduledNotification, sendScheduledNow,
  deleteSentNotification, deleteScheduledNotification, PushNotification, SubscriberStats
} from "../../utils/notificationStore";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Simulated historical chart data
const analyticsData = [
  { name: "Feb", ctr: 12.4, sent: 2 },
  { name: "Mar", ctr: 14.8, sent: 3 },
  { name: "Apr", ctr: 13.9, sent: 3 },
  { name: "May", ctr: 16.5, sent: 5 },
  { name: "Jun", ctr: 15.2, sent: 4 },
  { name: "Jul", ctr: 18.2, sent: 6 },
];

const PRESET_IMAGES = [
  { name: "None", url: "" },
  { name: "Temple Event", url: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80" },
  { name: "Gita Cover", url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80" },
  { name: "Meditation", url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80" },
  { name: "Book Festival", url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80" }
];

export function PushNotifications() {
  const [activeTab, setActiveTab] = useState<"compose" | "history" | "scheduled" | "analytics">("compose");
  const [sentList, setSentList] = useState<PushNotification[]>([]);
  const [scheduledList, setScheduledList] = useState<PushNotification[]>([]);
  const [stats, setStats] = useState<SubscriberStats | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<PushNotification["category"]>("Event");
  const [audience, setAudience] = useState<PushNotification["audience"]>("All Users");
  const [deepLink, setDeepLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scheduleType, setScheduleType] = useState<"immediate" | "scheduled">("immediate");
  const [scheduledTime, setScheduledTime] = useState("");

  // Preview State
  const [previewPlatform, setPreviewPlatform] = useState<"ios" | "android">("ios");
  
  // Custom Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "warning" | "error">("success");

  // Load notifications data
  const loadData = () => {
    setSentList(getSentNotifications());
    setScheduledList(getScheduledNotifications());
    setStats(getSubscriberStats());
  };

  useEffect(() => {
    loadData();

    // Listen for updates in local storage from audits/actions
    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener("amrita_notifications_updated", handleUpdate);
    return () => {
      window.removeEventListener("amrita_notifications_updated", handleUpdate);
    };
  }, []);

  const triggerToast = (message: string, type: "success" | "warning" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSendOrSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      triggerToast("Please fill in both the title and body message", "error");
      return;
    }

    if (scheduleType === "scheduled" && !scheduledTime) {
      triggerToast("Please specify a date and time for the scheduled notification", "error");
      return;
    }

    const payload = {
      title: title.trim(),
      body: body.trim(),
      category,
      audience,
      deepLink: deepLink.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined
    };

    if (scheduleType === "immediate") {
      addSentNotification(payload);
      triggerToast("Push notification dispatched successfully!", "success");
      setActiveTab("history");
    } else {
      // Format local datetime input to readable string
      const formattedTime = scheduledTime.replace("T", " ");
      addScheduledNotification(payload, formattedTime);
      triggerToast(`Notification scheduled successfully for ${formattedTime}`, "success");
      setActiveTab("scheduled");
    }

    // Reset Form
    setTitle("");
    setBody("");
    setDeepLink("");
    setImageUrl("");
    setScheduledTime("");
    setScheduleType("immediate");
  };

  const handleResend = (notification: PushNotification) => {
    setTitle(notification.title);
    setBody(notification.body);
    setCategory(notification.category);
    setAudience(notification.audience);
    setDeepLink(notification.deepLink || "");
    setImageUrl(notification.imageUrl || "");
    setScheduleType("immediate");
    setActiveTab("compose");
    triggerToast("Notification content loaded into composer", "success");
  };

  const handleSendNow = (id: string) => {
    if (window.confirm("Are you sure you want to send this scheduled notification immediately?")) {
      sendScheduledNow(id);
      triggerToast("Scheduled notification sent immediately!", "success");
      loadData();
    }
  };

  const handleDeleteSent = (id: string) => {
    if (window.confirm("Are you sure you want to remove this record from history?")) {
      deleteSentNotification(id);
      triggerToast("History record deleted", "warning");
      loadData();
    }
  };

  const handleDeleteScheduled = (id: string) => {
    if (window.confirm("Are you sure you want to cancel and delete this scheduled notification?")) {
      deleteScheduledNotification(id);
      triggerToast("Scheduled notification cancelled", "warning");
      loadData();
    }
  };

  // Preset Link Helpers
  const selectPresetLink = (path: string) => {
    setDeepLink(path);
  };

  const categoryColors = {
    "Event": "bg-indigo-50 text-indigo-700 border-indigo-100",
    "Reminder": "bg-amber-50 text-amber-700 border-amber-100",
    "New Book Release": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Promotion": "bg-rose-50 text-rose-700 border-rose-100",
    "System Update": "bg-slate-50 text-slate-700 border-slate-100",
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-lg max-w-sm transition-all duration-300 transform translate-y-0 animate-[slideIn_0.2s_ease-out] ${
          toastType === "success" 
            ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
            : toastType === "warning" 
            ? "bg-amber-50 text-amber-800 border-amber-200" 
            : "bg-red-50 text-red-800 border-red-200"
        }`}>
          {toastType === "success" && <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
          {toastType === "warning" && <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />}
          {toastType === "error" && <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
          <p className="text-sm font-semibold leading-snug">{toastMessage}</p>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-600 ml-auto flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#1E293B]">Push Notification Center</h1>
          <p className="text-sm text-[#64748B] font-normal leading-5">Compose, schedule, preview, and monitor push notifications sent to mobile and web devices.</p>
        </div>
        
        {/* Quick Connection Panel */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 border border-emerald-100">
            <Wifi className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">FCM: Connected</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 border border-emerald-100">
            <Wifi className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">APNs: Connected</span>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-slate-200 flex items-center justify-between">
        <div className="flex gap-1 -mb-[1px]">
          <button 
            onClick={() => setActiveTab("compose")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "compose" 
                ? "border-[#002045] text-[#002045]" 
                : "border-transparent text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            <Send className="w-4 h-4" />
            Send Notification
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "history" 
                ? "border-[#002045] text-[#002045]" 
                : "border-transparent text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            <Clock className="w-4 h-4" />
            Notification History
            {sentList.length > 0 && (
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full ml-1">
                {sentList.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab("scheduled")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "scheduled" 
                ? "border-[#002045] text-[#002045]" 
                : "border-transparent text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Scheduled Queue
            {scheduledList.length > 0 && (
              <span className="text-[10px] font-bold bg-[#002045] text-white px-1.5 py-0.5 rounded-full ml-1">
                {scheduledList.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "analytics" 
                ? "border-[#002045] text-[#002045]" 
                : "border-transparent text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Analytics & Status
          </button>
        </div>

        {/* Short info */}
        <div className="hidden md:flex items-center gap-2 text-xs text-[#64748B] font-medium bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
          <Users className="w-3.5 h-3.5 text-slate-500" />
          <span>Active push subscriptions: <strong>{stats?.totalSubscribers.toLocaleString() || "12,450"}</strong> users</span>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === "compose" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Compose Form (3 columns) */}
          <div className="lg:col-span-3 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-[#1E293B] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Notification Details
              </h2>
              <span className="text-xs text-[#94A3B8] font-medium">Fields with * are required</span>
            </div>

            <form onSubmit={handleSendOrSchedule} className="space-y-5">
              {/* Category & Audience Target Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category Type *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-[14px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045] focus:ring-1 focus:ring-[#002045]/20 cursor-pointer"
                  >
                    <option value="Event">Event Reminder</option>
                    <option value="New Book Release">New Book Release</option>
                    <option value="Promotion">Promotion / Discount</option>
                    <option value="Reminder">User Reminder</option>
                    <option value="System Update">System Update</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Target Audience *
                  </label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-[14px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045] focus:ring-1 focus:ring-[#002045]/20 cursor-pointer"
                  >
                    <option value="All Users">All Registered Users ({stats?.totalSubscribers.toLocaleString()})</option>
                    <option value="Premium Subscribers">Premium Active Members ({Math.round(stats ? stats.totalSubscribers * 0.25 : 3000).toLocaleString()})</option>
                    <option value="Basic Subscribers">Basic Active Members ({Math.round(stats ? stats.totalSubscribers * 0.50 : 6000).toLocaleString()})</option>
                    <option value="Inactive Users">Inactive Users (30+ days offline) ({Math.round(stats ? stats.totalSubscribers * 0.15 : 1800).toLocaleString()})</option>
                  </select>
                </div>
              </div>

              {/* Title input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Notification Title *
                </label>
                <input
                  type="text"
                  required
                  maxLength={65}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Gurupurnima Livestream Starting Soon!"
                  className="w-full px-3.5 py-2.5 text-[14px] text-[#1E293B] placeholder:text-[#94A3B8] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045] focus:ring-1 focus:ring-[#002045]/20"
                />
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-0.5">
                  <span>Keep title clear and punchy</span>
                  <span>{title.length}/65 characters</span>
                </div>
              </div>

              {/* Message Body textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Message Body *
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={180}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter the notification content or descriptive text here..."
                  className="w-full px-3.5 py-2.5 text-[14px] text-[#1E293B] placeholder:text-[#94A3B8] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045] focus:ring-1 focus:ring-[#002045]/20 resize-none"
                />
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-0.5">
                  <span>Keep body under 150 characters to avoid clipping on lockscreens</span>
                  <span>{body.length}/180 characters</span>
                </div>
              </div>

              {/* Deep Link URL input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Deep Link URL / Action Route
                </label>
                <input
                  type="text"
                  value={deepLink}
                  onChange={(e) => setDeepLink(e.target.value)}
                  placeholder="e.g. /catalog?book=1 or /coupons"
                  className="w-full px-3.5 py-2.5 text-[14px] text-[#1E293B] placeholder:text-[#94A3B8] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045] focus:ring-1 focus:ring-[#002045]/20"
                />
                <div className="flex flex-wrap gap-1.5 items-center mt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Quick Presets:</span>
                  <button type="button" onClick={() => selectPresetLink("/catalog")} className="text-[11px] bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 px-2 py-0.5 rounded border border-slate-200">Catalog</button>
                  <button type="button" onClick={() => selectPresetLink("/catalog?book=1")} className="text-[11px] bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 px-2 py-0.5 rounded border border-slate-200">Gita Details</button>
                  <button type="button" onClick={() => selectPresetLink("/coupons")} className="text-[11px] bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 px-2 py-0.5 rounded border border-slate-200">Coupons</button>
                  <button type="button" onClick={() => selectPresetLink("/subscriptions")} className="text-[11px] bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 px-2 py-0.5 rounded border border-slate-200">Premium Premium</button>
                </div>
              </div>

              {/* Image URL input & Preset list */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Notification Media Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.png (Rich push notification feature)"
                  className="w-full px-3.5 py-2.5 text-[14px] text-[#1E293B] placeholder:text-[#94A3B8] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045] focus:ring-1 focus:ring-[#002045]/20"
                />
                <div className="flex flex-wrap gap-1.5 items-center mt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Preset Media:</span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.name}
                      type="button"
                      onClick={() => setImageUrl(img.url)}
                      className={`text-[11px] px-2 py-0.5 rounded border ${
                        imageUrl === img.url
                          ? "bg-[#002045] text-white border-[#002045]"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {img.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scheduling settings */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-[13px] font-semibold text-[#1E293B] cursor-pointer">
                    <input
                      type="radio"
                      name="schedule"
                      checked={scheduleType === "immediate"}
                      onChange={() => setScheduleType("immediate")}
                      className="text-[#002045] focus:ring-[#002045]"
                    />
                    Send Immediately
                  </label>
                  <label className="flex items-center gap-2 text-[13px] font-semibold text-[#1E293B] cursor-pointer">
                    <input
                      type="radio"
                      name="schedule"
                      checked={scheduleType === "scheduled"}
                      onChange={() => setScheduleType("scheduled")}
                      className="text-[#002045] focus:ring-[#002045]"
                    />
                    Schedule for later date/time
                  </label>
                </div>

                {scheduleType === "scheduled" && (
                  <div className="flex flex-col gap-1.5 max-w-[280px] animate-[fadeIn_0.2s_ease-out]">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Target Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required={scheduleType === "scheduled"}
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="px-3.5 py-2 text-[13px] text-[#1E293B] bg-white border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045]"
                    />
                  </div>
                )}
              </div>

              {/* Action trigger button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setTitle("");
                    setBody("");
                    setDeepLink("");
                    setImageUrl("");
                    setScheduledTime("");
                    setScheduleType("immediate");
                  }}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  Clear Fields
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#002045] rounded-lg hover:bg-[#001c3d] flex items-center gap-2 shadow-sm transition-all transform active:scale-95"
                >
                  <Send className="w-4 h-4 stroke-[2.2]" />
                  {scheduleType === "immediate" ? "Send Push Notification" : "Schedule Queue Notification"}
                </button>
              </div>
            </form>
          </div>

          {/* Interactive Live Device Mockup Preview (2 columns) */}
          <div className="lg:col-span-2 space-y-4 sticky top-6">
            <div className="flex items-center justify-between bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm">
              <span className="text-[13px] font-bold text-[#1E293B] flex items-center gap-2">
                <Smartphone className="w-4.5 h-4.5 text-slate-500" />
                Live Preview Format:
              </span>
              <div className="flex bg-slate-100 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setPreviewPlatform("ios")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    previewPlatform === "ios"
                      ? "bg-white text-[#1E293B] shadow-sm"
                      : "text-slate-500 hover:text-[#1E293B]"
                  }`}
                >
                  Apple iOS
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewPlatform("android")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    previewPlatform === "android"
                      ? "bg-white text-[#1E293B] shadow-sm"
                      : "text-slate-500 hover:text-[#1E293B]"
                  }`}
                >
                  Google Android
                </button>
              </div>
            </div>

            {/* Device Mockup Shell */}
            <div className="relative bg-[#1A1A24] aspect-[9/16] rounded-[44px] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden flex flex-col justify-start">
              {/* Device camera notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[110px] h-[25px] bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#111] rounded-full mr-2"></div>
                <div className="w-1.5 h-1.5 bg-[#222] rounded-full"></div>
              </div>

              {/* Lockscreen wallpaper background */}
              <div 
                className="absolute inset-0 bg-cover bg-center filter brightness-[0.45] scale-[1.05]"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80')" 
                }}
              ></div>

              {/* Foreground content */}
              <div className="relative z-10 flex flex-col items-center justify-start flex-1 pt-12 px-4 space-y-8">
                {/* Clock */}
                <div className="text-center text-white/95 space-y-1">
                  <div className="text-[52px] font-light tracking-tight leading-none font-sans">09:41</div>
                  <div className="text-xs font-semibold tracking-wide uppercase text-white/70">Thursday, July 16</div>
                </div>

                {/* Notification Banner Container */}
                <div className="w-full pt-4 animate-[bounce_1s_ease-out_1]">
                  {previewPlatform === "ios" ? (
                    /* iOS Style Notification Banner */
                    <div className="bg-[#1A1A1A]/75 backdrop-blur-[24px] rounded-3xl border border-white/10 p-3.5 shadow-2xl text-white space-y-2 max-w-sm transition-all duration-300">
                      {/* Top App row */}
                      <div className="flex items-center justify-between text-[11px] text-white/60">
                        <div className="flex items-center gap-1.5">
                          {/* Mock App Icon */}
                          <div className="w-5 h-5 rounded-md bg-[#002045] flex items-center justify-center text-white text-[8px] font-bold border border-white/10">
                            AB
                          </div>
                          <span className="font-semibold text-white/90">AMRITA BOOKS</span>
                        </div>
                        <span>now</span>
                      </div>
                      
                      {/* Title & Body */}
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-[14px] leading-tight text-white/95">
                          {title.trim() || "Notification Title"}
                        </h4>
                        <p className="text-[13px] leading-relaxed text-white/80 line-clamp-3">
                          {body.trim() || "Notification message body will appear here..."}
                        </p>
                      </div>

                      {/* Image Preview (if provided) */}
                      {imageUrl.trim() && (
                        <div className="mt-2 rounded-xl overflow-hidden aspect-[16/9] border border-white/5 bg-black/20">
                          <img 
                            src={imageUrl.trim()} 
                            alt="Media attachment" 
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        </div>
                      )}

                      {/* Deep Link indicator */}
                      {deepLink.trim() && (
                        <div className="pt-1.5 border-t border-white/5 flex items-center justify-end text-[10px] text-white/50 gap-1 font-semibold uppercase tracking-wider">
                          <span>Action: {deepLink}</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Android Style Notification Banner */
                    <div className="bg-[#2D2E30] rounded-2xl p-4 shadow-2xl text-slate-100 space-y-2.5 max-w-sm transition-all duration-300">
                      {/* Top header row */}
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#002045] flex items-center justify-center text-white text-[8px] font-bold">
                            A
                          </div>
                          <span className="font-medium text-slate-200">Amrita Books • Just now</span>
                        </div>
                        <div className="w-4 h-4 bg-slate-700/60 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-300">v</div>
                      </div>

                      {/* Notification content */}
                      <div className="flex gap-3">
                        <div className="flex-1 space-y-0.5">
                          <h4 className="font-bold text-[14px] leading-tight text-white">
                            {title.trim() || "Notification Title"}
                          </h4>
                          <p className="text-[13px] leading-relaxed text-slate-300 line-clamp-3">
                            {body.trim() || "Notification message body will appear here..."}
                          </p>
                        </div>
                        
                        {/* Android Right Thumbnail Preview (if present and no large view) */}
                        {imageUrl.trim() && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 flex-shrink-0">
                            <img 
                              src={imageUrl.trim()} 
                              alt="Media thumbnail" 
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Android Expanded view preview (if media provided) */}
                      {imageUrl.trim() && (
                        <div className="mt-1 rounded-xl overflow-hidden aspect-[16/9] border border-slate-700 bg-slate-800">
                          <img 
                            src={imageUrl.trim()} 
                            alt="Media expanded view" 
                            className="w-full h-full object-cover animate-[fadeIn_0.2s_ease-out]"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        </div>
                      )}

                      {/* Action buttons */}
                      {deepLink.trim() && (
                        <div className="pt-1.5 flex gap-2">
                          <button type="button" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 px-2.5 py-1.5 bg-slate-800/40 rounded border border-slate-700 flex items-center gap-1">
                            Open Link
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom system bar */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-white/70 rounded-full z-20"></div>
            </div>

            <div className="text-center text-xs text-[#94A3B8] font-normal leading-relaxed">
              Mobile device mockup demonstrates text spacing and clipping on lock screens. Check for visual clarity.
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm animate-[fadeIn_0.2s_ease-out]">
          {/* Header filter tools */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/50">
            <div>
              <h2 className="text-[16px] font-bold text-[#1E293B]">Dispatched Notifications Log</h2>
              <p className="text-xs text-[#64748B] mt-0.5">List of manual notifications pushed through the administration portal.</p>
            </div>
            
            <button 
              onClick={loadData}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#475569] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-[#1E293B] shadow-sm transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh Log
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50/30">
                  <th className="px-6 py-3.5">Notification details</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Audience Target</th>
                  <th className="px-6 py-3.5">Sent Info</th>
                  <th className="px-6 py-3.5 text-center">Open CTR</th>
                  <th className="px-6 py-3.5">Delivered</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {sentList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                      No push notifications found in log history.
                    </td>
                  </tr>
                ) : (
                  sentList.map((notif) => (
                    <tr key={notif.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4 max-w-[280px]">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-sm text-[#1E293B] truncate">{notif.title}</h4>
                          <p className="text-xs text-[#64748B] line-clamp-2">{notif.body}</p>
                          {notif.deepLink && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.25 font-mono">
                              Deep Link: {notif.deepLink}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.75 border text-[11px] font-bold rounded-full uppercase tracking-wider ${
                          categoryColors[notif.category] || "bg-slate-50 text-slate-700 border-slate-100"
                        }`}>
                          {notif.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-xs text-[#1E293B]">
                        {notif.audience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-0.5 text-xs">
                          <p className="font-medium text-[#475569]">{notif.sentAt}</p>
                          <p className="text-[10px] text-slate-400">By: {notif.sentBy}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="inline-block text-left space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                            <span>{notif.ctr}%</span>
                            <span className="text-[10px] text-slate-400 font-normal">({notif.clicks.toLocaleString()} clicks)</span>
                          </div>
                          <div className="w-[120px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                notif.ctr > 20 
                                  ? "bg-emerald-500" 
                                  : notif.ctr > 12 
                                  ? "bg-indigo-500" 
                                  : "bg-amber-500"
                              }`}
                              style={{ width: `${notif.ctr}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {notif.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleResend(notif)}
                            className="px-2.5 py-1.5 text-[#002045] bg-[#002045]/5 hover:bg-[#002045]/10 border border-transparent rounded-lg font-semibold transition-colors flex items-center gap-1"
                            title="Prefill Composer Form"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Use Content
                          </button>
                          <button
                            onClick={() => handleDeleteSent(notif.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors border border-transparent hover:border-red-100"
                            title="Delete Log"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "scheduled" && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm animate-[fadeIn_0.2s_ease-out]">
          {/* Header filter tools */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/50">
            <div>
              <h2 className="text-[16px] font-bold text-[#1E293B]">Scheduled Notifications Queue</h2>
              <p className="text-xs text-[#64748B] mt-0.5">List of future notifications queued to go active automatically.</p>
            </div>
            
            <button 
              onClick={loadData}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#475569] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-[#1E293B] shadow-sm transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh Queue
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50/30">
                  <th className="px-6 py-3.5">Notification Details</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Audience Target</th>
                  <th className="px-6 py-3.5">Scheduled Release Time</th>
                  <th className="px-6 py-3.5">Scheduled By</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {scheduledList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                      No notifications scheduled at this time.
                    </td>
                  </tr>
                ) : (
                  scheduledList.map((notif) => (
                    <tr key={notif.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4 max-w-[280px]">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-sm text-[#1E293B] truncate">{notif.title}</h4>
                          <p className="text-xs text-[#64748B] line-clamp-2">{notif.body}</p>
                          {notif.imageUrl && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.25 font-mono truncate">
                              Media attachment loaded
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.75 border text-[11px] font-bold rounded-full uppercase tracking-wider ${
                          categoryColors[notif.category] || "bg-slate-50 text-slate-700 border-slate-100"
                        }`}>
                          {notif.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-xs text-[#1E293B]">
                        {notif.audience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 w-fit">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{notif.scheduledAt}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-[#475569] font-medium">
                        {notif.sentBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-100 rounded-full px-2.5 py-0.5 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSendNow(notif.id)}
                            className="px-2.5 py-1.5 text-white bg-[#002045] hover:bg-[#001b3d] border border-transparent rounded-lg font-semibold transition-all flex items-center gap-1 shadow-sm"
                          >
                            <Send className="w-3 h-3" />
                            Send Now
                          </button>
                          <button
                            onClick={() => handleDeleteScheduled(notif.id)}
                            className="px-2.5 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 border border-transparent hover:border-red-200 rounded-lg font-semibold transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* Subscriptions metrics cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-[13px] font-semibold text-slate-500">Total Push Subscribers</span>
                <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Users className="w-4.5 h-4.5 text-indigo-600" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1E293B] leading-none">{stats?.totalSubscribers.toLocaleString() || "12,450"}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                  <span className="text-emerald-600 font-bold">↑ +4.2%</span>
                  <span>vs last month</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-[13px] font-semibold text-slate-500">Android Target Reach</span>
                <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Smartphone className="w-4.5 h-4.5 text-emerald-600" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1E293B] leading-none">{stats?.androidSubscribers.toLocaleString() || "6,180"}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                  <span>Split: <strong>49.6%</strong> of total subscribers</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-[13px] font-semibold text-slate-500">iOS Target Reach</span>
                <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Smartphone className="w-4.5 h-4.5 text-indigo-600" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1E293B] leading-none">{stats?.iosSubscribers.toLocaleString() || "5,120"}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                  <span>Split: <strong>41.1%</strong> of total subscribers</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-[13px] font-semibold text-slate-500">Average Click-Through (CTR)</span>
                <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
                  <TrendingUp className="w-4.5 h-4.5 text-rose-600" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1E293B] leading-none">{stats?.averageCTR || "16.8"}%</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                  <span className="text-emerald-600 font-bold">↑ +1.1%</span>
                  <span>average performance</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Click CTR chart graph */}
            <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-[15px] font-bold text-[#1E293B]">Historical Performance Trend</h3>
                <p className="text-xs text-slate-500 mt-0.5">Average open CTR rate and volumes dispatched per month.</p>
              </div>
              
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="colorCtr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#002045" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#002045" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" fontSize={11} stroke="#94A3B8" axisLine={false} tickLine={false} />
                    <YAxis fontSize={11} stroke="#94A3B8" axisLine={false} tickLine={false} unit="%" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.95)", 
                        borderColor: "#E2E8F0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ctr" 
                      name="Click CTR (%)" 
                      stroke="#002045" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#colorCtr)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Integration Status Panel */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-[15px] font-bold text-[#1E293B]">Gateway Integration Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">Physical validation and active credentials checks.</p>
              </div>

              <div className="space-y-4">
                {/* Firebase FCM */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 rounded-lg bg-indigo-50 flex-shrink-0 text-indigo-600">
                    <Database className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800">Firebase FCM Gateway</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.25 rounded font-bold uppercase tracking-wider border border-emerald-100">Active</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">Credential verification, server pings, and delivery routes configured properly.</p>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <span>Project: amritabooks-app-prod</span>
                    </div>
                  </div>
                </div>

                {/* Apple APNs */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 rounded-lg bg-indigo-50 flex-shrink-0 text-indigo-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800">Apple APNs HTTP/2</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.25 rounded font-bold uppercase tracking-wider border border-emerald-100">Active</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">Token-based authentication validated via Apple developer console endpoints.</p>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <span>Key ID: 89PXRW32Q7</span>
                    </div>
                  </div>
                </div>

                {/* Audit Integration Status */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 rounded-lg bg-indigo-50 flex-shrink-0 text-indigo-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800">Audit Logging Module</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.25 rounded font-bold uppercase tracking-wider border border-emerald-100">Linked</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">Every notification composed, sent, scheduled, or cancelled compiles details to AuditLogs store.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
