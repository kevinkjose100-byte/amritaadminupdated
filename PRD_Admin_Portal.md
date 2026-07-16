# Product Requirement Document (PRD)
## Amrita Books Admin Portal (Updated)

**Document Version:** 1.2.0  
**Date:** July 16, 2026  
**Status:** Approved  
**Author:** AI Pair Programmer  

---

## 1. Executive Summary & Objectives
The **Amrita Books Admin Portal** is the central operational core for Amrita Books. It provides administrators, monastic members, and fulfillment staff with the necessary interfaces to manage physical and digital catalog items, track customer orders, process subscriptions, configure regional pricing structures, review OCR eBook conversions, administer coupons, monitor financial transactions, and govern team access controls.

### Core Goals:
1. **Catalog Integrity & Multi-Lingualism**: Support physical/digital format configurations, localized metadata for language editions, and regional currency price overrides.
2. **Efficient Order Fulfillment**: Streamline physical shipments, courier updates, and multi-tier refund processing (full and partial).
3. **Advanced Subscription Lifecycle Control**: Enable plan definitions, manual assignments, complimentary passes, and granular validity adjustments (extensions, plan changes, revocation).
4. **OCR Verification Workspace**: Provide a side-by-side editing interface to review automated OCR text extractions before digital publication.
5. **Auditing & Access Security**: Guard administration actions with Role-Based Access Control (RBAC) and record all configuration updates in a central audit ledger.

---

## 2. Core System Integrations
The Admin Portal processes management requests and connects with several key external simulators:
- **Courier Shipping Services**: Validates courier tracking codes (India Post tracking codes ending in "IN" and DTDC Express tracking codes starting with "N" followed by 8 digits) to automate order status updates upon shipment.
- **Payment Gateway Interface**: Models payment status modifications, Razorpay processing flows, and refund adjustments (deducting partial or full totals from the parent order receipt).
- **OCR eBook Analyzer**: Extracts raw text blocks from document uploads, flags character confidence statistics, and segments page layouts into the proofreading review queue.

---

## 3. Common UI & Layout Features
- **Permission-Based Sidebar**: Restricts accessible page navigation links dynamically based on the logged-in administrator's profile.
- **Role Simulation Control**: A dropdown console at the bottom of the sidebar that allows staff to switch simulated profiles (e.g. Super Admin, Catalog Manager, or Inventory Staff) to verify access control layouts.
- **Account Deactivation Shield**: If the active administrator profile status is changed to "Inactive", all routes are immediately locked, displaying a full-screen deactivation card blocking further access.

---

## 4. Detailed Module Requirements

### 4.1 Dashboard
#### Overview & Purpose
The homepage dashboard displaying revenue counters, active subscription counts, pending order lists, and critical operations alerts.

#### UI & Layout
- **Metrics Grid**: Displays active subscribers count (with monthly trend indicators), gross revenue calculations, and pending order tallies.
- **Visual Trends**: An area chart plotting 6-month gross revenue performance and a vertical bar chart comparing order counts across days of the week.
- **Operations Alert Ledger**: Alerts for low-stock SKUs or failed courier deliveries. Alerts include severity badges (Warning/Danger) and action links ("View" details or "Resolve" to clear the alert).

#### Functional Requirements
- Monthly comparison percentages calculate automatically comparing the current month to date against the previous month's final total.
- Resolving an alert purges it from the list and decreases the alerts notification badge.

---

### 4.2 Catalog Management (Including OCR Review Workspace)
#### Overview & Purpose
Maintains book listings, languages, formats, pricing matrices, and eBook files.

#### UI & Layout
- **Catalog Ledger**: A searchable grid table supporting filters for language variants, formats, regions, and categories. Includes a bulk selector tool.
- **Bulk Adjustments Drawer**: Allows applying status changes, deletes, or bulk discounts (percentage or fixed amount values) across selected books.
- **Book Composer Form**:
  - Book Information: Common details (Title, Author search with inline addition tool, Category hierarchy checkbox tree, and Featured toggle).
  - Language Accordion: Renders variant forms per language (cover image uploader, localized summaries, format configurations).
  - Format Toggles:
    - *Digital eBook*: Renders ISBN fields, pricing, and document file upload area. Displays OCR stats (page count, confidence rating, page health metrics).
    - *Physical Book*: SKU, base and sale prices, stock units, weight, dimensions, and regional shipping rates.
  - Regional Pricing Grid: Multi-country grid (India, US, Europe, Rest of World) allowing specific price overrides and price-copy shortcuts.

