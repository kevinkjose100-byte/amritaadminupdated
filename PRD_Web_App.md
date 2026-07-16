# Product Requirement Document (PRD)
## Amrita Books Web Application (Responsive Customer Portal)

**Document Version:** 1.0.0  
**Date:** July 16, 2026  
**Status:** Draft  
**Author:** AI Pair Programmer  

---

## 1. Executive Summary & Objectives
The **Amrita Books Web Application** is the customer-facing storefront and digital reading platform for Amrita Books. It is designed as a responsive, mobile-first web app that allows spiritual seekers and readers to browse the literature catalog, buy physical books, purchase or subscribe to digital eBooks, track their orders, manage personal profiles, and read publications directly in their web browsers.

### Core Goals:
1. **Premium Responsive Shopping Storefront**: Provide a visual, fast, and easy-to-use checkout process across mobile, tablet, and desktop viewports.
2. **Immersive Digital Reading Experience**: Feature a distraction-free, customizable in-browser eBook reader supporting font size adjustments, bookmarks, and display themes.
3. **Flexible Subscriptions & Purchases**: Allow users to purchase single physical/digital books or subscribe to access the entire digital library.
4. **Synchronized Customer Hub**: Offer a unified profile interface where users can review orders, track parcel shipments, maintain address books, and configure notification preferences.

---

## 2. System Architecture & Local State
The Web Application is structured as a React Single Page Application (SPA) compiled using Vite and Tailwind CSS.
- **Client Routing**: Managed via `react-router` mapping paths to responsive page layouts.
- **State Management**: Powered by React Contexts (e.g. `AuthContext`) and local storage bindings to maintain persistent user states (e.g. `amrita_auth` token, cart contents, library records, and address directories).
- **Payment Simulator**: Incorporates client-side integrations simulating Razorpay payment processing for physical checkouts and digital-only checkouts.

---

## 3. Layout & Common Components

### 3.1 WebNav (Desktop/Tablet Navigation)
- **Desktop (1024px+)**: Sticky top bar with a glassmorphic blurred background, central search bar (380px wide, rounded, inline inputs), shopping cart with numeric item count badges, and profile links.
- **Tablet (640px - 1023px)**: Condenses central navigation links into a scrollable horizontal pill strip below the logo row, replacing the search input with a toggleable search icon.
- **Aesthetic Effects**: Background opacity transitions from `0.85` to `0.92` and backdrop blur scale increases from `12px` to `16px` dynamically on scroll.

### 3.2 BottomNav (Mobile Navigation)
- **Mobile (<640px)**: Renders a sticky glassmorphic bottom bar containing 4 primary navigation tabs: Home, Browse, Library, and Profile.

### 3.3 Footer
- **Desktop/Tablet**: Multi-column grid containing quick links (About, Terms, Help, FAQ, Contact, Publish With Us), copyright notices, and language selectors. Hidden on mobile viewports.

### 3.4 Login Modal
- Global popup overlay triggered whenever an unauthenticated visitor tries to checkout, view their library, or manage settings. Integrates with `AuthContext` to set local token `amrita_auth` on successful entry.

---

## 4. Detailed Module Requirements

### 4.1 Homepage
#### Overview & Purpose
Serves as the storefront landing page. It introduces the spiritual collection, highlights quotes from Amma, showcases trending items, and offers digital subscription packages.

#### UI & Layout
- **Hero Section**:
  - Left column: Large 52px Newsreader heading, descriptive text, and double CTAs ("Browse Collection" and "Subscribe").
  - Right column: "Continue Reading" indicator card (white card with shadow, book cover, reading progress bar, and CTA to open reader).
- **Wisdom Slideshow Carousel**:
  - Interactive quotes slider displaying selected spiritual quotes, citations (citations match page numbers, e.g. `Page 42`), author names, and linked book covers.
  - Automatically transitions slide positions every 8 seconds, pausing on mouse hover.
  - Responsive navigation indicators (chevron arrows) for manual sliding.
  - Dynamic backgrounds configured by the active quote theme ( lake landscapes, mountain vistas, soft blooms, or golden forests).
- **trending / New Releases Sections**:
  - Renders books in multi-column grids: 2 columns on mobile, 4 columns on tablet, and 5-6 columns on desktop.
  - Book cards show high-quality cover images with hover scale effects, titles, authors, and language category tags.
