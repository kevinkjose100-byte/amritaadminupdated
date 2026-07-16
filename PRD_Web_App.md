# Product Requirement Document (PRD)
## Amrita Books Web Application (Responsive Customer Portal)



## 1. Executive Summary & Objectives
The **Amrita Books Web Application** is the customer-facing storefront and digital reading platform for Amrita Books. It is a responsive, mobile-first web app designed to let users explore the literature catalog, purchase physical books, buy or subscribe to digital eBooks, track orders, manage profiles, and read publications directly in their web browser.

### Core Goals:
1. **Premium Responsive storefront**: Provide a simple, fast checkout process across mobile, tablet, and desktop screens.
2. **Immersive Digital Reader**: Feature a distraction-free, customizable in-browser eBook reader with layout controls, bookmarks, and night themes.
3. **Flexible Subscriptions & Purchases**: Support both single-item physical/digital purchases and monthly/annual subscription plans to access the digital catalog.
4. **Customer Hub**: Provide a unified account dashboard to review purchase histories, track delivery consignments, save delivery addresses, and set notification alerts.

---

## 2. Core Functional Architecture
The Web Application operates as a responsive web experience with simulated services that mimic live systems:
- **Client Navigation**: Dynamic routing that adapts layout structures based on the user's active viewport width.
- **Persistent User Session**: Remembers user authentication status, shopping cart items, reading progress, and address books across browser reloads.
- **Payment Verification**: A checkout simulator that validates card parameters and models payment processing states (successful transitions, loading states, and error validations).

---

## 3. Common UI & Layout Features

### 3.1 WebNav (Desktop/Tablet Navigation Header)
- **Desktop Layout**: A sticky navigation header with a glassmorphic blurred background. Features a prominent search input field, shopping cart status (with numerical item counter), and a profile menu link.
- **Tablet Layout**: Replaces the full search bar with a toggleable search icon and rearranges primary navigation links into a scrollable horizontal toolbar below the logo.
- **Scroll Response**: The header increases in visual density (higher opacity and increased background blur) as the user scrolls down the page.

### 3.2 BottomNav (Mobile Navigation Footer)
- **Mobile Layout**: Displayed on narrow screens instead of the header WebNav. Renders a sticky navigation bar at the bottom containing 4 primary tabs: Home, Browse, Library, and Profile.

### 3.3 Footer
- **Desktop/Tablet Layout**: Multi-column menu grid displaying quick-access links (About, Terms, Help, FAQs, Contact, Publish With Us), language selections, and copyright information. Hidden on mobile viewports.

### 3.4 Login Modal
- An authentication popup overlay triggered when an unauthenticated guest user attempts to access restricted areas (e.g. checkout, library, or settings pages). Logs the user in instantly upon successful validation.

---

## 4. Detailed Module Requirements

### 4.1 Homepage
#### Overview & Purpose
The primary storefront landing page. It introduces the catalog, showcases quotes, displays trending items, and highlights subscription packages.

