import { addAuditLog } from "./auditLogStore";

export interface EmailTemplate {
  id: string;
  name: string; // unique
  subject: string;
  preheader: string;
  body: string; // rich text / HTML with support for {{firstName}} & {{email}}
  headerImageUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type AudienceType = "individual" | "segment";
export type AudienceSegment = "all" | "subscribed" | "non_subscribed_no_past" | "non_subscribed_expired";

export interface EmailSend {
  id: string;
  templateId?: string; // which template was used, if any
  templateName?: string;
  subject: string;
  preheader: string;
  body: string;
  headerImageUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  audienceType: AudienceType;
  audienceSegment?: AudienceSegment;
  recipientIds?: string[]; // when audienceType === 'individual'
  recipientNames?: string[]; // display names
  recipientCount: number; // computed at send time, post-consent/status-filter
  sentBy: string;
  sentAt: string;
  status: "Sent";
}

export const AUDIENCE_SEGMENT_LABELS: Record<AudienceSegment, { label: string; description: string }> = {
  all: {
    label: "All Users",
    description: "Every customer regardless of subscription state (excludes inactive & opted-out)."
  },
  subscribed: {
    label: "Subscribed Users",
    description: "Customers with an active Premium or Basic subscription."
  },
  non_subscribed_no_past: {
    label: "Non Subscribed Users (No Past Subscription)",
    description: "Users who have never purchased a subscription."
  },
  non_subscribed_expired: {
    label: "Non Subscribed Users (Expired Subscription)",
    description: "Lapsed subscribers eligible for win-back campaigns."
  }
};

// Curated to customer-profile fields relevant for personalizing a promotional email.
// Deliberately excludes internal/sensitive fields (phone, totalSpent, account status, etc.)
// that don't belong in outbound marketing copy.
export const PERSONALIZATION_TOKENS: { value: string; label: string; title: string }[] = [
  { value: "{{firstName}}", label: "First Name", title: "Customer's first name" },
  { value: "{{email}}", label: "Email", title: "Customer's email address" },
  { value: "{{subscriptionPlan}}", label: "Subscription Plan", title: "Customer's current subscription plan (e.g. Premium Active, Basic Active, None)" },
  { value: "{{libraryCount}}", label: "Library Size", title: "Number of books in the customer's library" },
];

export const PRESET_HEADER_IMAGES = [
  { name: "None", url: "" },
  { 
    name: "Spiritual Teachings", 
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "New Book Release", 
    url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Festive Diya Offer", 
    url: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Ashram & Reading", 
    url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80" 
  },
];

export const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: "tpl-1",
    name: "New Release - In Amma's Splendor",
    subject: "Discover the Sacred Teachings: In Amma's Splendor",
    preheader: "Exclusive release now available in physical & digital editions.",
    body: `<p>Namah Shivaya <strong>{{firstName}}</strong>,</p>
<p>We are delighted to present the latest release from Swami Ramakrishnananda Puri: <em>In Amma's Splendor</em>. Dive into deep reflections, inspiring discourses, and practical spiritual wisdom for daily living.</p>
<p>Order your physical copy today or read instantly via the Amrita Books digital reader on web and mobile!</p>`,
    headerImageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    ctaLabel: "Explore Book Now",
    ctaUrl: "/catalog?search=In+Amma's+Splendor",
    createdBy: "Rajesh Kumar",
    createdAt: "2026-08-15 10:30",
    updatedAt: "2026-08-20 14:15"
  },
  {
    id: "tpl-2",
    name: "Festive Spiritual Offer (20% Off)",
    subject: "Special Celebration: 20% Off on Sacred Classics & Scriptures",
    preheader: "Use code FESTIVE20 at checkout for instant savings.",
    body: `<p>Dear <strong>{{firstName}}</strong>,</p>
<p>Celebrate this auspicious season with timeless spiritual knowledge. Enjoy <strong>20% off</strong> across our complete collection of Bhagavad Gita, Upanishads, and Ramayana commentaries.</p>
<p>This special offering is valid for all Amrita Books members for a limited time.</p>`,
    headerImageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80",
    ctaLabel: "Claim 20% Discount",
    ctaUrl: "/catalog",
    createdBy: "Priya Sharma",
    createdAt: "2026-08-25 11:00",
    updatedAt: "2026-08-28 09:40"
  },
  {
    id: "tpl-3",
    name: "Monthly Ashram Chronicles Newsletter",
    subject: "Amrita Ashram Chronicles: Reflections, New Satsangs & Audiobooks",
    preheader: "Your monthly digest of devotion, wisdom, and new arrivals.",
    body: `<p>Namaste <strong>{{firstName}}</strong>,</p>
<p>Welcome to this month's edition of the <strong>Ashram Chronicles</strong>. In this issue:</p>
<ul>
  <li>Highlights from the Guru Purnima meditation gathering.</li>
  <li>New guided audio meditation series added to the subscription library.</li>
  <li>Author spotlight featuring Swami Ramakrishnananda Puri.</li>
</ul>
<p>Thank you for walking this spiritual journey with us.</p>`,
    headerImageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    ctaLabel: "Read Complete Newsletter",
    ctaUrl: "/reports",
    createdBy: "Rajesh Kumar",
    createdAt: "2026-08-30 16:20",
    updatedAt: "2026-09-01 12:00"
  }
];

