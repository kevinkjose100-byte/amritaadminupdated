import { useState, Fragment, useRef, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, ChevronDown, ChevronRight, Search, Download, X, Save, Upload as UploadIcon, ChevronUp, FileText, AlertTriangle, CheckCircle2, XCircle, RefreshCw, LayoutGrid, Globe } from "lucide-react";
import { RowActionsMenu } from "../RowActionsMenu";

interface SearchableDropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  emptyLabel?: string;
  className?: string;
  clearOnSelect?: boolean;
}

function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder,
  emptyLabel = "No options found",
  className = "",
  clearOnSelect = false
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);
  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={isOpen ? search : (selectedOption ? selectedOption.label : "")}
          onChange={e => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setSearch("");
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full pl-3 pr-10 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 bg-background text-foreground text-sm"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {!clearOnSelect && value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setSearch("");
              }}
              className="p-1 hover:bg-muted rounded text-muted-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-muted rounded text-muted-foreground"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground italic">{emptyLabel}</div>
          ) : (
            filteredOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  if (clearOnSelect) {
                    setSearch("");
                  } else {
                    setSearch(opt.label);
                  }
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-sm hover:bg-muted/80 transition-colors ${
                  value === opt.value ? "bg-muted font-semibold" : ""
                }`}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
import { getPricingGroups, convertPrice } from "../../utils/pricingStore";

const getStatusBadgeClass = (status?: string) => {
  switch (status) {
    case "Draft":
      return "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]";
    case "Review":
      return "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]";
    case "Approved":
      return "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]";
    case "Published":
      return "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]";
    case "Archived":
      return "bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]";
    default:
      return "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]";
  }
};
import bookCover1 from "../../../imports/screenshot-1.png";
import bookCover2 from "../../../imports/screenshot-2.png";
import bookCover3 from "../../../imports/screenshot-3.png";
import bookCover4 from "../../../imports/screenshot-4.png";
import bookCover5 from "../../../imports/screenshot-5.png";
import bookCover6 from "../../../imports/screenshot-6.png";

type PageIssue = {
  pageNumber: number;
  severity: "healthy" | "warning" | "critical";
  issues: string[];
  confidence: number;
};

type EbookProcessing = {
  status: "draft" | "in-review" | "published";
  fileName?: string;
  fileSize?: number;
  uploadedAt?: string;
  ocrConfidence?: number;
  totalPages?: number;
  reviewedPages?: number;
  pageIssues?: PageIssue[];
  healthScore?: "good" | "moderate" | "poor";
};

type LanguageVariant = {
  id: string;
  language: string;
  title?: string;
  description?: string;
  coverUrl?: string;
  translator?: string;
  compilerEditor?: string;
  editionNumber?: string;
  publicationYear?: string;
  digital?: {
    isbn: string;
    price: number;
    salePrice?: number;
    fileUrl?: string;
    ebookProcessing?: EbookProcessing;
    status?: "Draft" | "Review" | "Approved" | "Published" | "Archived";
  };
  physical?: {
    isbn: string;
    price: number;
    salePrice?: number;
    stock: number;
    weight: number;
    length: number;
    width: number;
    height: number;
    sku: string;
    shippingIndia?: number;
    shippingInternational?: number;
    status?: "Draft" | "Review" | "Approved" | "Published" | "Archived";
  };
  regionalPrices?: Record<string, {
    digitalPrice?: number;
    digitalSalePrice?: number;
    physicalPrice?: number;
    physicalSalePrice?: number;
  }>;
};

export type Book = {
  id: string;
  title: string;
  slug: string;
  category: string;
  categories?: string[];
  featured?: boolean;
  defaultLanguage: string;
  availableAsDigital: boolean;
  availableAsPhysical: boolean;
  defaultDescription: string;
  variants: LanguageVariant[];
  status: "published" | "draft" | "out-of-stock";
  lastUpdated: string;
  shipping?: {
    domestic: number;
    whiteListOnly?: boolean;
    freeThreshold?: number;
    domesticShipping?: number;
    internationalShipping?: number;
  } & Record<string, any>;
  author: string;
  seriesName?: string;
  seriesVolume?: string;
  relatedBookIds?: string[];
  pageCount?: number;
};

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Bhagavad Gita",
    slug: "bhagavad-gita",
    category: "Scripture",
    categories: ["Scripture", "Philosophy", "Poetry"],
    defaultLanguage: "English",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "The eternal message of spiritual wisdom",
    status: "published",
    lastUpdated: "2026-04-10",
    author: "Amma",
    seriesName: "Amma's Teachings Collection",
    seriesVolume: "1",
    relatedBookIds: ["2", "3"],
    pageCount: 350,
    variants: [
      {
        id: "v1",
        language: "English",
        translator: "Swami Amritaswarupananda Puri",
        compilerEditor: "Mata Amritanandamayi Math",
        editionNumber: "2nd Revised Edition",
        publicationYear: "2024",
        digital: { isbn: "978-1-234-56789-0", price: 299, status: "Published" },
        physical: { isbn: "978-1-234-56789-1", price: 499, stock: 50, weight: 450, length: 210, width: 140, height: 25, sku: "BG-EN-001", status: "Published" },
      },
      {
        id: "v2",
        language: "Hindi",
        translator: "Swami Ramakrishnananda Puri",
        compilerEditor: "Mata Amritanandamayi Math",
        editionNumber: "1st Edition",
        publicationYear: "2022",
        description: "आध्यात्मिक ज्ञान का शाश्वत संदेश",
        digital: { isbn: "978-1-234-56789-2", price: 299, status: "Published" },
        physical: { isbn: "978-1-234-56789-3", price: 499, stock: 12, weight: 450, length: 210, width: 140, height: 25, sku: "BG-HI-001", status: "Published" },
      },
    ],
  },
  {
    id: "2",
    title: "Ramayana",
    slug: "ramayana",
    category: "Epic",
    categories: ["Epic"],
    defaultLanguage: "English",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "The epic tale of Lord Rama",
    status: "published",
    lastUpdated: "2026-04-08",
    author: "Swami Ramakrishnananda Puri",
    seriesName: "Ocean of Grace Series",
    seriesVolume: "4",
    relatedBookIds: ["1", "3"],
    variants: [
      {
        id: "v3",
        language: "English",
        digital: { isbn: "978-1-234-56790-0", price: 399 },
        physical: { isbn: "978-1-234-56790-1", price: 699, stock: 35, weight: 650, length: 230, width: 150, height: 35, sku: "RM-EN-001" },
      },
      {
        id: "v4",
        language: "Tamil",
        digital: {
          isbn: "978-1-234-56790-2",
          price: 399,
          ebookProcessing: {
            status: "in-review",
            fileName: "ramayana-tamil.pdf",
            fileSize: 3.2,
            uploadedAt: "2026-05-15T10:30:00Z",
            ocrConfidence: 84,
            totalPages: 312,
            reviewedPages: 156,
            healthScore: "moderate",
            pageIssues: [
              { pageNumber: 23, severity: "warning", issues: ["Low OCR confidence for Tamil script"], confidence: 72 },
              { pageNumber: 67, severity: "critical", issues: ["Script recognition failed", "Encoding issue"], confidence: 45 },
              { pageNumber: 145, severity: "warning", issues: ["Formatting inconsistency"], confidence: 78 },
              { pageNumber: 201, severity: "critical", issues: ["Missing text blocks"], confidence: 41 },
              { pageNumber: 289, severity: "warning", issues: ["Low confidence on decorative elements"], confidence: 69 },
            ],
          },
        },
        physical: { isbn: "978-1-234-56790-3", price: 699, stock: 28, weight: 650, length: 230, width: 150, height: 35, sku: "RM-TA-001" },
      },
    ],
  },
  {
    id: "3",
    title: "Mahabharata",
    slug: "mahabharata",
    category: "Epic",
    categories: ["Epic", "Mythology", "History"],
    defaultLanguage: "English",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "The great Indian epic",
    status: "published",
    lastUpdated: "2026-04-05",
    author: "Swami Ramakrishnananda Puri",
    seriesName: "Ocean of Grace Series",
    seriesVolume: "5",
    relatedBookIds: ["1", "2"],
    variants: [
      {
        id: "v5",
        language: "English",
        digital: { isbn: "978-1-234-56791-0", price: 599 },
        physical: { isbn: "978-1-234-56791-1", price: 999, stock: 22, weight: 1200, length: 240, width: 160, height: 55, sku: "MB-EN-001" },
      },
      {
        id: "v6",
        language: "Telugu",
        digital: { isbn: "978-1-234-56791-2", price: 599 },
        physical: { isbn: "978-1-234-56791-3", price: 999, stock: 18, weight: 1200, length: 240, width: 160, height: 55, sku: "MB-TE-001" },
      },
    ],
  },
  {
    id: "4",
    title: "Upanishads Collection",
    slug: "upanishads-collection",
    category: "Philosophy",
    categories: ["Philosophy"],
    defaultLanguage: "English",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "Ancient philosophical texts",
    status: "published",
    lastUpdated: "2026-04-03",
    author: "Swami Amritaswarupananda Puri",
    seriesName: "Whispers of Amma Series",
    seriesVolume: "2",
    relatedBookIds: ["1"],
    variants: [
      {
        id: "v7",
        language: "English",
        digital: { isbn: "978-1-234-56792-0", price: 449 },
        physical: { isbn: "978-1-234-56792-1", price: 799, stock: 40, weight: 550, length: 220, width: 145, height: 30, sku: "UP-EN-001" },
      },
    ],
  },
  {
    id: "5",
    title: "Vedas Complete Set",
    slug: "vedas-complete-set",
    category: "Scripture",
    categories: ["Scripture"],
    defaultLanguage: "Sanskrit",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "Complete collection of the four Vedas",
    status: "published",
    lastUpdated: "2026-04-01",
    author: "Amma",
    seriesName: "Amma's Teachings Collection",
    seriesVolume: "3",
    relatedBookIds: ["1", "4"],
    variants: [
      {
        id: "v8",
        language: "Sanskrit",
        digital: { isbn: "978-1-234-56793-0", price: 799 },
        physical: { isbn: "978-1-234-56793-1", price: 1499, stock: 15, weight: 1800, length: 250, width: 170, height: 70, sku: "VD-SA-001" },
      },
      {
        id: "v9",
        language: "English",
        digital: { isbn: "978-1-234-56793-2", price: 799 },
        physical: { isbn: "978-1-234-56793-3", price: 1499, stock: 25, weight: 1800, length: 250, width: 170, height: 70, sku: "VD-EN-001" },
      },
    ],
  },
  {
    id: "6",
    title: "Puranas Compilation",
    slug: "puranas-compilation",
    category: "Mythology",
    categories: ["Mythology"],
    defaultLanguage: "English",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "Ancient stories and legends",
    status: "draft",
    lastUpdated: "2026-03-28",
    author: "Amma",
    seriesName: "Amma's Teachings Collection",
    seriesVolume: "4",
    relatedBookIds: ["1", "5"],
    variants: [
      {
        id: "v10",
        language: "English",
        digital: { isbn: "978-1-234-56794-0", price: 549 },
        physical: { isbn: "978-1-234-56794-1", price: 899, stock: 30, weight: 850, length: 235, width: 155, height: 40, sku: "PR-EN-001" },
      },
      {
        id: "v11",
        language: "Bengali",
        digital: { isbn: "978-1-234-56794-2", price: 549 },
        physical: { isbn: "978-1-234-56794-3", price: 899, stock: 8, weight: 850, length: 235, width: 155, height: 40, sku: "PR-BN-001" },
      },
    ],
  },
  {
    id: "7",
    title: "Yoga Sutras of Patanjali",
    slug: "yoga-sutras-of-patanjali",
    category: "Philosophy",
    categories: ["Philosophy"],
    defaultLanguage: "English",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "Classical yoga philosophy",
    status: "published",
    lastUpdated: "2026-03-25",
    author: "Swami Amritaswarupananda Puri",
    seriesName: "Whispers of Amma Series",
    seriesVolume: "1",
    relatedBookIds: ["4"],
    variants: [
      {
        id: "v12",
        language: "English",
        digital: { isbn: "978-1-234-56795-0", price: 249 },
        physical: { isbn: "978-1-234-56795-1", price: 449, stock: 55, weight: 320, length: 200, width: 130, height: 18, sku: "YS-EN-001" },
      },
    ],
  },
  {
    id: "8",
    title: "Thirukkural",
    slug: "thirukkural",
    category: "Poetry",
    categories: ["Poetry"],
    defaultLanguage: "Tamil",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "Classic Tamil literature on ethics and morality",
    status: "published",
    lastUpdated: "2026-03-20",
    author: "Swami Ramakrishnananda Puri",
    seriesName: "Ocean of Grace Series",
    seriesVolume: "1",
    relatedBookIds: ["1"],
    variants: [
      {
        id: "v13",
        language: "Tamil",
        digital: { isbn: "978-1-234-56796-0", price: 199 },
        physical: { isbn: "978-1-234-56796-1", price: 399, stock: 42, weight: 280, length: 190, width: 125, height: 15, sku: "TK-TA-001" },
      },
      {
        id: "v14",
        language: "English",
        digital: { isbn: "978-1-234-56796-2", price: 199 },
        physical: { isbn: "978-1-234-56796-3", price: 399, stock: 38, weight: 280, length: 190, width: 125, height: 15, sku: "TK-EN-001" },
      },
    ],
  },
  {
    id: "9",
    title: "Shrimad Bhagavatam",
    slug: "shrimad-bhagavatam",
    category: "Scripture",
    categories: ["Scripture"],
    defaultLanguage: "English",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "Stories of Lord Krishna and devotional philosophy",
    status: "out-of-stock",
    lastUpdated: "2026-03-15",
    author: "Swami Ramakrishnananda Puri",
    seriesName: "Ocean of Grace Series",
    seriesVolume: "2",
    relatedBookIds: ["1", "3"],
    variants: [
      {
        id: "v15",
        language: "English",
        digital: { isbn: "978-1-234-56797-0", price: 699 },
        physical: { isbn: "978-1-234-56797-1", price: 1199, stock: 0, weight: 1400, length: 245, width: 165, height: 60, sku: "SB-EN-001" },
      },
    ],
  },
  {
    id: "10",
    title: "Ashtavakra Gita",
    slug: "ashtavakra-gita",
    category: "Philosophy",
    categories: ["Philosophy"],
    defaultLanguage: "English",
    availableAsDigital: true,
    availableAsPhysical: true,
    defaultDescription: "Dialogue on the nature of reality and liberation",
    status: "published",
    lastUpdated: "2026-03-10",
    author: "Swami Amritaswarupananda Puri",
    seriesName: "Whispers of Amma Series",
    seriesVolume: "3",
    relatedBookIds: ["1", "4"],
    variants: [
      {
        id: "v16",
        language: "English",
        digital: { isbn: "978-1-234-56798-0", price: 199 },
        physical: { isbn: "978-1-234-56798-1", price: 349, stock: 60, weight: 240, length: 185, width: 120, height: 12, sku: "AG-EN-001" },
      },
      {
        id: "v17",
        language: "Hindi",
        digital: { isbn: "978-1-234-56798-2", price: 199 },
        physical: { isbn: "978-1-234-56798-3", price: 349, stock: 45, weight: 240, length: 185, width: 120, height: 12, sku: "AG-HI-001" },
      },
    ],
  },
];

export function CatalogManagement() {
  const [books] = useState(mockBooks);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [activeVariantTab, setActiveVariantTab] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [showBulkDiscount, setShowBulkDiscount] = useState(false);
  const [bulkDiscountType, setBulkDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [bulkDiscountValue, setBulkDiscountValue] = useState("");
  const [activeRegionId, setActiveRegionId] = useState("india");

  const toggleSelectBook = (id: string) => {
    setSelectedBooks(prev =>
      prev.includes(id) ? prev.filter(bookId => bookId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedBooks(prev => (prev.length === books.length ? [] : books.map(b => b.id)));
  };

  const getTotalStock = (book: Book) => {
    return book.variants.reduce((total, variant) => total + (variant.physical?.stock || 0), 0);
  };

  const getStockStatus = (book: Book) => {
    const totalStock = getTotalStock(book);
    if (totalStock === 0) return { label: "Out of Stock", color: "text-destructive" };
    if (totalStock < 20) return { label: "Low Stock", color: "text-[var(--color-saffron)]" };
    return { label: "In Stock", color: "text-[var(--color-success-green)]" };
  };

  const getPriceRange = (book: Book) => {
    const groups = getPricingGroups();
    const activeGroup = groups.find(g => g.id === activeRegionId) || groups[0];
    const digitalPrices: number[] = [];
    const physicalPrices: number[] = [];

    book.variants.forEach(v => {
      // Look up regional pricing
      const reg = v.regionalPrices?.[activeRegionId] || {};
      
      let dPrice = reg.digitalPrice;
      if (dPrice === undefined && v.digital?.price !== undefined) {
        dPrice = convertPrice(v.digital.price, activeGroup.multiple, activeGroup.currency);
      }
      if (dPrice !== undefined) digitalPrices.push(dPrice);

      let pPrice = reg.physicalPrice;
      if (pPrice === undefined && v.physical?.price !== undefined) {
        pPrice = convertPrice(v.physical.price, activeGroup.multiple, activeGroup.currency);
      }
      if (pPrice !== undefined) physicalPrices.push(pPrice);
    });

    const formatRange = (prices: number[]) => {
      if (prices.length === 0) return null;
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max 
        ? `${activeGroup.currencySymbol}${min.toLocaleString()}` 
        : `${activeGroup.currencySymbol}${min.toLocaleString()} – ${activeGroup.currencySymbol}${max.toLocaleString()}`;
    };

    return {
      digital: formatRange(digitalPrices),
      physical: formatRange(physicalPrices),
    };
  };

  const applyBulkDiscount = () => {
    if (selectedBooks.length === 0) {
      alert("Please select books to apply discount");
      return;
    }
    console.log("Applying discount:", {
      type: bulkDiscountType,
      value: bulkDiscountValue,
      books: selectedBooks,
    });
    alert(`Discount of ${bulkDiscountValue}${bulkDiscountType === "percentage" ? "%" : "₹"} applied to ${selectedBooks.length} books`);
    setShowBulkDiscount(false);
    setBulkDiscountValue("");
    setSelectedBooks([]);
  };

  if (editingBook) {
    return (
      <BookEditor
        book={editingBook}
        onClose={() => setEditingBook(null)}
        allBooks={books}
        onSave={(updatedBook) => {
          if (updatedBook.id === "new") {
            const newId = String(books.length + 1);
            const newBook = {
              ...updatedBook,
              id: newId,
              slug: updatedBook.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              lastUpdated: new Date().toISOString().split('T')[0]
            };
            setBooks([...books, newBook]);
          } else {
            setBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b));
          }
          setEditingBook(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Catalog Management</h1>
          <p className="text-sm text-[#43474e] font-normal leading-5">Manage multi-language, multi-format book catalog</p>
        </div>
        <button
          onClick={() => setEditingBook({
            id: "new",
            title: "",
            slug: "",
            category: "",
            defaultLanguage: "English",
            availableAsDigital: false,
            availableAsPhysical: false,
            defaultDescription: "",
            variants: [],
            status: "draft",
            lastUpdated: new Date().toISOString().split('T')[0],
            author: "",
            seriesName: "",
            seriesVolume: "",
            relatedBookIds: []
          })}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-saffron)] text-white rounded-md hover:bg-[var(--color-saffron-dark)] transition-all font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Book
        </button>
      </div>

      <div className="bg-card border border-[#E2E8F0] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="p-5 border-b border-[#E2E8F0] space-y-3">
          {/* Bulk actions — only shown when 2+ rows selected */}
          {selectedBooks.length >= 2 && (
            <div className="flex items-center gap-2 py-2 px-3 bg-[#002045]/5 border border-[#002045]/15 rounded-lg animate-[fadeIn_0.15s_ease-out]">
              <span className="text-sm font-medium text-[#002045]">{selectedBooks.length} selected</span>
              <div className="w-px h-4 bg-[#002045]/20 mx-1" />
              <select className="px-3 py-1.5 text-sm border border-[#E2E8F0] rounded-md bg-white hover:border-border transition-colors">
                <option>Bulk actions</option>
                <option>Delete</option>
                <option>Change status to Published</option>
                <option>Change status to Draft</option>
                <option>Apply Discount</option>
              </select>
              <button
                onClick={() => setShowBulkDiscount(true)}
                className="px-3 py-1.5 text-sm bg-[#002045] text-white rounded-md hover:bg-[#001b3c] transition-all font-medium"
              >
                Apply
              </button>
              <button
                onClick={() => setSelectedBooks([])}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear selection
              </button>
            </div>
          )}

          {/* Unified toolbar: Search + actions in one row */}
          <div className="flex items-center gap-2">
            {/* Search — grows to fill */}
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#43474e]/60 transition-colors group-focus-within:text-[#002045]" />
              <input
                type="text"
                placeholder="Search title, author, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm text-[#191c1e] placeholder:text-[#94A3B8] bg-white rounded-full border border-[#D1D5DC] focus:outline-none focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 transition-all duration-200"
              />
            </div>

            {/* Region dropdown — standalone */}
            <div className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white">
              <Globe className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <select
                value={activeRegionId}
                onChange={(e) => setActiveRegionId(e.target.value)}
                className="text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-foreground/80 cursor-pointer"
              >
                {getPricingGroups().map(g => (
                  <option key={g.id} value={g.id} className="bg-card">
                    {g.name} ({g.currencySymbol})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowMoreFilters(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg hover:bg-muted transition-colors whitespace-nowrap ${showMoreFilters ? "bg-muted text-foreground" : "bg-white text-foreground/70"}`}
            >
              {showMoreFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              Filters
            </button>

            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-white text-foreground/70 hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>

          {/* Secondary: Collapsible Filters */}
          {showMoreFilters && (
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#E2E8F0]">
              <select className="px-3 py-2 text-sm border border-[#E2E8F0] rounded-md bg-background hover:border-border transition-colors">
                <option>All languages</option>
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Bengali</option>
                <option>Sanskrit</option>
              </select>
              <select className="px-3 py-2 text-sm border border-[#E2E8F0] rounded-md bg-background hover:border-border transition-colors">
                <option>All categories</option>
                <option>Scripture</option>
                <option>Epic</option>
                <option>Philosophy</option>
                <option>Mythology</option>
                <option>Poetry</option>
                <option>History</option>
              </select>
              <select className="px-3 py-2 text-sm border border-[#E2E8F0] rounded-md bg-background hover:border-border transition-colors">
                <option>All formats</option>
                <option>Digital</option>
                <option>Physical</option>
              </select>
              <select className="px-3 py-2 text-sm border border-[#E2E8F0] rounded-md bg-background hover:border-border transition-colors">
                <option>Published Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Out of Stock</option>
              </select>
            </div>
          )}
        </div>

<div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr className="border-b border-[#E2E8F0]">
                <th className="w-10 px-3 py-4"></th>
                <th className="w-10 px-3 py-4">
                  <input
                    type="checkbox"
                    checked={selectedBooks.length === books.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-border"
                  />
                </th>
                <th className="w-16 px-3 py-4"></th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Book Information</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Author</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Series</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Languages</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Formats</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Categories</th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Last Updated</th>
                <th className="text-right px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                const isExpanded = expandedRow === book.id;
                const bookCategories = book.categories || [book.category].filter(Boolean);

                return (
                  <Fragment key={book.id}>
                    <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-all group">
                      <td className="px-3 py-5">
                        <button
                          onClick={() => {
                            setExpandedRow(isExpanded ? null : book.id);
                            if (!isExpanded && book.variants.length > 0) {
                              setActiveVariantTab(book.variants[0].id);
                            }
                          }}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                        </button>
                      </td>
                      <td className="px-3 py-5">
                        <input
                          type="checkbox"
                          checked={selectedBooks.includes(book.id)}
                          onChange={() => toggleSelectBook(book.id)}
                          className="w-4 h-4 rounded border-border"
                        />
                      </td>
                      <td className="px-3 py-5">
                        <div className="w-12 h-16 bg-[#F8FAFC] rounded border border-[#E2E8F0] flex items-center justify-center text-xs text-muted-foreground overflow-hidden">
                          {(() => {
                            const covers = [bookCover1, bookCover2, bookCover3, bookCover4, bookCover5, bookCover6];
                            const idx = (parseInt(book.id) - 1) % covers.length;
                            const cover = isNaN(idx) ? null : covers[idx];
                            return cover ? (
                              <img src={cover} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            );
                          })()}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div>
                          <p className="font-semibold text-foreground mb-1">{book.title}</p>
                          <p className="text-xs text-muted-foreground">
                            ID: {book.id} • {book.variants.length} language variant{book.variants.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-sm text-foreground/90 font-medium">
                        {book.author}
                      </td>
                      <td className="px-4 py-5 text-sm text-muted-foreground">
                        {book.seriesName ? (
                          <div className="flex flex-col">
                            <span className="text-foreground/80 font-medium">{book.seriesName}</span>
                            {book.seriesVolume && (
                              <span className="text-[10px] w-fit font-semibold px-1.5 py-0.5 mt-0.5 bg-muted border border-border rounded text-muted-foreground">
                                Vol {book.seriesVolume}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="italic text-xs text-muted-foreground/60">No Series</span>
                        )}
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-wrap gap-1.5">
                          {book.variants.slice(0, 3).map(v => (
                            <span key={v.id} className="px-2 py-1 bg-background border border-[#E2E8F0] rounded-full text-xs text-foreground/80 font-medium">
                              {v.language}
                            </span>
                          ))}
                          {book.variants.length > 3 && (
                            <span className="px-2 py-1 text-xs text-muted-foreground font-medium">+{book.variants.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-col gap-1">
                          {book.availableAsDigital && (
                            <span className="px-2.5 py-1 bg-[var(--color-success-green)]/10 text-[var(--color-success-green-dark)] border border-[var(--color-success-green)]/20 rounded-full text-xs font-semibold inline-block w-fit">
                              Digital
                            </span>
                          )}
                          {book.availableAsPhysical && (
                            <span className="px-2.5 py-1 bg-[var(--color-saffron)]/10 text-[var(--color-saffron-dark)] border border-[var(--color-saffron)]/20 rounded-full text-xs font-semibold inline-block w-fit">
                              Physical
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-wrap gap-1.5">
                          {bookCategories.slice(0, 2).map(cat => (
                            <span key={cat} className="px-2 py-1 bg-background border border-[#E2E8F0] rounded-full text-xs text-foreground/80 font-medium">
                              {cat}
                            </span>
                          ))}
                          {bookCategories.length > 2 && (
                            <span className="px-2 py-1 text-xs text-muted-foreground font-medium">+{bookCategories.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-sm text-muted-foreground">{book.lastUpdated}</span>
                      </td>
                      <td className="px-4 py-5 text-right">
                        <RowActionsMenu actions={[
                          {
                            label: "Edit",
                            icon: <Edit className="w-4 h-4" />,
                            onClick: () => setEditingBook(book),
                          },
                          {
                            label: "Delete",
                            icon: <Trash2 className="w-4 h-4" />,
                            onClick: () => {},
                            variant: "destructive",
                          },
                        ]} />
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-muted/5 border-b border-[#E2E8F0]">
                        <td colSpan={13} className="px-6 py-6">
                          <div className="max-w-6xl mx-auto space-y-4">
                            {/* Book Overview Info Bar */}
                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-wrap gap-6 text-xs text-muted-foreground shadow-sm">
                              <div>
                                <span className="font-semibold uppercase tracking-wider text-[9px] block mb-0.5 text-slate-400">Author</span>
                                <span className="font-bold text-foreground text-sm">{book.author}</span>
                              </div>
                              {book.pageCount !== undefined && (
                                <div>
                                  <span className="font-semibold uppercase tracking-wider text-[9px] block mb-0.5 text-slate-400">Page Count</span>
                                  <span className="font-bold text-foreground text-sm">{book.pageCount} pages</span>
                                </div>
                              )}
                              {book.seriesName && (
                                <div>
                                  <span className="font-semibold uppercase tracking-wider text-[9px] block mb-0.5 text-slate-400">Series</span>
                                  <span className="font-bold text-foreground text-sm">{book.seriesName} {book.seriesVolume ? `(Vol. ${book.seriesVolume})` : ''}</span>
                                </div>
                              )}
                              <div>
                                <span className="font-semibold uppercase tracking-wider text-[9px] block mb-0.5 text-slate-400">Status</span>
                                <span className="font-bold text-foreground text-sm capitalize">{book.status}</span>
                              </div>
                            </div>

                            <div className="flex border-b border-[#E2E8F0] mb-2 overflow-x-auto pb-px">
                              {book.variants.map((v) => {
                                const isActive = activeVariantTab === v.id || (!activeVariantTab && book.variants[0].id === v.id);
                                return (
                                  <button
                                    key={v.id}
                                    onClick={() => setActiveVariantTab(v.id)}
                                    className={`px-4 py-2 text-sm font-medium border-b-2 -mb-[1px] transition-all whitespace-nowrap ${
                                      isActive
                                        ? "border-[var(--color-institutional-blue)] text-[var(--color-institutional-blue)]"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                                  >
                                    {v.language}
                                  </button>
                                );
                              })}
                            </div>
                            <div className="grid gap-4">
                              {book.variants.map((variant) => {
                                const isActive = activeVariantTab === variant.id || (!activeVariantTab && book.variants[0].id === variant.id);
                                if (!isActive) return null;
                                return (
                                  <div key={variant.id} className="bg-card border border-[#E2E8F0] rounded-lg p-5">
                                    <div className="flex items-center justify-between mb-4 border-b border-[#E2E8F0] pb-3">
                                      <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] text-foreground">{variant.language} Variant Details</h5>
                                      <div className="flex gap-2">
                                        {variant.digital && (
                                          <span className="px-2 py-0.5 bg-[var(--color-success-green)]/10 text-[var(--color-success-green-dark)] border border-[var(--color-success-green)]/20 rounded text-xs">
                                            Digital
                                          </span>
                                        )}
                                        {variant.physical && (
                                          <span className="px-2 py-0.5 bg-[var(--color-saffron)]/10 text-[var(--color-saffron-dark)] border border-[var(--color-saffron)]/20 rounded text-xs">
                                            Physical
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Variant Metadata: Translator, Compiler/Editor, Edition, Publication Year */}
                                    {(variant.translator || variant.compilerEditor || variant.editionNumber || variant.publicationYear) && (
                                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b border-[#E2E8F0] text-xs">
                                        {variant.translator && (
                                          <div>
                                            <span className="text-muted-foreground block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Translator</span>
                                            <span className="font-semibold text-foreground">{variant.translator}</span>
                                          </div>
                                        )}
                                        {variant.compilerEditor && (
                                          <div>
                                            <span className="text-muted-foreground block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Compiler / Editor</span>
                                            <span className="font-semibold text-foreground">{variant.compilerEditor}</span>
                                          </div>
                                        )}
                                        {variant.editionNumber && (
                                          <div>
                                            <span className="text-muted-foreground block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Edition Number</span>
                                            <span className="font-semibold text-foreground">{variant.editionNumber}</span>
                                          </div>
                                        )}
                                        {variant.publicationYear && (
                                          <div>
                                            <span className="text-muted-foreground block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Publication Year</span>
                                            <span className="font-semibold text-foreground">{variant.publicationYear}</span>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {(() => {
                                      const groups = getPricingGroups();
                                      const activeGroup = groups.find(g => g.id === activeRegionId) || groups[0];
                                      
                                      const regPrice = variant.regionalPrices?.[activeRegionId] || {};
                                      
                                      let dPrice = regPrice.digitalPrice;
                                      if (dPrice === undefined && variant.digital?.price !== undefined) {
                                        dPrice = convertPrice(variant.digital.price, activeGroup.multiple, activeGroup.currency);
                                      }
                                      
                                      let dSalePrice = regPrice.digitalSalePrice;
                                      if (dSalePrice === undefined && variant.digital?.salePrice !== undefined) {
                                        dSalePrice = convertPrice(variant.digital.salePrice, activeGroup.multiple, activeGroup.currency);
                                      }
                                      
                                      let pPrice = regPrice.physicalPrice;
                                      if (pPrice === undefined && variant.physical?.price !== undefined) {
                                        pPrice = convertPrice(variant.physical.price, activeGroup.multiple, activeGroup.currency);
                                      }
                                      
                                      let pSalePrice = regPrice.physicalSalePrice;
                                      if (pSalePrice === undefined && variant.physical?.salePrice !== undefined) {
                                        pSalePrice = convertPrice(variant.physical.salePrice, activeGroup.multiple, activeGroup.currency);
                                      }

                                      return (
                                        <div className="grid grid-cols-2 gap-5">
                                          {variant.digital && (
                                            <div className="space-y-2">
                                              <div className="flex items-center gap-2">
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Digital Version ({activeGroup.name})</p>
                                                <span className={`px-1.5 py-0.5 border text-[9px] font-bold rounded-full uppercase tracking-wider ${getStatusBadgeClass(variant.digital.status)}`}>
                                                  {variant.digital.status || "Draft"}
                                                </span>
                                              </div>
                                              <div className="space-y-1.5 text-sm">
                                                <p><span className="text-muted-foreground">ISBN:</span> <span className="font-mono">{variant.digital.isbn}</span></p>
                                                <p><span className="text-muted-foreground">Price:</span> {dPrice !== undefined ? `${activeGroup.currencySymbol}${dPrice.toLocaleString()}` : "Not Set"}</p>
                                                {dSalePrice !== undefined && (
                                                  <p><span className="text-muted-foreground">Sale Price:</span> <span className="text-[var(--color-success-green)] font-semibold">{activeGroup.currencySymbol}{dSalePrice.toLocaleString()}</span></p>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                          {variant.physical && (
                                            <div className="space-y-2">
                                              <div className="flex items-center gap-2">
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Physical Version ({activeGroup.name})</p>
                                                <span className={`px-1.5 py-0.5 border text-[9px] font-bold rounded-full uppercase tracking-wider ${getStatusBadgeClass(variant.physical.status)}`}>
                                                  {variant.physical.status || "Draft"}
                                                </span>
                                              </div>
                                              <div className="space-y-1.5 text-sm">
                                                <p><span className="text-muted-foreground">ISBN:</span> <span className="font-mono">{variant.physical.isbn}</span></p>
                                                <p><span className="text-muted-foreground">SKU:</span> <span className="font-mono">{variant.physical.sku}</span></p>
                                                <p><span className="text-muted-foreground">Price:</span> {pPrice !== undefined ? `${activeGroup.currencySymbol}${pPrice.toLocaleString()}` : "Not Set"}</p>
                                                {pSalePrice !== undefined && (
                                                  <p><span className="text-muted-foreground">Sale Price:</span> <span className="text-[var(--color-success-green)] font-semibold">{activeGroup.currencySymbol}{pSalePrice.toLocaleString()}</span></p>
                                                )}
                                                <p>
                                                  <span className="text-muted-foreground">Stock:</span>
                                                  <span className={`ml-1 font-semibold ${
                                                    variant.physical.stock > 20
                                                      ? 'text-[var(--color-success-green)]'
                                                      : variant.physical.stock > 0
                                                      ? 'text-[var(--color-saffron)]'
                                                      : 'text-destructive'
                                                  }`}>
                                                    {variant.physical.stock}
                                                  </span>
                                                </p>
                                                <p><span className="text-muted-foreground">Weight:</span> {variant.physical.weight}g</p>
                                                <p><span className="text-muted-foreground">Dimensions:</span> {variant.physical.length} × {variant.physical.width} × {variant.physical.height} mm</p>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-[#E2E8F0] bg-muted/5 flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            {books.length} items
          </div>
          <div className="flex items-center gap-4">
            <select className="px-3 py-1.5 text-sm border border-[#E2E8F0] rounded-md bg-background hover:border-border transition-colors">
              <option>10 per page</option>
              <option>25 per page</option>
              <option>50 per page</option>
              <option>100 per page</option>
            </select>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 border border-[#E2E8F0] rounded-md hover:bg-muted hover:border-border transition-all">
                «
              </button>
              <button className="px-3 py-1.5 bg-[var(--color-institutional-blue)] text-white rounded-md">
                1
              </button>
              <button className="px-3 py-1.5 border border-[#E2E8F0] rounded-md hover:bg-muted hover:border-border transition-all">
                2
              </button>
              <button className="px-3 py-1.5 border border-[#E2E8F0] rounded-md hover:bg-muted hover:border-border transition-all">
                »
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Discount Modal */}
      {showBulkDiscount && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Apply Bulk Discount</h3>
              <button
                onClick={() => {
                  setShowBulkDiscount(false);
                  setBulkDiscountValue("");
                }}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Apply discount to {selectedBooks.length} selected book{selectedBooks.length !== 1 ? "s" : ""}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Discount Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={bulkDiscountType === "percentage"}
                      onChange={() => setBulkDiscountType("percentage")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Percentage (%)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={bulkDiscountType === "fixed"}
                      onChange={() => setBulkDiscountType("fixed")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Fixed Amount (₹)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Discount Value {bulkDiscountType === "percentage" ? "(%)" : "(₹)"}
                </label>
                <input
                  type="number"
                  value={bulkDiscountValue}
                  onChange={(e) => setBulkDiscountValue(e.target.value)}
                  placeholder={bulkDiscountType === "percentage" ? "e.g., 10" : "e.g., 50"}
                  className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25"
                />
              </div>

              <div className="bg-[#F8FAFC] rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  This will apply a sale price to all selected books. The discount will be calculated from the regular price.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowBulkDiscount(false);
                  setBulkDiscountValue("");
                }}
                className="flex-1 px-4 py-2.5 border border-border rounded-md hover:bg-muted transition-all"
              >
                Cancel
              </button>
              <button
                onClick={applyBulkDiscount}
                disabled={!bulkDiscountValue}
                className="flex-1 px-4 py-2.5 bg-[var(--color-saffron)] text-white rounded-md hover:bg-[var(--color-saffron-dark)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply Discount
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simplified language variant card component
// eBook Review Workspace Component
function EbookReviewWorkspace({
  variant,
  onClose,
  onUpdate,
}: {
  variant: LanguageVariant;
  onClose: () => void;
  onUpdate: (updates: Partial<LanguageVariant>) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"original" | "extracted" | "side-by-side">("side-by-side");
  const [selectedIssue, setSelectedIssue] = useState<PageIssue | null>(null);

  const processing = variant.digital?.ebookProcessing;
  if (!processing) return null;

  const totalPages = processing.totalPages || 0;
  const pageIssues = processing.pageIssues || [];
  const currentPageIssue = pageIssues.find(issue => issue.pageNumber === currentPage);
  const criticalIssues = pageIssues.filter(i => i.severity === "critical").length;
  const warningIssues = pageIssues.filter(i => i.severity === "warning").length;

  const handleMarkResolved = () => {
    const updatedIssues = pageIssues.filter(i => i.pageNumber !== currentPage);
    const updatedProcessing = {
      ...processing,
      pageIssues: updatedIssues,
      reviewedPages: (processing.reviewedPages || 0) + 1,
    };
    onUpdate({ digital: { ...variant.digital!, ebookProcessing: updatedProcessing } });
    setSelectedIssue(null);
  };

  const handlePublish = () => {
    if (criticalIssues > 0) {
      alert("Cannot publish: Please resolve all critical issues first.");
      return;
    }
    const updatedProcessing = { ...processing, status: "published" as const };
    onUpdate({ digital: { ...variant.digital!, ebookProcessing: updatedProcessing } });
    alert("eBook published successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-card z-[100] flex flex-col">
      {/* Top Header */}
      <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-[var(--color-neutral-100)]">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.3px] text-[#191c1e]">eBook Review Workspace</h2>
            <p className="text-xs text-muted-foreground">{variant.language} Edition • {processing.fileName}</p>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-border">
            <span className="text-xs text-muted-foreground">Auto-saved</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success-green)]" />
          </div>
          <button
            onClick={() => {
              const updatedProcessing = { ...processing, status: "in-review" as const };
              onUpdate({ digital: { ...variant.digital!, ebookProcessing: updatedProcessing } });
            }}
            className="px-4 py-2 border-2 border-[var(--color-institutional-blue)] text-[var(--color-institutional-blue)] rounded-lg hover:bg-[var(--color-institutional-blue)]/5 transition-all font-medium text-sm"
          >
            Mark In Review
          </button>
          <button
            onClick={handlePublish}
            disabled={criticalIssues > 0}
            className="px-4 py-2 bg-[var(--color-success-green)] text-white rounded-lg hover:opacity-90 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Publish Live
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-12 border-b border-border px-6 flex items-center justify-between bg-card">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{processing.reviewedPages}/{totalPages} pages reviewed</span>
            <div className="w-48 h-2 bg-[var(--color-neutral-200)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-institutional-blue)] transition-all"
                style={{ width: `${((processing.reviewedPages || 0) / totalPages) * 100}%` }}
              />
            </div>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="font-medium">{criticalIssues}</span>
              <span className="text-muted-foreground">Critical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="font-medium">{warningIssues}</span>
              <span className="text-muted-foreground">Warnings</span>
            </div>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-1 bg-[var(--color-neutral-100)] p-1 rounded-lg">
          <button
            onClick={() => setViewMode("original")}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
              viewMode === "original" ? "bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]" : "hover:bg-card/50"
            }`}
          >
            Original PDF
          </button>
          <button
            onClick={() => setViewMode("extracted")}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
              viewMode === "extracted" ? "bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]" : "hover:bg-card/50"
            }`}
          >
            Extracted Text
          </button>
          <button
            onClick={() => setViewMode("side-by-side")}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
              viewMode === "side-by-side" ? "bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]" : "hover:bg-card/50"
            }`}
          >
            Side-by-Side
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Page Navigation */}
        <div className="w-64 border-r border-border bg-[var(--color-neutral-100)] overflow-y-auto">
          <div className="p-3">
            <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-3">Pages</h3>
            <div className="space-y-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                const issue = pageIssues.find(i => i.pageNumber === pageNum);
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm transition-all ${
                      currentPage === pageNum
                        ? "bg-[var(--color-institutional-blue)] text-white"
                        : "hover:bg-card"
                    }`}
                  >
                    <span className="font-medium">Page {pageNum}</span>
                    {issue && (
                      <span className="flex-shrink-0">
                        {issue.severity === "critical" ? (
                          <XCircle className="w-4 h-4 text-destructive" />
                        ) : issue.severity === "warning" ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-success-green)]" />
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center - Preview/Editor */}
        <div className="flex-1 bg-[var(--color-neutral-200)] overflow-hidden flex">
          {viewMode === "side-by-side" ? (
            <>
              {/* Original PDF View */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                  <div className="text-xs text-muted-foreground mb-4">Original PDF - Page {currentPage}</div>
                  <div className="prose prose-sm">
                    <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Sample Page Content</h3>
                    <p>This is a simulated PDF page view. In a real implementation, this would show the actual PDF page rendered as an image or canvas.</p>
                    <p>The {variant.language} text would appear here with original formatting, fonts, and layout from the uploaded PDF file.</p>
                  </div>
                </div>
              </div>

              {/* Extracted Text View */}
              <div className="flex-1 p-6 overflow-y-auto border-l-2 border-[var(--color-institutional-blue)]">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                  <div className="text-xs text-muted-foreground mb-4">Extracted & Editable Text - Page {currentPage}</div>
                  <textarea
                    className="w-full h-96 p-4 border border-border rounded-lg font-serif text-base resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25"
                    defaultValue={`Sample extracted text for page ${currentPage}.\n\nThis would contain the OCR-extracted text from the PDF, which can be edited to correct any recognition errors.\n\nFor ${variant.language} text, this would show the extracted content in the appropriate script.`}
                  />
                </div>
              </div>
            </>
          ) : viewMode === "original" ? (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-12">
                <div className="text-xs text-muted-foreground mb-4">Original PDF - Page {currentPage}</div>
                <div className="prose">
                  <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Sample Page Content</h3>
                  <p>Original PDF rendering would appear here.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-12">
                <div className="text-xs text-muted-foreground mb-4">Extracted Text - Page {currentPage}</div>
                <textarea
                  className="w-full h-[600px] p-6 border border-border rounded-lg font-serif text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25"
                  defaultValue={`Extracted and editable text for page ${currentPage}...`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Issue Panel */}
        <div className="w-80 border-l border-border bg-card overflow-y-auto">
          <div className="p-4">
            <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-4">Page Analysis</h3>

            {/* Page Confidence */}
            <div className="mb-6 p-4 bg-[var(--color-neutral-100)] rounded-lg">
              <div className="text-xs text-muted-foreground mb-2">OCR Confidence</div>
              <div className={`text-3xl font-bold ${
                (currentPageIssue?.confidence || 100) >= 90
                  ? "text-[var(--color-success-green)]"
                  : (currentPageIssue?.confidence || 100) >= 70
                  ? "text-amber-600"
                  : "text-destructive"
              }`}>
                {currentPageIssue?.confidence || 100}%
              </div>
            </div>

            {/* Current Page Issues */}
            {currentPageIssue ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${
                  currentPageIssue.severity === "critical"
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-amber-50 border-amber-200"
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    {currentPageIssue.severity === "critical" ? (
                      <XCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    )}
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                      {currentPageIssue.severity === "critical" ? "Critical Issue" : "Warning"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {currentPageIssue.issues.map((issue, idx) => (
                      <div key={idx} className="text-sm">• {issue}</div>
                    ))}
                  </div>
                </div>

                {/* Issue Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleMarkResolved}
                    className="w-full px-4 py-2.5 bg-[var(--color-success-green)] text-white rounded-lg hover:opacity-90 transition-all font-medium text-sm"
                  >
                    Mark as Resolved
                  </button>
                  <button className="w-full px-4 py-2.5 border-2 border-border rounded-lg hover:bg-[var(--color-neutral-100)] transition-all font-medium text-sm">
                    Re-run OCR for Page
                  </button>
                  <button className="w-full px-4 py-2.5 border-2 border-border rounded-lg hover:bg-[var(--color-neutral-100)] transition-all font-medium text-sm">
                    Ignore Warning
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-[var(--color-success-green)]" />
                <p className="text-sm font-medium mb-1">Page looks good!</p>
                <p className="text-xs text-muted-foreground">No issues detected on this page</p>
              </div>
            )}

            {/* All Issues Summary */}
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">All Issues</h4>
              <div className="space-y-2">
                {pageIssues.map((issue, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentPage(issue.pageNumber);
                      setSelectedIssue(issue);
                    }}
                    className="w-full p-3 text-left rounded-lg border border-border hover:bg-[var(--color-neutral-100)] transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Page {issue.pageNumber}</span>
                      {issue.severity === "critical" ? (
                        <XCircle className="w-4 h-4 text-destructive" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {issue.issues[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="h-14 border-t border-border px-6 flex items-center justify-between bg-[var(--color-neutral-100)]">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-border rounded-lg hover:bg-card transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          Previous Page
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-border rounded-lg hover:bg-card transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

type SimplifiedLanguageVariantCardProps = {
  variant: LanguageVariant;
  isExpanded: boolean;
  isDefault: boolean;
  canRemove: boolean;
  hideHeader?: boolean;
  onToggleExpand: () => void;
  onUpdate: (updates: Partial<LanguageVariant>) => void;
  onRemove: () => void;
  onSetAsDefault: () => void;
  onOpenReviewWorkspace?: () => void;
};

function SimplifiedLanguageVariantCard({
  variant,
  isExpanded,
  isDefault,
  canRemove,
  hideHeader,
  onToggleExpand,
  onUpdate,
  onRemove,
  onSetAsDefault,
  onOpenReviewWorkspace,
}: SimplifiedLanguageVariantCardProps) {
  const [isCoverDragging, setIsCoverDragging] = useState(false);
  const [isEbookDragging, setIsEbookDragging] = useState(false);

  const isDigitalPriceOk = (variant.digital?.price || 0) > 0;
  const isDigitalCoverOk = !!variant.coverUrl;
  const isDigitalDescOk = (variant.description?.trim().length || 0) > 10;
  const isDigitalIsbnOk = !!variant.digital?.isbn;
  const allDigitalChecksPassed = isDigitalPriceOk && isDigitalCoverOk && isDigitalDescOk && isDigitalIsbnOk;

  const isPhysicalPriceOk = (variant.physical?.price || 0) > 0;
  const isPhysicalCoverOk = !!variant.coverUrl;
  const isPhysicalDescOk = (variant.description?.trim().length || 0) > 10;
  const isPhysicalIsbnOk = !!variant.physical?.isbn;
  const isPhysicalSkuOk = !!variant.physical?.sku;
  const isPhysicalWeightOk = (variant.physical?.weight || 0) > 0;
  const allPhysicalChecksPassed = isPhysicalPriceOk && isPhysicalCoverOk && isPhysicalDescOk && isPhysicalIsbnOk && isPhysicalSkuOk && isPhysicalWeightOk;

  const handleCoverDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsCoverDragging(true);
  };

  const handleCoverDragLeave = () => {
    setIsCoverDragging(false);
  };

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsCoverDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onUpdate({ coverUrl: files[0].name });
    }
  };

  const handleEbookDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsEbookDragging(true);
  };

  const handleEbookDragLeave = () => {
    setIsEbookDragging(false);
  };

  const handleEbookDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsEbookDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const mockProcessing: EbookProcessing = {
        status: "draft",
        fileName: file.name,
        fileSize: parseFloat((file.size / (1024 * 1024)).toFixed(1)),
        uploadedAt: new Date().toISOString(),
        ocrConfidence: 87,
        totalPages: 248,
        reviewedPages: 0,
        healthScore: "moderate",
        pageIssues: [
          { pageNumber: 12, severity: "warning", issues: ["Low OCR confidence"], confidence: 68 },
          { pageNumber: 45, severity: "critical", issues: ["Script recognition failed", "Missing text"], confidence: 42 },
          { pageNumber: 89, severity: "warning", issues: ["Formatting inconsistency"], confidence: 74 },
          { pageNumber: 156, severity: "critical", issues: ["Encoding issue"], confidence: 38 },
        ],
      };
      onUpdate({ digital: { ...variant.digital!, isbn: variant.digital?.isbn || "", ebookProcessing: mockProcessing } });
    }
  };

  const getSummary = () => {
    const formats: string[] = [];
    if (variant.digital) formats.push("Digital");
    if (variant.physical) formats.push("Physical");

    const prices: string[] = [];
    if (variant.digital?.price) prices.push(`₹${variant.digital.price}`);
    if (variant.physical?.price) prices.push(`₹${variant.physical.price}`);

    const stock = variant.physical?.stock || 0;

    return {
      formats: formats.join(", ") || "No formats enabled",
      prices: prices.join(" / ") || "No pricing set",
      stock: stock > 0 ? `${stock} in stock` : "Out of stock",
    };
  };

  const summary = getSummary();

  return (
    <div className={hideHeader ? "" : "bg-card border border-[#E2E8F0] rounded-lg overflow-hidden"}>
      {!hideHeader && (
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
          onClick={onToggleExpand}
        >
          <div className="flex items-center gap-4 flex-1">
            {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{variant.language}</p>
                {isDefault && (
                  <span className="px-2 py-0.5 bg-[var(--color-institutional-blue)]/10 text-[var(--color-institutional-blue)] border border-[var(--color-institutional-blue)]/20 rounded text-xs font-medium">
                    Default
                  </span>
                )}
              </div>
              {!isExpanded && (
                <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                  <span>{summary.formats}</span>
                  <span>•</span>
                  <span>{summary.prices}</span>
                  {variant.physical && (
                    <>
                      <span>•</span>
                      <span>{summary.stock}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          {canRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {isExpanded && (
        <div className={`p-6 space-y-6 ${!hideHeader ? "pt-0 border-t border-[#E2E8F0]" : ""}`}>
          {/* Set as Default Toggle */}
          <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            <input
              type="checkbox"
              id={`default-${variant.id}`}
              checked={isDefault}
              onChange={onSetAsDefault}
              className="w-4 h-4 rounded border-border"
            />
            <label htmlFor={`default-${variant.id}`} className="text-sm font-medium cursor-pointer flex-1">
              Set as Default Language
            </label>
            <p className="text-xs text-muted-foreground">Primary language shown to users</p>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-3">Cover Image</label>
            <div
              onDragOver={handleCoverDragOver}
              onDragLeave={handleCoverDragLeave}
              onDrop={handleCoverDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                isCoverDragging
                  ? "border-[var(--color-institutional-blue)] bg-[var(--color-institutional-blue)]/5 scale-[0.99]"
                  : "border-[#E2E8F0] hover:border-[var(--color-institutional-blue)]/50 bg-card"
              }`}
            >
              <UploadIcon className={`w-8 h-8 mx-auto mb-2 transition-transform duration-300 ${isCoverDragging ? "scale-110 text-[var(--color-institutional-blue)]" : "text-muted-foreground"}`} />
              <p className="text-sm font-semibold text-foreground mb-1">Drag & Drop Cover Image here</p>
              <p className="text-xs text-muted-foreground mb-3">or click to browse (JPEG/PNG/WebP, Max 5MB, ratio 1:1.5)</p>
              <label className="inline-block px-4 py-2 text-sm border border-border rounded-md hover:bg-muted cursor-pointer transition-colors font-medium">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      onUpdate({ coverUrl: files[0].name });
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
            {variant.coverUrl && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground bg-[#F8FAFC] p-2 rounded border border-[#E2E8F0]">
                <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground/80">Current: {variant.coverUrl}</span>
                <button
                  onClick={() => onUpdate({ coverUrl: undefined })}
                  className="text-destructive hover:underline ml-auto font-semibold"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Language-Specific Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title ({variant.language})</label>
            <input
              type="text"
              value={variant.title || ""}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder={`Enter title in ${variant.language}`}
              className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25"
            />
          </div>

          {/* Language-Specific Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description ({variant.language})</label>
            <textarea
              value={variant.description || ""}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder={`Enter description in ${variant.language}`}
              rows={4}
              className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 resize-none"
            />
          </div>

          {/* Translator, Compiler/Editor, Edition Number, Publication Year */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Translator</label>
              <input
                type="text"
                value={variant.translator || ""}
                onChange={(e) => onUpdate({ translator: e.target.value })}
                placeholder="e.g. Swami Amritaswarupananda"
                className="w-full px-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compiler / Editor</label>
              <input
                type="text"
                value={variant.compilerEditor || ""}
                onChange={(e) => onUpdate({ compilerEditor: e.target.value })}
                placeholder="e.g. Mata Amritanandamayi Math"
                className="w-full px-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Edition Number</label>
              <input
                type="text"
                value={variant.editionNumber || ""}
                onChange={(e) => onUpdate({ editionNumber: e.target.value })}
                placeholder="e.g. 2nd Revised Edition"
                className="w-full px-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Publication Year</label>
              <input
                type="text"
                value={variant.publicationYear || ""}
                onChange={(e) => onUpdate({ publicationYear: e.target.value })}
                placeholder="e.g. 2024"
                className="w-full px-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25"
              />
            </div>
          </div>

          {/* Regional Pricing Infrastructure Grid */}
          <div className="bg-card border border-[#E2E8F0] rounded-xl p-6 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] text-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--color-institutional-blue)]" />
                  Regional Pricing Models Integration
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Define location-specific pricing overriding default values for this variant.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const groups = getPricingGroups();
                  const indiaReg = variant.regionalPrices?.["india"] || {};
                  
                  const dPrice = indiaReg.digitalPrice !== undefined ? indiaReg.digitalPrice : (variant.digital?.price || 0);
                  const dSale = indiaReg.digitalSalePrice !== undefined ? indiaReg.digitalSalePrice : variant.digital?.salePrice;
                  
                  const pPrice = indiaReg.physicalPrice !== undefined ? indiaReg.physicalPrice : (variant.physical?.price || 0);
                  const pSale = indiaReg.physicalSalePrice !== undefined ? indiaReg.physicalSalePrice : variant.physical?.salePrice;

                  const newReg = { ...(variant.regionalPrices || {}) };
                  groups.forEach(g => {
                    newReg[g.id] = {
                      digitalPrice: dPrice,
                      digitalSalePrice: dSale,
                      physicalPrice: pPrice,
                      physicalSalePrice: pSale
                    };
                  });
                  onUpdate({ regionalPrices: newReg });
                }}
                className="px-2.5 py-1.5 text-xs bg-[var(--color-institutional-blue)]/10 text-[var(--color-institutional-blue)] border border-[var(--color-institutional-blue)]/20 rounded-md hover:bg-[var(--color-institutional-blue)] hover:text-white transition-all font-semibold"
              >
                Apply India Pricing to All Regions
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-muted-foreground uppercase tracking-wider font-semibold">
                    <th className="py-2 pr-4">Pricing Region</th>
                    <th className="py-2 px-4 w-44">Digital Price</th>
                    <th className="py-2 px-4 w-44">Physical Price</th>
                    <th className="py-2 pl-4 text-right">Duplicate Option</th>
                  </tr>
                </thead>
                <tbody className="/30">
                  {getPricingGroups().map((group) => {
                    const reg = variant.regionalPrices?.[group.id] || {};
                    
                    // Defaults if not defined
                    const dVal = reg.digitalPrice !== undefined ? reg.digitalPrice : (group.id === "india" ? (variant.digital?.price || 0) : "");
                    const dSaleVal = reg.digitalSalePrice !== undefined ? reg.digitalSalePrice : (group.id === "india" ? (variant.digital?.salePrice || "") : "");
                    
                    const pVal = reg.physicalPrice !== undefined ? reg.physicalPrice : (group.id === "india" ? (variant.physical?.price || 0) : "");
                    const pSaleVal = reg.physicalSalePrice !== undefined ? reg.physicalSalePrice : (group.id === "india" ? (variant.physical?.salePrice || "") : "");

                    // Auto-calculated placeholders for other regions
                    let autoDVal = "";
                    if (group.id !== "india" && variant.digital?.price !== undefined) {
                      const converted = convertPrice(variant.digital.price, group.multiple, group.currency);
                      autoDVal = "Auto: " + (group.currency === "INR" ? converted : converted.toFixed(2));
                    }
                    let autoDSaleVal = "";
                    if (group.id !== "india" && variant.digital?.salePrice !== undefined) {
                      const converted = convertPrice(variant.digital.salePrice, group.multiple, group.currency);
                      autoDSaleVal = "Auto: " + (group.currency === "INR" ? converted : converted.toFixed(2));
                    }

                    let autoPVal = "";
                    if (group.id !== "india" && variant.physical?.price !== undefined) {
                      const converted = convertPrice(variant.physical.price, group.multiple, group.currency);
                      autoPVal = "Auto: " + (group.currency === "INR" ? converted : converted.toFixed(2));
                    }
                    let autoPSaleVal = "";
                    if (group.id !== "india" && variant.physical?.salePrice !== undefined) {
                      const converted = convertPrice(variant.physical.salePrice, group.multiple, group.currency);
                      autoPSaleVal = "Auto: " + (group.currency === "INR" ? converted : converted.toFixed(2));
                    }

                    return (
                      <tr key={group.id} className="hover:bg-muted/5">
                        <td className="py-3 pr-4">
                          <div className="font-semibold text-foreground">{group.name}</div>
                          <div className="text-muted-foreground mt-0.5 font-mono text-[10px] flex items-center gap-1">
                            <span>{group.currencyCode || group.currency} ({group.currencySymbol})</span>
                            <span>•</span>
                            <span className="truncate max-w-[120px] inline-block" title={group.countries.join(", ")}>
                              {group.countries.length} countries
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          {variant.digital ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 border border-[#E2E8F0] rounded px-1.5 py-0.5 bg-background">
                                <span className="text-muted-foreground font-mono font-medium">{group.currencySymbol}</span>
                                <input
                                  type="number"
                                  placeholder={autoDVal || "Price"}
                                  value={dVal}
                                  onChange={(e) => {
                                    const val = e.target.value ? parseFloat(e.target.value) : undefined;
                                    const regPrices = { ...(variant.regionalPrices || {}) };
                                    regPrices[group.id] = { ...(regPrices[group.id] || {}), digitalPrice: val };
                                    onUpdate({ regionalPrices: regPrices });
                                  }}
                                  className="w-full border-none bg-transparent p-0 text-xs font-mono focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="flex items-center gap-1 border border-[#E2E8F0] rounded px-1.5 py-0.5 bg-background">
                                <span className="text-muted-foreground font-mono font-medium">{group.currencySymbol}</span>
                                <input
                                  type="number"
                                  placeholder={autoDSaleVal || "Sale (Opt)"}
                                  value={dSaleVal}
                                  onChange={(e) => {
                                    const val = e.target.value ? parseFloat(e.target.value) : undefined;
                                    const regPrices = { ...(variant.regionalPrices || {}) };
                                    regPrices[group.id] = { ...(regPrices[group.id] || {}), digitalSalePrice: val };
                                    onUpdate({ regionalPrices: regPrices });
                                  }}
                                  className="w-full border-none bg-transparent p-0 text-xs font-mono focus:outline-none focus:ring-0"
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground italic text-[11px]">Digital Disabled</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          {variant.physical ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 border border-[#E2E8F0] rounded px-1.5 py-0.5 bg-background">
                                <span className="text-muted-foreground font-mono font-medium">{group.currencySymbol}</span>
                                <input
                                  type="number"
                                  placeholder={autoPVal || "Price"}
                                  value={pVal}
                                  onChange={(e) => {
                                    const val = e.target.value ? parseFloat(e.target.value) : undefined;
                                    const regPrices = { ...(variant.regionalPrices || {}) };
                                    regPrices[group.id] = { ...(regPrices[group.id] || {}), physicalPrice: val };
                                    onUpdate({ regionalPrices: regPrices });
                                  }}
                                  className="w-full border-none bg-transparent p-0 text-xs font-mono focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="flex items-center gap-1 border border-[#E2E8F0] rounded px-1.5 py-0.5 bg-background">
                                <span className="text-muted-foreground font-mono font-medium">{group.currencySymbol}</span>
                                <input
                                  type="number"
                                  placeholder={autoPSaleVal || "Sale (Opt)"}
                                  value={pSaleVal}
                                  onChange={(e) => {
                                    const val = e.target.value ? parseFloat(e.target.value) : undefined;
                                    const regPrices = { ...(variant.regionalPrices || {}) };
                                    regPrices[group.id] = { ...(regPrices[group.id] || {}), physicalSalePrice: val };
                                    onUpdate({ regionalPrices: regPrices });
                                  }}
                                  className="w-full border-none bg-transparent p-0 text-xs font-mono focus:outline-none focus:ring-0"
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground italic text-[11px]">Physical Disabled</span>
                          )}
                        </td>

                        <td className="py-3 pl-4 text-right">
                          <select
                            onChange={(e) => {
                              const srcGroup = e.target.value;
                              if (!srcGroup) return;
                              const srcReg = variant.regionalPrices?.[srcGroup] || {};
                              const regPrices = { ...(variant.regionalPrices || {}) };
                              regPrices[group.id] = { ...srcReg };
                              onUpdate({ regionalPrices: regPrices });
                              e.target.value = ""; // Reset select
                            }}
                            className="text-[10px] bg-background border border-[#E2E8F0] rounded px-1 py-0.5 focus:outline-none cursor-pointer"
                          >
                            <option value="">Copy from...</option>
                            {getPricingGroups().filter(g => g.id !== group.id).map(g => (
                              <option key={g.id} value={g.id}>
                                {g.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Digital Version */}
          <div className="bg-[var(--color-success-green)]/5 rounded-lg p-5 border border-[var(--color-success-green)]/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-[var(--color-success-green-dark)]">Digital Version</h4>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!variant.digital}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onUpdate({ digital: { isbn: "", price: 0 } });
                    } else {
                      onUpdate({ digital: undefined });
                    }
                  }}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm font-medium">Enable Digital Version</span>
              </label>
            </div>

            {variant.digital && (
              <div className="space-y-4">
                {/* Approval Workflow & Pre-Publish Checklist for Digital */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 border border-[#E2E8F0] rounded-xl shadow-sm mb-4">
                  {/* Workflow steps */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Digital Approval Status</p>
                    <div className="flex flex-wrap gap-1">
                      {["Draft", "Review", "Approved", "Published", "Archived"].map((step) => {
                        const currentStatus = variant.digital?.status || "Draft";
                        const isActive = currentStatus === step;
                        const isDisabled = step === "Published" && !allDigitalChecksPassed;
                        
                        return (
                          <button
                            key={step}
                            type="button"
                            disabled={isDisabled && currentStatus !== "Published"}
                            onClick={() => onUpdate({ digital: { ...variant.digital!, status: step as any } })}
                            className={`px-2.5 py-1.5 rounded text-[11px] font-bold border flex items-center gap-1 transition-all cursor-pointer ${
                              isActive
                                ? "bg-[#002045] text-white border-[#002045]"
                                : isDisabled
                                ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
                                : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                            title={isDisabled ? "Resolve all checklist items to publish" : ""}
                          >
                            {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            {step}
                          </button>
                        );
                      })}
                    </div>
                    {!allDigitalChecksPassed && (variant.digital?.status === "Review" || variant.digital?.status === "Draft") && (
                      <p className="text-[10px] text-amber-600 font-medium leading-none mt-1">
                        * Resolve all checklist requirements to enable publishing.
                      </p>
                    )}
                  </div>

                  {/* Checklist */}
                  <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#E2E8F0] pt-3 md:pt-0 md:pl-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pre-Publish Requirements</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className={isDigitalPriceOk ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                          {isDigitalPriceOk ? "✓" : "✗"}
                        </span>
                        <span className="text-slate-600">Base Price &gt; 0</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={isDigitalCoverOk ? "text-green-600 font-bold" : "text-amber-500 font-bold"}>
                          {isDigitalCoverOk ? "✓" : "⚠"}
                        </span>
                        <span className="text-slate-600">Cover Image</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={isDigitalDescOk ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                          {isDigitalDescOk ? "✓" : "✗"}
                        </span>
                        <span className="text-slate-600">Description Set</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={isDigitalIsbnOk ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                          {isDigitalIsbnOk ? "✓" : "✗"}
                        </span>
                        <span className="text-slate-600">Digital ISBN</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Digital ISBN</label>
                    <input
                      type="text"
                      value={variant.digital.isbn}
                      onChange={(e) => onUpdate({ digital: { ...variant.digital!, isbn: e.target.value } })}
                      placeholder="978-1-234-56789-0"
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Base Price (₹)</label>
                    <input
                      type="number"
                      value={variant.digital.price !== undefined ? variant.digital.price : ""}
                      onChange={(e) => onUpdate({ digital: { ...variant.digital!, price: parseFloat(e.target.value) || 0 } })}
                      placeholder="299"
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sale Price (₹) (Optional)</label>
                    <input
                      type="number"
                      value={variant.digital.salePrice !== undefined ? variant.digital.salePrice : ""}
                      onChange={(e) => onUpdate({ digital: { ...variant.digital!, salePrice: e.target.value ? parseFloat(e.target.value) : undefined } })}
                      placeholder="Sale Price"
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                    />
                  </div>
                </div>

                {/* eBook Upload & Processing */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h5 className="text-sm font-semibold mb-4">eBook File & Processing</h5>

                  {!variant.digital.ebookProcessing ? (
                    /* Upload Section */
                    <div
                      onDragOver={handleEbookDragOver}
                      onDragLeave={handleEbookDragLeave}
                      onDrop={handleEbookDrop}
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                        isEbookDragging
                          ? "border-[var(--color-institutional-blue)] bg-[var(--color-institutional-blue)]/5 scale-[0.99]"
                          : "border-[#E2E8F0] hover:border-[var(--color-institutional-blue)]/50 bg-card"
                      }`}
                    >
                      <UploadIcon className={`w-8 h-8 mx-auto mb-3 transition-transform duration-300 ${isEbookDragging ? "scale-110 text-[var(--color-institutional-blue)]" : "text-muted-foreground"}`} />
                      <p className="text-sm font-semibold text-foreground mb-1">Drag & Drop eBook File here</p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PDF or EPUB formats up to 25MB (OCR & review details processed on drop)
                      </p>
                      <label className="inline-block px-4 py-2 bg-[var(--color-institutional-blue)] text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium cursor-pointer">
                        Select File to Upload
                        <input
                          type="file"
                          accept=".pdf,.epub"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              const file = files[0];
                              const mockProcessing: EbookProcessing = {
                                status: "draft",
                                fileName: file.name,
                                fileSize: parseFloat((file.size / (1024 * 1024)).toFixed(1)),
                                uploadedAt: new Date().toISOString(),
                                ocrConfidence: 87,
                                totalPages: 248,
                                reviewedPages: 0,
                                healthScore: "moderate",
                                pageIssues: [
                                  { pageNumber: 12, severity: "warning", issues: ["Low OCR confidence"], confidence: 68 },
                                  { pageNumber: 45, severity: "critical", issues: ["Script recognition failed", "Missing text"], confidence: 42 },
                                  { pageNumber: 89, severity: "warning", issues: ["Formatting inconsistency"], confidence: 74 },
                                  { pageNumber: 156, severity: "critical", issues: ["Encoding issue"], confidence: 38 },
                                ],
                              };
                              onUpdate({ digital: { ...variant.digital!, isbn: variant.digital?.isbn || "", ebookProcessing: mockProcessing } });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    /* Processing Status & Actions */
                    <div className="space-y-4">
                      {/* File Info */}
                      <div className="flex items-start justify-between p-4 bg-[var(--color-neutral-100)] rounded-lg border border-border">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-[var(--color-institutional-blue)] mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{variant.digital.ebookProcessing.fileName}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span>{variant.digital.ebookProcessing.fileSize} MB</span>
                              <span>•</span>
                              <span>{variant.digital.ebookProcessing.totalPages} pages</span>
                              <span>•</span>
                              <span>Uploaded {new Date(variant.digital.ebookProcessing.uploadedAt!).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded text-xs font-medium border flex-shrink-0 ${
                          variant.digital.ebookProcessing.status === "published"
                            ? "bg-[var(--color-success-green)]/10 text-[var(--color-success-green)] border-[var(--color-success-green)]/20"
                            : variant.digital.ebookProcessing.status === "in-review"
                            ? "bg-[var(--color-institutional-blue)]/10 text-[var(--color-institutional-blue)] border-[var(--color-institutional-blue)]/20"
                            : "bg-[var(--color-neutral-300)] text-[var(--color-neutral-700)] border-[var(--color-neutral-400)]"
                        }`}>
                          {variant.digital.ebookProcessing.status === "published" ? "Published" : variant.digital.ebookProcessing.status === "in-review" ? "In Review" : "Draft"}
                        </span>
                      </div>

                      {/* Processing Quality Dashboard */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="p-3 bg-card border border-border rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">OCR Confidence</div>
                          <div className={`text-xl font-bold ${
                            variant.digital.ebookProcessing.ocrConfidence! >= 90
                              ? "text-[var(--color-success-green)]"
                              : variant.digital.ebookProcessing.ocrConfidence! >= 70
                              ? "text-amber-600"
                              : "text-destructive"
                          }`}>
                            {variant.digital.ebookProcessing.ocrConfidence}%
                          </div>
                        </div>
                        <div className="p-3 bg-card border border-border rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Pages Reviewed</div>
                          <div className="text-xl font-bold">
                            {variant.digital.ebookProcessing.reviewedPages}/{variant.digital.ebookProcessing.totalPages}
                          </div>
                        </div>
                        <div className="p-3 bg-card border border-border rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Issues Found</div>
                          <div className="text-xl font-bold text-amber-600">
                            {variant.digital.ebookProcessing.pageIssues?.length || 0}
                          </div>
                        </div>
                        <div className="p-3 bg-card border border-border rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Health Score</div>
                          <div className={`text-xs font-semibold uppercase ${
                            variant.digital.ebookProcessing.healthScore === "good"
                              ? "text-[var(--color-success-green)]"
                              : variant.digital.ebookProcessing.healthScore === "moderate"
                              ? "text-amber-600"
                              : "text-destructive"
                          }`}>
                            {variant.digital.ebookProcessing.healthScore}
                          </div>
                        </div>
                      </div>

                      {/* Issue Summary */}
                      {variant.digital.ebookProcessing.pageIssues && variant.digital.ebookProcessing.pageIssues.length > 0 && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-semibold text-amber-900">Pages Requiring Attention</span>
                          </div>
                          <div className="space-y-1.5">
                            {variant.digital.ebookProcessing.pageIssues.slice(0, 3).map((issue, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  {issue.severity === "critical" ? (
                                    <XCircle className="w-3.5 h-3.5 text-destructive" />
                                  ) : (
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                  )}
                                  <span className="text-amber-900">Page {issue.pageNumber}: {issue.issues[0]}</span>
                                </div>
                                <span className="text-amber-700">{issue.confidence}%</span>
                              </div>
                            ))}
                            {variant.digital.ebookProcessing.pageIssues.length > 3 && (
                              <div className="text-xs text-amber-700 mt-2">
                                +{variant.digital.ebookProcessing.pageIssues.length - 3} more issues
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        {onOpenReviewWorkspace && (
                          <button
                            onClick={onOpenReviewWorkspace}
                            className="flex-1 px-4 py-2.5 bg-[var(--color-institutional-blue)] text-white rounded-lg hover:opacity-90 transition-all font-medium text-sm flex items-center justify-center gap-2"
                          >
                            <LayoutGrid className="w-4 h-4" />
                            Open Review Workspace
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm("Are you sure you want to remove this eBook file?")) {
                              onUpdate({ digital: { ...variant.digital!, ebookProcessing: undefined } });
                            }
                          }}
                          className="px-4 py-2.5 border-2 border-border rounded-lg hover:border-destructive hover:text-destructive transition-all font-medium text-sm"
                        >
                          Remove File
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Physical Version */}
          <div className="bg-[var(--color-saffron)]/5 rounded-lg p-5 border border-[var(--color-saffron)]/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-[var(--color-saffron-dark)]">Physical Version</h4>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!variant.physical}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onUpdate({ physical: { isbn: "", price: 0, stock: 0, weight: 0, length: 0, width: 0, height: 0, sku: "" } });
                    } else {
                      onUpdate({ physical: undefined });
                    }
                  }}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm font-medium">Enable Physical Version</span>
              </label>
            </div>

            {variant.physical && (
              <div className="space-y-4">
                {/* Approval Workflow & Pre-Publish Checklist for Physical */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 border border-[#E2E8F0] rounded-xl shadow-sm mb-4">
                  {/* Workflow steps */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Physical Approval Status</p>
                    <div className="flex flex-wrap gap-1">
                      {["Draft", "Review", "Approved", "Published", "Archived"].map((step) => {
                        const currentStatus = variant.physical?.status || "Draft";
                        const isActive = currentStatus === step;
                        const isDisabled = step === "Published" && !allPhysicalChecksPassed;
                        
                        return (
                          <button
                            key={step}
                            type="button"
                            disabled={isDisabled && currentStatus !== "Published"}
                            onClick={() => onUpdate({ physical: { ...variant.physical!, status: step as any } })}
                            className={`px-2.5 py-1.5 rounded text-[11px] font-bold border flex items-center gap-1 transition-all cursor-pointer ${
                              isActive
                                ? "bg-[#002045] text-white border-[#002045]"
                                : isDisabled
                                ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
                                : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                            title={isDisabled ? "Resolve all checklist items to publish" : ""}
                          >
                            {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            {step}
                          </button>
                        );
                      })}
                    </div>
                    {!allPhysicalChecksPassed && (variant.physical?.status === "Review" || variant.physical?.status === "Draft") && (
                      <p className="text-[10px] text-amber-600 font-medium leading-none mt-1">
                        * Resolve all checklist requirements to enable publishing.
                      </p>
                    )}
                  </div>

                  {/* Checklist */}
                  <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#E2E8F0] pt-3 md:pt-0 md:pl-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pre-Publish Requirements</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className={isPhysicalPriceOk ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                          {isPhysicalPriceOk ? "✓" : "✗"}
                        </span>
                        <span className="text-slate-600">Base Price &gt; 0</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={isPhysicalCoverOk ? "text-green-600 font-bold" : "text-amber-500 font-bold"}>
                          {isPhysicalCoverOk ? "✓" : "⚠"}
                        </span>
                        <span className="text-slate-600">Cover Image</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={isPhysicalDescOk ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                          {isPhysicalDescOk ? "✓" : "✗"}
                        </span>
                        <span className="text-slate-600">Description Set</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={isPhysicalIsbnOk ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                          {isPhysicalIsbnOk ? "✓" : "✗"}
                        </span>
                        <span className="text-slate-600">Physical ISBN</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={isPhysicalSkuOk ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                          {isPhysicalSkuOk ? "✓" : "✗"}
                        </span>
                        <span className="text-slate-600">SKU Code Set</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={isPhysicalWeightOk ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                          {isPhysicalWeightOk ? "✓" : "✗"}
                        </span>
                        <span className="text-slate-600">Weight &gt; 0</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Physical ISBN</label>
                    <input
                      type="text"
                      value={variant.physical.isbn}
                      onChange={(e) => onUpdate({ physical: { ...variant.physical!, isbn: e.target.value } })}
                      placeholder="978-1-234-56789-1"
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">SKU</label>
                    <input
                      type="text"
                      value={variant.physical.sku}
                      onChange={(e) => onUpdate({ physical: { ...variant.physical!, sku: e.target.value } })}
                      placeholder="BG-EN-001"
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Base Price (₹)</label>
                    <input
                      type="number"
                      value={variant.physical.price !== undefined ? variant.physical.price : ""}
                      onChange={(e) => onUpdate({ physical: { ...variant.physical!, price: parseFloat(e.target.value) || 0 } })}
                      placeholder="499"
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sale Price (₹) (Optional)</label>
                    <input
                      type="number"
                      value={variant.physical.salePrice !== undefined ? variant.physical.salePrice : ""}
                      onChange={(e) => onUpdate({ physical: { ...variant.physical!, salePrice: e.target.value ? parseFloat(e.target.value) : undefined } })}
                      placeholder="Sale Price"
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stock Count</label>
                    <input
                      type="number"
                      value={variant.physical.stock}
                      onChange={(e) => onUpdate({ physical: { ...variant.physical!, stock: parseInt(e.target.value) || 0 } })}
                      placeholder="50"
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Weight (grams)</label>
                    <input
                      type="number"
                      value={variant.physical.weight}
                      onChange={(e) => onUpdate({ physical: { ...variant.physical!, weight: parseInt(e.target.value) || 0 } })}
                      placeholder="450"
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Dimensions (mm)</label>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="number"
                        value={variant.physical.length}
                        onChange={(e) => onUpdate({ physical: { ...variant.physical!, length: parseInt(e.target.value) || 0 } })}
                        placeholder="Length: 210"
                        className="px-3 py-2 bg-card border border-border rounded-md text-sm"
                      />
                      <input
                        type="number"
                        value={variant.physical.width}
                        onChange={(e) => onUpdate({ physical: { ...variant.physical!, width: parseInt(e.target.value) || 0 } })}
                        placeholder="Width: 140"
                        className="px-3 py-2 bg-card border border-border rounded-md text-sm"
                      />
                      <input
                        type="number"
                        value={variant.physical.height}
                        onChange={(e) => onUpdate({ physical: { ...variant.physical!, height: parseInt(e.target.value) || 0 } })}
                        placeholder="Height: 25"
                        className="px-3 py-2 bg-card border border-border rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#E2E8F0]">
                  <label className="block text-sm font-medium mb-3">Shipping Costs</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">India (₹)</label>
                      <input
                        type="number"
                        value={variant.physical.shippingIndia || 0}
                        onChange={(e) => onUpdate({ physical: { ...variant.physical!, shippingIndia: parseInt(e.target.value) || 0 } })}
                        placeholder="50"
                        className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">International (₹)</label>
                      <input
                        type="number"
                        value={variant.physical.shippingInternational || 0}
                        onChange={(e) => onUpdate({ physical: { ...variant.physical!, shippingInternational: parseInt(e.target.value) || 0 } })}
                        placeholder="500"
                        className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BookEditor({ book, onClose, onSave, allBooks }: { book: Book; onClose: () => void; onSave: (updatedBook: Book) => void; allBooks: Book[] }) {
  const [status, setStatus] = useState(book.status);
  const [mainCategories, setMainCategories] = useState<string[]>(
    book.categories?.slice(0, 2) || [book.category].filter(Boolean)
  );
  const [subCategories, setSubCategories] = useState<string[]>(
    book.categories?.slice(2) || []
  );
  const [variants, setVariants] = useState<LanguageVariant[]>(book.variants.length > 0 ? book.variants : [
    {
      id: "v1",
      language: "English",
      title: book.title || "",
      description: book.defaultDescription || "",
    },
  ]);
  const [activeVariantTabId, setActiveVariantTabId] = useState<string>(variants[0]?.id || "");
  const [defaultLanguageId, setDefaultLanguageId] = useState(variants[0]?.id || "");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [reviewWorkspaceVariant, setReviewWorkspaceVariant] = useState<string | null>(null);

  // New book-level metadata state
  const [primaryTitle, setPrimaryTitle] = useState(book.title || "");
  const [selectedAuthor, setSelectedAuthor] = useState(book.author || "");
  const [selectedSeries, setSelectedSeries] = useState(book.seriesName || "");
  const [volumeNumber, setVolumeNumber] = useState(book.seriesVolume || "");
  const [relatedIds, setRelatedIds] = useState<string[]>(book.relatedBookIds || []);
  const [isFeatured, setIsFeatured] = useState(book.featured || false);
  const [pageCount, setPageCount] = useState<number | string>(book.pageCount !== undefined ? book.pageCount : "");

  const [authors, setAuthors] = useState<string[]>(() => {
    const unique = new Set<string>(["Amma", "Swami Amritaswarupananda Puri", "Swami Ramakrishnananda Puri"]);
    allBooks.forEach(b => {
      if (b.author) unique.add(b.author);
    });
    return Array.from(unique);
  });

  const [seriesList, setSeriesList] = useState<string[]>(() => {
    const unique = new Set<string>(["Ocean of Grace Series", "Whispers of Amma Series", "Amma's Teachings Collection"]);
    allBooks.forEach(b => {
      if (b.seriesName) unique.add(b.seriesName);
    });
    return Array.from(unique);
  });

  // Hierarchical category structure
  const categoryHierarchy: Record<string, string[]> = {
    "Spirituality": ["Meditation", "Yoga", "Tantra", "Devotion"],
    "Philosophy": ["Vedanta", "Advaita", "Non-duality", "Bhakti"],
    "Scripture": ["Vedas", "Upanishads", "Puranas", "Bhagavad Gita"],
    "Epic": ["Ramayana", "Mahabharata", "Regional Epics"],
    "Mythology": ["Hindu Mythology", "Puranic Stories", "Folk Tales"],
    "Poetry": ["Devotional Poetry", "Mystical Poetry", "Classical Poetry"],
    "History": ["Ancient History", "Temple History", "Cultural History"],
  };

  const allParentCategories = Object.keys(categoryHierarchy);
  const allLanguages = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Malayalam", "Kannada", "Marathi", "Sanskrit"];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const addLanguageVariant = (language: string) => {
    const newVariant: LanguageVariant = {
      id: `v${Date.now()}`,
      language: language,
      title: "",
      description: "",
    };
    setVariants([...variants, newVariant]);
    setActiveVariantTabId(newVariant.id);
    setShowLanguageSelector(false);
  };

  const removeVariant = (id: string) => {
    if (variants.length === 1) {
      alert("At least one language variant is required");
      return;
    }
    const newVariants = variants.filter((v) => v.id !== id);
    setVariants(newVariants);
    if (activeVariantTabId === id) {
       setActiveVariantTabId(newVariants[0].id);
    }
    if (defaultLanguageId === id && newVariants.length > 0) {
      setDefaultLanguageId(newVariants[0].id);
    }
  };

  const updateVariant = (id: string, updates: Partial<LanguageVariant>) => {
    setVariants(variants.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  const setAsDefaultLanguage = (id: string) => {
    setDefaultLanguageId(id);
  };

  const toggleParentCategory = (category: string) => {
    if (mainCategories.includes(category)) {
      // Remove parent and all its children
      const childrenToRemove = categoryHierarchy[category] || [];
      setMainCategories(mainCategories.filter(c => c !== category));
      setSubCategories(subCategories.filter(c => !childrenToRemove.includes(c)));
    } else {
      setMainCategories([...mainCategories, category]);
    }
  };

  const toggleSubCategory = (category: string) => {
    if (subCategories.includes(category)) {
      setSubCategories(subCategories.filter(c => c !== category));
    } else {
      setSubCategories([...subCategories, category]);
    }
  };

  const removeParentCategory = (category: string) => {
    const childrenToRemove = categoryHierarchy[category] || [];
    setMainCategories(mainCategories.filter(c => c !== category));
    setSubCategories(subCategories.filter(c => !childrenToRemove.includes(c)));
  };

  const removeSubCategory = (category: string) => {
    setSubCategories(subCategories.filter(c => c !== category));
  };

  // Get available child categories based on selected parent categories
  const getAvailableChildCategories = () => {
    const available: string[] = [];
    mainCategories.forEach(parent => {
      const children = categoryHierarchy[parent] || [];
      available.push(...children);
    });
    return available;
  };

  const handleSave = () => {
    const allCategories = [...mainCategories, ...subCategories];
    const updatedBook: Book = {
      ...book,
      title: primaryTitle,
      author: selectedAuthor,
      seriesName: selectedSeries || undefined,
      seriesVolume: selectedSeries ? volumeNumber : undefined,
      relatedBookIds: relatedIds,
      featured: isFeatured,
      categories: allCategories,
      category: mainCategories[0] || "",
      status,
      variants,
      defaultLanguage: variants.find(v => v.id === defaultLanguageId)?.language || book.defaultLanguage || "English",
      pageCount: pageCount !== "" ? Number(pageCount) : undefined,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    onSave(updatedBook);
  };

  const getBookTitle = () => {
    return primaryTitle || "Untitled Book";
  };

  return (
    <>
      {/* eBook Review Workspace Overlay */}
      {reviewWorkspaceVariant && (() => {
        const workspaceVariant = variants.find(v => v.id === reviewWorkspaceVariant);
        if (!workspaceVariant) {
          console.log("No workspace variant found for ID:", reviewWorkspaceVariant);
          return null;
        }
        if (!workspaceVariant.digital?.ebookProcessing) {
          console.log("No ebookProcessing data for variant:", workspaceVariant.language);
          return null;
        }
        console.log("Rendering workspace for variant:", workspaceVariant.language, workspaceVariant.digital.ebookProcessing);
        return (
          <EbookReviewWorkspace
            variant={workspaceVariant}
            onClose={() => setReviewWorkspaceVariant(null)}
            onUpdate={(updates) => {
              const updatedVariants = variants.map(v =>
                v.id === reviewWorkspaceVariant ? { ...v, ...updates } : v
              );
              setVariants(updatedVariants);
            }}
          />
        );
      })()}

      <div className="fixed inset-0 bg-background z-50 overflow-hidden">
        <div className="flex flex-col h-screen">
          {/* Breadcrumb & Top Bar */}
          <div className="border-b border-border bg-card sticky top-0 z-10 flex-shrink-0">
            <div className="px-6 py-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <button onClick={onClose} className="hover:text-foreground transition-colors">
                  Catalog
                </button>
                {selectedSeries && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="font-medium">{selectedSeries}</span>
                  </>
                )}
                {selectedSeries && volumeNumber && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="font-medium">Volume {volumeNumber}</span>
                  </>
                )}
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-semibold">{getBookTitle()}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">Edit</span>
              </div>
            </div>
            <div className="px-6 py-3 flex items-center justify-between">
              <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.3px] text-[#191c1e]">{book.id === "new" ? "Add New Book" : `Edit Book`}</h2>
              <div className="flex items-center gap-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--color-saffron)] text-white rounded-md hover:bg-[var(--color-saffron-dark)] transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <Save className="w-4 h-4" />
                  Save Book
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto p-8 bg-background/50">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Book Information Card */}
              <div id="section-book-info" className="bg-card border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] space-y-6">
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] border-b border-border pb-3">Book Information (Common Across All Languages)</h3>
                
                <div className="grid grid-cols-2 gap-5">
                  {/* Primary Book Title */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2 text-foreground">Primary Book Title</label>
                    <input
                      type="text"
                      value={primaryTitle}
                      onChange={(e) => setPrimaryTitle(e.target.value)}
                      placeholder="e.g. Bhagavad Gita"
                      className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 bg-background text-foreground text-sm"
                    />
                  </div>

                  {/* Author Select */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Author</label>
                    <SearchableDropdown
                      options={authors.map(auth => ({ value: auth, label: auth }))}
                      value={selectedAuthor}
                      onChange={(val) => setSelectedAuthor(val)}
                      placeholder="Select Author..."
                      emptyLabel="No authors found"
                    />
                  </div>

                  {/* Page Count */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Page Count (Pages)</label>
                    <input
                      type="number"
                      value={pageCount}
                      onChange={(e) => setPageCount(e.target.value !== "" ? Number(e.target.value) : "")}
                      placeholder="e.g. 248"
                      className="w-full px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 bg-background text-foreground text-sm"
                    />
                  </div>

                  {/* Series and Volume */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Book Series</label>
                    <div className="flex gap-2">
                      <SearchableDropdown
                        options={seriesList.map(ser => ({ value: ser, label: ser }))}
                        value={selectedSeries}
                        onChange={(val) => {
                          setSelectedSeries(val);
                          if (!val) setVolumeNumber("");
                        }}
                        placeholder="Search or Select Series..."
                        emptyLabel="No series found"
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSer = prompt("Enter new Series name:");
                          if (newSer && newSer.trim()) {
                            const trimmed = newSer.trim();
                            if (!seriesList.includes(trimmed)) {
                              setSeriesList([...seriesList, trimmed]);
                            }
                            setSelectedSeries(trimmed);
                          }
                        }}
                        className="px-3.5 py-2 border border-border rounded-md hover:bg-muted text-xs font-semibold whitespace-nowrap bg-background"
                      >
                        + Create New
                      </button>
                    </div>
                  </div>

                  {/* Volume Number (conditional) */}
                  {selectedSeries && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-2 text-foreground">Volume Number</label>
                      <input
                        type="text"
                        value={volumeNumber}
                        onChange={(e) => setVolumeNumber(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-1/3 px-4 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 bg-background text-foreground text-sm"
                      />
                    </div>
                  )}

                  {/* Related Books Selector */}
                  <div className="col-span-2 space-y-3 pt-2">
                    <label className="block text-sm font-medium text-foreground">Related Books (Recommendations)</label>
                    
                    <SearchableDropdown
                      options={allBooks
                        .filter(b => b.id !== book.id && !relatedIds.includes(b.id))
                        .map(b => ({ value: b.id, label: `${b.title} (by ${b.author})` }))}
                      value=""
                      onChange={(val) => {
                        if (val && !relatedIds.includes(val)) {
                          setRelatedIds([...relatedIds, val]);
                        }
                      }}
                      placeholder="Search and Add Related Book..."
                      clearOnSelect={true}
                    />

                    {/* Selected Related Books Cards Grid */}
                    {relatedIds.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                        {relatedIds.map(id => {
                          const relBook = allBooks.find(b => b.id === id);
                          if (!relBook) return null;
                          return (
                            <div key={id} className="flex gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl items-center relative group shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] bg-card hover:border-[var(--color-institutional-blue)]/30 transition-all">
                              <div className="w-10 h-14 bg-[#F8FAFC] border border-border flex-shrink-0 flex items-center justify-center text-[10px] text-muted-foreground font-semibold rounded-lg bg-card">
                                Cover
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold truncate text-foreground">{relBook.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{relBook.author}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setRelatedIds(relatedIds.filter(x => x !== id))}
                                className="absolute top-2 right-2 p-1.5 bg-destructive/10 text-destructive rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
                                title="Remove Related Book"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  
                  {/* Featured Toggle */}
                  <div className="col-span-2 flex items-center gap-3 p-4 bg-muted/25 rounded-lg border border-[#E2E8F0]">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-[var(--color-institutional-blue)] focus:ring-[var(--color-institutional-blue)]"
                    />
                    <div className="flex-1">
                      <label htmlFor="featured" className="text-sm font-medium cursor-pointer text-foreground block">
                        Featured Book
                      </label>
                      <span className="text-xs text-muted-foreground">Appears prominently on homepage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories Card */}
              <div id="section-categories" className="bg-card border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] space-y-6">
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] border-b border-border pb-3">Categories</h3>
                <div className="space-y-6">
                  {/* Parent Categories Dropdown */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Parent Categories</label>
                    <SearchableDropdown
                      options={allParentCategories
                        .filter(cat => !mainCategories.includes(cat))
                        .map(cat => ({ value: cat, label: cat }))}
                      value=""
                      onChange={(val) => {
                        if (val) {
                          toggleParentCategory(val);
                        }
                      }}
                      placeholder="Select parent categories..."
                      clearOnSelect={true}
                    />
                    {mainCategories.length === 0 && (
                      <p className="text-xs text-muted-foreground mt-2">Select at least one parent category</p>
                    )}

                    {/* Selected Parent Categories */}
                    {mainCategories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {mainCategories.map(cat => (
                          <span
                            key={cat}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 border border-border rounded-md text-sm text-foreground"
                          >
                            {cat}
                            <button
                              onClick={() => removeParentCategory(cat)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Child Categories Dropdown */}
                  {mainCategories.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Sub Categories</label>
                      <SearchableDropdown
                        options={getAvailableChildCategories()
                          .filter(cat => !subCategories.includes(cat))
                          .map(cat => {
                            const parent = mainCategories.find(p => categoryHierarchy[p]?.includes(cat));
                            return { value: cat, label: `${parent} → ${cat}` };
                          })}
                        value=""
                        onChange={(val) => {
                          if (val) {
                            toggleSubCategory(val);
                          }
                        }}
                        placeholder="Select sub categories..."
                        clearOnSelect={true}
                      />
                      <p className="text-xs text-muted-foreground mt-2">Optional: Add specific sub-categories</p>

                      {/* Selected Sub Categories with Hierarchy */}
                      {subCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {subCategories.map(cat => {
                            const parent = mainCategories.find(p => categoryHierarchy[p]?.includes(cat));
                            return (
                              <span
                                key={cat}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-md text-sm text-foreground"
                              >
                                <span className="text-muted-foreground text-xs">{parent} →</span>
                                {cat}
                                <button
                                  onClick={() => removeSubCategory(cat)}
                                  className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Languages Section */}
              <div id="section-languages" className="bg-card border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Language Variants & Files</h3>
                  <button
                    onClick={() => setShowLanguageSelector(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--color-institutional-blue)] text-white rounded-lg hover:bg-[var(--color-institutional-blue)]/90 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    <Plus className="w-4 h-4" />
                    Add Language
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Tabs List */}
                  <div className="flex items-center gap-2 border-b border-border overflow-x-auto pb-px">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setActiveVariantTabId(variant.id)}
                        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                          activeVariantTabId === variant.id
                            ? "border-[var(--color-institutional-blue)] text-[var(--color-institutional-blue)]"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        {variant.language}
                        {defaultLanguageId === variant.id && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                             activeVariantTabId === variant.id
                               ? "bg-[var(--color-institutional-blue)]/10 text-[var(--color-institutional-blue)]"
                               : "bg-muted text-muted-foreground"
                          }`}>
                            Default
                          </span>
                        )}
                        {variants.length > 1 && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeVariant(variant.id);
                            }}
                            className="p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded ml-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="pt-2">
                    {variants.filter(v => v.id === activeVariantTabId).map((variant) => (
                      <SimplifiedLanguageVariantCard
                        key={variant.id}
                        variant={variant}
                        isExpanded={true}
                        isDefault={defaultLanguageId === variant.id}
                        canRemove={false}
                        hideHeader={true}
                        onToggleExpand={() => {}}
                        onUpdate={(updates) => updateVariant(variant.id, updates)}
                        onRemove={() => removeVariant(variant.id)}
                        onSetAsDefault={() => setAsDefaultLanguage(variant.id)}
                        onOpenReviewWorkspace={() => {
                          console.log("Opening review workspace for variant:", variant.id, variant.language);
                          setReviewWorkspaceVariant(variant.id);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Add Language Variant</h3>
              <button
                onClick={() => setShowLanguageSelector(false)}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Select a language to add a new variant
            </p>

            <div className="grid grid-cols-2 gap-3">
              {allLanguages
                .filter(lang => !variants.some(v => v.language === lang))
                .map(lang => (
                  <button
                    key={lang}
                    onClick={() => addLanguageVariant(lang)}
                    className="px-4 py-3 text-sm border border-border rounded-lg hover:bg-muted hover:border-[var(--color-institutional-blue)] transition-all text-left"
                  >
                    {lang}
                  </button>
                ))}
            </div>

            {variants.length === allLanguages.length && (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                All available languages have been added
              </p>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