#### OCR Review Workspace
- **Layout**: A dedicated editing canvas:
  - Left strip: Vertically lists pages with status markers (Clean/Warning/Critical).
  - Center workspace: Three views (Scanned Page PDF, Editable Extracted Text, Side-by-Side compare).
  - Right console: Page stats, warning checklists, re-run buttons, and publish gates.
- **Functional Gate**: The "Publish Live" button is disabled if any pages contain unresolved "Critical" errors.

---

### 4.3 Spotlight Banner Management
#### Overview & Purpose
Configures featured carousel slides, citations, and CTAs displayed on the store homepage.

#### UI & Layout
- **Banner Form**: Inputs for titles, quotes, author names, quote page citations, background preset selectors, and custom image uploads.
- **Sequence Manager**: Drag handles to reorder banner sequences, and active toggles to show/hide slides.
- **Mockup Slider**: A live interactive preview mimicking the store carousel to preview banners.

---

### 4.4 Author Management
#### Overview & Purpose
Maintains bio profiles of authors and spiritual guides.

#### UI & Layout
- **Author Grid**: Displays author profiles, avatars, and count of associated books.
- **Bio Modal**: Text editor for biographies, status selectors, and profile photo uploaders.
- **Business Rule**: Deleting an author profile is blocked if they are linked to active books in the catalog.

---

### 4.5 Order Management
#### Overview & Purpose
Processes physical order shipments, digital deliveries, and refunds.

#### UI & Layout
- **Order Filters**: Tabs to segregate physical, digital, and subscription orders. Searchable by Order ID, customer details, or payment statuses.
- **Fulfillment Console**:
  - Toggles shipping status and courier tracking numbers.
  - Supports India Post tracking validation (must end in "IN") and DTDC Express validation ( consignment numbers starting with 'N'/'n' followed by 8 digits).
  - DTDC tools: Generate Shipping Label, Print Shipping Label (PDF preview panel), and Cancel Shipment.
- **Refund Console**: 
  - Full refund action tool.
  - Partial refund drawer: Selectable item checkboxes, quantity adjustments, auto-calculated refund subtotal, and refund history logging.

---

### 4.6 Tracking System
#### Overview & Purpose
Monates shipment transit states using carrier integrations.

#### UI & Layout
- **Consignment Tracking**: Milestone timeline displaying event locations, dates, and status descriptors.
- **Business Rule**: Setting a timeline status to "Delivered" automatically marks the parent order status as "Completed".

---

### 4.7 User Management
#### Overview & Purpose
Lists store customer profiles, purchase logs, and owned digital libraries.

#### UI & Layout
- **User Directory**: Summary of member name, email, location, owned library count, and total lifetime spend.
- **User Profile Modal**: Displays customer detail cards, digital book ownership lists, and a "Send Password Reset Link" simulator.

---

### 4.8 Subscription Management
#### Overview & Purpose
Configures membership plans and manages subscriber accounts.

#### UI & Layout
- **Plans Grid**: Configures plan names, pricing currencies, active durations (e.g. 7, 30, 90, 180, 365 days), and regional price overrides.
- **Subscriber Directory**: Database listing user names, assigned plans, expiry dates, and subscription source labels (Purchased, Admin Assigned, Complimentary).
- **Entitlement Console**: Drawer menu containing options to extend validity (+7, +30, +90 days), change plans, cancel subscriptions, or revoke access.

---

### 4.9 Coupon Management
#### Overview & Purpose
Runs promotional discount codes and sales campaigns.

