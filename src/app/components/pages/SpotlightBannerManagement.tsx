import { useState, useEffect, useRef } from "react";
import { 
  Plus, Edit, Trash2, Eye, Save, Upload, X, ChevronLeft, ChevronRight, 
  Sparkles, MoveUp, MoveDown, Check, BookOpen, AlertCircle, Info 
} from "lucide-react";
import { Book, mockBooks } from "./CatalogManagement";
import { 
  SpotlightBanner, PRESET_BACKDROPS, getBanners, saveBanners 
} from "../../utils/bannerStore";

import bookCover1 from "../../../imports/screenshot-1.png";
import bookCover2 from "../../../imports/screenshot-2.png";
import bookCover3 from "../../../imports/screenshot-3.png";
import bookCover4 from "../../../imports/screenshot-4.png";
import bookCover5 from "../../../imports/screenshot-5.png";
import bookCover6 from "../../../imports/screenshot-6.png";

const covers = [bookCover1, bookCover2, bookCover3, bookCover4, bookCover5, bookCover6];

export function SpotlightBannerManagement() {
  const [banners, setBanners] = useState<SpotlightBanner[]>([]);
  const [catalogBooks, setCatalogBooks] = useState<Book[]>([]);
  const [editingBanner, setEditingBanner] = useState<SpotlightBanner | null>(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [showBookDropdown, setShowBookDropdown] = useState(false);
  
  // Live Preview Slider State
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  
  // File upload refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load banners & books
  useEffect(() => {
    setBanners(getBanners());
    
    // Attempt to load books from localStorage if CatalogManagement saves it there,
    // otherwise fall back to mockBooks
    const savedBooks = localStorage.getItem("amrita_books");
    if (savedBooks) {
      try {
        setCatalogBooks(JSON.parse(savedBooks));
      } catch (e) {
        setCatalogBooks(mockBooks);
      }
    } else {
      setCatalogBooks(mockBooks);
    }
  }, []);

  // Update banners state & localStorage
  const updateBannersList = (updated: SpotlightBanner[]) => {
    // Sort by display order
    const sorted = [...updated].sort((a, b) => a.displayOrder - b.displayOrder);
    setBanners(sorted);
    saveBanners(sorted);
  };

  // Handle banner deletion
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this spotlight banner?")) {
      const filtered = banners.filter(b => b.id !== id);
      updateBannersList(filtered);
      if (currentPreviewIndex >= filtered.length && filtered.length > 0) {
        setCurrentPreviewIndex(filtered.length - 1);
      }
    }
  };

  // Toggle active status
  const handleToggleActive = (id: string) => {
    const updated = banners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b);
    updateBannersList(updated);
  };

  // Move banner order
  const handleMove = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === banners.length - 1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const list = [...banners];
    
    // Swap displayOrder values
    const tempOrder = list[index].displayOrder;
    list[index].displayOrder = list[newIndex].displayOrder;
    list[newIndex].displayOrder = tempOrder;

    // Swap elements in list
    const tempElement = list[index];
    list[index] = list[newIndex];
    list[newIndex] = tempElement;

    updateBannersList(list);
  };

  // Start creating new banner
  const handleCreateNew = () => {
    const newOrder = banners.length > 0 ? Math.max(...banners.map(b => b.displayOrder)) + 1 : 1;
    const newBanner: SpotlightBanner = {
      id: `banner_${Date.now()}`,
      title: "New Featured Banner",
      quotation: "The true mark of freedom is an undisturbed mind.",
      quoteAuthor: "SWAMI RAMAKRISHNANANDA PURI",
      quoteSource: "In Amma's Splendor (PAGE 42)",
      backgroundPresetId: "mountain-mist",
      backgroundUrl: PRESET_BACKDROPS[0].url,
      ctaLabel: "Discover Book",
      ctaUrl: "/catalog",
      isActive: true,
      displayOrder: newOrder,
    };
    setEditingBanner(newBanner);
    setBookSearchQuery("");
  };

  // Start editing existing banner
  const handleStartEdit = (banner: SpotlightBanner) => {
    setEditingBanner({ ...banner });
    // Find book to populate search query if applicable
    if (banner.bookId) {
      const book = catalogBooks.find(b => b.id === banner.bookId);
      setBookSearchQuery(book ? book.title : "");
    } else {
      setBookSearchQuery("");
    }
  };

  // Save changes from form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;

    if (!editingBanner.bookId) {
      alert("Please select a book from the catalog.");
      return;
    }

    const exists = banners.some(b => b.id === editingBanner.id);
    let updated: SpotlightBanner[];
    if (exists) {
      updated = banners.map(b => b.id === editingBanner.id ? editingBanner : b);
    } else {
      updated = [...banners, editingBanner];
    }
    
    updateBannersList(updated);
    setEditingBanner(null);
  };

  // Handle background preset click
  const selectPresetBackdrop = (presetId: string, url: string) => {
    if (!editingBanner) return;
    setEditingBanner({
      ...editingBanner,
      backgroundPresetId: presetId,
      backgroundUrl: url
    });
  };

  // File Upload Handlers (converts image to base64)
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingBanner) return;

    // Verify it is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, WebP)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setEditingBanner({
        ...editingBanner,
        backgroundPresetId: undefined, // Clear preset
        backgroundUrl: result
      });
    };
    reader.readAsDataURL(file);
  };


  // Select book from catalog
  const selectBook = (book: Book) => {
    if (!editingBanner) return;
    setEditingBanner({
      ...editingBanner,
      bookId: book.id,
      customBookTitle: book.title,
      customBookAuthor: book.author,
      quoteAuthor: book.author, // Prefill Quote Author with book's author
      customBookCover: undefined,
      ctaUrl: `/catalog?id=${book.id}` // Map CTA URL to the catalog book
    });
    setBookSearchQuery(book.title);
    setShowBookDropdown(false);
  };

  // Remove catalog book link (use custom book details instead)
  const removeBookLink = () => {
    if (!editingBanner) return;
    setEditingBanner({
      ...editingBanner,
      bookId: undefined,
      customBookTitle: "",
      customBookAuthor: "",
      customBookCover: undefined
    });
    setBookSearchQuery("");
  };

  // Helper to fetch banner's book cover
  const getBannerBookCover = (banner: SpotlightBanner) => {
    if (banner.bookId) {
      const bookIdx = (parseInt(banner.bookId) - 1) % covers.length;
      if (!isNaN(bookIdx) && bookIdx >= 0 && bookIdx < covers.length) {
        return covers[bookIdx];
      }
    }
    return null;
  };

  // Filtered books for selector
  const filteredBooks = catalogBooks.filter(book => 
    book.title.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(bookSearchQuery.toLowerCase())
  );

  // Filtered banners list
  const filteredBanners = banners.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.quotation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.quoteAuthor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Active banners for Live Slider Preview
  const activeBanners = banners.filter(b => b.isActive);

  // Slider Navigation
  const nextSlide = () => {
    if (activeBanners.length === 0) return;
    setCurrentPreviewIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    if (activeBanners.length === 0) return;
    setCurrentPreviewIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#1E293B]">Featured & Spotlight Banners</h1>
          <p className="text-sm text-[#64748B] font-normal mt-1">
            Configure spotlight carousels for the website homepage. Upload scenic backdrops, link catalog books, and enter quotations.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#002045] hover:bg-[#001b3c] text-white rounded-lg text-[13px] font-semibold shadow-sm transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Spotlight Banner
        </button>
      </div>

      {/* Main Grid: Management Table on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Side: Table & Editing Form */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* Edit Form (Collapsible/Drawer alternative) */}
          {editingBanner && (
            <div className="bg-white border border-[#CBD5E1] rounded-xl p-5 shadow-md animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#002045]" />
                  <h3 className="text-base font-bold text-[#1E293B]">
                    {banners.some(b => b.id === editingBanner.id) ? "Edit Banner Configuration" : "New Spotlight Banner"}
                  </h3>
                </div>
                <button 
                  onClick={() => setEditingBanner(null)} 
                  className="p-1 hover:bg-[#F1F5F9] rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="space-y-4 text-[13px]">
                
                {/* Internal Title */}
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">Internal Name / Title</label>
                  <input
                    type="text"
                    required
                    value={editingBanner.title}
                    onChange={e => setEditingBanner({ ...editingBanner, title: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] transition-colors"
                    placeholder="e.g., Summer Spotlight - Amma's Words"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Book Selector */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-[#475569] mb-1">
                      Link Catalog Book (Auto-populates title & author)
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Search books..."
                          value={bookSearchQuery}
                          onChange={e => {
                            setBookSearchQuery(e.target.value);
                            setShowBookDropdown(true);
                          }}
                          onFocus={() => setShowBookDropdown(true)}
                          className="w-full pl-3 pr-8 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] text-[13px] transition-colors"
                        />
                        {bookSearchQuery && (
                          <button
                            type="button"
                            onClick={removeBookLink}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Book Search Dropdown */}
                    {showBookDropdown && (
                      <div className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-[#CBD5E1] rounded-lg shadow-lg">
                        {filteredBooks.length === 0 ? (
                          <p className="p-3 text-[#64748B] italic text-xs">No matching books found</p>
                        ) : (
                          filteredBooks.map(book => (
                            <button
                              key={book.id}
                              type="button"
                              onClick={() => selectBook(book)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#F1F5F9] border-b border-[#F8FAFC] last:border-0"
                            >
                              <div className="w-7 h-10 bg-slate-100 flex-shrink-0 overflow-hidden rounded border border-[#E2E8F0]">
                                {(() => {
                                  const idx = (parseInt(book.id) - 1) % covers.length;
                                  const cover = isNaN(idx) ? null : covers[idx];
                                  return cover ? (
                                    <img src={cover} className="w-full h-full object-cover" />
                                  ) : (
                                    <BookOpen className="w-3.5 h-3.5 m-auto text-slate-400" />
                                  );
                                })()}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-[#1E293B] truncate text-xs">{book.title}</p>
                                <p className="text-[10px] text-[#64748B] truncate">by {book.author}</p>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* Custom overrides */}
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">Custom Book Title Override</label>
                    <input
                      type="text"
                      value={editingBanner.customBookTitle || ""}
                      onChange={e => setEditingBanner({ ...editingBanner, customBookTitle: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] transition-colors"
                      placeholder="e.g. In Amma's Splendor"
                    />
                  </div>
                </div>

                {/* Book Author / Custom Speaker */}
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">Book / Quote Author</label>
                  <input
                    type="text"
                    value={editingBanner.customBookAuthor || ""}
                    onChange={e => setEditingBanner({ ...editingBanner, customBookAuthor: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] transition-colors"
                    placeholder="e.g. Swami Ramakrishnananda Puri"
                  />
                </div>

                {/* Quotation text */}
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">Quotation Text</label>
                  <textarea
                    required
                    rows={2}
                    value={editingBanner.quotation}
                    onChange={e => setEditingBanner({ ...editingBanner, quotation: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] transition-colors resize-none"
                    placeholder="Enter quotation to show on the banner..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Speaker name attribution */}
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">Quotation Speaker / Attribution</label>
                    <input
                      type="text"
                      required
                      value={editingBanner.quoteAuthor}
                      onChange={e => setEditingBanner({ ...editingBanner, quoteAuthor: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] transition-colors"
                      placeholder="e.g. SWAMI RAMAKRISHNANANDA PURI"
                    />
                  </div>

                  {/* Quotation Page / Source */}
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">Page Citation / Book Source</label>
                    <input
                      type="text"
                      required
                      value={editingBanner.quoteSource}
                      onChange={e => setEditingBanner({ ...editingBanner, quoteSource: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] transition-colors"
                      placeholder="e.g. In Amma's Splendor (PAGE 42)"
                    />
                  </div>
                </div>

                {/* Background scenery selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-2">Background Scenery Backdrop</label>
                  
                  {/* Preset Selector */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {PRESET_BACKDROPS.map((preset) => (
                      <button
                        type="button"
                        key={preset.id}
                        onClick={() => selectPresetBackdrop(preset.id, preset.url)}
                        className={`group relative h-14 rounded-lg overflow-hidden border-2 text-left transition-all ${
                          editingBanner.backgroundPresetId === preset.id 
                            ? "border-[#002045] ring-2 ring-[#002045]/15" 
                            : "border-transparent hover:border-[#CBD5E1]"
                        }`}
                      >
                        <img src={preset.url} className="w-full h-full object-cover filter brightness-[0.8]" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-all flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white tracking-wide shadow-sm truncate px-1">
                            {preset.name}
                          </span>
                        </div>
                        {editingBanner.backgroundPresetId === preset.id && (
                          <div className="absolute top-1 right-1 bg-[#002045] text-white rounded-full p-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom Upload */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#64748B]">Or upload custom scenery image:</span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] rounded-lg text-xs font-medium text-[#475569] transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload Backdrop
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleBackgroundUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    {!editingBanner.backgroundPresetId && editingBanner.backgroundUrl && (
                      <span className="text-xs text-[#16A34A] font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Custom scenery loaded
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#F1F5F9]">
                  {/* Display Order */}
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">Display Order</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={editingBanner.displayOrder}
                      onChange={e => setEditingBanner({ ...editingBanner, displayOrder: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] transition-colors"
                    />
                  </div>

                  {/* CTA Details */}
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">CTA Button Label</label>
                    <input
                      type="text"
                      required
                      value={editingBanner.ctaLabel}
                      onChange={e => setEditingBanner({ ...editingBanner, ctaLabel: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] transition-colors"
                    />
                  </div>
                </div>

                {/* Active Toggle & Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActiveToggle"
                      checked={editingBanner.isActive}
                      onChange={e => setEditingBanner({ ...editingBanner, isActive: e.target.checked })}
                      className="w-4 h-4 rounded border-border text-[#002045] focus:ring-[#002045]"
                    />
                    <label htmlFor="isActiveToggle" className="text-xs font-semibold text-[#475569] select-none cursor-pointer">
                      Show in Slider (Active Status)
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingBanner(null)}
                      className="px-4 py-2 border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#002045] hover:bg-[#001b3c] text-white rounded-lg font-semibold shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Banner
                    </button>
                  </div>
                </div>

              </form>
            </div>
          )}

          {/* Banner Search & Table Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
            
            {/* Search filter bar */}
            <div className="p-4 border-b border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
              <h3 className="text-[15px] font-bold text-[#1E293B] flex items-center gap-1.5">
                Spotlight Banners List
                <span className="text-[11px] font-normal text-slate-500 bg-slate-100 rounded-full px-2.5 py-0.5">
                  {banners.length} total • {activeBanners.length} active
                </span>
              </h3>
              
              <input
                type="text"
                placeholder="Search banners..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045]/50 bg-[#F8FAFC] text-xs"
              />
            </div>

            {/* List Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    <th className="px-4 py-3.5 w-12 text-center">Order</th>
                    <th className="px-4 py-3.5 w-14">Backdrop</th>
                    <th className="px-4 py-3.5">Banner Details</th>
                    <th className="px-4 py-3.5">Book Title</th>
                    <th className="px-4 py-3.5 w-20 text-center">Status</th>
                    <th className="px-4 py-3.5 w-24 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] text-xs">
                  {filteredBanners.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-[#64748B] italic">
                        No spotlight banners found. Click "Add Spotlight Banner" to create one.
                      </td>
                    </tr>
                  ) : (
                    filteredBanners.map((banner, index) => {
                      const bookCover = getBannerBookCover(banner);
                      return (
                        <tr key={banner.id} className="hover:bg-[#F8FAFC] transition-colors">
                          {/* Reordering / Order */}
                          <td className="px-4 py-4 text-center font-medium text-[#475569]">
                            <div className="flex flex-col items-center gap-0.5">
                              <button
                                disabled={index === 0}
                                onClick={() => handleMove(index, "up")}
                                className="text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                              <span>{banner.displayOrder}</span>
                              <button
                                disabled={index === banners.length - 1}
                                onClick={() => handleMove(index, "down")}
                                className="text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none"
                              >
                                <MoveDown className="w-3 h-3" />
                              </button>
                            </div>
                          </td>

                          {/* Backdrop Image preview */}
                          <td className="px-4 py-4">
                            <div className="w-10 h-7 bg-slate-100 rounded border border-[#E2E8F0] overflow-hidden">
                              {banner.backgroundUrl ? (
                                <img src={banner.backgroundUrl} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-slate-200" />
                              )}
                            </div>
                          </td>

                          {/* Details */}
                          <td className="px-4 py-4">
                            <div className="font-semibold text-[#1E293B] mb-0.5">{banner.title}</div>
                            <div className="text-[10px] text-[#64748B] max-w-[200px] truncate italic">
                              "{banner.quotation}"
                            </div>
                          </td>

                          {/* Linked book title */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              {bookCover ? (
                                <img src={bookCover} className="w-6 h-8 object-cover rounded border border-[#E2E8F0]" />
                              ) : (
                                <div className="w-6 h-8 bg-slate-100 flex items-center justify-center rounded border border-[#E2E8F0]">
                                  <BookOpen className="w-3 h-3 text-slate-400" />
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="font-medium text-[#334155] truncate max-w-[120px]">
                                  {banner.customBookTitle || "Custom Book"}
                                </p>
                                <p className="text-[9px] text-slate-500 truncate max-w-[120px]">
                                  by {banner.customBookAuthor || "Unknown"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => handleToggleActive(banner.id)}
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold select-none cursor-pointer transition-colors ${
                                banner.isActive 
                                  ? "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#bbf7d0]" 
                                  : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#e2e8f0]"
                              }`}
                            >
                              {banner.isActive ? "Active" : "Inactive"}
                            </button>
                          </td>

                          {/* Action button triggers */}
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleStartEdit(banner)}
                                className="p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#475569] rounded-lg transition-colors"
                                title="Edit banner"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(banner.id)}
                                className="p-1.5 bg-[#FEF2F2] border border-[#FEE2E2] hover:bg-[#FEE2E2] hover:text-[#DC2626] text-[#EF4444] rounded-lg transition-colors"
                                title="Delete banner"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>

        {/* Right Side: Interactive High-Fidelity Live Preview */}
        <div className="xl:col-span-5 space-y-4">
          
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-5">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
              <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-1.5">
                <Eye className="w-5 h-5 text-[#002045]" />
                Interactive Live Preview (Homepage)
              </h3>
              
              {/* Device Mode Switcher */}
              <div className="flex items-center border border-[#E2E8F0] rounded-lg overflow-hidden bg-slate-50 text-[11px] font-bold">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`px-3 py-1.5 transition-all ${
                    previewMode === "desktop" ? "bg-[#002045] text-white" : "hover:bg-slate-100 text-[#475569]"
                  }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`px-3 py-1.5 transition-all ${
                    previewMode === "mobile" ? "bg-[#002045] text-white" : "hover:bg-slate-100 text-[#475569]"
                  }`}
                >
                  Mobile
                </button>
              </div>
            </div>

            {/* Visual Frame mimicking the User's Website Header / Structure */}
            <div className="border border-[#E2E8F0] bg-slate-100 rounded-xl overflow-hidden shadow-inner p-2">
              
              {/* Storefront Mini-Header mockup (matches screenshot) */}
              <div className="bg-white px-3 py-2 border-b border-[#E2E8F0] flex items-center justify-between text-[10px] select-none pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="text-[12px] font-bold text-[#002045] uppercase tracking-wider">AMRITA BOOKS</div>
                  {previewMode === "desktop" && (
                    <div className="flex items-center gap-2 text-[#475569] font-medium ml-3">
                      <span className="bg-[#E2E8F0] px-2 py-0.5 rounded text-[#002045] font-bold">Home</span>
                      <span>About Us</span>
                      <span>Amma's Words</span>
                      <span>For Children</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[#64748B]">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[8px]">🔍</span>
                  <span className="relative">🛒<span className="absolute -top-1 -right-1 bg-[#002045] text-white text-[6px] font-bold px-0.5 rounded-full">4</span></span>
                  <span>🌐</span>
                </div>
              </div>

              {/* Slider Spotlight Area */}
              <div 
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  previewMode === "desktop" ? "aspect-[2/1] w-full" : "w-[300px] h-[400px] mx-auto"
                }`}
              >
                {activeBanners.length === 0 ? (
                  <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-white text-center p-6">
                    <AlertCircle className="w-8 h-8 text-[#D97706] mb-2" />
                    <p className="font-semibold text-sm">No Active Spotlight Banners</p>
                    <p className="text-xs text-slate-400 mt-1">Make sure you have banner slides marked as active and saved.</p>
                  </div>
                ) : (
                  (() => {
                    const currentBanner = activeBanners[currentPreviewIndex] || activeBanners[0];
                    const bookCover = getBannerBookCover(currentBanner);
                    
                    return (
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-500 overflow-hidden flex flex-col justify-center"
                        style={{ backgroundImage: `url('${currentBanner.backgroundUrl}')` }}
                      >
                        {/* Dark backdrop overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/60 to-slate-950/80" />

                        {/* Slider Content Wrapper */}
                        <div className="relative z-10 px-8 py-6 w-full h-full flex items-center justify-between text-white gap-6">
                          
                          {/* Left: Book Cover Image */}
                          <div className={`flex-shrink-0 flex items-center justify-center ${
                            previewMode === "desktop" ? "w-1/3" : "w-1/2 mx-auto"
                          }`}>
                            {bookCover ? (
                              <div className="relative group/cover shadow-[0_15px_30px_rgba(0,0,0,0.5)] rounded border border-white/10 overflow-hidden transition-transform duration-300 hover:scale-[1.03]">
                                <img 
                                  src={bookCover} 
                                  alt={currentBanner.customBookTitle} 
                                  className={`object-cover object-center ${
                                    previewMode === "desktop" ? "h-40 w-[110px]" : "h-36 w-[100px]"
                                  }`} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                              </div>
                            ) : (
                              <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded shadow-md flex flex-col items-center justify-center text-white/50 ${
                                previewMode === "desktop" ? "h-40 w-[110px]" : "h-36 w-[100px]"
                              }`}>
                                <BookOpen className="w-6 h-6 mb-1" />
                                <span className="text-[9px]">No Cover</span>
                              </div>
                            )}
                          </div>

                          {/* Right: Quotation & CTA (Hidden book cover in mobile to make it clean, or shown together if desktop) */}
                          {(!editingBanner || previewMode === "desktop") && (
                            <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
                              {/* Large Double Quotes */}
                              <span className="text-[50px] leading-none font-serif text-white/20 -mb-2 select-none">”</span>
                              
                              {/* Quote text */}
                              <blockquote className={`font-serif italic font-medium leading-relaxed mb-3 ${
                                previewMode === "desktop" ? "text-sm md:text-base max-w-sm" : "text-xs max-w-[180px]"
                              }`}>
                                “{currentBanner.quotation}”
                              </blockquote>

                              {/* Author / Citations */}
                              <div className="mb-4">
                                <cite className="block not-italic font-bold tracking-[1.5px] uppercase text-white text-[9px] leading-none mb-1">
                                  {currentBanner.quoteAuthor}
                                </cite>
                                <span className="text-white/60 text-[8px]">
                                  {currentBanner.quoteSource}
                                </span>
                              </div>

                              {/* CTA Link button */}
                              <a 
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className="inline-flex items-center gap-1.5 text-white hover:text-white/80 transition-all font-semibold tracking-wider uppercase text-[9px] border-b border-transparent hover:border-white pb-0.5"
                              >
                                {currentBanner.ctaLabel} <span className="text-[11px] leading-none">→</span>
                              </a>
                            </div>
                          )}

                        </div>

                        {/* Navigation Arrows */}
                        {activeBanners.length > 1 && (
                          <>
                            <button 
                              onClick={prevSlide}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/15 hover:bg-white/25 border border-white/10 rounded-full flex items-center justify-center transition-all"
                            >
                              <ChevronLeft className="w-4 h-4 text-white" />
                            </button>
                            <button 
                              onClick={nextSlide}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/15 hover:bg-white/25 border border-white/10 rounded-full flex items-center justify-center transition-all"
                            >
                              <ChevronRight className="w-4 h-4 text-white" />
                            </button>
                          </>
                        )}

                        {/* Pagination Dots */}
                        {activeBanners.length > 1 && (
                          <div className="absolute bottom-2.5 left-0 right-0 z-20 flex items-center justify-center gap-1.5">
                            {activeBanners.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentPreviewIndex(idx)}
                                className={`w-4 h-1 rounded-full transition-all duration-300 ${
                                  idx === currentPreviewIndex ? "bg-white w-5" : "bg-white/40 hover:bg-white/60"
                                }`}
                              />
                            ))}
                          </div>
                        )}

                      </div>
                    );
                  })()
                )}
              </div>

            </div>

            {/* Interactive Live Indicator */}
            {editingBanner && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-800">
                <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Live Editing Active</p>
                  <p className="text-amber-700 mt-0.5">
                    You are currently editing a banner. Save your changes to see it active in the catalog list and interactive homepage preview.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