- **Browse by Category Grid**:
  - Icon-based cards arranged in a grid (mobile: 2 columns, tablet: 3 columns, desktop: 6 columns) containing category emojis and titles with hover lift transitions.
- **Subscription Promo Banner**:
  - A full-width gradient card with call-to-actions, pricing callouts, and benefits grids.

---

### 4.2 Book Details Page (BDP)
#### Overview & Purpose
Provides comprehensive metadata, previews, and purchase formats for individual books.

#### UI & Layout
- **Desktop Split Grid (`lg:grid-cols-2`)**:
  - Left Column: Sticky, large book cover (400px x 600px) with depth shadows.
  - Right Column: Title, author, format selectors, synopsis accordion, detail specifications (ISBN, publisher, pages, publication date), and action CTAs.
- **Synopsis Section**: Accordion panel that truncates descriptions exceeding 420 characters or 4 paragraphs, showing a "Read more / Read less" toggle with gradient fades.
- **Selectors**:
  - **Language Selector**: Inline pill buttons for available translation editions (English, Malayalam, Hindi, Tamil).
  - **Format Selector**: Toggle buttons between **Digital (eBook)** and **Physical (Printed Book)**.
- **Action CTAs Stack**:
  - Toggling formats dynamically updates prices and CTAs:
    - *Digital eBook*: Displays "Read Sample" (opens Reader in guest mode) and "Subscribe to Read" (redirects to subscriptions page) or "Buy eBook" (opens Digital Checkout).
    - *Physical Book*: Displays "Add Physical to Cart" (places printed version in shopping cart with animated success feedback).

---

### 4.3 Category Browsing & Listing
#### Overview & Purpose
Facilitates structured catalog exploration via main categories, subcategories, and search-focused listing pages.