#### UI & Layout
- **KPI Summary Row**: Tracks active coupon counts, total redemptions, and customer discount savings.
- **Coupon Form**: Codes validator (automatic uppercase formatting), discount types (percentage or fixed amount), order category targets, and usage limit counters.
- **Countdown Indicators**: Displays colored badges based on remaining validity (Red for Expired, Amber for Expiring within 7 days, Slate for Future).

---

### 4.10 Reports & Analytics
#### Overview & Purpose
Presents revenue and inventory reports for business metrics.

#### UI & Layout
- **Sales Analytics**: Area charts for revenue trends, pie charts for sales channels, and transaction lists.
- **Sub Report**: Subscriber retention metrics and active/expired counts.
- **Inventory Report**: SKU warning highlights and stock valuation tables.
- **Invoice tool**: Compiles printable invoice pages for current sales logs.

---

### 4.11 Pricing Models
#### Overview & Purpose
Maintains regional country groupings and currency codes.

#### UI & Layout
- **Region Groups**: Country cards showing currency codes and subscription rates.
- **Overlap Shield**: Blocks assigning a country to a group if it is already active in another pricing group.

---

### 4.12 Inventory Management
#### Overview & Purpose
Monitors physical stock counts across warehouse SKUs.

#### UI & Layout
- **Ledger Table**: Renders book SKUs, languages, formats, weights, and stock levels.
- **Low Stock Warn**: SKU rows with stock counts falling below 10 units are highlighted with alert badges.

---

### 4.13 Finance & Reporting
#### Overview & Purpose
Tracks transaction fees, payouts, and net earnings.

#### UI & Layout
- **Payout Cards**: Renders gross receipts, payment processor transaction fees, and net payouts.
- **Breakdown Charts**: Net revenue multi-line charts and payment type pie charts.

---

### 4.14 Role-Based Access Control (RBAC)
#### Overview & Purpose
Governs portal module privileges for internal staff accounts.

#### UI & Layout
- **Admin Directory**: Lists administrator profiles, roles, and allowed modules count.
- **Privilege Map**: Allows toggling access permissions across all 18 navigation routes.

---

### 4.15 Audit Logs
#### Overview & Purpose
Tracks security logs of administrative modifications.

#### UI & Layout
- **Logs Grid**: Log feed showing administrator name, role, timestamp, module source, description, and severity tier.
- **Clear Logs Action**: Red button requiring confirmation to flush security history logs.

---

### 4.16 Consignment Management
#### Overview & Purpose
Allows manual or CSV bulk uploads of courier tracking codes.

#### UI & Layout
- **Ingestion Panel**: Manual text composer form or drag-and-drop CSV upload zone.
- **Audit Table**: Logs status validations (Valid/Invalid tracking codes) showing format error explanations.

---

### 4.17 Bulk Ingestion Pipeline
#### Overview & Purpose
Batch uploader for digital PDF and ZIP eBook files.

#### UI & Layout
- **Ingestion Queue**: Progression stepper tracking uploading, extraction, draft creation, and publishing. Renders extraction logs and metadata mapping forms.

---

### 4.18 Push Notification Center
#### Overview & Purpose
Composes, targets, schedules, and previews manual push notifications.

#### UI & Layout
- **Compose Section**: Inputs for category type, target audience, title (65 chars limit), body text (180 chars limit), action links, and attachments.
- **Device Mockups**: Dynamic lockscreen mockup (iOS vs. Android theme toggles) that updates title, body, and image in real-time.
- **Sent History Tab**: Dispatched alerts log with resend templates and delete tools.
- **Scheduled Queue Tab**: Pending notifications schedule with force dispatch and cancellation controls.

---

## 5. Non-Functional Requirements

### 5.1 Security & Compliance
- **Session Rules**: Switching simulated roles updates routing permissions immediately.
- **Lockout Controls**: Inactive profiles are blocked from using dashboard menus.

### 5.2 Performance & Usability
- **Document Loading**: Text editing areas must handle large page counts smoothly.
- **Adaptive Layouts**: Management grids and timelines must resize cleanly across viewports.

### 5.3 Audit Records
- Changes to catalog pricing, subscription validity overrides, courier tracking assignments, and RBAC privileges must auto-generate entry logs in the Audit ledger.
