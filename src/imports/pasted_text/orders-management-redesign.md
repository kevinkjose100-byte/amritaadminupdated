Refine and restructure the Orders Management section in the Amrita Books Admin Portal to properly support finalized business workflows, simplified order statuses, payment tracking, and cleaner operational table layouts.

IMPORTANT CONTEXT:

* Current prototype still contains outdated logistics-style workflows
* Statuses have now been finalized
* The order table layout is currently not properly prioritized
* The system contains 3 order types:

  * Physical Orders
  * Digital Orders
  * Subscription Orders

The interface should feel:

* Clean
* Operational
* Easy to scan quickly
* Structured like a modern commerce admin dashboard

---

## CORE GOAL

Redesign the Orders Management system to:

* Use finalized simplified statuses
* Add payment status handling
* Improve table hierarchy and readability
* Better organize columns
* Support refund workflows
* Reduce unnecessary visual clutter

---

## FINAL ORDER STATUS SYSTEM

Use ONLY these statuses.

---

## PHYSICAL ORDER STATUSES

* Pending
* Shipped
* In Transit
* Delivered
* Failed
* Refunded

Remove:

* Processing
* Packed
* Out for Delivery
* Returned
* Cancelled

---

## DIGITAL ORDER STATUSES

* Completed
* Failed
* Refunded

Remove:

* Pending
* Processing
* Cancelled

Digital orders become instantly available after successful payment.

---

## SUBSCRIPTION STATUSES

* Pending
* Active
* Expired
* Failed
* Refunded

---

## PAYMENT STATUS SYSTEM

Add separate Payment Status field for all order types.

Use ONLY:

* Pending
* Paid
* Failed
* Refunded
* Partially Refunded

IMPORTANT:

* "Partially Refunded" ONLY applies to Physical Orders
* Digital and Subscription orders are always single-item transactions

Remove:

* Chargeback
* COD Pending
* COD Collected

---

## MAIN ORDERS TABLE (IMPORTANT RESTRUCTURE)

The current table feels cluttered and poorly prioritized.

Reorganize columns in this order:

1. Order Number
2. Customer
3. Order Type
4. Items Summary
5. Total Amount
6. Order Status
7. Payment Status
8. Date
9. Actions

---

## COLUMN PRIORITY IMPROVEMENTS

Order Number:

* Strong visual emphasis
* Clickable

Customer:

* Name primary
* Email secondary smaller text

Order Type:
Show compact tags:

* Physical
* Digital
* Subscription

Items Summary:
Instead of just item count:

Show:

* Book names preview
* Language tags
* "+2 more" if needed

Example:

Bhagavad Gita (Hindi)
Ramayana (Tamil)
+1 more

This makes orders more understandable without opening modal.

---

## TOTAL AMOUNT COLUMN

Display:

* Final amount prominently
* Currency clearly

Example:
₹1,997

---

## ORDER STATUS COLUMN

Use finalized statuses only.

Badge colors:

* Pending = Orange
* Shipped/In Transit = Blue
* Delivered/Completed/Active = Green
* Failed = Red
* Refunded = Grey
* Expired = Neutral muted

---

## PAYMENT STATUS COLUMN

Separate badge column.

Badge colors:

* Paid = Green
* Pending = Orange
* Failed = Red
* Refunded = Grey
* Partially Refunded = Amber

---

## DATE COLUMN

Show:

* Order date
* Smaller secondary time text

Example:

2026-04-07
10:45 AM

---

## ACTIONS COLUMN

Use icon buttons only:

* View Details
* Refund
* Tracking (Physical Orders only)

Use hover tooltips.

---

## TABLE CLEANUP

Improve:

* Spacing between rows
* Vertical alignment
* Reduce visual density
* Softer borders

Remove:

* Excessive lines
* Overly large badges
* Heavy colors

---

## ORDER DETAILS MODAL

Refine modal structure.

Sections:

1. Customer Information
2. Order Summary
3. Payment Information
4. Ordered Items
5. Courier Tracking (Physical only)
6. Refund Actions

---

## ORDER ITEMS SECTION

Each item should display:

* Book cover thumbnail
* Book title
* Language
* Format
* Quantity
* Individual price

---

## REFUND WORKFLOW

Add buttons:

[ Refund Full Amount ]

For Physical Orders with multiple books:
[ Partial Refund ]

IMPORTANT:
Partial Refund appears ONLY for:

* Physical Orders
* Multiple-item orders

---

## PARTIAL REFUND FLOW

Allow admin to:

* Select individual books
* Enter refund amount
* Update refunded totals

After refund:
Payment Status becomes:
"Partially Refunded"

---

## DIGITAL ORDER LOGIC

After successful payment:

* Order Status = Completed
* Payment Status = Paid
* Book instantly available in user library

---

## SUBSCRIPTION LOGIC

After successful payment:

* Order Status = Active
* Payment Status = Paid

---

## PHYSICAL ORDER FLOW

Pending
→ Shipped
→ In Transit
→ Delivered

---

## FILTER BAR REFINEMENT

Filters:

* Order Type
* Order Status
* Payment Status
* Date Range

Improve layout:

* Compact toolbar
* Better spacing
* Cleaner alignment

---

## MOCK DATA UPDATE

Update ALL prototype mock data:

* Orders table
* Modals
* Filters
* Status dropdowns
* Badges

Use ONLY finalized statuses.

---

## VISUAL STYLE

* Modern commerce admin dashboard
* WooCommerce-inspired operational UI
* Minimal but structured
* Calm neutral palette
* Professional spacing and hierarchy

---

## GOAL EXPERIENCE

The orders system should feel:

* Operationally realistic
* Easy to scan
* Efficient for admins
* Structured for scale
* Simpler than enterprise logistics software

NOT:

* Overengineered
* Visually noisy
* Spreadsheet-heavy

---

## OUTPUT

Generate:

1. Refined Orders Management table
2. Properly prioritized column structure
3. Updated finalized statuses
4. Payment Status system
5. Refined Order Details modal
6. Refund + Partial Refund workflows
7. Cleaner operational admin UI