#### UI & Layout
- **Categories Page**: Grid of large card layouts displaying category cards with icons, titles, and descriptions.
- **Subcategories Page**: Finer sub-grids mapping specific genres (e.g. Satsangs, Spiritual Treatises, Children's Books).
- **Book Listing Page**:
  - Left Sidebar: Always-visible sticky filter panel on desktop (toggles for languages, formats, pricing ranges).
  - Mobile Filter Sheet: Slides up from the bottom as a bottom drawer overlay.
  - Top Control Bar: Active filter tag pills (with single-click remove buttons) and sort selection dropdowns.
  - Product Grid: 3-4 column grid mapping matching books.

---

### 4.4 Search Page
#### Overview & Purpose
Enables users to search the storefront database with filters and quick suggestion listings.

#### UI & Layout
- **Search Header**: Full-width search input bar displaying suggestions.
- **Responsive Workspace**:
  - Desktop: Sidebar filters layout (`lg:grid-cols-[280px_1fr]`).
  - Mobile: Full-width stacked listing with a floating "Filters" action button triggering a bottom sheet.
- **Suggestion Sections**: Loaded when search input is empty. Shows "Recent Searches" history and a horizontal strip of "Popular Books".
- **Active State**: Displays grid cards of search matches.

---

### 4.5 My Library
#### Overview & Purpose
The customer's digital vault. Houses all purchased digital content and subscribed library volumes.

#### UI & Layout
- **Navigation Tabs**: "Continue Reading", "Purchased eBooks", and "Subscription Library".
- **Dashboard Widgets**:
  - "Continue Reading" Spotlight: Large layout card showing the last read eBook cover, title, reading percentage progress, and a "Resume Reading" button.
- **Book Grids**: Display owned items in responsive grids (5-6 columns on desktop, 2-3 columns on mobile).

---

### 4.6 eBook Reader Workspace
#### Overview & Purpose
The core in-browser digital reading application. Offers custom themes, page controls, and fullscreen layouts.

#### UI & Layout
- **Reader Shell**: Fixed, fullscreen layout overlay.
- **Controls Panel**:
  - Top Bar (Hidden by default, shown on tap/center click/Escape): Left exit button, title indicator, bookmark toggle, and right Settings button.
  - Bottom Progress Track: Drag slider to adjust page ranges, displaying active page number (e.g. `Page 142`) and total pages.
- **Settings Sheet**: Slides down from the top bar. Options:
  - Theme Selection: **Light** (warm white background, dark gray text), **Sepia** (cream background, brown text), and **Dark** (charcoal background, white text).
  - Font Size Slider: Adjusts font size dynamically (binds font size style from 14px to 32px).
- **Editorial Layout**: Centers text columns with drop caps on chapter starts and page-flip animations (left/right slide sweeps).
- **Navigation**: Left 30% screen tap moves to previous page; right 30% screen tap moves to next page; center tap toggles control bars.

---

### 4.7 Shopping Cart & Checkout
#### Overview & Purpose
Manages purchase checkouts for physical items, calculated shipping costs, and payment gateways.

#### UI & Layout
- **Cart Page**:
  - Left column: List of item cards with quantity selectors and remove actions.
  - Right column: Sticky order summary panel detailing subtotal, estimated shipping, tax, and a "Proceed to Checkout" button.
- **Physical Checkout Steps**:
  1. **Shipping Address Step**: Renders a grid of saved address cards. Includes selection indicator badges and a "+ Add New Address" form.
  2. **Shipping Method Step**: Displays shipping method options (Standard Shipping: 5-7 days for $4.99; Express Shipping: 2-3 days for $14.99).
  3. **Billing & Payment Step**: Optional "Billing address same as shipping" toggle. Input fields for credit card details. Shows payment processing loader page.
  4. **Confirmation Step**: Displays success check animation, generated Order Number, estimated delivery date, summary, and "Back to Home" action.

---

### 4.8 Digital Checkout
#### Overview & Purpose
Bypasses physical shipping forms to handle instant checkouts for digital eBooks.

#### UI & Layout
- **Billing Step**: Centered max-width 600px form prompting for name, email, billing address, and credit card credentials.
- **Processing Step**: Fullscreen loader displaying "Processing your payment... Please do not close this page".
- **Confirmation Step**: Displays "Instant Access!" title, digital receipt card with book cover, and a direct "Start Reading Now" action button.

---

### 4.9 Profile, Orders & Settings
#### Overview & Purpose
Allows users to edit details, manage addresses, review orders, and toggle notifications.

#### UI & Layout
- **Sidebar Layout (Desktop)**: Left vertical tab bar (Account Details, Saved Addresses, Order History, Notifications Preferences, Language Preferences) linked to right content details cards.
- **Account Details**: Input fields to edit profile name, email, phone, and change passwords.
- **Saved Addresses**: List of address cards with "Edit", "Delete", and "Set Default" actions.
- **Order History**: List of past orders displaying status badges (`Processing`, `Shipped`, `Delivered`, `Completed`). Includes "Track Shipment" button:
  - **Order Tracking**: Renders customer-facing shipment status milestone timeline (simulated DTDC/India Post details matching tracking codes).
- **Notifications Preferences**:
  - Toggles for Essential Notifications (Order updates, security alerts - locked active).
  - Toggles for Optional Notifications (New releases, newsletters, promotional offers).
  - Device-level warnings indicating if push alerts are enabled.

---

## 5. Non-Functional Requirements

### 5.1 Responsiveness Breakpoints
- **sm (640px)**: Transitions from mobile BottomNav to desktop/tablet header WebNav.
- **md (768px)**: Expands grid column counts (e.g. 2 to 3 column books).
- **lg (1024px)**: Enables split column views (BDP, Settings, Cart) and sticky elements.
- **xl (1280px)**: Visual container max-width set to 1400px.

### 5.2 Aesthetics & Styling
- **Color Palette**: Warm editorial tones (canvas colors `#faf9f8`, muted browns `#795343`, and deep greens `#446161`).
- **Typography**: Editorial serif typography for headings and book content (Newsreader/Playfair) and clean sans-serif for interface controls (Inter/Roboto).
- **Animations**: Soft fades (`transition-all duration-300`), slide-down menus, and scale hover states.

---

## 6. Future Roadmap
1. **Real-time Synchronization**: Bind local storage state engines with remote database servers to synchronize reading progress, bookmarks, and libraries across devices.
2. **Offline Reading Mode**: Support service worker caching to allow reading downloaded EPUB/PDF eBooks inside the browser offline.
3. **Gift Subscriptions**: Allow customers to purchase subscription vouchers to email to friends or monastic members.