export const DEFAULT_SENDS: EmailSend[] = [
  {
    id: "send-1",
    templateId: "tpl-1",
    templateName: "New Release - In Amma's Splendor",
    subject: "Discover the Sacred Teachings: In Amma's Splendor",
    preheader: "Exclusive release now available in physical & digital editions.",
    body: `<p>Namah Shivaya <strong>{{firstName}}</strong>,</p><p>We are delighted to present the latest release from Swami Ramakrishnananda Puri: <em>In Amma's Splendor</em>.</p>`,
    headerImageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    ctaLabel: "Explore Book Now",
    ctaUrl: "/catalog?search=In+Amma's+Splendor",
    audienceType: "segment",
    audienceSegment: "all",
    recipientCount: 5, // 5 active, opted-in users
    sentBy: "Rajesh Kumar",
    sentAt: "2026-09-02 11:30",
    status: "Sent"
  }
];

const TEMPLATES_KEY = "amrita_email_templates";
const SENDS_KEY = "amrita_email_sends";

export function getEmailTemplates(): EmailTemplate[] {
  if (typeof window === "undefined") return DEFAULT_TEMPLATES;
  const saved = localStorage.getItem(TEMPLATES_KEY);
  if (!saved) {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(DEFAULT_TEMPLATES));
    return DEFAULT_TEMPLATES;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return DEFAULT_TEMPLATES;
  }
}

export function saveEmailTemplates(templates: EmailTemplate[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
}

export function getSentCampaigns(): EmailSend[] {
  if (typeof window === "undefined") return DEFAULT_SENDS;
  const saved = localStorage.getItem(SENDS_KEY);
  if (!saved) {
    localStorage.setItem(SENDS_KEY, JSON.stringify(DEFAULT_SENDS));
    return DEFAULT_SENDS;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return DEFAULT_SENDS;
  }
}

export function saveSentCampaigns(sends: EmailSend[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SENDS_KEY, JSON.stringify(sends));
}

export function createEmailTemplate(templateData: Omit<EmailTemplate, "id" | "createdAt" | "updatedAt">): EmailTemplate {
  const templates = getEmailTemplates();
  const now = new Date().toISOString().replace("T", " ").slice(0, 16);
  const newTemplate: EmailTemplate = {
    ...templateData,
    id: `tpl-${Date.now()}`,
    createdAt: now,
    updatedAt: now
  };
  const updated = [newTemplate, ...templates];
  saveEmailTemplates(updated);
  addAuditLog("Email Campaigns", `Created new email template "${newTemplate.name}"`, "success");
  return newTemplate;
}

export function updateEmailTemplate(id: string, updates: Partial<EmailTemplate>): EmailTemplate | null {
  const templates = getEmailTemplates();
  const now = new Date().toISOString().replace("T", " ").slice(0, 16);
  let updatedTemplate: EmailTemplate | null = null;
  const nextTemplates = templates.map(t => {
    if (t.id === id) {
      updatedTemplate = {
        ...t,
        ...updates,
        updatedAt: now
      };
      return updatedTemplate;
    }
    return t;
  });
  if (updatedTemplate) {
    saveEmailTemplates(nextTemplates);
    addAuditLog("Email Campaigns", `Updated email template "${(updatedTemplate as EmailTemplate).name}"`, "info");
  }
  return updatedTemplate;
}

export function deleteEmailTemplate(id: string): boolean {
  const templates = getEmailTemplates();
  const target = templates.find(t => t.id === id);
  if (!target) return false;
  const filtered = templates.filter(t => t.id !== id);
  saveEmailTemplates(filtered);
  addAuditLog("Email Campaigns", `Deleted email template "${target.name}"`, "error");
  return true;
}

export function recordEmailSend(sendData: Omit<EmailSend, "id" | "sentAt" | "status">): EmailSend {
  const sends = getSentCampaigns();
  const now = new Date().toISOString().replace("T", " ").slice(0, 16);
  const newSend: EmailSend = {
    ...sendData,
    id: `send-${Date.now()}`,
    sentAt: now,
    status: "Sent"
  };
  const updated = [newSend, ...sends];
  saveSentCampaigns(updated);
  
  const audienceLabel = newSend.audienceType === "segment" 
    ? AUDIENCE_SEGMENT_LABELS[newSend.audienceSegment || "all"].label 
    : `Individual Recipients (${newSend.recipientCount})`;

  addAuditLog(
    "Email Campaigns",
    `Sent email campaign "${newSend.subject}" to ${audienceLabel} (${newSend.recipientCount} recipients)`,
    "success"
  );
  return newSend;
}

export function deleteSentCampaign(id: string) {
  const sends = getSentCampaigns();
  const filtered = sends.filter(s => s.id !== id);
  saveSentCampaigns(filtered);
}
