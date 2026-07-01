Redesign and upgrade the "Catalog Management" section of the Amrita Books Admin Portal to resemble a professional publishing/eCommerce admin system similar to the reference WordPress/WooCommerce-style interfaces provided.

IMPORTANT CONTEXT:

* Existing admin portal already exists
* Current catalog UI is too simplified and card-based
* Need a more operational, data-heavy admin experience
* Design inspiration should come from:

  * WooCommerce product management
  * Publishing CMS systems
  * Inventory/catalog management dashboards

The new interface should feel:

* Professional
* Information-dense but organized
* Efficient for large catalog management
* Suitable for managing 500–1000+ books

---

## GLOBAL ADMIN STYLE

Maintain existing admin shell:

* Left sidebar navigation
* Top search/header bar
* Clean white/light-grey admin aesthetic

Style direction:

* Minimal
* Functional
* Structured
* Modern WooCommerce-style admin
* Clear table hierarchy
* Subtle borders/dividers

---

## SIDEBAR

Keep:

* Dashboard
* Catalog
* Orders
* Tracking
* Users
* Inventory
* Finance
* Consignment

Remove:

* Bulk Ingestion

---

## CATALOG MANAGEMENT PAGE

Replace current large card layout with a proper table/list management system.

---

## HEADER SECTION

Page title:
"Catalog Management"

Subtitle:
"Manage multi-language, multi-format book catalog"

Top-right primary CTA:
[ + Add New Book ]

---

## TOP TOOLBAR

Below header create an admin toolbar similar to WooCommerce product management.

Include:

LEFT:

* Bulk actions dropdown
* Apply button

CENTER:

* Search bar:
  "Search books, ISBN, authors..."

RIGHT FILTERS:

* Language filter
* Category filter
* Format filter
* Status filter
* Stock filter
* Export CSV button

Toolbar should feel compact and operational.

---

## MAIN TABLE (CORE COMPONENT)

Replace card layout with structured admin table.

Columns:

1. Checkbox
2. Cover Thumbnail
3. Book Title
4. SKU / ISBN
5. Languages Available
6. Formats Available
7. Stock
8. Pricing
9. Categories
10. Status
11. Last Updated
12. Actions

---

## ROW DESIGN

Each row should resemble WooCommerce product rows.

Book title row:

* Large clickable title
* Small metadata below:
  ID
  Quick Edit
  Edit
  Delete
  View

Language column:
Show compact pills:
[ English ]
[ Hindi ]
[ Tamil ]

Format column:
[ Digital ]
[ Physical ]

Stock column:

* "In Stock"
* Low stock warning
* Out of stock

Pricing column:
Show:
₹210
$10

Support regional pricing display.

---

## ACTIONS COLUMN

Icons:

* Edit
* Delete
* Duplicate
* Preview

Hover reveals quick actions.

---

## PAGINATION

Bottom pagination similar to WooCommerce:

* Page numbers
* Rows per page selector
* Total item count

---

## BOOK EDIT EXPERIENCE (VERY IMPORTANT)

When clicking Edit:

Open a full-page structured editor similar to WooCommerce product editor.

DO NOT use small modal.

---

## BOOK EDIT LAYOUT

LEFT SIDEBAR INSIDE EDITOR:
Navigation tabs:

* General
* Languages
* Digital Versions
* Physical Versions
* Pricing
* Inventory
* SEO
* Media
* Advanced

---

## MAIN EDIT AREA

TOP:

* Book Title
* Slug
* Status selector

---

## LANGUAGE VARIANT SYSTEM (CRITICAL)

This is NOT a simple product.

One book can contain multiple language variants.

Each language variant can contain:

* Digital version
* Physical version
* Different ISBN
* Different cover
* Different stock
* Different descriptions

---

## LANGUAGE MANAGEMENT UI

Section:
"Language Variants"

Show expandable language cards.

Example:

▼ English
▼ Hindi
▼ Malayalam

Each language card contains:

---

## DIGITAL VERSION

Toggle:
[ Enable Digital Version ]

Fields:

* Digital ISBN
* Upload EPUB/PDF
* Digital cover image
* Digital pricing
* Description

---

## PHYSICAL VERSION

Toggle:
[ Enable Physical Version ]

Fields:

* Physical ISBN
* SKU
* Stock count
* Weight
* Shipping class
* Physical cover image
* Regional pricing

---

## DESCRIPTION SYSTEM

For each language:

Option:
( ) Use default description
( ) Custom description

If custom selected:
Show rich text editor.

---

## PRICING SECTION

Support:

* INR pricing
* USD/global pricing

Allow:

* Manual pricing
* Automatic conversion

Similar to WooCommerce global pricing systems.

---

## INVENTORY SECTION

Physical books only.

Fields:

* Stock quantity
* Low stock threshold
* Availability status
* Warehouse/consignment mapping

---

## MEDIA MANAGEMENT

Allow:

* Multiple cover uploads
* Language-specific covers
* Preview thumbnails

---

## QUICK EDIT FEATURE

From table rows allow inline quick edit:

Editable:

* Price
* Stock
* Status
* Categories

---

## VISUAL STYLE

* Dense but readable
* Professional admin aesthetic
* Light grey backgrounds
* Soft borders
* Minimal color usage
* Green only for positive statuses
* Orange/red for warnings

Typography:

* Clear admin UI typography
* Functional spacing
* Compact layout

---

## GOAL EXPERIENCE

The admin should feel like:

* A professional publishing CMS
* A real commerce catalog system
* Efficient for large-scale operations
* Familiar to WooCommerce users

---

## IMPORTANT UX GOAL

The interface should prioritize:

* Fast management
* Bulk operations
* Clear data visibility
* Multi-language catalog complexity

NOT:

* Large marketing cards
* Overly minimal layouts
* Consumer-style UI

---

## OUTPUT

Generate:

1. Redesigned Catalog Management table
2. WooCommerce-style toolbar
3. Structured product rows
4. Full-page Book Editor
5. Language Variant management system
6. Inventory and pricing sections
7. Professional admin dashboard aesthetic
