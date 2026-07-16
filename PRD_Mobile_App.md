# Product Requirement Document (PRD)
## Amrita Books Mobile Application (Digital Reader Companion)

**Document Version:** 1.1.0  
**Date:** July 16, 2026  
**Status:** Draft  
**Author:** AI Pair Programmer  

---

## 1. Executive Summary & Objectives
The **Amrita Books Mobile Application** is a companion digital eReader designed for iOS and Android platforms. The Mobile App has **no sign-up/registration flows** and **no checkout/billing payment flows**. It functions exclusively as a gated interface for users who have either purchased digital books (eBooks) or hold active subscriptions through the web portal. 

Its features are strictly limited to:
1. **Library**: Accessing, managing, and reading added eBooks (including offline downloads).
2. **Explore**: Browsing/searching the catalog and adding subscribable books directly to the library.
3. **Notifications**: Receiving and viewing admin-dispatched push alerts.

---

## 2. Gated Authentication & Personas
- **Allowed Users**: Customers with at least one digital eBook purchase, or members with an active, unexpired subscription plan.
- **Prohibited Users**: General public, guests, and users without digital entitlements.
- **Sign-up Restriction**: All user accounts must be registered on the Web Portal. Logging in checks credentials; if valid but the user has no digital ownership or active subscription, access is blocked with an explanation redirecting them to the Web Store.

---

## 3. Core Module Requirements

The mobile app layout is structured around 3 primary tabs: **Library**, **Explore**, and **Notifications** (plus a settings slide-out/modal).

```
┌─────────────────────────────────────────┐
│  [Explore / Search]                     │
├─────────────────────────────────────────┤
│                                         │
│               Main View                 │
│         (Library / Explore / Alerts)    │
│                                         │
├─────────────────────────────────────────┤
│  [Library]     [Explore]  [Notifications]│
└─────────────────────────────────────────┘
```

### 3.1 Gated Login Page
- Email and password inputs with authentication validation.
- Restricted accounts show a warning overlay:
  > **Access Restricted**  
  > The Amrita Books Mobile App is a companion eReader reserved for eBook owners and active subscribers. Please purchase an eBook or subscribe on our website to continue.

### 3.2 Library Tab (My Books & eReader)
- **Library Grid**: Displays covers of books currently in the user's library (either purchased or added from the Explore tab).
  - Tapping a book opens the eReader.
  - Includes a download trigger to pull books locally to the device for secure **Offline Reading**.
- **Secure Offline DRM**: Downloaded files are encrypted (AES-256) inside the app's local sandbox, preventing external file extraction.
- **Built-in eReader**:
  - Full-screen distraction-free reader canvas.
  - Page-turning swipe gesture or margin taps.
  - Customizer Panel: Theme toggles (Light, Sepia, Night), font sizing, and font selection.
  - Bookmarks & Highlights: Save quotes and earmark page counts. Syncs to cloud when online.

### 3.3 Explore Tab (Discover & Add Books)
- **Catalog Browsing**: Lists the digital books available in the Amrita Books catalog. Allows filtering by language, category, or title search.
- **"Add to Library" Action**:
  - **For Active Subscribers**: Digital-subscribable books feature an **[ Add to Library ]** button. Clicking this instantly updates their subscription library state and adds the book to their Library tab without any checkout forms.
  - **For Non-Subscribers**: Shows a disabled status or a **[ Purchase on Website ]** notice for purchasable eBooks that are not owned.

### 3.4 Notifications Tab (Inbox Ledger)
- Displays a chronological list of push alerts sent from the Admin Portal (e.g. Satsang announcements, new book releases).
- Integrates with FCM (Firebase Cloud Messaging) and APNs (Apple Push Notification service) to receive background alerts.
- Tapping a notification redirects the user to the target book page inside the Explore tab or immediately opens it in the eReader if it's already in their Library.

### 3.5 Settings Modal
- Renders read-only user account information.
- Storage utility: Displays disk space occupied by cached books, with a "Clear Downloaded Files" option.
- Manual sync trigger and Log Out.

---

## 4. Technical Workflows & Sync Engine

### 4.1 "Explore & Add" Subscription Sync Flow
```mermaid
sequenceDiagram
  actor Subscriber as User
  participant Mobile as Mobile App Client
  participant API as API Server
  participant Storage as localStorage / Database

  Subscriber->>Mobile: Open Explore Tab & Search Book
  Mobile->>API: Fetch Book Metadata & Check Subscription Status
  API-->>Mobile: Book details (Subscribable) + Status (Active)
  Mobile-->>Subscriber: Renders "Add to Library" Button
  Subscriber->>Mobile: Click "Add to Library"
  Mobile->>API: Request addition of Book ID to User Library
  API->>Storage: Record User ID <-> Book ID mapping in subscription catalog
  API-->>Mobile: Confirmed (Success)
  Mobile->>Mobile: Add Book to local Library cache
  Mobile-->>Subscriber: Show Toast: "Added to Library!"
```

### 4.2 Syncing Engine
- Handles syncing of reading progress (page indexes, bookmarks, highlights) between the Web and Mobile app.
- Checks subscription validations periodically; if a user's subscription expires on the Web database, the Mobile app locks access to downloaded subscription books.
