import { useState, useRef } from "react";
import { Search, Eye, Edit, Trash2, Plus, X, Upload, LayoutGrid, List, FileText } from "lucide-react";
import { RowActionsMenu } from "../RowActionsMenu";

type Author = {
  id: string;
  name: string;
  bio: string;
  photoUrl?: string; // base64 string
  bookCount: number;
  joinedDate: string;
  status: "Active" | "Inactive";
  category: "Senior Swamis" | "Monastics" | "Others";
};

const mockAuthors: Author[] = [
  {
    id: "1",
    name: "Amma",
    bio: "Mata Amritanandamayi (Amma) is a world-renowned humanitarian and spiritual leader. Often called 'The Hugging Saint', her life is dedicated to serving humanity, encouraging selfless service, and sharing spiritual wisdom through her publications and global programs.",
    bookCount: 3,
    joinedDate: "2020-05-15",
    status: "Active",
    category: "Others"
  },
  {
    id: "2",
    name: "Swami Ramakrishnananda Puri",
    bio: "One of the senior disciples of Mata Amritanandamayi Devi, Swamiji travels globally to share spiritual wisdom, teach meditation, and oversee educational math institutes. He is the author of several popular titles covering epics and scriptures.",
    bookCount: 4,
    joinedDate: "2021-08-10",
    status: "Active",
    category: "Senior Swamis"
  },
  {
    id: "3",
    name: "Swami Amritaswarupananda Puri",
    bio: "Swamiji is the first monastic disciple of Amma and Vice-Chairman of Mata Amritanandamayi Math. He is an accomplished speaker and author, having written extensive commentaries on spiritual practices and modern-day spiritual challenges.",
    bookCount: 3,
    joinedDate: "2021-02-28",
    status: "Active",
    category: "Senior Swamis"
  }
];

const authorBooksMap: Record<string, string[]> = {
  "Amma": ["Bhagavad Gita", "Vedas Complete Set", "Puranas Compilation"],
  "Swami Ramakrishnananda Puri": ["Ramayana", "Mahabharata", "Thirukkural", "Shrimad Bhagavatam"],
  "Swami Amritaswarupananda Puri": ["Upanishads Collection", "Yoga Sutras of Patanjali", "Ashtavakra Gita"]
};

const avatarColors = [
  "#4F46E5", "#0891B2", "#059669", "#D97706", "#DC2626",
  "#7C3AED", "#0D9488", "#BE185D", "#1D4ED8", "#16A34A",
];

function AuthorAvatar({ name, photoUrl, size = "w-12 h-12" }: { name: string; photoUrl?: string; size?: string }) {
  if (photoUrl) {
    return <img src={photoUrl} alt={name} className={`${size} rounded-full object-cover border border-[#E2E8F0]`} />;
  }
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const charCodeSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const bg = avatarColors[charCodeSum % avatarColors.length];
  
  // Extract text size class based on avatar size
  const textSizeClass = size.includes("w-24") ? "text-2xl" : "text-sm";

  return (
    <div className={`${size} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${textSizeClass}`} style={{ backgroundColor: bg }}>
      {initials}
    </div>
  );
}

