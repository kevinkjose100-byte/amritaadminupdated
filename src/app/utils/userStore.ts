import { addAuditLog } from "./auditLogStore";

export type Purchase = {
  id: string;
  date: string;
  title: string;
  price: number;
  type: "Digital" | "Physical";
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  libraryCount: number;
  orderCount: number;
  totalSpent: number;
  status: "Active" | "Inactive" | "Suspended";
  subscriptionStatus: "Premium Active" | "Basic Active" | "Expired" | "None";
  lastActive: string;
  purchaseHistory: Purchase[];
  marketingConsent: boolean; // US-07: Consent for promotional emails
};

export const INITIAL_USERS: User[] = [
  { 
    id: "1", 
    name: "Rajesh Kumar", 
    email: "rajesh.kumar@example.com", 
    phone: "+91 98765 43210", 
    joinedDate: "2024-03-12", 
    libraryCount: 45, 
    orderCount: 8, 
    totalSpent: 12450, 
    status: "Active", 
    subscriptionStatus: "Premium Active",
    lastActive: "2026-06-20",
    marketingConsent: true,
    purchaseHistory: [
      { id: "o-101", date: "2026-06-15", title: "Bhagavad Gita (Physical)", price: 499, type: "Physical" },
      { id: "o-102", date: "2026-04-12", title: "Ramayana (Digital)", price: 399, type: "Digital" },
      { id: "o-103", date: "2026-02-18", title: "Mahabharata (Physical)", price: 999, type: "Physical" },
      { id: "o-104", date: "2025-12-05", title: "Upanishads Collection (Physical)", price: 799, type: "Physical" }
    ]
  },
  { 
    id: "2", 
    name: "Priya Sharma", 
    email: "priya.sharma@example.com", 
    phone: "+91 87654 32109", 
    joinedDate: "2025-01-05", 
    libraryCount: 23, 
    orderCount: 3, 
    totalSpent: 4280, 
    status: "Active", 
    subscriptionStatus: "Basic Active",
    lastActive: "2026-06-18",
    marketingConsent: true,
    purchaseHistory: [
      { id: "o-201", date: "2026-05-10", title: "Vedas Complete Set (Digital)", price: 799, type: "Digital" },
      { id: "o-202", date: "2025-03-24", title: "Yoga Sutras (Physical)", price: 449, type: "Physical" }
    ]
  },
  { 
    id: "3", 
    name: "Amit Patel", 
    email: "amit.patel@example.com", 
    phone: "+91 76543 21098", 
    joinedDate: "2023-11-20", 
    libraryCount: 67, 
    orderCount: 12, 
    totalSpent: 18900, 
    status: "Active", 
    subscriptionStatus: "Premium Active",
    lastActive: "2026-06-21",
    marketingConsent: true,
    purchaseHistory: [
      { id: "o-301", date: "2026-06-01", title: "Bhagavad Gita (Physical)", price: 499, type: "Physical" },
      { id: "o-302", date: "2026-03-15", title: "Mahabharata (Physical)", price: 999, type: "Physical" },
      { id: "o-303", date: "2025-11-10", title: "Upanishads Collection (Digital)", price: 449, type: "Digital" }
    ]
  },
  { 
    id: "4", 
    name: "Sneha Reddy", 
    email: "sneha.reddy@example.com", 
    phone: "+91 65432 10987", 
    joinedDate: "2024-07-30", 
    libraryCount: 31, 
    orderCount: 5, 
    totalSpent: 7600, 
    status: "Active", 
    subscriptionStatus: "Expired",
    lastActive: "2026-06-15",
    marketingConsent: false, // Opted out for testing/compliance demo
    purchaseHistory: [
      { id: "o-401", date: "2025-09-12", title: "Ramayana (Physical)", price: 699, type: "Physical" },
      { id: "o-402", date: "2024-11-05", title: "Bhagavad Gita (Digital)", price: 299, type: "Digital" }
    ]
  },
  { 
    id: "5", 
    name: "Lakshmi Iyer", 
    email: "lakshmi.iyer@example.com", 
    phone: "+91 54321 09876", 
    joinedDate: "2025-03-14", 
    libraryCount: 14, 
    orderCount: 2, 
    totalSpent: 1890, 
    status: "Inactive", 
    subscriptionStatus: "None",
    lastActive: "2026-04-02",
    marketingConsent: true,
    purchaseHistory: [
      { id: "o-501", date: "2025-04-18", title: "Yoga Sutras (Digital)", price: 249, type: "Digital" }
    ]
  },
  { 
    id: "6", 
    name: "Venkat Rao", 
    email: "venkat.rao@example.com", 
    phone: "+91 43210 98765", 
    joinedDate: "2023-08-05", 
    libraryCount: 52, 
    orderCount: 9, 
    totalSpent: 14200, 
    status: "Active", 
    subscriptionStatus: "Premium Active",
    lastActive: "2026-06-19",
    marketingConsent: true,
    purchaseHistory: [
      { id: "o-601", date: "2026-05-22", title: "Upanishads Collection (Physical)", price: 799, type: "Physical" }
    ]
  },
  { 
    id: "7", 
    name: "Meena Krishnan", 
    email: "meena.krishnan@example.com", 
    phone: "+91 32109 87654", 
    joinedDate: "2025-05-20", 
    libraryCount: 8, 
    orderCount: 1, 
    totalSpent: 850, 
    status: "Suspended", 
    subscriptionStatus: "None",
    lastActive: "2026-02-10",
    marketingConsent: true,
    purchaseHistory: [
      { id: "o-701", date: "2025-06-12", title: "Bhagavad Gita (Digital)", price: 299, type: "Digital" }
    ]
  },
  { 
    id: "8", 
    name: "Arjun Mehta", 
    email: "arjun.mehta@example.com", 
    phone: "+91 21098 76543", 
    joinedDate: "2024-01-18", 
    libraryCount: 39, 
    orderCount: 7, 
    totalSpent: 9340, 
    status: "Active", 
    subscriptionStatus: "Basic Active",
    lastActive: "2026-06-22",
    marketingConsent: true,
    purchaseHistory: [
      { id: "o-801", date: "2026-02-28", title: "Ramayana (Physical)", price: 699, type: "Physical" }
    ]
  },
];

