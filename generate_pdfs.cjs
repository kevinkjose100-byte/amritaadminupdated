const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const prdFiles = [
  { md: 'PRD_Admin_Portal.md', pdf: 'PRD_Admin_Portal.pdf', title: 'Amrita Books Admin Portal PRD' },
  { md: 'PRD_Web_App.md', pdf: 'PRD_Web_App.pdf', title: 'Amrita Books Web App PRD' },
  { md: 'PRD_Mobile_App.md', pdf: 'PRD_Mobile_App.pdf', title: 'Amrita Books Mobile App PRD' }
];

function findBrowserExecutable() {
  const commonPaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    path.join(process.env.USERPROFILE || 'C:\\Users\\kevin', 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe')
  ];

  for (const p of commonPaths) {
    if (fs.existsSync(p)) {
      console.log(`Found Chromium browser at: ${p}`);
      return p;
    }
  }
  return null;
}

async function generatePDFs() {
  const executablePath = findBrowserExecutable();
  
  console.log('Launching Puppeteer browser...');
  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };

  if (executablePath) {
    launchOptions.executablePath = executablePath;
  }

  const browser = await puppeteer.launch(launchOptions);

  for (const prd of prdFiles) {
    const mdPath = path.join(__dirname, prd.md);
    const pdfPath = path.join(__dirname, prd.pdf);

    if (!fs.existsSync(mdPath)) {
      console.warn(`File not found: ${prd.md}, skipping.`);
      continue;
    }

    console.log(`Processing ${prd.md} -> ${prd.pdf}...`);
    const mdContent = fs.readFileSync(mdPath, 'utf8');

    const page = await browser.newPage();

    // Premium HTML skeleton with fonts, CDN libraries, and custom styling
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${prd.title}</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">
  
  <!-- Markdown & Mermaid CDN Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #374151;
      background-color: #ffffff;
      padding: 20px 40px;
      max-width: 800px;
      margin: 0 auto;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Playfair Display', Georgia, serif;
      color: #111827;
      margin-top: 1.8em;
      margin-bottom: 0.6em;
      font-weight: 700;
      page-break-inside: avoid;
      page-break-after: avoid;
    }

    h1 {
      font-size: 32px;
      border-bottom: 2px solid #795343;
      padding-bottom: 8px;
      margin-top: 0;
      text-align: center;
      color: #795343;
    }

    h2 {
      font-size: 22px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 6px;
      color: #446161;
    }

    h3 {
      font-size: 16px;
      color: #795343;
    }

    p {
      margin-top: 0;
      margin-bottom: 1.2em;
      text-align: justify;
    }

    ul, ol {
      margin-top: 0;
      margin-bottom: 1.2em;
      padding-left: 24px;
    }

    li {
      margin-bottom: 0.4em;
    }

    code {
      font-family: Consolas, Monaco, "Andale Mono", monospace;
      font-size: 0.9em;
      background-color: #f3f4f6;
      padding: 2px 4px;
      border-radius: 4px;
      color: #1f2937;
    }

    pre {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      margin-bottom: 1.5em;
    }

    pre code {
      background-color: transparent;
      padding: 0;
      border-radius: 0;
      color: inherit;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5em;
      font-size: 13px;
    }

    th, td {
      border: 1px solid #e5e7eb;
      padding: 10px 12px;
      text-align: left;
    }

    th {
      background-color: #f9fafb;
      font-weight: 600;
      color: #111827;
    }

    tr:nth-child(even) {
      background-color: #fcfcfc;
    }

    /* Alerts & Blockquotes */
    blockquote {
      margin: 1.5em 0;
      padding: 12px 20px;
      border-left: 4px solid #446161;
      background-color: #f4f7f6;
      color: #374151;
      border-radius: 0 8px 8px 0;
    }

    blockquote p {
      margin: 0;
    }

    /* Mermaid flowchart spacing */
    .mermaid {
      display: flex;
      justify-content: center;
      margin: 2em 0;
      page-break-inside: avoid;
    }

    /* PDF Specific Utilities */
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>
  <div id="content">Loading content...</div>

  <script>
    // Custom marked renderer to convert mermaid code blocks to styled container divs
    const renderer = new marked.Renderer();
    const originalCodeRenderer = renderer.code.bind(renderer);
    
    renderer.code = function(code, language, escaped) {
      if (language === 'mermaid') {
        // Return raw mermaid wrapper
        return '<div class="mermaid">' + code + '</div>';
      }
      return originalCodeRenderer(code, language, escaped);
    };

    marked.setOptions({ renderer: renderer });

    // Initialize Mermaid
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose'
    });

    window.renderMarkdown = async function(markdownText) {
      // 1. Convert markdown to HTML
      const html = marked.parse(markdownText);
      document.getElementById('content').innerHTML = html;
      
      // 2. Run Mermaid rendering
      try {
        await mermaid.run({
          nodes: document.querySelectorAll('.mermaid')
        });
      } catch (e) {
        console.error('Mermaid render error:', e);
      }
      
      // Tell Puppeteer that rendering is finished
      window.isRenderFinished = true;
    };
  </script>
</body>
</html>
    `;

    await page.setContent(htmlContent);

    // Run the conversion and wait for it to finish
    await page.evaluate((md) => {
      window.isRenderFinished = false;
      window.renderMarkdown(md);
    }, mdContent);

    // Wait until rendering is finished
    await page.waitForFunction(() => window.isRenderFinished === true, { timeout: 30000 });

    // Add brief delay for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Export PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '65px',
        bottom: '70px',
        left: '50px',
        right: '50px'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-family: 'Inter', sans-serif; font-size: 8px; color: #9ca3af; width: 100%; padding: 0 50px; display: flex; justify-content: space-between; border-bottom: 1px solid #f3f4f6; margin-bottom: 10px;">
          <span>${prd.title}</span>
          <span>Amrita Books Portal</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-family: 'Inter', sans-serif; font-size: 8px; color: #9ca3af; width: 100%; padding: 0 50px; display: flex; justify-content: space-between; border-top: 1px solid #f3f4f6; margin-top: 10px;">
          <span>Confidential</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `
    });

    console.log(`Successfully generated: ${prd.pdf}`);
    await page.close();
  }

  console.log('Closing browser...');
  await browser.close();
  console.log('PDF Generation finished successfully.');
}

generatePDFs().catch(err => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
