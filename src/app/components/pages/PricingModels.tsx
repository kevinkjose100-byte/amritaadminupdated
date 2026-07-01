import { useState, useEffect, useMemo } from "react";
import { Plus, Search, X, Globe, Coins, Calendar, AlertTriangle, CheckCircle2, Trash2, Edit, Clock, ArrowRight } from "lucide-react";
import { getPricingGroups, savePricingGroups, AVAILABLE_COUNTRIES, CURRENCY_MAP, PricingGroup, EXCHANGE_RATES, convertPrice } from "../../utils/pricingStore";

function PricingCard({ group, onEdit, onDelete }: {
  group: PricingGroup;
  onEdit: (g: PricingGroup) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className={`bg-card border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-md transition-all ${
        group.status === "draft" ? "border-dashed border-[#E2E8F0] opacity-80" : "border-[#E2E8F0]"
      }`}
    >
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-lg text-foreground flex items-center gap-2">
            {group.name}
            {group.id === "row" && (
              <span className="text-[10px] bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                Global Fallback
              </span>
            )}
          </span>
          <span
            className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
              group.status === "active"
                ? "bg-[var(--color-success-green)]/10 text-[var(--color-success-green-dark)] border-[var(--color-success-green)]/20"
                : "bg-muted text-muted-foreground border-border"
            }`}
          >
            {group.status}
          </span>
        </div>

        <div className="space-y-2 mt-4 bg-[#F8FAFC] p-4 rounded-lg">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Markup Multiplier (INR)</span>
            <span className="font-extrabold text-[var(--color-institutional-blue)] text-base">
              {group.multiple}x
            </span>
          </div>
          <div className="flex items-baseline justify-between border-t border-[#E2E8F0] pt-2 text-[10px] text-muted-foreground">
            <span>Exchange Rate:</span>
            <span>1 INR = {EXCHANGE_RATES[group.currency] || 0.012} {group.currency}</span>
          </div>
          <div className="flex items-baseline justify-between border-t border-[#E2E8F0] pt-2 text-[11px] text-foreground/90 font-medium">
            <span>e.g., ₹200 base becomes:</span>
            <span className="font-bold text-[#002045]">
              {group.currencySymbol}{convertPrice(200, group.multiple, group.currency).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#E2E8F0] text-xs space-y-3.5">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            Countries
          </span>
          <span className="font-semibold text-foreground">
            {group.id === "row" ? "Global Fallback" : `${group.countries.length} assigned`}
          </span>
        </div>

        {group.countries.length > 0 && group.id !== "row" && (
          <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pb-1">
            {group.countries.map((c) => (
              <span key={c} className="px-1.5 py-0.5 bg-background border border-[#E2E8F0] rounded text-[10px] text-foreground/80">{c}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-muted-foreground pt-1 border-t border-[#E2E8F0]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Updated
          </span>
          <span>{group.lastUpdated}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit(group)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border hover:bg-muted text-foreground/90 font-medium rounded-lg transition-all"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit settings
          </button>
          {group.id !== "india" && group.id !== "row" && (
            <button
              onClick={() => onDelete(group.id)}
              className="px-3 py-2 border border-border hover:bg-destructive/5 text-muted-foreground hover:text-destructive rounded-lg transition-all"
              title="Delete Group"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function PricingModels() {
  const [groups, setGroups] = useState<PricingGroup[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<PricingGroup | null>(null);

  // Form states
  const [groupName, setGroupName] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [multiple, setMultiple] = useState("0.05");
  const [status, setStatus] = useState<"active" | "draft">("active");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  
  // Validation error state
  const [validationError, setValidationError] = useState<string | null>(null);

  // Load groups on mount
  useEffect(() => {
    setGroups(getPricingGroups());
  }, []);

  // Update localStorage when local state changes
  const updateGroups = (newGroups: PricingGroup[]) => {
    setGroups(newGroups);
    savePricingGroups(newGroups);
  };

  // Find country allocations to check for duplicate assignments
  const countryAssignments = useMemo(() => {
    const map: Record<string, string> = {}; // country -> groupName
    groups.forEach((g) => {
      // Skip the group currently being edited to avoid false duplicates with itself
      if (editingGroup && editingGroup.id === g.id) return;
      
      g.countries.forEach((country) => {
        map[country] = g.name;
      });
    });
    return map;
  }, [groups, editingGroup]);

  // Open modal for a new group
  const handleOpenNewModal = () => {
    setEditingGroup(null);
    setGroupName("");
    setCurrency("USD");
    setMultiple("0.05");
    setStatus("active");
    setSelectedCountries([]);
    setCountrySearch("");
    setValidationError(null);
    setIsModalOpen(true);
  };

  // Open modal to edit an existing group
  const handleOpenEditModal = (group: PricingGroup) => {
    setEditingGroup(group);
    setGroupName(group.name);
    setCurrency(group.currency);
    setMultiple(group.multiple.toString());
    setStatus(group.status);
    // Don't edit "Rest of World" countries directly since it's the default fallback
    setSelectedCountries(group.id === "row" ? ["Rest of World"] : group.countries);
    setCountrySearch("");
    setValidationError(null);
    setIsModalOpen(true);
  };

  // Delete a pricing group
  const handleDeleteGroup = (id: string) => {
    if (id === "india" || id === "row") {
      alert("System default pricing groups cannot be deleted.");
      return;
    }
    if (confirm("Are you sure you want to delete this pricing group? Dynamic pricing for assigned countries will fallback to the Rest of World group.")) {
      const updated = groups.filter((g) => g.id !== id);
      updateGroups(updated);
    }
  };

  // Handle adding a country to the selected list
  const handleSelectCountry = (country: string) => {
    if (selectedCountries.includes(country)) return;

    // Check if duplicate assignment exists in other custom groups
    const assignedGroupName = countryAssignments[country];
    if (assignedGroupName) {
      setValidationError(
        `Validation Warning: "${country}" is already assigned to the "${assignedGroupName}" pricing group. A country can belong to only one group.`
      );
      return;
    }

    setValidationError(null);
    setSelectedCountries([...selectedCountries, country]);
    setCountrySearch("");
  };

  // Remove a country from the selected list
  const handleRemoveCountry = (country: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c !== country));
    setValidationError(null);
  };

  // Handle saving the group
  const handleSaveGroup = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!groupName.trim()) {
      setValidationError("Group Name is required.");
      return;
    }

    const multVal = parseFloat(multiple);
    if (isNaN(multVal) || multVal <= 0) {
      setValidationError("Pricing Multiplier must be a valid positive number.");
      return;
    }

    // Check duplicate country assignment check one more time before save
    if (editingGroup?.id !== "row") {
      for (const country of selectedCountries) {
        const assignedGroupName = countryAssignments[country];
        if (assignedGroupName) {
          setValidationError(
            `Cannot save: Country "${country}" is already explicitly assigned to "${assignedGroupName}".`
          );
          return;
        }
      }
    }

    const symbol = CURRENCY_MAP[currency] || "$";
    const timestamp = new Date().toISOString().split("T")[0];

    if (editingGroup) {
      // Edit existing group
      const updated = groups.map((g) => {
        if (g.id === editingGroup.id) {
          return {
            ...g,
            name: groupName,
            currency,
            currencySymbol: symbol,
            multiple: multVal,
            status,
            countries: g.id === "row" ? ["Rest of World"] : selectedCountries,
            lastUpdated: timestamp,
          };
        }
        return g;
      });
      updateGroups(updated);
    } else {
      // Add new group
      const newId = groupName.toLowerCase().replace(/[^a-z0-9]/g, "-");
      // Check for duplicate ID
      if (groups.some((g) => g.id === newId)) {
        setValidationError("A group with a similar name already exists.");
        return;
      }

      const newGroup: PricingGroup = {
        id: newId,
        name: groupName,
        currency,
        currencySymbol: symbol,
        multiple: multVal,
        status,
        countries: selectedCountries,
        lastUpdated: timestamp,
      };
      updateGroups([...groups, newGroup]);
    }

    setIsModalOpen(false);
  };

  // Filter countries by search input
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return [];
    const searchLower = countrySearch.toLowerCase();
    return AVAILABLE_COUNTRIES.filter(
      (c) =>
        c.toLowerCase().includes(searchLower) &&
        !selectedCountries.includes(c)
    );
  }, [countrySearch, selectedCountries]);

  return (
    <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Pricing Models</h1>
          <p className="text-sm text-[#43474e] font-normal leading-5">
            Manage regional pricing, currencies, and country-based pricing groups
          </p>
        </div>
        <button
          onClick={handleOpenNewModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-saffron)] text-white rounded-lg hover:bg-[var(--color-saffron-dark)] transition-all font-medium text-sm shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <Plus className="w-4 h-4" />
          Create Country Group
        </button>
      </div>

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3.5 text-blue-900 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold mb-1">Centralized Pricing Engine</p>
          <p className="text-blue-800/90 leading-relaxed">
            Changes made to pricing groups dynamically update user subscription pricing and book purchase tiers in the catalog. 
            Countries not assigned to any group will default to <strong>Rest of World</strong> pricing rules automatically.
          </p>
        </div>
      </div>

      {/* System Groups: India + Rest of World — equal width, full row */}
      <div className="grid grid-cols-2 gap-5">
        {groups.filter(g => g.id === "india" || g.id === "row").map((group) => {
          return <PricingCard key={group.id} group={group} onEdit={handleOpenEditModal} onDelete={handleDeleteGroup} />;
        })}
      </div>

      {/* Custom Groups */}
      {groups.filter(g => g.id !== "india" && g.id !== "row").length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.filter(g => g.id !== "india" && g.id !== "row").map((group) => {
            return <PricingCard key={group.id} group={group} onEdit={handleOpenEditModal} onDelete={handleDeleteGroup} />;
          })}
        </div>
      )}

      {/* Pricing Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out] p-4">
          <div className="bg-card border border-border rounded-xl p-8 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">
                {editingGroup ? `Edit ${editingGroup.name} Pricing Group` : "Create Custom Country Group"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-muted rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {validationError && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSaveGroup} className="space-y-6">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Group Name</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g. Europe, Latin America, Southeast Asia"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 text-sm"
                  required
                  disabled={editingGroup?.id === "india" || editingGroup?.id === "row"}
                />
              </div>

              {/* Currency Dropdown */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 text-sm"
                >
                  {Object.keys(CURRENCY_MAP).map((c) => (
                    <option key={c} value={c}>
                      {c} ({CURRENCY_MAP[c]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Multiplier input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Base Price Markup Multiplier (in INR)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={multiple}
                    onChange={(e) => setMultiple(e.target.value)}
                    placeholder="e.g., 1.25"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 text-sm font-mono"
                    required
                    disabled={editingGroup?.id === "india"}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {editingGroup?.id === "india" ? "(Fixed for base reference)" : `x base India price (INR)`}
                  </span>
                </div>
                <div className="mt-2.5 bg-slate-50 border border-slate-150 p-3 rounded-lg text-[11px] leading-normal text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">Formula:</p>
                  <p className="font-mono text-[10px]">
                    Price ({currency}) = [India Base Price (INR)] &times; [Markup Multiplier ({multiple}x)] &times; [Exchange Rate ({EXCHANGE_RATES[currency] || 0.012} {currency}/INR)]
                  </p>
                  <p className="text-[10px] italic">
                    Example: ₹200 base price becomes: 200 &times; {multiple} = ₹{(200 * parseFloat(multiple || "1")).toFixed(2)} INR. Converted automatically to: {CURRENCY_MAP[currency] || ""}{convertPrice(200, parseFloat(multiple || "1"), currency).toLocaleString()} {currency}.
                  </p>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2.5">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={status === "active"}
                      onChange={() => setStatus("active")}
                      className="w-4 h-4 text-[var(--color-institutional-blue)] focus:ring-[var(--color-institutional-blue)]"
                    />
                    <span className="text-sm">Active (live for regional customers)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={status === "draft"}
                      onChange={() => setStatus("draft")}
                      className="w-4 h-4 text-[var(--color-institutional-blue)] focus:ring-[var(--color-institutional-blue)]"
                    />
                    <span className="text-sm">Draft (visible to admins only)</span>
                  </label>
                </div>
              </div>

              {/* Country Assignment Section */}
              {editingGroup?.id !== "row" ? (
                <div className="space-y-5 pt-2 border-t border-[#E2E8F0]">
                  <label className="block text-sm font-medium text-foreground">Country Assignments</label>
                  <p className="text-xs text-muted-foreground">
                    Assign countries to this pricing group. A country cannot belong to multiple groups.
                  </p>

                  {/* Search box */}
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#43474e]/60 transition-colors group-focus-within:text-[#002045]" />
                    <input
                      type="text"
                      placeholder="Search countries by name..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm text-[#191c1e] placeholder:text-[#94A3B8] bg-[#F8FAFC] rounded-lg border border-transparent focus:outline-none focus:bg-white focus:border-[#002045]/20 focus:ring-4 focus:ring-[#002045]/8 transition-all duration-200"
                    />
                    
                    {/* Search suggestions */}
                    {filteredCountries.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto ">
                        {filteredCountries.map((country) => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => handleSelectCountry(country)}
                            className="w-full text-left px-4 py-2.5 text-xs hover:bg-muted text-foreground flex items-center justify-between"
                          >
                            <span>{country}</span>
                            {countryAssignments[country] && (
                              <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                Allocated to: {countryAssignments[country]}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Country chips */}
                  {selectedCountries.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 p-3 bg-[#FAFAFA] border border-border rounded-lg max-h-36 overflow-y-auto">
                      {selectedCountries.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-background border border-[#E2E8F0] rounded-md text-xs font-medium text-foreground/80"
                        >
                          {c}
                          <button
                            type="button"
                            onClick={() => handleRemoveCountry(c)}
                            className="text-muted-foreground hover:text-foreground p-0.5 rounded hover:bg-muted"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 border border-dashed border-border rounded-lg text-center text-xs text-muted-foreground">
                      No countries explicitly assigned. Group will not apply to any country.
                    </div>
                  )}
                </div>
              ) : (
                <div className="pt-2 border-t border-[#E2E8F0] text-xs text-muted-foreground">
                  Note: Rest of World functions as the catch-all region. Custom assignments are not editable; all unallocated countries fall back to Rest of World.
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t border-[#E2E8F0]">
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)] text-white rounded-lg text-sm font-bold transition-all shadow-md"
                >
                  Save Group Settings
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full px-4 py-2 text-muted-foreground hover:text-foreground text-sm font-semibold transition-all hover:bg-[#F8FAFC] rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
