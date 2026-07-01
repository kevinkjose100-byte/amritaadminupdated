Refine and restructure the "Catalog Management" table layout in the Amrita Books Admin Portal to properly support multi-language and multi-format books.

IMPORTANT CONTEXT:

* Current generated layout still behaves like a simple WooCommerce product table
* The Amrita Books system is more complex:

  * One book can have multiple language variants
  * Each language can have different ISBNs
  * Each language can have different stock counts
  * Categories can be multiple
  * Status can vary by language/version

The current table is visually cluttered and structurally incorrect.

---

## MAIN GOAL

Redesign the catalog table to:

* Reduce clutter
* Improve readability
* Properly represent multi-language structure
* Remove redundant information
* Make catalog scalable for 500–1000+ books

The UI should feel:

* Structured
* Professional
* Operational
* Easy to scan quickly

---

## REMOVE / RESTRUCTURE THESE COLUMNS

REMOVE:

* SKU / ISBN column
* Stock column
* Status column
* Quick Edit links

These do not work correctly in a multi-language system.

---

## WHY

ISBN:

* Multiple ISBNs exist per language + format
* Showing them in table creates clutter

Stock:

* Stock differs by language variant
* Single stock column is misleading

Status:

* Digital and Physical versions may differ
* Single status is inaccurate

Quick Edit:

* Too simplistic for this complex product model

---

## NEW TABLE STRUCTURE

Columns:

1. Checkbox
2. Expand/Collapse Icon
3. Cover Thumbnail
4. Book Information
5. Languages
6. Formats
7. Categories
8. Variant Summary
9. Last Updated
10. Actions

---

## BOOK INFORMATION COLUMN

This becomes the primary column.

Display:

* Book Title
* Small metadata below:

  * Internal ID
  * Slug
  * Number of language variants

Example:

Bhagavad Gita
ID: 1 • 3 language variants

Below title:
Actions:
Edit | Duplicate | View | Delete

---

## LANGUAGES COLUMN

Display language pills/tags:

[ English ]
[ Hindi ]
[ Tamil ]

Rules:

* Compact tag style
* Wrap cleanly if many languages
* Neutral colors

---

## FORMATS COLUMN

Display format pills:

[ Digital ]
[ Physical ]

If both exist:
Show both tags.

---

## CATEGORIES COLUMN (IMPORTANT FIX)

Categories are multi-select and hierarchical.

DO NOT display as plain text.

Display as compact category tags:

[ Spirituality ]
[ Vedanta ]
[ Devotion ]

Behavior:

* Max 2–3 visible
* Remaining show:
  +3 more

---

## VARIANT SUMMARY COLUMN (CRITICAL)

Replace old stock + status columns with a compact summary.

Example:

English:
Digital + Physical
Stock: 50

Hindi:
Physical Only
Stock: 12

Tamil:
Digital Only

OR use compact stacked rows/cards inside cell.

This column should summarize:

* Language variant availability
* Format availability
* Stock per language

WITHOUT overwhelming the table.

---

## EXPANDABLE ROWS (VERY IMPORTANT)

Each row should support expansion.

Click expand icon:

Reveal structured variant details below.

Expanded section shows:

For each language:

* ISBNs
* Pricing
* Stock
* Status
* Sale pricing
* Covers

This removes clutter from main table.

---

## EXPANDED ROW DESIGN

Use nested structured layout:

English

* Digital ISBN
* Physical ISBN
* Price
* Stock

Hindi

* Physical only
* Stock

Clean spacing and subtle separators.

---

## ACTIONS COLUMN

Use clean icon buttons only:

* Edit
* Duplicate
* Preview
* Delete

Hover tooltips.

---

## TABLE VISUAL DESIGN

Reduce visual heaviness.

Current problems:

* Too many hard lines
* Columns overcrowded
* Information too dense

Improve with:

* Better spacing
* Softer borders
* Compact metadata
* More whitespace between rows

---

## CATEGORY + LANGUAGE TAG DESIGN

Tags should:

* Be subtle
* Rounded
* Small
* Neutral tone

NOT:

* Bright colored pills
* Large badges

---

## SEARCH & FILTERS

Keep toolbar but improve spacing.

Filters:

* Language
* Categories
* Formats
* Published Status

Search:
"Search title, author, category..."

---

## IMPORTANT UX GOAL

The table should answer:

1. What is this book?
2. Which languages exist?
3. Which formats exist?
4. How many variants exist?
5. Does it need attention?

WITHOUT showing every ISBN and stock count directly.

---

## VISUAL STYLE

* Modern publishing CMS
* WooCommerce-inspired
* Structured admin UI
* Clean enterprise dashboard
* Minimal colors
* Neutral palette

---

## GOAL EXPERIENCE

The catalog should feel:

* Scalable
* Easy to scan
* Professional
* Organized for large multilingual operations

NOT:

* Spreadsheet clutter
* Flat WooCommerce clone
* Overloaded table

---

## OUTPUT

Generate:

1. Refined catalog management table
2. Expandable variant rows
3. Compact category + language tags
4. Variant summary system
5. Cleaner operational layout
6. Better spacing and hierarchy