#### UI & Layout
- **Hero Banner**:
  - Left column: Large editorial heading, descriptive subtext, and double call-to-actions ("Browse Collection" and "Subscribe").
  - Right column: "Continue Reading" indicator card (renders the user's active eBook cover, reading progress percentage bar, and a resume reading button).
- **Wisdom Slideshow Carousel**:
  - An interactive carousel displaying curated quotes, quote citations (indicating source book and page number), authors, and linked book covers.
  - Automatically rotates slides every 8 seconds, pausing when the user's cursor hovers over the card.
  - Features manual left/right navigation arrows.
  - Uses dynamic theme background graphics that change based on the active slide quote (e.g. still lake, golden forest, mountain mist).
- **Book Showcase Sections**:
  - Lists books in responsive grids (5-6 columns on desktop, 4 columns on tablet, 2 columns on mobile).
  - Book cards feature cover images with hover scale effects, titles, authors, and language labels.
- **Browse by Category Grid**:
  - Grid of card items containing category emojis and titles with hover lift transitions.
- **Subscription Promo Card**:
  - A prominent callout card highlighting pricing, plan benefits, and access permissions.

---

### 4.2 Book Details Page (BDP)
#### Overview & Purpose
Presents comprehensive catalog metadata, formats, and actions for individual books.

#### UI & Layout
- **Split Grid Layout (Desktop)**:
  - Left Column: A sticky, large book cover display with depth shadows.
  - Right Column: Title, author, format toggles, synopsis text, publishing details (ISBN, pages, dimensions), and checkout CTAs.
- **Synopsis Section**: A collapsible description panel. Text longer than 420 characters is truncated with a gradient fade and a "Read more / Read less" toggle.
- **Selectors**:
  - **Language Selector**: Tab selections to switch between translation editions (e.g. English, Malayalam, Hindi, Tamil).
  - **Format Selector**: Option to toggle between **Digital (eBook)** and **Physical (Printed Book)** formats.
- **Fulfillment CTAs**:
  - *Digital format*: Displays "Read Sample" (opens eBook reader in guest mode) and "Subscribe to Read" (redirects to subscriptions page) or "Buy eBook" (launches digital payment screen).
  - *Physical format*: Displays "Add Physical to Cart" (adds printed book to cart with an animated success banner).

---

### 4.3 Category Browsing & Listing
#### Overview & Purpose
Organizes catalog browsing using main category folders, subcategories, and search-focused book lists.

#### UI & Layout
- **Categories Page**: Grid of large card layouts displaying categories with icons, titles, and descriptions.
- **Subcategories Page**: Finer sub-grids mapping specific genres (e.g. Satsangs, Spiritual Treatises, Children's Books).
- **Book Listing Page**:
  - Desktop: Displays a left-hand sticky filter panel (allows filtering by language, format, and price) alongside the book grid.
  - Mobile: Replaces the sticky sidebar with a floating "Filters" button that triggers a slide-up bottom drawer.
  - Top Control Bar: Displays active filter tags (with click-to-remove close buttons) and sort filters.

---

### 4.4 Search Page
#### Overview & Purpose
Provides search input and filtering to locate books in the catalog.

#### UI & Layout
- **Search Workspace**:
  - Desktop: Double-column layout with a left filter panel and right results grid.
  - Mobile: Stacked results with a floating filter drawer button.
- **Autocomplete & Suggestions**: When the search input is empty, displays a history ledger of "Recent Searches" and a horizontal shelf of "Popular Books".

---

### 4.5 My Library
#### Overview & Purpose
A customer's digital vault containing all purchased eBooks and subscribed collection items.

#### UI & Layout
- **Navigation Tabs**: "Continue Reading", "Purchased eBooks", and "Subscription Library".
- **Dashboard Highlights**: A prominent card showing the user's last read book cover, title, reading percentage progress, and a "Resume" button.

---

### 4.6 eBook Reader Workspace
#### Overview & Purpose
An immersive, distraction-free environment for reading digital books.

#### UI & Layout
- **Reader Shell**: A dedicated fullscreen view overlaying the portal interface.
- **Control Bars**:
  - Top Bar (Hidden by default, toggles on click or pressing Escape): Exit reading button, book title, bookmark switch, and settings menu.
  - Bottom Progress Track: A slider bar to jump pages, showing the active page number and total pages.
- **Settings Panel**: Slides down from the top bar, providing:
  - Theme Selection: **Light** (warm white background, dark text), **Sepia** (cream background, brown text), and **Dark** (black background, white text).
  - Font Size: A slider to scale text size to the reader's comfort.
- **Page Layout**: Clean columns with drop caps on chapter headings and smooth left/right page slide transitions.
- **Navigation Gestures**: Left side click/tap moves to the previous page; right side click/tap moves to the next page; center click/tap toggles the controls.

---

### 4.7 Shopping Cart & Checkout
#### Overview & Purpose
Manages physical item purchasing, shipping cost additions, coupon redemptions, and order generation.

#### UI & Layout
- **Cart Page**:
  - Left column: List of selected books with quantity controls and delete actions.
  - Right column: Summary panel displaying subtotal, estimated shipping, tax, **coupon code input field (with apply/remove toggles)**, active discount deductions, and a checkout button.
- **Coupon Redemption Module**:
  - Validates entered codes in real-time against active promotions.
  - Standardizes input by removing spaces and converting characters to uppercase.
  - Calculates and subtracts fixed amount discounts (e.g. -₹150) or percentage discounts (e.g. -15%).
  - Shows clear validation warnings for invalid, expired, or locked coupons (e.g., using a digital-only coupon for a physical book cart).
- **Fulfillment Checkout Steps**:
  1. **Shipping Address Step**: Renders saved address options. Allows choosing or inputting a new address.
  2. **Shipping Method Step**: Selects shipping speeds (e.g. Standard Shipping: 5-7 days vs. Express Shipping: 2-3 days).
  3. **Billing & Payment Step**: Inputs billing addresses and credit card details. Displays a payment processing loader page.
  4. **Confirmation Step**: Shows order success checkmarks, generated Order Reference Numbers, and estimated delivery dates.

---

### 4.8 Digital Checkout
#### Overview & Purpose
A streamlined billing system that bypasses physical shipping steps to checkout digital eBooks instantly.

#### UI & Layout
- **Billing Step**: Centered form prompting for name, email, billing address, and card details.
- **Processing Step**: A loading page warning the user not to close their browser during validation.
- **Confirmation Step**: Displays "Instant Access!" notification with a direct link to open the book in the eBook Reader.

---

### 4.9 Profile, Orders & Settings
#### Overview & Purpose
Allows customers to maintain personal profiles, track consignments, and set communication choices.

#### UI & Layout
- **Account Panel (Desktop Sidebar)**:
  - Account Details: Fields to edit profile name, email, phone, and password.
  - Saved Addresses: Card ledger of saved addresses with default designations.
  - Order History: List of past orders showing fulfillment states (`Processing`, `Shipped`, `Delivered`, `Completed`). Includes a "Track Shipment" option:
    - **Order Tracking**: Renders a delivery status timeline with shipping milestones (Standard or Express courier updates).
  - Notifications Settings: Checkbox controls to toggle optional notifications (newsletters, new releases) while keeping essential notifications locked on.

---

## 5. Non-Functional Requirements

### 5.1 Layout Breakpoints & Spacing
- **Responsive Layout**: Adapts between mobile viewports (bottom tab navigation, floating filter sheets), tablet viewports (horizontal pill headers, medium grids), and desktop viewports (sticky headers, sidebar grids, split pages).
- **Typography Hierarchy**: Distinct serif typographies for headings and reader pages to mimic printed volumes, and sans-serif fonts for labels, forms, and input fields.
- **Animations**: Subtle, hardware-accelerated transitions for side menu sliders, page turns, and warning banners.