const STORAGE_KEY = "amrita_users_store";
const EVENT_KEY = "amrita_users_updated";

export function getUsers(): User[] {
  if (typeof window === "undefined") return INITIAL_USERS;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  try {
    const parsed: User[] = JSON.parse(saved);
    // Ensure marketingConsent is populated if previously missing
    let modified = false;
    const enriched = parsed.map(u => {
      if (typeof u.marketingConsent === "undefined") {
        modified = true;
        return { ...u, marketingConsent: u.name !== "Sneha Reddy" };
      }
      return u;
    });
    if (modified) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
    }
    return enriched;
  } catch (e) {
    return INITIAL_USERS;
  }
}

export function saveUsers(users: User[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  window.dispatchEvent(new Event(EVENT_KEY));
}

export function updateUserConsent(userId: string, consent: boolean, reason = "Admin manual toggle"): User | null {
  const users = getUsers();
  let updatedUser: User | null = null;
  const nextUsers = users.map(u => {
    if (u.id === userId) {
      updatedUser = { ...u, marketingConsent: consent };
      return updatedUser;
    }
    return u;
  });

  if (updatedUser) {
    saveUsers(nextUsers);
    addAuditLog(
      "Users",
      `Marketing email consent updated for "${(updatedUser as User).name}" (${(updatedUser as User).email}): ${consent ? "Opted In" : "Opted Out"} (${reason})`,
      consent ? "info" : "warning"
    );
  }
  return updatedUser;
}

export function updateUser(updated: User) {
  const users = getUsers();
  const nextUsers = users.map(u => (u.id === updated.id ? updated : u));
  saveUsers(nextUsers);
}
