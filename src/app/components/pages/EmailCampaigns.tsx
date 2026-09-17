import { useState, useEffect, useRef } from "react";
import logo from "../../../imports/image.png";
import {
  Mail, Plus, Edit2, Trash2, Eye, Send, Sparkles, Check,
  AlertCircle, Info, RefreshCw, X, Search, Users, UserCheck,
  ExternalLink, Bold, Italic, List, ShieldCheck, CheckCircle2,
  Image as ImageIcon, Link as LinkIcon, Monitor, Smartphone, AlertTriangle
} from "lucide-react";
import {
  EmailTemplate, EmailSend, AudienceType, AudienceSegment,
  AUDIENCE_SEGMENT_LABELS, PRESET_HEADER_IMAGES, PERSONALIZATION_TOKENS,
  getEmailTemplates, saveEmailTemplates, createEmailTemplate,
  updateEmailTemplate, deleteEmailTemplate, getSentCampaigns,
  recordEmailSend, deleteSentCampaign
} from "../../utils/emailCampaignStore";
import { User, getUsers, updateUserConsent } from "../../utils/userStore";
import { addAuditLog } from "../../utils/auditLogStore";

// Simple no-dependency rich text editor: admins format and personalize copy visually
// (Bold / Italic / Bulleted list / merge tokens) without ever seeing or writing HTML tags.
function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || "");
  };

  const preventBlur = (e: React.MouseEvent) => e.preventDefault();

  const applyFormat = (command: "bold" | "italic" | "insertUnorderedList") => {
    editorRef.current?.focus();
    document.execCommand(command);
    handleInput();
  };

  const insertToken = (token: string) => {
    editorRef.current?.focus();
    document.execCommand("insertText", false, token);
    handleInput();
  };

  return (
    <div className="border border-[#E2E8F0] rounded-lg overflow-hidden bg-[#F8FAFC] focus-within:border-[#002045] transition-colors">
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[#E2E8F0] bg-white">
        <button type="button" onMouseDown={preventBlur} onClick={() => applyFormat("bold")} title="Bold" className="p-1.5 rounded hover:bg-slate-100 text-slate-600 cursor-pointer border-none bg-transparent">
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" onMouseDown={preventBlur} onClick={() => applyFormat("italic")} title="Italic" className="p-1.5 rounded hover:bg-slate-100 text-slate-600 cursor-pointer border-none bg-transparent">
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" onMouseDown={preventBlur} onClick={() => applyFormat("insertUnorderedList")} title="Bulleted list" className="p-1.5 rounded hover:bg-slate-100 text-slate-600 cursor-pointer border-none bg-transparent">
          <List className="w-3.5 h-3.5" />
        </button>
        <span className="w-px h-4 bg-slate-200 mx-1" />
        <span className="text-[11px] font-bold text-slate-500 mr-0.5">Insert:</span>
        {PERSONALIZATION_TOKENS.map((tok) => (
          <button
            key={tok.value}
            type="button"
            onMouseDown={preventBlur}
            onClick={() => insertToken(tok.value)}
            title={tok.title}
            className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-[11px] font-semibold rounded cursor-pointer"
          >
            {tok.label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className="min-h-[140px] max-h-[320px] overflow-y-auto p-3 text-sm text-slate-800 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400"
      />
    </div>
  );
}

export function EmailCampaigns() {
  const [activeTab, setActiveTab] = useState<"compose" | "templates" | "history">("templates");
  
  // Data State
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [sentCampaigns, setSentCampaigns] = useState<EmailSend[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Template Form State (Epic 4.1 - US-01)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [templateNameError, setTemplateNameError] = useState<string | null>(null);

  // Composer State (Epic 4.2 & 4.3)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [composerSubject, setComposerSubject] = useState("");
  const [composerPreheader, setComposerPreheader] = useState("");
  const [composerBody, setComposerBody] = useState("");
  const [composerHeaderImage, setComposerHeaderImage] = useState("");
  const [composerCtaLabel, setComposerCtaLabel] = useState("");
  const [composerCtaUrl, setComposerCtaUrl] = useState("");

  // Audience State (Epic 4.2 - US-03, US-04, US-05, US-06)
  const [audienceType, setAudienceType] = useState<AudienceType>("segment");
  const [audienceSegment, setAudienceSegment] = useState<AudienceSegment>("all");
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<string[]>([]);
  const [individualSearchQuery, setIndividualSearchQuery] = useState("");

  // Live Preview Device Toggle
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  
  // Send Confirmation Modal State (US-08)
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  
  // Snapshot Detail Modal
  const [snapshotCampaign, setSnapshotCampaign] = useState<EmailSend | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (text: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Load initial data and subscribe to user store changes
  const loadData = () => {
    setTemplates(getEmailTemplates());
    setSentCampaigns(getSentCampaigns());
    setUsers(getUsers());
  };

  useEffect(() => {
    loadData();

    const handleUsersUpdate = () => {
      setUsers(getUsers());
    };
    window.addEventListener("amrita_users_updated", handleUsersUpdate);
    return () => {
      window.removeEventListener("amrita_users_updated", handleUsersUpdate);
    };
  }, []);

  // Compute Active Admin
  const getActiveAdminName = () => {
    try {
      const activeId = localStorage.getItem("amrita_active_admin_id");
      const adminsStr = localStorage.getItem("amrita_admin_users");
      if (adminsStr) {
        const parsed = JSON.parse(adminsStr);
        const match = parsed.find((a: any) => a.id === activeId);
        if (match) return match.name;
      }
    } catch (e) {}
    return "Rajesh Kumar";
  };

  // ==========================================
  // AUDIENCE COMPUTATION & FILTERING (Epic 4.2)
  // ==========================================

  // Filter out non-active accounts (US-05: status Suspended or Inactive)
  // Filter out opted-out accounts (US-06: marketingConsent === false)
  const computeSegmentRecipients = (segment: AudienceSegment) => {
    return users.filter(user => {
      // Must be Active
      if (user.status !== "Active") return false;
      // Must have marketing consent
      if (!user.marketingConsent) return false;

      // Segment filters
      switch (segment) {
        case "subscribed":
          return user.subscriptionStatus === "Premium Active" || user.subscriptionStatus === "Basic Active";
        case "non_subscribed_no_past":
          return user.subscriptionStatus === "None";
        case "non_subscribed_expired":
          return user.subscriptionStatus === "Expired";
        case "all":
        default:
          return true;
      }
    });
  };

  // Calculate stats for current audience selection
  const eligibleSegmentUsers = computeSegmentRecipients(audienceSegment);
  
  // Total exclusions breakdown for current segment
  const excludedInactiveCount = users.filter(u => {
    if (u.status === "Active") return false;
    // would have matched segment
    switch (audienceSegment) {
      case "subscribed": return u.subscriptionStatus.includes("Active");
      case "non_subscribed_no_past": return u.subscriptionStatus === "None";
      case "non_subscribed_expired": return u.subscriptionStatus === "Expired";
      default: return true;
    }
  }).length;

  const excludedOptedOutCount = users.filter(u => {
    if (u.status !== "Active") return false;
    if (u.marketingConsent) return false;
    switch (audienceSegment) {
      case "subscribed": return u.subscriptionStatus.includes("Active");
      case "non_subscribed_no_past": return u.subscriptionStatus === "None";
      case "non_subscribed_expired": return u.subscriptionStatus === "Expired";
      default: return true;
    }
  }).length;

  // Individual mode eligible recipients
  const selectedIndividualUsers = users.filter(u => 
    selectedRecipientIds.includes(u.id) && u.status === "Active" && u.marketingConsent
  );

  const finalRecipientCount = audienceType === "segment" 
    ? eligibleSegmentUsers.length 
    : selectedIndividualUsers.length;

  // Search individual customers
  const filteredSearchUsers = users.filter(u => {
    if (!individualSearchQuery.trim()) return false;
    const q = individualSearchQuery.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  // ==========================================
  // TEMPLATE MANAGEMENT (Epic 4.1 - US-01)
  // ==========================================

  const handleStartAddTemplate = () => {
    setEditingTemplate({
      id: `new-${Date.now()}`,
      name: "",
      subject: "",
      preheader: "",
      body: "<p>Dear <strong>{{firstName}}</strong>,</p>\n<p>Enter your campaign announcement or offer details here...</p>",
      headerImageUrl: PRESET_HEADER_IMAGES[1].url,
      ctaLabel: "View Catalog",
      ctaUrl: "/catalog",
      createdBy: getActiveAdminName(),
      createdAt: "",
      updatedAt: ""
    });
    setTemplateNameError(null);
  };

  const handleStartEditTemplate = (tpl: EmailTemplate) => {
    setEditingTemplate({ ...tpl });
    setTemplateNameError(null);
  };

  const handleCancelTemplateEdit = () => {
    setEditingTemplate(null);
    setTemplateNameError(null);
  };

  const handleSaveTemplateForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;

    const trimmedName = editingTemplate.name.trim();
    if (!trimmedName) {
      setTemplateNameError("Template name cannot be empty.");
      return;
    }

    // Name uniqueness check (US-01 AC: Template name must be unique)
    const isExisting = templates.some(t => t.id === editingTemplate.id);
    const duplicate = templates.find(t => 
      t.name.toLowerCase() === trimmedName.toLowerCase() && t.id !== editingTemplate.id
    );

    if (duplicate) {
      setTemplateNameError(`A template with name "${trimmedName}" already exists. Please choose a unique name.`);
      return;
    }

    if (isExisting) {
      updateEmailTemplate(editingTemplate.id, {
        name: trimmedName,
        subject: editingTemplate.subject.trim(),
        preheader: editingTemplate.preheader.trim(),
        body: editingTemplate.body,
        headerImageUrl: editingTemplate.headerImageUrl?.trim() || undefined,
        ctaLabel: editingTemplate.ctaLabel?.trim() || undefined,
        ctaUrl: editingTemplate.ctaUrl?.trim() || undefined,
      });
      showToast(`Template "${trimmedName}" updated successfully.`);
    } else {
      createEmailTemplate({
        name: trimmedName,
        subject: editingTemplate.subject.trim(),
        preheader: editingTemplate.preheader.trim(),
        body: editingTemplate.body,
        headerImageUrl: editingTemplate.headerImageUrl?.trim() || undefined,
        ctaLabel: editingTemplate.ctaLabel?.trim() || undefined,
        ctaUrl: editingTemplate.ctaUrl?.trim() || undefined,
        createdBy: getActiveAdminName()
      });
      showToast(`Template "${trimmedName}" created successfully.`);
    }

    setTemplates(getEmailTemplates());
    setEditingTemplate(null);
    setTemplateNameError(null);
  };

  const handleDeleteTemplate = (id: string) => {
    // US-01 AC: Native confirm dialog
    if (confirm("Are you sure you want to delete this email template?")) {
      deleteEmailTemplate(id);
      setTemplates(getEmailTemplates());
      showToast("Email template deleted.", "info");
      if (editingTemplate?.id === id) {
        setEditingTemplate(null);
      }
    }
  };

  // US-02: Use Template action -> Prefill composer & switch tab
  const handleUseTemplate = (tpl: EmailTemplate) => {
    setSelectedTemplateId(tpl.id);
    setComposerSubject(tpl.subject);
    setComposerPreheader(tpl.preheader);
    setComposerBody(tpl.body);
    setComposerHeaderImage(tpl.headerImageUrl || "");
    setComposerCtaLabel(tpl.ctaLabel || "");
    setComposerCtaUrl(tpl.ctaUrl || "");
    setActiveTab("compose");
    showToast(`Loaded "${tpl.name}" into composer.`);
  };

  // ==========================================
  // SEND IMMEDIATELY FLOW (Epic 4.3 - US-08)
  // ==========================================

  const handleOpenSendConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerSubject.trim()) {
      showToast("Please provide an email subject line.", "error");
      return;
    }
    if (!composerBody.trim()) {
      showToast("Please provide email body content.", "error");
      return;
    }
    if (audienceType === "individual" && selectedRecipientIds.length === 0) {
      showToast("Please select at least one customer recipient.", "error");
      return;
    }
    if (finalRecipientCount === 0) {
      showToast("No eligible recipients found for this audience (check exclusions).", "error");
      return;
    }
    setShowSendConfirmation(true);
  };

  const handleConfirmSend = () => {
    const templateObj = templates.find(t => t.id === selectedTemplateId);
    
    const sendRecord = recordEmailSend({
      templateId: selectedTemplateId || undefined,
      templateName: templateObj?.name,
      subject: composerSubject.trim(),
      preheader: composerPreheader.trim(),
      body: composerBody,
      headerImageUrl: composerHeaderImage.trim() || undefined,
      ctaLabel: composerCtaLabel.trim() || undefined,
      ctaUrl: composerCtaUrl.trim() || undefined,
      audienceType,
      audienceSegment: audienceType === "segment" ? audienceSegment : undefined,
      recipientIds: audienceType === "individual" ? selectedRecipientIds : undefined,
      recipientNames: audienceType === "individual" ? selectedIndividualUsers.map(u => u.name) : undefined,
      recipientCount: finalRecipientCount,
      sentBy: getActiveAdminName()
    });

    setSentCampaigns(getSentCampaigns());
    setShowSendConfirmation(false);
    showToast(`Campaign dispatched immediately to ${finalRecipientCount} recipients!`, "success");
    setActiveTab("history");

    // Reset composer
    setSelectedTemplateId(null);
    setComposerSubject("");
    setComposerPreheader("");
    setComposerBody("");
    setComposerHeaderImage("");
    setComposerCtaLabel("");
    setComposerCtaUrl("");
    setSelectedRecipientIds([]);
  };

  // Simulated Unsubscribe Action in Preview (US-06)
  const handleSimulateUnsubscribe = () => {
    const targetUser = users.find(u => u.marketingConsent) || users[0];
    if (targetUser) {
      updateUserConsent(targetUser.id, false, "Customer clicked unsubscribe link in promotional email footer");
      showToast(`Simulated unsubscribe: "${targetUser.name}" has been opted out of marketing emails.`, "info");
    }
  };

  // Helper to render live preview interpolated content
  const previewSampleUser = users.find(u => u.marketingConsent && u.status === "Active") || users[0];
  const renderInterpolatedBody = (rawBody: string) => {
    const name = previewSampleUser?.name?.split(" ")[0] || "Customer";
    const email = previewSampleUser?.email || "customer@example.com";
    const subscriptionPlan = previewSampleUser?.subscriptionStatus || "None";
    const libraryCount = String(previewSampleUser?.libraryCount ?? 0);
    return rawBody
      .replace(/\{\{firstName\}\}/g, name)
      .replace(/\{\{email\}\}/g, email)
      .replace(/\{\{subscriptionPlan\}\}/g, subscriptionPlan)
      .replace(/\{\{libraryCount\}\}/g, libraryCount);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Toast */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 text-sm font-semibold transition-all ${
          toastMessage.type === "success" 
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : toastMessage.type === "error"
            ? "bg-red-50 text-red-800 border-red-200"
            : "bg-blue-50 text-blue-800 border-blue-200"
        }`}>
          {toastMessage.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {toastMessage.type === "error" && <AlertCircle className="w-5 h-5 text-red-600" />}
          {toastMessage.type === "info" && <Info className="w-5 h-5 text-blue-600" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#1E293B] flex items-center gap-2.5">
            <Mail className="w-8 h-8 text-[#002045]" />
            Promotional Email Campaigns
          </h1>
          <p className="text-sm text-[#64748B] font-normal mt-1">
            Create reusable templates, target user segments with consent exclusions, and broadcast immediate promotional announcements.
          </p>
        </div>

        {activeTab === "templates" && !editingTemplate && (
          <button
            onClick={handleStartAddTemplate}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#002045] hover:bg-[#001b3c] text-white rounded-lg text-[13px] font-semibold shadow-sm transition-colors duration-200 cursor-pointer border-none"
          >
            <Plus className="w-4 h-4" />
            Add Email Template
          </button>
        )}

        {activeTab === "compose" && (
          <button
            onClick={() => {
              setActiveTab("templates");
              handleStartAddTemplate();
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#002045] rounded-lg text-[13px] font-semibold shadow-sm transition-colors duration-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-saffron)]" />
            Manage Saved Templates
          </button>
        )}
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0]">
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-4 py-2.5 text-[13px] font-semibold border-b-2 transition-all cursor-pointer bg-transparent ${
            activeTab === "templates"
              ? "border-[#002045] text-[#002045]"
              : "border-transparent text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          Saved Templates ({templates.length})
        </button>
        <button
          onClick={() => setActiveTab("compose")}
          className={`px-4 py-2.5 text-[13px] font-semibold border-b-2 transition-all cursor-pointer bg-transparent ${
            activeTab === "compose"
              ? "border-[#002045] text-[#002045]"
              : "border-transparent text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          Compose & Send Now
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2.5 text-[13px] font-semibold border-b-2 transition-all cursor-pointer bg-transparent ${
            activeTab === "history"
              ? "border-[#002045] text-[#002045]"
              : "border-transparent text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          Send History ({sentCampaigns.length})
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SAVED TEMPLATES (Epic 4.1 - US-01 & US-02) */}
      {/* ========================================================================= */}
      {activeTab === "templates" && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Left Column: Templates Table & Inline Form Card */}
          <div className="xl:col-span-7 space-y-6">
            
            {/* Inline Form Card (Mirrors SpotlightBannerManagement.tsx) */}
            {editingTemplate && (
              <div className="bg-white border border-[#CBD5E1] rounded-xl p-5 shadow-md animate-in fade-in slide-in-from-top-4 duration-200">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#002045]" />
                    <h3 className="text-base font-bold text-[#1E293B]">
                      {templates.some(t => t.id === editingTemplate.id) ? "Edit Email Template" : "New Email Template"}
                    </h3>
                  </div>
                  <button 
                    onClick={handleCancelTemplateEdit} 
                    className="p-1 hover:bg-[#F1F5F9] rounded-full transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <X className="w-4 h-4 text-[#64748B]" />
                  </button>
                </div>

                <form onSubmit={handleSaveTemplateForm} className="space-y-4 text-[13px]">
                  
                  {/* Template Name with uniqueness inline error */}
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">
                      Template Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editingTemplate.name}
                      onChange={e => {
                        setEditingTemplate({ ...editingTemplate, name: e.target.value });
                        if (templateNameError) setTemplateNameError(null);
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] transition-colors ${
                        templateNameError ? "border-red-500 bg-red-50/20" : "border-[#E2E8F0]"
                      }`}
                      placeholder="e.g., Summer Book Festival Offer"
                    />
                    {templateNameError && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {templateNameError}
                      </p>
                    )}
                  </div>

                  {/* Subject & Preheader */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#475569] mb-1">
                        Subject Line <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingTemplate.subject}
                        onChange={e => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC]"
                        placeholder="e.g., Timeless Wisdom: In Amma's Splendor"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#475569] mb-1">
                        Preheader Preview Text
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.preheader}
                        onChange={e => setEditingTemplate({ ...editingTemplate, preheader: e.target.value })}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC]"
                        placeholder="Short summary previewed in mailbox list"
                      />
                    </div>
                  </div>

                  {/* Header Image with presets */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-[#475569]">
                        Header Image (Optional)
                      </label>
                      <span className="text-[11px] text-slate-400">Select preset or paste image URL</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {PRESET_HEADER_IMAGES.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setEditingTemplate({ ...editingTemplate, headerImageUrl: preset.url })}
                          className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-colors ${
                            editingTemplate.headerImageUrl === preset.url
                              ? "bg-[#002045] text-white border-[#002045]"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                    <input
                      type="url"
                      value={editingTemplate.headerImageUrl || ""}
                      onChange={e => setEditingTemplate({ ...editingTemplate, headerImageUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] text-xs"
                      placeholder="https://... image banner URL"
                    />
                  </div>

                  {/* Body Editor: visual formatting + personalization tokens, no HTML required */}
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Email Message <span className="text-red-500">*</span>
                    </label>
                    <RichTextEditor
                      value={editingTemplate.body}
                      onChange={(html) => setEditingTemplate({ ...editingTemplate, body: html })}
                      placeholder="Dear {{firstName}}, we are delighted to share..."
                    />
                  </div>

                  {/* CTA Button Label & Link */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#475569] mb-1">CTA Button Label</label>
                      <input
                        type="text"
                        value={editingTemplate.ctaLabel || ""}
                        onChange={e => setEditingTemplate({ ...editingTemplate, ctaLabel: e.target.value })}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC]"
                        placeholder="e.g., Shop Now"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#475569] mb-1">CTA URL / Route</label>
                      <input
                        type="text"
                        value={editingTemplate.ctaUrl || ""}
                        onChange={e => setEditingTemplate({ ...editingTemplate, ctaUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC]"
                        placeholder="e.g., /catalog or https://..."
                      />
                    </div>
                  </div>

                  {/* Actions (Cancel / Save Template) */}
                  <div className="flex gap-3 pt-3 border-t border-[#F1F5F9] mt-4">
                    <button
                      type="button"
                      onClick={handleCancelTemplateEdit}
                      className="flex-1 px-4 py-2 border border-[#CBD5E1] rounded-lg hover:bg-slate-50 text-slate-600 font-semibold transition-colors cursor-pointer bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[#002045] hover:bg-[#001b3c] text-white rounded-lg font-semibold transition-colors cursor-pointer border-none shadow-sm"
                    >
                      Save Template
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Templates Table List */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-sm font-bold text-[#1E293B]">Saved Template Library</h3>
                  <p className="text-xs text-[#64748B]">Manage reusable layouts for immediate email campaigns.</p>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                  {templates.length} {templates.length === 1 ? "Template" : "Templates"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Template Name</th>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Subject</th>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Last Updated</th>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] text-[13px]">
                    {templates.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-400 italic">
                          No email templates found. Click "Add Email Template" to create one.
                        </td>
                      </tr>
                    ) : (
                      templates.map((tpl) => (
                        <tr key={tpl.id} className="hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-4 py-3 font-semibold text-[#1E293B]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[var(--color-saffron)] flex-shrink-0" />
                              <span className="truncate max-w-[200px]" title={tpl.name}>{tpl.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#475569]">
                            <p className="truncate max-w-[220px] font-medium" title={tpl.subject}>{tpl.subject}</p>
                            {tpl.preheader && (
                              <p className="text-[11px] text-slate-400 truncate max-w-[220px]">{tpl.preheader}</p>
                            )}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                            {tpl.updatedAt || tpl.createdAt}
                          </td>
                          <td className="px-4 py-3 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Use Template button (US-02) */}
                              <button
                                onClick={() => handleUseTemplate(tpl)}
                                className="px-2.5 py-1 text-xs font-semibold text-[#002045] bg-[#002045]/5 hover:bg-[#002045]/10 border border-transparent rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                title="Prefill Composer Form"
                              >
                                <RefreshCw className="w-3 h-3" />
                                Use Template
                              </button>
                              
                              {/* Edit template icon button (US-01) */}
                              <button
                                onClick={() => handleStartEditTemplate(tpl)}
                                className="p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#475569] rounded-lg transition-colors cursor-pointer"
                                title="Edit template"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete template icon button (US-01) */}
                              <button
                                onClick={() => handleDeleteTemplate(tpl.id)}
                                className="p-1.5 bg-[#FEF2F2] border border-[#FEE2E2] hover:bg-[#FEE2E2] hover:text-[#DC2626] text-[#EF4444] rounded-lg transition-colors cursor-pointer"
                                title="Delete template"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column: Template Preview Panel (Mirrors SpotlightBannerManagement.tsx:729) */}
          <div className="xl:col-span-5 space-y-4">
            <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-5 sticky top-6">
              
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-1.5">
                  <Eye className="w-5 h-5 text-[#002045]" />
                  Template Preview
                </h3>
                {editingTemplate ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold rounded-full animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Live Editing Active
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">Live Mock Client Frame</span>
                )}
              </div>

              {/* Email Envelope / Client Frame Mockup */}
              {(() => {
                const target = editingTemplate || templates[0];
                if (!target) {
                  return (
                    <div className="p-8 text-center text-slate-400 text-xs italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      No template available to preview.
                    </div>
                  );
                }

                return (
                  <div className="border border-[#CBD5E1] rounded-xl overflow-hidden bg-white shadow-sm text-xs">
                    {/* Fake Mail Client Header */}
                    <div className="bg-slate-100 px-4 py-3 border-b border-[#CBD5E1] space-y-1 text-[11px]">
                      <div className="flex items-center justify-between text-slate-500">
                        <span><strong>From:</strong> Amrita Books &lt;promotions@amritabooks.com&gt;</span>
                        <span className="text-[10px]">Just now</span>
                      </div>
                      <div className="text-slate-700">
                        <strong>To:</strong> {previewSampleUser ? `${previewSampleUser.name} <${previewSampleUser.email}>` : "Customer <customer@example.com>"}
                      </div>
                      <div className="text-[#1E293B] font-bold text-xs pt-1 border-t border-slate-200">
                        {target.subject || "(Subject line empty)"}
                      </div>
                      {target.preheader && (
                        <div className="text-slate-500 text-[10px] italic">
                          {target.preheader}
                        </div>
                      )}
                    </div>

                    {/* Email Body Canvas */}
                    <div className="p-4 space-y-4 bg-[#FAFAFA] min-h-[300px]">
                      {/* Store Banner: same logo + address block used on invoices and reports */}
                      <div className="bg-white p-3 border border-slate-200 rounded-lg text-center shadow-xs">
                        <img src={logo} alt="Amrita Books Logo" className="h-6 w-auto object-contain mx-auto" />
                        <p className="text-[9px] text-slate-400 mt-1 leading-tight">Mata Amritanandamayi Math<br/>Amritapuri, Kollam, Kerala - 690525</p>
                      </div>

                      {/* Header Image */}
                      {target.headerImageUrl && (
                        <div className="rounded-lg overflow-hidden border border-slate-200">
                          <img 
                            src={target.headerImageUrl} 
                            alt="Campaign Header" 
                            className="w-full h-36 object-cover" 
                          />
                        </div>
                      )}

                      {/* Interpolated Body Content */}
                      <div 
                        className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs prose prose-sm max-w-none text-slate-800 text-xs leading-relaxed space-y-2"
                        dangerouslySetInnerHTML={{ __html: renderInterpolatedBody(target.body) }}
                      />

                      {/* CTA Button */}
                      {target.ctaLabel && (
                        <div className="text-center pt-1">
                          <span className="inline-block px-5 py-2 bg-[#002045] text-white font-bold rounded-lg text-xs shadow-sm">
                            {target.ctaLabel}
                          </span>
                        </div>
                      )}

                      {/* Compliance Footer (US-06) */}
                      <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-500 space-y-1">
                        <p>You received this promotional email because you subscribed to updates from Amrita Books.</p>
                        <p>Mata Amritanandamayi Math, Amritapuri, Kollam, Kerala - 690525</p>
                        <p className="pt-1">
                          <button
                            type="button"
                            onClick={handleSimulateUnsubscribe}
                            className="text-blue-600 hover:underline border-none bg-transparent cursor-pointer font-medium"
                          >
                            Unsubscribe from marketing emails
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="mt-3 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  Personalization tokens (First Name, Email, Subscription Plan, Library Size) are automatically filled in with each recipient's own customer details when the email is sent.
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: COMPOSE & SEND (Epic 4.2 & 4.3) */}
      {/* ========================================================================= */}
      {activeTab === "compose" && (
        <form onSubmit={handleOpenSendConfirmation} className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Left Column: Composer Form & Audience Selection */}
          <div className="xl:col-span-7 space-y-6">
            
            {/* Step 1: Loaded Template Indicator (US-02) */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#002045]/5 text-[#002045] flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Base Layout</p>
                  <p className="text-sm font-bold text-[#1E293B]">
                    {selectedTemplateId 
                      ? templates.find(t => t.id === selectedTemplateId)?.name || "Saved Template Pre-fill"
                      : "From Scratch / Custom Layout"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedTemplateId || ""}
                  onChange={(e) => {
                    const found = templates.find(t => t.id === e.target.value);
                    if (found) {
                      handleUseTemplate(found);
                    } else {
                      setSelectedTemplateId(null);
                    }
                  }}
                  className="text-xs font-semibold text-[#002045] bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="">-- Load Saved Template --</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2: Content Fields */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#1E293B] border-b border-[#F1F5F9] pb-3">
                1. Campaign Message & Content
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">
                  Email Subject Line <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={composerSubject}
                  onChange={e => setComposerSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] text-sm"
                  placeholder="e.g., Special Announcement: New spiritual commentaries available"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">
                  Preheader Text
                </label>
                <input
                  type="text"
                  value={composerPreheader}
                  onChange={e => setComposerPreheader(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] text-sm"
                  placeholder="Brief preview snippet in subscriber inbox"
                />
              </div>

              {/* Header Image */}
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">
                  Header Banner Image URL (Optional)
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {PRESET_HEADER_IMAGES.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setComposerHeaderImage(preset.url)}
                      className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-colors ${
                        composerHeaderImage === preset.url
                          ? "bg-[#002045] text-white border-[#002045]"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={composerHeaderImage}
                  onChange={e => setComposerHeaderImage(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] text-xs"
                  placeholder="https://... image banner URL"
                />
              </div>

              {/* Body: visual formatting + personalization tokens, no HTML required */}
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                  Email Message <span className="text-red-500">*</span>
                </label>
                <RichTextEditor
                  value={composerBody}
                  onChange={setComposerBody}
                  placeholder="Dear {{firstName}}, we are pleased to invite you..."
                />
              </div>

              {/* CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">CTA Button Label</label>
                  <input
                    type="text"
                    value={composerCtaLabel}
                    onChange={e => setComposerCtaLabel(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] text-sm"
                    placeholder="e.g., Read In Digital Reader"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">CTA URL</label>
                  <input
                    type="text"
                    value={composerCtaUrl}
                    onChange={e => setComposerCtaUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#002045] bg-[#F8FAFC] text-sm"
                    placeholder="e.g., /catalog or /reader"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Audience Targeting (Epic 4.2) */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                <h3 className="text-sm font-bold text-[#1E293B] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#002045]" />
                  2. Audience Selection & Compliance Filters
                </h3>
                
                {/* Audience Mode Switcher (US-03 vs US-04) */}
                <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setAudienceType("segment")}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer border-none ${
                      audienceType === "segment"
                        ? "bg-white text-[#002045] shadow-xs"
                        : "text-slate-600 hover:text-[#1E293B] bg-transparent"
                    }`}
                  >
                    Predefined Segment
                  </button>
                  <button
                    type="button"
                    onClick={() => setAudienceType("individual")}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer border-none ${
                      audienceType === "individual"
                        ? "bg-white text-[#002045] shadow-xs"
                        : "text-slate-600 hover:text-[#1E293B] bg-transparent"
                    }`}
                  >
                    Individual Customers
                  </button>
                </div>
              </div>

              {/* Mode A: Predefined Segment (US-04) */}
              {audienceType === "segment" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">
                      Choose Predefined Segment
                    </label>
                    <select
                      value={audienceSegment}
                      onChange={e => setAudienceSegment(e.target.value as AudienceSegment)}
                      className="w-full px-3 py-2.5 border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#002045] bg-white text-sm font-medium cursor-pointer"
                    >
                      <option value="all">All Users — Every customer account</option>
                      <option value="subscribed">Subscribed Users — Active Premium or Basic subscribers</option>
                      <option value="non_subscribed_no_past">Non Subscribed Users (No Past Subscription) — Never subscribed</option>
                      <option value="non_subscribed_expired">Non Subscribed Users (Expired Subscription) — Lapsed win-back group</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">
                      {AUDIENCE_SEGMENT_LABELS[audienceSegment].description}
                    </p>
                  </div>

                  {/* Real-time Recipient Count & Exclusions Callout (US-04, US-05, US-06) */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-[#002045]">
                          {eligibleSegmentUsers.length}
                        </span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                          Eligible Recipients
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="inline-flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active accounts opted into marketing
                        </span>
                        {(excludedInactiveCount > 0 || excludedOptedOutCount > 0) && (
                          <span className="text-amber-700 font-medium">
                            (Auto-excluded: {excludedInactiveCount} inactive/suspended, {excludedOptedOutCount} opted out)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Consent Guard Active
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode B: Individual Customer Search (US-03) */}
              {audienceType === "individual" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">
                      Search and Add Customer Recipients
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={individualSearchQuery}
                        onChange={e => setIndividualSearchQuery(e.target.value)}
                        placeholder="Search by customer name or email..."
                        className="w-full pl-9 pr-4 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#002045] text-xs bg-[#F8FAFC]"
                      />
                    </div>
                  </div>

                  {/* Search Results Dropdown / Picker */}
                  {individualSearchQuery.trim() && (
                    <div className="border border-[#CBD5E1] rounded-lg max-h-48 overflow-y-auto divide-y divide-slate-100 bg-white shadow-xs">
                      {filteredSearchUsers.length === 0 ? (
                        <div className="p-3 text-center text-xs text-slate-400 italic">
                          No matching customer profiles found.
                        </div>
                      ) : (
                        filteredSearchUsers.map((cust) => {
                          const isOptedOut = !cust.marketingConsent;
                          const isInactive = cust.status !== "Active";
                          const isSelected = selectedRecipientIds.includes(cust.id);
                          const isDisabled = isOptedOut || isInactive;

                          return (
                            <div 
                              key={cust.id} 
                              className={`p-2.5 flex items-center justify-between text-xs transition-colors ${
                                isDisabled 
                                  ? "bg-slate-50 opacity-65 cursor-not-allowed" 
                                  : "hover:bg-slate-50 cursor-pointer"
                              }`}
                              onClick={() => {
                                if (isDisabled) return;
                                if (isSelected) {
                                  setSelectedRecipientIds(selectedRecipientIds.filter(id => id !== cust.id));
                                } else {
                                  setSelectedRecipientIds([...selectedRecipientIds, cust.id]);
                                }
                              }}
                            >
                              <div>
                                <p className="font-semibold text-[#1E293B]">
                                  {cust.name} <span className="text-slate-400 font-normal">&lt;{cust.email}&gt;</span>
                                </p>
                                <p className="text-[10px] text-slate-500">
                                  Status: {cust.status} • Subscription: {cust.subscriptionStatus}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                {isOptedOut && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-[10px] font-bold">
                                    Opted Out
                                  </span>
                                )}
                                {isInactive && (
                                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-bold">
                                    {cust.status}
                                  </span>
                                )}
                                {!isDisabled && (
                                  <span className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${
                                    isSelected 
                                      ? "bg-[#002045] text-white border-[#002045]" 
                                      : "bg-white text-slate-700 border-slate-300"
                                  }`}>
                                    {isSelected ? "Selected" : "Add"}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* Removable Recipient Chips (US-03 AC) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Selected Recipients ({selectedRecipientIds.length})
                    </label>
                    {selectedRecipientIds.length === 0 ? (
                      <div className="p-3 text-xs text-slate-400 italic bg-slate-50 border border-dashed border-slate-200 rounded-lg text-center">
                        No individual recipients selected. Search above to add customers.
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl max-h-36 overflow-y-auto">
                        {selectedIndividualUsers.map((u) => (
                          <span
                            key={u.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-[#002045] shadow-xs"
                          >
                            <span className="truncate max-w-[140px]">{u.name}</span>
                            <button
                              type="button"
                              onClick={() => setSelectedRecipientIds(selectedRecipientIds.filter(id => id !== u.id))}
                              className="text-slate-400 hover:text-red-600 border-none bg-transparent cursor-pointer p-0.5 leading-none"
                              title="Remove customer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Primary Action Button */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Total Audience: <strong>{finalRecipientCount} recipients</strong>
                </div>
                <button
                  type="submit"
                  disabled={finalRecipientCount === 0 || !composerSubject.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#002045] hover:bg-[#001b3c] disabled:opacity-50 text-white rounded-lg text-[13px] font-semibold shadow-sm transition-colors cursor-pointer border-none"
                >
                  <Send className="w-4 h-4" />
                  Send Campaign Now
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive High-Fidelity Preview (Desktop / Mobile toggle) */}
          <div className="xl:col-span-5 space-y-4">
            <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-5 sticky top-6">
              
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-4">
                <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-1.5">
                  <Eye className="w-5 h-5 text-[#002045]" />
                  Interactive Campaign Preview
                </h3>

                {/* Device Toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1.5 rounded transition-all cursor-pointer border-none ${
                      previewDevice === "desktop" ? "bg-white text-[#002045] shadow-xs" : "text-slate-500 bg-transparent"
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1.5 rounded transition-all cursor-pointer border-none ${
                      previewDevice === "mobile" ? "bg-white text-[#002045] shadow-xs" : "text-slate-500 bg-transparent"
                    }`}
                    title="Mobile Device Preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Preview Container */}
              <div className={`mx-auto transition-all ${previewDevice === "mobile" ? "max-w-[320px]" : "w-full"}`}>
                <div className="border border-[#CBD5E1] rounded-xl overflow-hidden bg-white shadow-sm text-xs">
                  
                  {/* Fake Mail Client Top */}
                  <div className="bg-slate-100 px-3 py-2 border-b border-[#CBD5E1] text-[11px] space-y-0.5">
                    <p className="text-slate-500 truncate">
                      <strong>Subject:</strong> {composerSubject || "(Subject empty)"}
                    </p>
                    <p className="text-slate-400 text-[10px] truncate">
                      <strong>To:</strong> {previewSampleUser?.name || "Customer"} &lt;{previewSampleUser?.email || "customer@example.com"}&gt;
                    </p>
                  </div>

                  {/* Email Body */}
                  <div className="p-4 space-y-4 bg-[#FAFAFA] min-h-[320px]">
                    <div className="bg-white p-2.5 border border-slate-200 rounded-lg text-center shadow-xs">
                      <img src={logo} alt="Amrita Books Logo" className="h-5 w-auto object-contain mx-auto" />
                    </div>

                    {composerHeaderImage && (
                      <div className="rounded-lg overflow-hidden border border-slate-200">
                        <img 
                          src={composerHeaderImage} 
                          alt="Banner" 
                          className="w-full h-32 object-cover" 
                        />
                      </div>
                    )}

                    <div 
                      className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs prose prose-sm max-w-none text-slate-800 text-xs leading-relaxed space-y-2"
                      dangerouslySetInnerHTML={{ __html: renderInterpolatedBody(composerBody || "<p className='text-slate-400 italic'>No message body content entered yet...</p>") }}
                    />

                    {composerCtaLabel && (
                      <div className="text-center pt-1">
                        <span className="inline-block px-5 py-2 bg-[#002045] text-white font-bold rounded-lg text-xs shadow-sm">
                          {composerCtaLabel}
                        </span>
                      </div>
                    )}

                    {/* Compliance Footer */}
                    <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-500 space-y-1">
                      <p>You received this promotional email because you subscribed to updates from Amrita Books.</p>
                      <p>Mata Amritanandamayi Math, Amritapuri, Kollam, Kerala - 690525</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Compliance note */}
              <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Compliance Guard:</strong> Suspended, inactive, and opted-out accounts are automatically filtered prior to broadcast.
                </span>
              </div>

            </div>
          </div>

        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SEND HISTORY (Epic 4.3 - US-08) */}
      {/* ========================================================================= */}
      {activeTab === "history" && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-[#1E293B]">Promotional Send History</h3>
              <p className="text-xs text-[#64748B]">Audit log of promotional campaigns dispatched immediately from the admin portal.</p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
              {sentCampaigns.length} Sent
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Subject & Preheader</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Audience & Segment</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] text-center">Recipients</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Dispatched At</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Sent By</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] text-center">Snapshot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-[13px]">
                {sentCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                      No promotional campaigns sent yet.
                    </td>
                  </tr>
                ) : (
                  sentCampaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-5 py-4 font-semibold text-[#1E293B]">
                        <p className="truncate max-w-[280px]" title={camp.subject}>{camp.subject}</p>
                        {camp.preheader && (
                          <p className="text-[11px] text-slate-400 font-normal truncate max-w-[280px] mt-0.5">
                            {camp.preheader}
                          </p>
                        )}
                        {camp.templateName && (
                          <span className="inline-block mt-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-normal">
                            Template: {camp.templateName}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-[#475569]">
                        {camp.audienceType === "segment" ? (
                          <span className="font-semibold text-blue-900 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                            Segment: {AUDIENCE_SEGMENT_LABELS[camp.audienceSegment || "all"].label}
                          </span>
                        ) : (
                          <span className="font-semibold text-purple-900 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full">
                            Individual ({camp.recipientIds?.length || camp.recipientCount})
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          <Check className="w-3 h-3 text-emerald-600" />
                          {camp.recipientCount}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                        {camp.sentAt}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-700 whitespace-nowrap">
                        {camp.sentBy}
                      </td>
                      <td className="px-5 py-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSnapshotCampaign(camp)}
                            className="px-2.5 py-1 text-xs font-semibold text-[#002045] bg-[#002045]/5 hover:bg-[#002045]/10 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border-none"
                            title="View Email Snapshot"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete this campaign log from history?")) {
                                deleteSentCampaign(camp.id);
                                setSentCampaigns(getSentCampaigns());
                                showToast("Campaign log removed.", "info");
                              }
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border-none"
                            title="Delete Log"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEND CONFIRMATION MODAL (US-08) */}
      {/* ========================================================================= */}
      {showSendConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white border border-[#CBD5E1] rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F1F5F9] pb-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#002045] flex items-center justify-center flex-shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1E293B]">Confirm Immediate Email Send</h3>
                <p className="text-xs text-[#64748B]">Review campaign details before final dispatch.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2.5">
              <div>
                <span className="text-slate-400 block text-[11px]">Subject:</span>
                <span className="font-bold text-[#1E293B]">{composerSubject}</span>
              </div>
              {selectedTemplateId && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Base Template:</span>
                  <span className="font-medium text-slate-700">
                    {templates.find(t => t.id === selectedTemplateId)?.name || "Saved Template"}
                  </span>
                </div>
              )}
              <div>
                <span className="text-slate-400 block text-[11px]">Target Audience:</span>
                <span className="font-medium text-slate-700">
                  {audienceType === "segment" 
                    ? AUDIENCE_SEGMENT_LABELS[audienceSegment].label 
                    : `Individual Customer List (${selectedRecipientIds.length} chosen)`}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">Final Recipient Count:</span>
                <span className="text-sm font-black text-[#002045] bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">
                  {finalRecipientCount} Users
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Note: Opted-out and non-active users are automatically excluded in compliance with Amrita Books communications policy.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSendConfirmation(false)}
                className="flex-1 px-4 py-2.5 border border-[#CBD5E1] rounded-lg hover:bg-slate-50 text-slate-600 text-xs font-semibold cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSend}
                className="flex-1 px-4 py-2.5 bg-[#002045] hover:bg-[#001b3c] text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer border-none"
              >
                Confirm & Send Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SNAPSHOT VIEW MODAL (History) */}
      {/* ========================================================================= */}
      {snapshotCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white border border-[#CBD5E1] rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3 flex-shrink-0">
              <div>
                <h3 className="text-base font-bold text-[#1E293B]">Campaign Snapshot</h3>
                <p className="text-xs text-[#64748B]">Sent on {snapshotCampaign.sentAt} by {snapshotCampaign.sentBy}</p>
              </div>
              <button
                onClick={() => setSnapshotCampaign(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl cursor-pointer border-none bg-transparent"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <p><strong>Subject:</strong> {snapshotCampaign.subject}</p>
                {snapshotCampaign.preheader && <p className="text-slate-500"><strong>Preheader:</strong> {snapshotCampaign.preheader}</p>}
                <p><strong>Recipients Reached:</strong> {snapshotCampaign.recipientCount}</p>
              </div>

              {snapshotCampaign.headerImageUrl && (
                <img 
                  src={snapshotCampaign.headerImageUrl} 
                  alt="Snapshot Header" 
                  className="w-full h-40 object-cover rounded-lg border"
                />
              )}

              <div 
                className="p-4 bg-white border border-slate-200 rounded-lg prose prose-sm max-w-none text-xs"
                dangerouslySetInnerHTML={{ __html: renderInterpolatedBody(snapshotCampaign.body) }}
              />

              {snapshotCampaign.ctaLabel && (
                <div className="text-center pt-2">
                  <span className="px-4 py-2 bg-[#002045] text-white rounded-lg font-bold text-xs">
                    {snapshotCampaign.ctaLabel}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#F1F5F9] flex justify-end flex-shrink-0">
              <button
                onClick={() => setSnapshotCampaign(null)}
                className="px-5 py-2 bg-[#002045] text-white rounded-lg text-xs font-semibold cursor-pointer border-none"
              >
                Close Snapshot
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