export function AuthorManagement() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State initialization
  const [authors, setAuthors] = useState<Author[]>(() => {
    const saved = localStorage.getItem("amrita_authors");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((a: any) => ({
          ...a,
          category: a.category || (a.name === "Amma" ? "Others" : "Senior Swamis")
        }));
      } catch (e) {
        console.error("Error parsing amrita_authors", e);
      }
    }
    localStorage.setItem("amrita_authors", JSON.stringify(mockAuthors));
    return mockAuthors;
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Filtering logic
  const filteredAuthors = authors.filter(author => {
    const matchesSearch = author.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          author.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || author.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || author.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (editingAuthor) {
        setEditingAuthor({
          ...editingAuthor,
          photoUrl: reader.result as string
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    if (editingAuthor) {
      setEditingAuthor({
        ...editingAuthor,
        photoUrl: undefined
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAuthor) return;

    const errors: Record<string, string> = {};
    if (!editingAuthor.name.trim()) {
      errors.name = "Author name is required";
    }
    if (!editingAuthor.bio.trim()) {
      errors.bio = "Biography is required";
    }
    if (!editingAuthor.joinedDate) {
      errors.joinedDate = "Date added is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    let updatedAuthors: Author[];
    if (editingAuthor.id === "new") {
      const newAuthor: Author = {
        ...editingAuthor,
        id: String(authors.length + 100),
        bookCount: 0
      };
      updatedAuthors = [...authors, newAuthor];
      alert(`Author "${newAuthor.name}" added successfully!`);
    } else {
      updatedAuthors = authors.map(a => a.id === editingAuthor.id ? editingAuthor : a);
      alert(`Author "${editingAuthor.name}" updated successfully!`);
    }

    setAuthors(updatedAuthors);
    localStorage.setItem("amrita_authors", JSON.stringify(updatedAuthors));
    setEditingAuthor(null);
    setFormErrors({});
  };

  const handleDeleteAuthor = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete author "${name}"? This action cannot be undone.`)) {
      const updatedAuthors = authors.filter(a => a.id !== id);
      setAuthors(updatedAuthors);
      localStorage.setItem("amrita_authors", JSON.stringify(updatedAuthors));
      alert(`Author "${name}" deleted.`);
      if (selectedAuthor?.id === id) setSelectedAuthor(null);
    }
  };

  return (
    <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#1E293B]">Author Management</h1>
          <p className="text-sm text-[#64748B] font-normal leading-5">Manage and view biographies, profile images, and books for Amrita Publications authors</p>
        </div>
        <button
          onClick={() => setEditingAuthor({
            id: "new",
            name: "",
            bio: "",
            category: "Others",
            bookCount: 0,
            joinedDate: new Date().toISOString().split('T')[0],
            status: "Active"
          })}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-saffron)] text-white rounded-md hover:bg-[var(--color-saffron-dark)] transition-all font-semibold text-sm cursor-pointer shadow-sm border-none"
        >
          <Plus className="w-4 h-4" />
          Add New Author
        </button>
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-[#002045]" />
            <input
              type="text"
              placeholder="Search by author name or biography keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm text-[#1E293B] placeholder:text-[#94A3B8] bg-[#F8FAFC] rounded-full border border-[#D1D5DC] focus:outline-none focus:bg-white focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 transition-all duration-200"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm text-[#1E293B] bg-[#F8FAFC] border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 cursor-pointer min-w-[140px]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm text-[#1E293B] bg-[#F8FAFC] border border-[#D1D5DC] rounded-lg focus:outline-none focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 cursor-pointer min-w-[150px]"
          >
            <option value="All">All Categories</option>
            <option value="Senior Swamis">Senior Swamis</option>
            <option value="Monastics">Monastics</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Grid/List View switcher */}
        <div className="flex items-center bg-[#F1F5F9] border border-[#E2E8F0] p-1 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === "grid" ? "bg-white text-[#002045] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"}`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === "list" ? "bg-white text-[#002045] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"}`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Layout View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuthors.map((author) => (
            <div
              key={author.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-ambient hover:shadow-lg transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <AuthorAvatar name={author.name} photoUrl={author.photoUrl} size="w-16 h-16" />
                    <div>
                      <h3 className="text-base font-bold text-slate-800 group-hover:text-[var(--color-institutional-blue)] transition-colors">
                        {author.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Joined {author.joinedDate}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      author.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}>
                      {author.status}
                    </span>
                    <span className="text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded">
                      {author.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {author.bio}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex justify-between items-center text-xs">
                <div>
                  <span className="font-semibold text-slate-800">
                    {authorBooksMap[author.name]?.length || author.bookCount || 0}
                  </span>
                  <span className="text-muted-foreground ml-1">Books Published</span>
                </div>

                <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setSelectedAuthor(author)}
                    className="p-1.5 text-slate-500 hover:text-[var(--color-institutional-blue)] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                    title="View Bio"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingAuthor({ ...author });
                      setFormErrors({});
                    }}
                    className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAuthor(author.id, author.name)}
                    className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredAuthors.length === 0 && (
            <div className="col-span-full bg-white border border-[#E2E8F0] rounded-2xl py-12 text-center text-muted-foreground">
              No authors found matching query.
            </div>
          )}
        </div>
      ) : (
        /* List Layout View */
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] w-20">Photo</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Name</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] w-32">Category</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Biography</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] text-center w-32">Books</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] w-28">Status</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] w-32">Date Added</th>
                  <th className="text-right px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthors.map((author) => (
                  <tr key={author.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors group">
                    <td className="px-5 py-3 whitespace-nowrap">
                      <AuthorAvatar name={author.name} photoUrl={author.photoUrl} size="w-10 h-10" />
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap font-semibold text-slate-800">
                      {author.name}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-slate-700 text-xs">
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded font-bold">
                        {author.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600 max-w-sm">
                      <p className="truncate text-xs">{author.bio}</p>
                    </td>
                    <td className="px-5 py-3 text-center font-semibold text-slate-800 text-xs">
                      {authorBooksMap[author.name]?.length || author.bookCount || 0}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        author.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {author.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-slate-500 text-xs">
                      {author.joinedDate}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end">
                        <RowActionsMenu actions={[
                          {
                            label: "View Biography",
                            icon: <Eye className="w-4 h-4" />,
                            onClick: () => setSelectedAuthor(author),
                          },
                          {
                            label: "Edit Author Details",
                            icon: <Edit className="w-4 h-4" />,
                            onClick: () => {
                              setEditingAuthor({ ...author });
                              setFormErrors({});
                            },
                          },
                          {
                            label: "Delete Author",
                            icon: <Trash2 className="w-4 h-4 text-red-500" />,
                            onClick: () => handleDeleteAuthor(author.id, author.name),
                          },
                        ]} />
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAuthors.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-muted-foreground bg-white">
                      No authors found matching search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Viewer Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedAuthor(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl leading-none cursor-pointer border-none bg-transparent"
            >
              ×
            </button>

            <div className="flex flex-col items-center text-center pb-6 border-b border-[#E2E8F0] mb-6">
              <AuthorAvatar name={selectedAuthor.name} photoUrl={selectedAuthor.photoUrl} size="w-24 h-24" />
              <h2 className="text-xl font-bold mt-4 text-[#002045]">{selectedAuthor.name}</h2>
              <div className="flex gap-2.5 mt-2.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedAuthor.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                }`}>
                  {selectedAuthor.status}
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 font-bold px-2 py-0.5 rounded-full">
                  Category: {selectedAuthor.category}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                  Added: {selectedAuthor.joinedDate}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Biography</h3>
                <p className="text-sm text-slate-700 leading-relaxed text-left whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-border">
                  {selectedAuthor.bio}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Associated Books ({authorBooksMap[selectedAuthor.name]?.length || 0})</h3>
                {authorBooksMap[selectedAuthor.name] && authorBooksMap[selectedAuthor.name].length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {authorBooksMap[selectedAuthor.name].map((book, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002045]/5 text-[#002045] border border-[#002045]/15 rounded-lg text-xs font-semibold">
                        <FileText className="w-3.5 h-3.5" />
                        {book}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic text-left">No catalog books currently linked. Associate them in Catalog Management.</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedAuthor(null)}
              className="mt-8 w-full px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm transition-colors cursor-pointer border-none font-semibold"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {editingAuthor && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 w-full max-w-xl shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 border-b border-border pb-3">
              <h2 className="text-[20px] font-semibold leading-[28px] text-[#191c1e]">
                {editingAuthor.id === "new" ? "Add New Author" : "Edit Author"}
              </h2>
              <button
                type="button"
                onClick={() => setEditingAuthor(null)}
                className="text-muted-foreground hover:text-foreground text-2xl leading-none cursor-pointer border-none bg-transparent"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              {/* Photo Upload Area */}
              <div className="flex flex-col items-center pb-4 border-b border-dashed border-[#E2E8F0]">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 w-full text-center">Author Photograph</label>
                <div className="flex items-center gap-5 w-full max-w-sm bg-slate-50 p-4 rounded-xl border border-border">
                  <AuthorAvatar name={editingAuthor.name || "A"} photoUrl={editingAuthor.photoUrl} size="w-16 h-16" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      className="hidden"
                      accept=".png,.jpg,.jpeg"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002045] text-white rounded text-xs font-semibold hover:opacity-95 cursor-pointer border-none"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload Photo
                      </button>
                      {editingAuthor.photoUrl && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="px-3 py-1.5 border border-red-500 text-red-500 rounded text-xs font-semibold hover:bg-red-50 cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">PNG, JPG or JPEG up to 2MB.</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-semibold text-foreground">Author Name</label>
                <input
                  type="text"
                  value={editingAuthor.name}
                  onChange={(e) => setEditingAuthor({ ...editingAuthor, name: e.target.value })}
                  placeholder="e.g., Swami Premananda"
                  className={`w-full px-3 py-2 bg-[#F8FAFC] rounded-lg border ${
                    formErrors.name ? "border-destructive focus:ring-destructive/25" : "border-border focus:ring-[var(--color-institutional-blue)]/25"
                  } focus:outline-none focus:ring-2 focus:border-[var(--color-institutional-blue)] text-sm transition-all`}
                />
                {formErrors.name && (
                  <p className="text-xs text-destructive mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-semibold text-foreground">Biography</label>
                <textarea
                  value={editingAuthor.bio}
                  onChange={(e) => setEditingAuthor({ ...editingAuthor, bio: e.target.value })}
                  placeholder="Write biography, background, educational contributions, and teachings..."
                  rows={4}
                  className={`w-full px-3 py-2 bg-[#F8FAFC] rounded-lg border ${
                    formErrors.bio ? "border-destructive focus:ring-destructive/25" : "border-border focus:ring-[var(--color-institutional-blue)]/25"
                  } focus:outline-none focus:ring-2 focus:border-[var(--color-institutional-blue)] text-sm transition-all resize-none`}
                />
                {formErrors.bio && (
                  <p className="text-xs text-destructive mt-1">{formErrors.bio}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-foreground">Status</label>
                  <select
                    value={editingAuthor.status}
                    onChange={(e) => setEditingAuthor({ ...editingAuthor, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] text-sm transition-all cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-foreground">Category</label>
                  <select
                    value={editingAuthor.category || "Others"}
                    onChange={(e) => setEditingAuthor({ ...editingAuthor, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] text-sm transition-all cursor-pointer"
                  >
                    <option value="Senior Swamis">Senior Swamis</option>
                    <option value="Monastics">Monastics</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-foreground">Date Added</label>
                  <input
                    type="date"
                    value={editingAuthor.joinedDate}
                    onChange={(e) => setEditingAuthor({ ...editingAuthor, joinedDate: e.target.value })}
                    className={`w-full px-3 py-2 bg-[#F8FAFC] rounded-lg border ${
                      formErrors.joinedDate ? "border-destructive focus:ring-destructive/25" : "border-border focus:ring-[var(--color-institutional-blue)]/25"
                    } focus:outline-none focus:ring-2 focus:border-[var(--color-institutional-blue)] text-sm transition-all`}
                  />
                  {formErrors.joinedDate && (
                    <p className="text-xs text-destructive mt-1">{formErrors.joinedDate}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-3 border-t border-[#E2E8F0] mt-5">
                <button
                  type="button"
                  onClick={() => setEditingAuthor(null)}
                  className="flex-1 px-5 py-2.5 border border-border rounded-lg hover:bg-slate-50 transition-all font-medium text-sm cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-5 py-2.5 bg-[var(--color-saffron)] text-white rounded-lg hover:opacity-90 transition-all font-semibold text-sm cursor-pointer shadow-sm border-none"
                >
                  {editingAuthor.id === "new" ? "Add Author" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
