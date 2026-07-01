Design an advanced "eBook Processing & Review Workspace" inside the Amrita Books Admin Portal for reviewing uploaded PDF/ePUB books before publishing them live to the platform.

IMPORTANT CONTEXT:

* This is NOT a simple file upload
* The system processes uploaded PDFs/ePUBs into readable digital books
* OCR / text extraction confidence may vary, especially for Indic languages
* Admins need a review workflow before books go live
* The experience should resemble a professional publishing workflow/editor

The design inspiration should come from:

* Publishing CMS systems
* OCR review tools
* Editorial workflow dashboards
* AI-assisted document review platforms

The experience should feel:

* Professional
* Editorial
* Structured
* Quality-control focused

---

## CORE GOAL

Create a complete eBook upload and review workflow:

1. Upload PDF/ePUB
2. Analyze file
3. Generate confidence score
4. Detect problematic pages
5. Open review editor
6. Correct issues
7. Move through publishing stages
8. Publish live to app/website

---

## NEW WORKFLOW STATES

Each uploaded eBook should support lifecycle states:

* Draft
* In Review
* Published

---

## STATUS DEFINITIONS

Draft:

* Initial upload completed
* OCR/processing pending
* Not visible to readers

In Review:

* Admin/editor reviewing pages
* Editing OCR/content issues
* Validation in progress

Published:

* Book live on website and app
* Reader accessible

Display status badges prominently.

---

## UPLOAD WORKFLOW (CRITICAL)

STEP 1:
Upload PDF/ePUB

Fields:

* Upload file
* Select language
* Select processing mode

---

STEP 2:
Analyze File

System automatically generates:

* OCR confidence score
* Indic-language confidence
* Text extraction quality
* Page issue detection

---

## CONFIDENCE SCORE SYSTEM

After upload:

Generate overall confidence score.

Example:

OCR Confidence:
92%

Page Health:
Good

Risk:
Low

---

## CONFIDENCE LEVEL COLORS

* 90–100% → Green
* 70–89% → Orange
* Below 70% → Red

---

## PROBLEMATIC PAGE DETECTION

Automatically identify pages with:

* OCR mismatch
* Low confidence
* Broken formatting
* Missing text
* Image-heavy pages
* Script recognition issues
* Encoding issues

---

## PAGE ISSUE SUMMARY

Show summary card:

Example:

Total Pages: 320
Pages with Issues: 12
High Risk Pages: 3

---

## OPEN REVIEW WORKSPACE

After analysis:
Admin enters Review Workspace.

This should feel like a professional publishing/editorial environment.

---

## WORKSPACE LAYOUT

LEFT SIDEBAR:
Page navigation panel

CENTER:
Book page preview/editor

RIGHT PANEL:
Issue detection + metadata panel

TOP:
Workflow/status actions

---

## LEFT SIDEBAR (PAGE NAVIGATION)

Show:

* Page thumbnails
* Confidence indicators
* Issue badges

Example:

Page 12 ⚠
Page 13 ✓
Page 14 ❌

Allow:

* Jump directly to problematic pages

---

## PAGE STATUS INDICATORS

Per page:

* Healthy
* Warning
* Critical

---

## CENTER PANEL (BOOK REVIEW)

Display:

* Original page preview
* Extracted/reflowable text
* Editable text blocks

Allow:

* Edit OCR mistakes
* Fix formatting
* Correct Indic language recognition
* Validate extracted content

---

## REVIEW MODES

Tabs:

1. Original PDF View
2. Extracted Text View
3. Side-by-Side Compare

---

## SIDE-BY-SIDE REVIEW MODE

VERY IMPORTANT.

Display:
LEFT:
Original PDF page

RIGHT:
Extracted editable text

This helps admin validate OCR quality.

---

## ISSUE DETECTION PANEL

RIGHT SIDEBAR:

Show:

* OCR confidence
* Detected issues
* Missing text warnings
* Script mismatch alerts
* Encoding problems

---

## ISSUE ACTIONS

Allow admin to:

* Mark issue resolved
* Ignore warning
* Re-run OCR for page
* Flag for manual review

---

## EDITOR FEATURES

Support:

* Rich text editing
* Indic language rendering
* Paragraph correction
* Formatting cleanup
* Heading validation

---

## AUTO-SAVE SYSTEM

Changes auto-save during editing.

Show:
"Saved just now"

---

## REVIEW PROGRESS TRACKING

Top progress bar:

Example:

320 pages
308 reviewed
12 remaining

---

## WORKFLOW ACTIONS

TOP ACTION BAR:

[ Save Draft ]
[ Mark In Review ]
[ Publish Live ]

IMPORTANT:

* Cannot publish if critical pages unresolved
* Show validation warning before publish

---

## PUBLISH VALIDATION

Before publish:

Show checklist:

✓ Metadata complete
✓ Cover uploaded
⚠ 2 unresolved low-confidence pages

---

## BOOK HEALTH DASHBOARD

Top summary cards:

* OCR Confidence
* Pages Reviewed
* High Risk Pages
* Encoding Quality
* Indic Script Confidence

---

## MOCK DATA

Use realistic Indic language examples:

* Malayalam
* Tamil
* Hindi
* Sanskrit

Show:

* Mixed confidence scores
* Some problematic pages
* OCR mismatch examples

---

## VISUAL STYLE

* Professional publishing CMS
* Editorial workspace feel
* Calm neutral UI
* Minimal color usage
* Structured panels
* Dense but readable interface

Use:

* Green for healthy
* Orange for warnings
* Red for critical issues

---

## IMPORTANT UX GOAL

The system should feel like:

* A real publishing workflow
* Editorial QA platform
* AI-assisted OCR review system

NOT:

* Simple upload form
* Generic CMS
* Basic PDF uploader

---

## OUTPUT

Generate:

1. eBook Upload Workflow
2. OCR confidence dashboard
3. Problematic page detection system
4. Editorial Review Workspace
5. Side-by-side OCR comparison editor
6. Page issue navigation system
7. Draft / In Review / Published workflow
8. Professional publishing review UI
