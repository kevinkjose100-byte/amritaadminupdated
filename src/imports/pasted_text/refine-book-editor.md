Refine and simplify the "Edit Book" experience inside the Amrita Books Admin Portal to improve usability, reduce redundancy, and better support multilingual book management.

IMPORTANT CONTEXT:

* The current editor is becoming too complex and repetitive
* Many fields are duplicated unnecessarily
* The workflow should be simplified for non-technical admin users
* The system manages:

  * Multi-language books
  * Digital + Physical versions
  * Language-specific metadata
  * Inventory and shipping

The experience should feel:

* Structured
* Clear
* Efficient
* Easy to maintain for large catalogs

---

## CORE GOAL

Simplify the book editor by:

* Removing unnecessary duplicate fields
* Centralizing shared information
* Making language management easier
* Reducing admin confusion

---

## GLOBAL LAYOUT

Keep:

* Left admin sidebar
* Unified single-page editor
* Sticky top save bar

Add:
Breadcrumb navigation at top.

Example:

Catalog > Bhagavad Gita > Edit

Breadcrumbs should remain sticky and easy to navigate.

---

## LEFT MAIN ADMIN SIDEBAR

Add new global sidebar menu item:

[ Shipping Settings ]

IMPORTANT:
This should exist in the MAIN ADMIN SIDEBAR,
NOT inside individual book editing.

---

## REMOVE FROM BOOK EDITOR

Remove completely:

* Shipping section inside book editor
* Media Gallery section
* Custom Category field
* Language dropdown inside each language row
* Default Description field
* Master Title field
* Slug field

The editor should become cleaner and more focused.

---

## GENERAL INFORMATION SECTION

Keep ONLY:

* Featured Book toggle
* Main Categories
* Sub Categories

---

## CATEGORY SYSTEM

Replace current category setup with:

1. Main Category multi-select
2. Sub Category multi-select

Requirements:

* No custom category creation
* Searchable dropdowns
* Multi-selection support
* Hierarchical relationship

Example:

Main Category:
[ Spirituality ]
[ Philosophy ]

Sub Categories:
[ Vedanta ]
[ Bhakti ]
[ Devotion ]

---

## LANGUAGE VARIANTS SECTION

Keep:
Collapsible language rows/cards.

BUT simplify heavily.

---

## LANGUAGE ADDING

At top:
[ + Add Language ]

When clicked:

* Select language once
* Automatically create collapsible language row

Inside language rows:
DO NOT show language dropdown again.

---

## LANGUAGE ROW STRUCTURE

Each language row should contain:

HEADER:

* Language name
* "Set as Default" option
* Quick summary
* Expand/collapse arrow

IMPORTANT:
Only ONE language can be marked as Default.

The default language determines:

* What users initially see in the app
* Default display language on user-facing screens

---

## LANGUAGE-SPECIFIC CONTENT

Each language row should contain:

1. Language-specific Title
2. Language-specific Description

These should be the ONLY content fields.

Remove:

* Default description logic
* Shared description system

Each language manages its own content independently.

---

## COVER IMAGE SYSTEM (IMPORTANT CHANGE)

Cover image should belong to the LANGUAGE,
NOT separately to:

* Digital version
* Physical version

Move cover upload to top of language row.

Example:

English

* Cover Image
* Title
* Description
* Digital Version
* Physical Version

Both versions use SAME cover.

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

Remove:

* Cover upload from digital section

---

## PHYSICAL VERSION SECTION

Inside language row:

Toggle:
[ Enable Physical Version ]

Fields:

* Physical ISBN
* SKU
* Price
* Sale Price
* Stock Count
* Weight
* Dimensions
* Shipping Cost (India)
* Shipping Cost (Abroad)

Remove:

* Cover upload from physical section

---

## SHIPPING COST HANDLING

Shipping cost should now exist ONLY inside Physical Version.

Fields:

* Shipping Cost (India)
* Shipping Cost (International)

This is product-specific shipping,
NOT global shipping settings.

---

## REMOVE COMPLETELY

* Media gallery
* Shipping settings section inside editor
* Default description system
* Custom category creation
* Duplicate language selectors
* Duplicate cover uploads

---

## COLLAPSIBLE UX

Language rows should remain collapsible.

Collapsed state should show:

* Language name
* Enabled versions
* Stock summary
* Pricing summary
* Default language badge (if selected)

---

## VISUAL STYLE

* Clean admin dashboard
* Professional publishing CMS feel
* Reduced visual clutter
* Better spacing
* Softer borders
* Compact operational UI

Use:

* Minimal colors
* Green only for enabled/positive states
* Orange/red only for warnings

---

## INTERACTION

* Smooth expand/collapse
* Sticky save actions
* Inline validation
* Hover states for controls

---

## GOAL EXPERIENCE

The editor should feel:

* Easier to understand
* Faster to manage
* Cleaner and less repetitive
* Better suited for multilingual publishing workflows

NOT:

* Overengineered
* Repetitive
* Form-heavy

---

## OUTPUT

Generate:

1. Simplified unified Book Editor
2. Breadcrumb navigation
3. Cleaner category/subcategory system
4. Improved language variant management
5. Shared language-level cover system
6. Simplified Digital + Physical sections
7. Shipping cost inside physical version only
8. Cleaner operational admin UI
