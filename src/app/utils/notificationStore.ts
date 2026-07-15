import { addAuditLog } from "./auditLogStore";

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  category: "Event" | "Reminder" | "New Book Release" | "Promotion" | "System Update";
  audience: "All Users" | "Premium Subscribers" | "Basic Subscribers" | "Inactive Users";
  deepLink?: string;
  imageUrl?: string;
  sentAt?: string;      // set when sent
  scheduledAt?: string; // set when scheduled
  status: "Delivered" | "Failed" | "Pending";
  clicks: number;
  ctr: number;          // CTR in %
  sentBy: string;
}

export interface SubscriberStats {
  totalSubscribers: number;
  iosSubscribers: number;
  androidSubscribers: number;
  webSubscribers: number;
  deliverySuccessRate: number;
  averageCTR: number;
}

const DEFAULT_STATS: SubscriberStats = {
  totalSubscribers: 12450,
  iosSubscribers: 5120,
  androidSubscribers: 6180,
  webSubscribers: 1150,
  deliverySuccessRate: 98.4,
  averageCTR: 16.8,
};

const DEFAULT_SENT: PushNotification[] = [
  {
    id: "n-1",
    title: "New Release: In Amma's Splendor",
    body: "Discover the new spiritual insights and teachings of Swami Ramakrishnananda Puri. Available now in physical and digital formats.",
    category: "New Book Release",
    audience: "All Users",
    deepLink: "/catalog?search=Amma",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    sentAt: "2026-07-10 14:30:22",
    status: "Delivered",
    clicks: 2265,
    ctr: 18.2,
    sentBy: "Priya Sharma",
  },
  {
    id: "n-2",
    title: "Guru Purnima Satsang Invitation",
    body: "Join us live this Sunday for a special Guru Purnima Satsang and guided meditation session with Amma.",
    category: "Event",
    audience: "All Users",
    deepLink: "/satsang-live",
    imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80",
    sentAt: "2026-07-08 09:00:00",
    status: "Delivered",
    clicks: 3050,
    ctr: 24.5,
    sentBy: "Rajesh Kumar",
  },
  {
    id: "n-3",
    title: "Complete Your Subscription Profile",
    body: "Friendly Reminder: Complete your profile information today to receive personalized book recommendations and exclusive offers.",
    category: "Reminder",
    audience: "Inactive Users",
    deepLink: "/profile",
    sentAt: "2026-07-05 16:15:40",
    status: "Delivered",
    clicks: 112,
    ctr: 9.1,
    sentBy: "Amit Patel",
  },
  {
    id: "n-4",
    title: "Guru Purnima Celebration Discount",
    body: "Get 20% off all physical books today! Use code GURU20 at checkout.",
    category: "Promotion",
    audience: "All Users",
    deepLink: "/coupons",
    sentAt: "2026-07-04 10:00:00",
    status: "Delivered",
    clicks: 1942,
    ctr: 15.6,
    sentBy: "Rajesh Kumar",
  }
];

const DEFAULT_SCHEDULED: PushNotification[] = [
  {
    id: "n-sch-1",
    title: "Upcoming Webcast: Meditation Techniques",
    body: "Don't miss our live meditation guidance session starting in 1 hour. Tap to join the livestream.",
    category: "Event",
    audience: "Premium Subscribers",
    deepLink: "/satsang-live",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    scheduledAt: "2026-07-20 18:00:00",
    status: "Pending",
    clicks: 0,
    ctr: 0,
    sentBy: "Rajesh Kumar",
  },
  {
    id: "n-sch-2",
    title: "Weekly Wisdom Newsletter",
    body: "Explore this week's spiritual quote and book suggestions to start your week with peace and clarity.",
    category: "System Update",
    audience: "All Users",
    deepLink: "/wisdom",
    scheduledAt: "2026-07-24 08:00:00",
    status: "Pending",
    clicks: 0,
    ctr: 0,
    sentBy: "Priya Sharma",
  }
];

export function getSentNotifications(): PushNotification[] {
  const saved = localStorage.getItem("amrita_sent_notifications");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem("amrita_sent_notifications", JSON.stringify(DEFAULT_SENT));
  return DEFAULT_SENT;
}

export function getScheduledNotifications(): PushNotification[] {
  const saved = localStorage.getItem("amrita_scheduled_notifications");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem("amrita_scheduled_notifications", JSON.stringify(DEFAULT_SCHEDULED));
  return DEFAULT_SCHEDULED;
}

export function getSubscriberStats(): SubscriberStats {
  const saved = localStorage.getItem("amrita_subscriber_stats");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem("amrita_subscriber_stats", JSON.stringify(DEFAULT_STATS));
  return DEFAULT_STATS;
}

export function saveSentNotifications(notifications: PushNotification[]) {
  localStorage.setItem("amrita_sent_notifications", JSON.stringify(notifications));
  window.dispatchEvent(new Event("amrita_notifications_updated"));
}

