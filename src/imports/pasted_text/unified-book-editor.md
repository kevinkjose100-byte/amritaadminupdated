Redesign the "Edit Book / Add Book" experience for the Amrita Books Admin Portal into a unified, single-screen product management interface inspired by professional WooCommerce and publishing CMS systems.

IMPORTANT CONTEXT:

* Current setup separates sections too much
* Admin should NOT navigate between multiple screens/tabs to manage a book
* Everything should be manageable from ONE unified editor screen
* The system supports:

  * Multi-language books
  * Digital and physical formats
  * Language-specific metadata
  * Global pricing/shipping controls
  * Inventory management

The experience should feel:

* Structured
* Operational
* Efficient for large-scale catalog management
* Similar to WooCommerce variable product management

---

## CORE GOAL

Create ONE unified product editing screen where:

* General book info
* Categories
* Pricing
* Inventory
* Language variants
* Digital versions
* Physical versions
* Shipping details
* Media uploads

can all be managed together without page switching.

---

## LAYOUT STRUCTURE

Use a 2-column admin layout.

LEFT SIDEBAR:
Persistent settings/navigation panel

RIGHT MAIN AREA:
Scrollable structured editor

---

## LEFT SIDEBAR MENU

Keep compact admin section navigation:

* General
* Languages
* Pricing
* Inventory
* Shipping Cost
* Media
* SEO
* Advanced

IMPORTANT:
These should NOT navigate away.

Clicking only scrolls to section anchors within same page.

---

## TOP HEADER

Top left:
"← Back to Catalog"

Main title:
"Edit Book"

Top right actions:
[ Save Draft ]
[ Preview ]
[ Publish / Update ]

Sticky top action bar while scrolling.

---

## GENERAL SECTION

Fields:

* Master Book Title
* Slug
* Status
* Featured Book toggle

---

## CATEGORY SYSTEM (IMPORTANT)

Replace single category input with:

Multi-select dropdown:

* Categories
* Subcategories

Requirements:

* Multiple category selection supported
* Nested subcategory support
* Searchable dropdown

Example:
Spirituality
→ Vedanta
→ Devotion

Philosophy
→ Advaita

---

## LANGUAGE MANAGEMENT (CORE SYSTEM)

Section title:
"Language Variants"

TOP ACTION:
Multi-select language dropdown:

Example:
[ English ] [ Hindi ] [ Malayalam ]

Behavior:

* Every selected language automatically creates a collapsible language row/card
* Removing language removes corresponding row

---

## LANGUAGE ROW DESIGN

Each language should appear as a collapsible row/card.

Example:

▼ English
▼ Hindi
▼ Malayalam

Collapsed:

* Show language name
* Status indicators
* Quick stock + pricing summary

Expanded:
Show full editable configuration.

---

## LANGUAGE-SPECIFIC FIELDS

Inside each expanded language row:

1. Language-specific title
2. Language-specific description
3. Upload language-specific cover image

IMPORTANT:
Each language can have completely separate:

* Title
* Description
* Cover

---

## DIGITAL VERSION SECTION

Inside language row:

Toggle:
[ Enable Digital Version ]

Fields:

* Digital ISBN
* Price
* Sale Price
* Upload EPUB/PDF
* DRM toggle

---

## PHYSICAL VERSION SECTION

Inside language row:

Toggle:
[ Enable Physical Copy ]

Fields:

* Physical ISBN
* SKU
* Price
* Sale Price
* Stock count
* Weight
* Dimensions
* Shipping class

---

## GLOBAL SETTINGS (IMPORTANT)

For repetitive fields add:

[ Apply to all languages ]

Supported for:

* Price
* Sale Price
* Weight
* Dimensions
* Shipping cost

Behavior:
Updating one value with this enabled updates all language variants.

---

## INVENTORY MANAGEMENT

Stock should be editable directly inside each language row.

Example:

English:
Stock: 50

Hindi:
Stock: 12

Malayalam:
Out of Stock

Do NOT separate inventory into another workflow.

---

## SHIPPING COST SECTION

Add dedicated left sidebar section:
"Shipping Cost"

Fields:

* Domestic shipping cost
* International shipping cost
* Free shipping threshold
* Region-based overrides

---

## PRICING SYSTEM

Support:

* INR pricing
* USD/global pricing

Each format can contain:

* Regular Price
* Sale Price

Show pricing cleanly:

Regular Price: ₹499
Sale Price: ₹399

---

## MEDIA SECTION

Allow:

* Multiple cover uploads
* Language-specific media
* Preview thumbnails

---

## COLLAPSIBLE UX (VERY IMPORTANT)

Language rows should:

* Expand/collapse smoothly
* Reduce visual overload
* Support many languages cleanly

Collapsed rows should show summary:

* Enabled formats
* Price
* Stock
* Status

---

## VISUAL STYLE

* Professional admin dashboard
* WooCommerce-inspired structure
* Clean grey/white admin UI
* Compact but readable
* Subtle borders/dividers
* Minimal color usage

Use:

* Green only for active/success
* Orange for warnings
* Red for destructive actions

---

## INTERACTION

* Sticky save bar
* Smooth collapsible sections
* Inline validation
* Hover states for actions

---

## GOAL EXPERIENCE

The interface should feel:

* Efficient for daily operations
* Familiar to commerce admins
* Scalable for 500–1000+ books
* Powerful but organized

NOT:

* Overly minimal
* Consumer-facing
* Card-heavy marketing UI

---

## OUTPUT

Generate:

1. Unified single-screen Book Editor
2. Sticky left anchor navigation
3. Multi-language collapsible rows
4. Digital + Physical sections inside rows
5. Global apply-to-all system
6. Multi-category selector
7. Integrated inventory + shipping controls
8. Professional WooCommerce-style admin experience