export function saveScheduledNotifications(notifications: PushNotification[]) {
  localStorage.setItem("amrita_scheduled_notifications", JSON.stringify(notifications));
  window.dispatchEvent(new Event("amrita_notifications_updated"));
}

export function addSentNotification(notification: Omit<PushNotification, "id" | "sentAt" | "clicks" | "ctr" | "status" | "sentBy">) {
  const sent = getSentNotifications();
  
  // Get active admin user name
  let adminName = "Admin";
  const savedActiveId = localStorage.getItem("amrita_active_admin_id");
  const savedAdmins = localStorage.getItem("amrita_admin_users");
  if (savedAdmins && savedActiveId) {
    try {
      const admins = JSON.parse(savedAdmins);
      const active = admins.find((a: any) => a.id === savedActiveId);
      if (active) {
        adminName = active.name;
      }
    } catch (e) {}
  }

  const now = new Date();
  const timestamp = now.toISOString().replace("T", " ").substring(0, 19);

  // Generate simulated clicks/CTR based on audience size
  const stats = getSubscriberStats();
  const audienceSizes = {
    "All Users": stats.totalSubscribers,
    "Premium Subscribers": Math.round(stats.totalSubscribers * 0.25),
    "Basic Subscribers": Math.round(stats.totalSubscribers * 0.5),
    "Inactive Users": Math.round(stats.totalSubscribers * 0.15)
  };
  const size = audienceSizes[notification.audience] || 1000;
  
  // Random CTR between 8% and 26%
  const ctr = parseFloat((8 + Math.random() * 18).toFixed(1));
  const clicks = Math.round((size * ctr) / 100);

  const newNotification: PushNotification = {
    ...notification,
    id: `n-${Date.now()}`,
    sentAt: timestamp,
    status: "Delivered",
    clicks,
    ctr,
    sentBy: adminName
  };

  const updated = [newNotification, ...sent];
  saveSentNotifications(updated);
  
  // Update stats slightly
  const currentStats = getSubscriberStats();
  const newAvgCtr = parseFloat(((currentStats.averageCTR * sent.length + ctr) / (sent.length + 1)).toFixed(1));
  localStorage.setItem("amrita_subscriber_stats", JSON.stringify({
    ...currentStats,
    averageCTR: newAvgCtr
  }));

  addAuditLog("Notifications", `Dispatched manual push notification "${notification.title}" to target audience "${notification.audience}"`, "success");
}

export function addScheduledNotification(notification: Omit<PushNotification, "id" | "scheduledAt" | "clicks" | "ctr" | "status" | "sentBy">, scheduledTime: string) {
  const scheduled = getScheduledNotifications();

  // Get active admin user name
  let adminName = "Admin";
  const savedActiveId = localStorage.getItem("amrita_active_admin_id");
  const savedAdmins = localStorage.getItem("amrita_admin_users");
  if (savedAdmins && savedActiveId) {
    try {
      const admins = JSON.parse(savedAdmins);
      const active = admins.find((a: any) => a.id === savedActiveId);
      if (active) {
        adminName = active.name;
      }
    } catch (e) {}
  }

  const newScheduled: PushNotification = {
    ...notification,
    id: `n-sch-${Date.now()}`,
    scheduledAt: scheduledTime,
    status: "Pending",
    clicks: 0,
    ctr: 0,
    sentBy: adminName
  };

  const updated = [...scheduled, newScheduled];
  saveScheduledNotifications(updated);

  addAuditLog("Notifications", `Scheduled push notification "${notification.title}" for ${scheduledTime}`, "info");
}

export function sendScheduledNow(id: string) {
  const scheduled = getScheduledNotifications();
  const targetIndex = scheduled.findIndex(s => s.id === id);
  if (targetIndex > -1) {
    const target = scheduled[targetIndex];
    // Add to sent
    addSentNotification({
      title: target.title,
      body: target.body,
      category: target.category,
      audience: target.audience,
      deepLink: target.deepLink,
      imageUrl: target.imageUrl
    });
    
    // Remove from scheduled
    const filtered = scheduled.filter(s => s.id !== id);
    saveScheduledNotifications(filtered);
  }
}

export function deleteSentNotification(id: string) {
  const sent = getSentNotifications();
  const filtered = sent.filter(s => s.id !== id);
  saveSentNotifications(filtered);
  addAuditLog("Notifications", `Removed push notification audit entry (ID: ${id}) from history`, "warning");
}

export function deleteScheduledNotification(id: string) {
  const scheduled = getScheduledNotifications();
  const target = scheduled.find(s => s.id === id);
  const filtered = scheduled.filter(s => s.id !== id);
  saveScheduledNotifications(filtered);
  if (target) {
    addAuditLog("Notifications", `Cancelled scheduled push notification "${target.title}"`, "warning");
  }
}
