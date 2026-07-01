import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Package, Search, Eye, Truck, ChevronDown, ChevronUp, Plus, X, Trash2, FileText, Upload, Check, MapPin, CheckCircle, Download } from "lucide-react";
import { RowActionsMenu } from "../RowActionsMenu";

type OrderItem = {
  bookTitle: string;
  language: string;
  format: "digital" | "physical";
  quantity: number;
  price: number;
  refundedQuantity?: number;
  refundedAmount?: number;
};

type RefundHistory = {
  date: string;
  time: string;
  amount: number;
  reason?: string;
  items: {
    bookTitle: string;
    language: string;
    quantity: number;
    amount: number;
  }[];
};

type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  customerEmail: string;
  orderType: "physical" | "digital" | "subscription";
  items: number;
  total: number;
  status:
    | "pending" | "shipped" | "in-transit" | "delivered" | "failed" | "refunded"  // Physical
    | "completed"  // Digital
    | "active" | "expired";  // Subscription
  paymentStatus: "pending" | "paid" | "failed" | "refunded" | "partially-refunded";
  createdAt: string;
  createdTime?: string;
  trackingNumber?: string;
  courier?: "india-post" | "dhl";
  orderItems?: OrderItem[];
  subscriptionPlan?: "monthly" | "yearly";
  subscriptionEndDate?: string;
  refundedAmount?: number;
  refundHistory?: RefundHistory[];
  isManual?: boolean;
  invoiceFile?: { name: string; size: number; type: string; dataUrl?: string };
};

const manualCatalog = [
  { id: "1", title: "Bhagavad Gita", variants: [
    { language: "English", formats: ["physical", "digital"] as const, price: { physical: 499, digital: 299 } },
    { language: "Hindi", formats: ["physical", "digital"] as const, price: { physical: 499, digital: 299 } }
  ]},
  { id: "2", title: "Ramayana", variants: [
    { language: "English", formats: ["physical", "digital"] as const, price: { physical: 699, digital: 399 } },
    { language: "Tamil", formats: ["physical", "digital"] as const, price: { physical: 699, digital: 399 } }
  ]},
  { id: "3", title: "Mahabharata", variants: [
    { language: "English", formats: ["physical", "digital"] as const, price: { physical: 999, digital: 599 } },
    { language: "Telugu", formats: ["physical", "digital"] as const, price: { physical: 999, digital: 599 } }
  ]},
  { id: "4", title: "Upanishads Collection", variants: [
    { language: "English", formats: ["physical", "digital"] as const, price: { physical: 799, digital: 449 } }
  ]},
  { id: "5", title: "Vedas Complete Set", variants: [
    { language: "Sanskrit", formats: ["physical", "digital"] as const, price: { physical: 1499, digital: 799 } },
    { language: "English", formats: ["physical", "digital"] as const, price: { physical: 1499, digital: 799 } }
  ]}
];

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "AMR-2847",
    customer: "Rajesh Kumar",
    customerEmail: "rajesh.kumar@example.com",
    orderType: "physical",
    items: 3,
    total: 1997,
    status: "pending",
    paymentStatus: "paid",
    createdAt: "2026-05-15",
    createdTime: "10:45 AM",
    orderItems: [
      { bookTitle: "Bhagavad Gita", language: "Hindi", format: "physical", quantity: 1, price: 499 },
      { bookTitle: "Ramayana", language: "Tamil", format: "physical", quantity: 1, price: 699 },
      { bookTitle: "Upanishads Collection", language: "English", format: "physical", quantity: 1, price: 799 }
    ]
  },
  {
    id: "2",
    orderNumber: "AMR-2846",
    customer: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    orderType: "digital",
    items: 1,
    total: 299,
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2026-05-14",
    createdTime: "02:30 PM",
    orderItems: [
      { bookTitle: "Bhagavad Gita", language: "English", format: "digital", quantity: 1, price: 299 }
    ]
  },
  {
    id: "3",
    orderNumber: "AMR-2845",
    customer: "Amit Patel",
    customerEmail: "amit.patel@example.com",
    orderType: "physical",
    items: 2,
    total: 998,
    status: "in-transit",
    paymentStatus: "paid",
    createdAt: "2026-05-13",
    createdTime: "09:15 AM",
    trackingNumber: "RN123456789IN",
    courier: "india-post",
    orderItems: [
      { bookTitle: "Bhagavad Gita", language: "Hindi", format: "physical", quantity: 2, price: 998 }
    ]
  },
  {
    id: "4",
    orderNumber: "AMR-2844",
    customer: "Sneha Reddy",
    customerEmail: "sneha.reddy@example.com",
    orderType: "physical",
    items: 4,
    total: 3796,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-05-10",
    createdTime: "11:20 AM",
    trackingNumber: "1234567890",
    courier: "dhl",
    orderItems: [
      { bookTitle: "Mahabharata", language: "Telugu", format: "physical", quantity: 2, price: 1998 },
      { bookTitle: "Puranas Compilation", language: "Bengali", format: "physical", quantity: 2, price: 1798 }
    ]
  },
  {
    id: "5",
    orderNumber: "AMR-2843",
    customer: "Lakshmi Iyer",
    customerEmail: "lakshmi.iyer@example.com",
    orderType: "digital",
    items: 1,
    total: 449,
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2026-05-12",
    createdTime: "04:50 PM",
    orderItems: [
      { bookTitle: "Upanishads Collection", language: "English", format: "digital", quantity: 1, price: 449 }
    ]
  },
  {
    id: "6",
    orderNumber: "AMR-SUB-501",
    customer: "Arjun Menon",
    customerEmail: "arjun.menon@example.com",
    orderType: "subscription",
    items: 0,
    total: 1999,
    status: "active",
    paymentStatus: "paid",
    createdAt: "2026-01-15",
    createdTime: "08:00 AM",
    subscriptionPlan: "yearly",
    subscriptionEndDate: "2027-01-15"
  },
  {
    id: "7",
    orderNumber: "AMR-SUB-502",
    customer: "Kavita Desai",
    customerEmail: "kavita.desai@example.com",
    orderType: "subscription",
    items: 0,
    total: 199,
    status: "active",
    paymentStatus: "paid",
    createdAt: "2026-04-01",
    createdTime: "12:30 PM",
    subscriptionPlan: "monthly",
    subscriptionEndDate: "2026-06-01"
  },
  {
    id: "8",
    orderNumber: "AMR-2842",
    customer: "Vikram Singh",
    customerEmail: "vikram.singh@example.com",
    orderType: "physical",
    items: 1,
    total: 1499,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "2026-05-11",
    createdTime: "03:15 PM",
    trackingNumber: "RN987654321IN",
    courier: "india-post",
    orderItems: [
      { bookTitle: "Vedas Complete Set", language: "English", format: "physical", quantity: 1, price: 1499 }
    ]
  },
  {
    id: "9",
    orderNumber: "AMR-SUB-503",
    customer: "Meera Nair",
    customerEmail: "meera.nair@example.com",
    orderType: "subscription",
    items: 0,
    total: 1999,
    status: "expired",
    paymentStatus: "paid",
    createdAt: "2025-02-10",
    createdTime: "10:00 AM",
    subscriptionPlan: "yearly",
    subscriptionEndDate: "2026-02-10"
  },
  {
    id: "10",
    orderNumber: "AMR-2841",
    customer: "Deepak Gupta",
    customerEmail: "deepak.gupta@example.com",
    orderType: "physical",
    items: 2,
    total: 1198,
    status: "refunded",
    paymentStatus: "refunded",
    createdAt: "2026-05-08",
    createdTime: "01:45 PM",
    refundedAmount: 1198,
    orderItems: [
      { bookTitle: "Yoga Sutras", language: "Hindi", format: "physical", quantity: 1, price: 599, refundedQuantity: 1, refundedAmount: 599 },
      { bookTitle: "Meditation Guide", language: "English", format: "physical", quantity: 1, price: 599, refundedQuantity: 1, refundedAmount: 599 }
    ],
    refundHistory: [
      {
        date: "2026-05-10",
        time: "03:30 PM",
        amount: 1198,
        reason: "Customer request - ordered wrong edition",
        items: [
          { bookTitle: "Yoga Sutras", language: "Hindi", quantity: 1, amount: 599 },
          { bookTitle: "Meditation Guide", language: "English", quantity: 1, amount: 599 }
        ]
      }
    ]
  },
  {
    id: "11",
    orderNumber: "AMR-2840",
    customer: "Ananya Krishnan",
    customerEmail: "ananya.krishnan@example.com",
    orderType: "digital",
    items: 1,
    total: 399,
    status: "failed",
    paymentStatus: "failed",
    createdAt: "2026-05-14",
    createdTime: "06:20 PM",
    orderItems: [
      { bookTitle: "Tantra Philosophy", language: "English", format: "digital", quantity: 1, price: 399 }
    ]
  },
  {
    id: "12",
    orderNumber: "AMR-2839",
    customer: "Rohit Malhotra",
    customerEmail: "rohit.malhotra@example.com",
    orderType: "physical",
    items: 3,
    total: 1797,
    status: "delivered",
    paymentStatus: "partially-refunded",
    createdAt: "2026-05-09",
    createdTime: "11:00 AM",
    trackingNumber: "RN456789123IN",
    courier: "india-post",
    refundedAmount: 599,
    orderItems: [
      { bookTitle: "Vedic Astrology", language: "Hindi", format: "physical", quantity: 1, price: 599, refundedQuantity: 1, refundedAmount: 599 },
      { bookTitle: "Temple Architecture", language: "English", format: "physical", quantity: 1, price: 599 },
      { bookTitle: "Classical Dance Forms", language: "Tamil", format: "physical", quantity: 1, price: 599 }
    ],
    refundHistory: [
      {
        date: "2026-05-12",
        time: "02:15 PM",
        amount: 599,
        reason: "Damaged during shipping",
        items: [
          { bookTitle: "Vedic Astrology", language: "Hindi", quantity: 1, amount: 599 }
        ]
      }
    ]
  },
];

const statusConfig = {
  // Physical Order Statuses
  pending: { label: "Pending", color: "bg-[#FEF3C7] text-[#92400E]" },
  shipped: { label: "Shipped", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  "in-transit": { label: "In Transit", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  delivered: { label: "Delivered", color: "bg-[#DCFCE7] text-[#15803D]" },
  // Digital Order Statuses
  completed: { label: "Completed", color: "bg-[#DCFCE7] text-[#15803D]" },
  // Subscription Order Statuses
  active: { label: "Active", color: "bg-[#DCFCE7] text-[#15803D]" },
  expired: { label: "Expired", color: "bg-[#F1F5F9] text-[#475569]" },
  // Common Statuses
  failed: { label: "Failed", color: "bg-[#FEE2E2] text-[#B91C1C]" },
  refunded: { label: "Refunded", color: "bg-[#F1F5F9] text-[#475569]" },
};

const paymentStatusConfig = {
  pending: { label: "Pending", color: "bg-[#FEF3C7] text-[#92400E]" },
  paid: { label: "Paid", color: "bg-[#DCFCE7] text-[#15803D]" },
  failed: { label: "Failed", color: "bg-[#FEE2E2] text-[#B91C1C]" },
  refunded: { label: "Refunded", color: "bg-[#F1F5F9] text-[#475569]" },
  "partially-refunded": { label: "Partial Refund", color: "bg-[#FEF3C7] text-[#92400E]" },
};

type ManualOrderItem = {
  bookId: string;
  language: string;
  format: "digital" | "physical" | "";
  quantity: number;
  price: number;
};

type ManualOrderForm = {
  customerName: string;
  customerEmail: string;
  orderType: "physical" | "digital";
  paymentStatus: "paid" | "pending" | "failed";
  items: ManualOrderItem[];
  invoiceFile: { name: string; size: number; type: string; dataUrl?: string } | null;
};

const initialFormState: ManualOrderForm = {
  customerName: "",
  customerEmail: "",
  orderType: "physical",
  paymentStatus: "paid",
  items: [{ bookId: "", language: "", format: "", quantity: 1, price: 0 }],
  invoiceFile: null
};

export function OrderManagement() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("amrita_orders");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing amrita_orders", e);
      }
    }
    localStorage.setItem("amrita_orders", JSON.stringify(mockOrders));
    return mockOrders;
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState("");
  const [courier, setCourier] = useState<"india-post" | "dhl">("india-post");
  const [trackingError, setTrackingError] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "physical" | "digital" | "subscription">("all");
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundType, setRefundType] = useState<"full" | "partial">("full");
  const [selectedRefundItems, setSelectedRefundItems] = useState<{ index: number; quantity: number; amount: number }[]>([]);
  const [refundReason, setRefundReason] = useState("");
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingOrderForEdit, setTrackingOrderForEdit] = useState<Order | null>(null);
  const [isEditingTracking, setIsEditingTracking] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Manual Order states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showManualOrderModal, setShowManualOrderModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [itemsErrors, setItemsErrors] = useState<Record<number, Record<string, string>>>({});
  const [manualOrderForm, setManualOrderForm] = useState<ManualOrderForm>(initialFormState);
  const [invoicePreviewOrder, setInvoicePreviewOrder] = useState<Order | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  const getDynamicTimeline = (order: Order) => {
    const timeline = [
      { timestamp: `${order.createdAt} 10:30`, location: "Mumbai Warehouse", status: "Dispatched", description: "Item dispatched from origin" }
    ];
    
    if (order.status === "in-transit" || order.status === "shipped") {
      timeline.push({
        timestamp: `${order.createdAt} 18:45`,
        location: "Sorting Hub",
        status: "In Transit",
        description: "Arrived at sorting facility"
      });
      timeline.push({
        timestamp: `${order.createdAt} 20:15`,
        location: "Local Hub",
        status: "In Transit",
        description: "Out for delivery"
      });
    }
    
    if (order.status === "delivered") {
      timeline.push({
        timestamp: `${order.createdAt} 18:45`,
        location: "Sorting Hub",
        status: "In Transit",
        description: "Arrived at sorting facility"
      });
      timeline.push({
        timestamp: `${order.createdAt} 20:15`,
        location: "Local Hub",
        status: "In Transit",
        description: "Out for delivery"
      });
      timeline.push({
        timestamp: `${order.createdAt} 22:30`,
        location: "Customer Address",
        status: "Delivered",
        description: "Successfully delivered"
      });
    }

    return timeline;
  };

  const handleAddManualItem = () => {
    setManualOrderForm(prev => ({
      ...prev,
      items: [...prev.items, { bookId: "", language: "", format: "", quantity: 1, price: 0 }]
    }));
  };

  const handleRemoveManualItem = (index: number) => {
    setManualOrderForm(prev => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== index)
    }));
    // Clean up error states
    const nextErrors = { ...itemsErrors };
    delete nextErrors[index];
    setItemsErrors(nextErrors);
  };

  const handleItemFieldChange = (index: number, field: keyof ManualOrderItem, value: any) => {
    setManualOrderForm(prev => {
      const nextItems = [...prev.items];
      const item = { ...nextItems[index] };

      if (field === "bookId") {
        item.bookId = value;
        const book = manualCatalog.find(b => b.id === value);
        if (book && book.variants.length > 0) {
          item.language = book.variants[0].language;
          const variant = book.variants[0];
          if (variant.formats.length > 0) {
            const preferredFormat = variant.formats.includes(prev.orderType) 
              ? prev.orderType 
              : variant.formats[0];
            item.format = preferredFormat;
            item.price = variant.price[preferredFormat] || 0;
          } else {
            item.format = "";
            item.price = 0;
          }
        } else {
          item.language = "";
          item.format = "";
          item.price = 0;
        }
      } else if (field === "language") {
        item.language = value;
        const book = manualCatalog.find(b => b.id === item.bookId);
        const variant = book?.variants.find(v => v.language === value);
        if (variant && variant.formats.length > 0) {
          const preferredFormat = variant.formats.includes(prev.orderType)
            ? prev.orderType
            : variant.formats[0];
          item.format = preferredFormat;
          item.price = variant.price[preferredFormat] || 0;
        } else {
          item.format = "";
          item.price = 0;
        }
      } else if (field === "format") {
        item.format = value;
        const book = manualCatalog.find(b => b.id === item.bookId);
        const variant = book?.variants.find(v => v.language === item.language);
        if (variant && value) {
          item.price = variant.price[value as "physical" | "digital"] || 0;
        }
      } else if (field === "quantity") {
        item.quantity = Math.max(1, parseInt(value) || 1);
      }

      nextItems[index] = item;
      return { ...prev, items: nextItems };
    });
  };

  const handleInvoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setManualOrderForm(prev => ({
        ...prev,
        invoiceFile: {
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: reader.result as string
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveInvoice = () => {
    setManualOrderForm(prev => ({ ...prev, invoiceFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleManualOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    if (!manualOrderForm.customerName.trim()) {
      errors.customerName = "Customer name is required";
    }
    if (!manualOrderForm.customerEmail.trim()) {
      errors.customerEmail = "Customer email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(manualOrderForm.customerEmail)) {
      errors.customerEmail = "Invalid email format";
    }

    const itemErrorsMap: Record<number, Record<string, string>> = {};
    if (manualOrderForm.items.length === 0) {
      errors.items = "At least one item must be added";
    } else {
      manualOrderForm.items.forEach((item, index) => {
        const itemErr: Record<string, string> = {};
        if (!item.bookId) itemErr.bookId = "Please select a book";
        if (!item.language) itemErr.language = "Select language";
        if (!item.format) itemErr.format = "Select format";
        if (Object.keys(itemErr).length > 0) {
          itemErrorsMap[index] = itemErr;
        }
      });
    }

    if (Object.keys(errors).length > 0 || Object.keys(itemErrorsMap).length > 0) {
      setFormErrors(errors);
      setItemsErrors(itemErrorsMap);
      return;
    }

    let status: Order["status"] = "pending";
    if (manualOrderForm.orderType === "digital" && manualOrderForm.paymentStatus === "paid") {
      status = "completed";
    } else if (manualOrderForm.paymentStatus === "failed") {
      status = "failed";
    }

    const orderItems: OrderItem[] = manualOrderForm.items.map(item => {
      const book = manualCatalog.find(b => b.id === item.bookId);
      return {
        bookTitle: book?.title || "Unknown Book",
        language: item.language,
        format: item.format as "digital" | "physical",
        quantity: item.quantity,
        price: item.price * item.quantity
      };
    });

    const totalTotal = orderItems.reduce((sum, item) => sum + item.price, 0);

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `AMR-MAN-${randomDigits}`;

    const newOrder: Order = {
      id: String(orders.length + 100),
      orderNumber,
      customer: manualOrderForm.customerName,
      customerEmail: manualOrderForm.customerEmail,
      orderType: manualOrderForm.orderType,
      items: orderItems.length,
      total: totalTotal,
      status,
      paymentStatus: manualOrderForm.paymentStatus,
      createdAt: new Date().toISOString().split('T')[0],
      createdTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      orderItems,
      isManual: true,
      invoiceFile: manualOrderForm.invoiceFile || undefined
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("amrita_orders", JSON.stringify(updatedOrders));

    setManualOrderForm(initialFormState);
    setFormErrors({});
    setItemsErrors({});
    setShowManualOrderModal(false);

    alert(`Manual order ${orderNumber} created successfully!`);
  };

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (courier === "india-post" && !trackingInput.endsWith("IN")) {
      setTrackingError("Invalid tracking number. India Post tracking numbers must end with 'IN'");
      return;
    }

    if (courier === "dhl" && trackingInput.length < 10) {
      setTrackingError("Invalid DHL tracking number. Please enter a valid tracking number");
      return;
    }

    setTrackingError("");

    const updatedOrders = orders.map(o => {
      if (o.id === trackingOrderForEdit?.id) {
        return {
          ...o,
          trackingNumber: trackingInput,
          courier: courier,
          status: "shipped" as const
        };
      }
      return o;
    });

    setOrders(updatedOrders);
    localStorage.setItem("amrita_orders", JSON.stringify(updatedOrders));

    if (selectedOrder && selectedOrder.id === trackingOrderForEdit?.id) {
      setSelectedOrder({
        ...selectedOrder,
        trackingNumber: trackingInput,
        courier: courier,
        status: "shipped"
      });
    }

    if (isEditingTracking) {
      alert(`Tracking details updated!\n\nOrder: ${trackingOrderForEdit?.orderNumber}\nCourier: ${courier === "india-post" ? "India Post" : "DHL"}\nTracking: ${trackingInput}\n\nCustomer has been notified of the update.`);
    } else {
      alert(`Tracking number saved!\n\nOrder: ${trackingOrderForEdit?.orderNumber}\nCourier: ${courier === "india-post" ? "India Post" : "DHL"}\nTracking: ${trackingInput}\nStatus: Shipped\n\nCustomer email notification sent.`);
    }

    setShowTrackingModal(false);
    setTrackingOrderForEdit(null);
    setTrackingInput("");
    setIsEditingTracking(false);
  };

  // Apply all filters
  const filteredOrders = orders.filter(order => {
    // Tab filter
    if (activeTab !== "all" && order.orderType !== activeTab) return false;

    // Type filter
    if (typeFilter !== "all" && order.orderType !== typeFilter) return false;

    // Status filter
    if (statusFilter !== "all" && order.status !== statusFilter) return false;

    // Payment status filter
    if (paymentStatusFilter !== "all" && order.paymentStatus !== paymentStatusFilter) return false;

    // Search filter (order number, customer name, customer email)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Date range filter
    if (dateFrom && order.createdAt < dateFrom) return false;
    if (dateTo && order.createdAt > dateTo) return false;

    return true;
  });

  const handleExportCSV = () => {
    if (filteredOrders.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ["Order Number", "Customer Name", "Email", "Type", "Items Count", "Total Amount", "Status", "Payment Status", "Created Date", "Tracking Number"];
    const rows = filteredOrders.map(order => [
      order.orderNumber,
      order.customer,
      order.customerEmail,
      order.orderType,
      order.items,
      `INR ${order.total}`,
      order.status,
      order.paymentStatus,
      order.createdAt,
      order.trackingNumber || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `filtered_orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Order Management</h1>
          <p className="text-sm text-[#43474e] font-normal leading-5">Track and manage customer orders and subscriptions</p>
        </div>
        <button
          onClick={() => {
            setManualOrderForm(initialFormState);
            setFormErrors({});
            setItemsErrors({});
            setShowManualOrderModal(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-saffron)] text-white rounded-md hover:bg-[var(--color-saffron-dark)] transition-all font-medium text-sm cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Manual Order
        </button>
      </div>

      {/* Standalone tab bar */}
      <div>
        <div className="flex border-b border-border">
          {(
            [
              { key: "all", label: "All Orders" },
              { key: "physical", label: "Physical" },
              { key: "digital", label: "Digital" },
              { key: "subscription", label: "Subscriptions" },
            ] as const
          ).map(({ key, label }) => {
            const count = key === "all"
              ? orders.length
              : orders.filter(o => o.orderType === key).length;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? "text-[#002045]"
                    : "text-[#43474e]/70 hover:text-[#191c1e]"
                }`}
              >
                {label}
                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-[#002045] text-white"
                    : "bg-[#F8FAFC] text-[#43474e]"
                }`}>
                  {count}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#002045] rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-card border border-border rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="p-4 border-b border-border space-y-4">
            {/* Primary: Search Bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#43474e]/60 transition-colors group-focus-within:text-[#002045] stroke-[2px]" />
                <input
                  type="text"
                  placeholder="Search by order number, customer name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 text-sm text-[#191c1e] placeholder:text-[#94A3B8] bg-white rounded-full border border-[#D1D5DC] focus:outline-none focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 transition-all duration-200"
                />
              </div>
              <button
                onClick={() => setShowMoreFilters(v => !v)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-lg hover:bg-muted transition-colors whitespace-nowrap ${showMoreFilters ? "bg-muted text-foreground" : "bg-white text-foreground/70"}`}
              >
                {showMoreFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                Filters
              </button>
            </div>

            {/* Secondary: Collapsible Filters */}
            {showMoreFilters && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="min-w-[140px] flex-1 px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="physical">Physical</option>
                  <option value="digital">Digital</option>
                  <option value="subscription">Subscription</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="min-w-[160px] flex-1 px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all text-sm"
                >
                  <option value="all">All Order Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>

                <select
                  value={paymentStatusFilter}
                  onChange={(e) => setPaymentStatusFilter(e.target.value)}
                  className="min-w-[180px] flex-1 px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all text-sm"
                >
                  <option value="all">All Payment Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                  <option value="partially-refunded">Partially Refunded</option>
                </select>

                <div className="flex items-center gap-2 flex-1 min-w-[280px]">
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all text-sm"
                  />
                  <span className="text-muted-foreground text-xs font-medium">to</span>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all text-sm"
                  />
                </div>

                {/* Export CSV Button */}
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-4 py-2.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg text-sm font-bold transition-all bg-white cursor-pointer text-[#191c1e] h-[45px] self-end"
                  title="Export filtered orders to CSV"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  Export CSV
                </button>
              </div>
            )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Order Number</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Customer</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Type</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Items</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Total</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Order Status</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Payment</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Date</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Actions</th>
              </tr>
            </thead>
            <tbody className="/50">
              {filteredOrders.map((order) => {
                const renderItemsSummary = () => {
                  if (order.orderType === "subscription") {
                    return (
                      <span className="text-sm px-2.5 py-1 bg-[var(--color-neutral-200)] border border-[var(--color-neutral-300)] rounded font-medium">
                        {order.subscriptionPlan === "monthly" ? "Monthly" : "Yearly"}
                      </span>
                    );
                  }

                  if (!order.orderItems || order.orderItems.length === 0) {
                    return <span className="text-muted-foreground text-sm">No items</span>;
                  }

                  const firstTwo = order.orderItems.slice(0, 2);
                  const remaining = order.orderItems.length - 2;

                  return (
                    <div className="space-y-1">
                      {firstTwo.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-medium">{item.bookTitle}</span>
                          <span className="text-xs ml-1.5 px-1.5 py-0.5 bg-[var(--color-neutral-200)] border border-[var(--color-neutral-300)] rounded">
                            {item.language}
                          </span>
                        </div>
                      ))}
                      {remaining > 0 && (
                        <span className="text-xs text-muted-foreground">+{remaining} more</span>
                      )}
                    </div>
                  );
                };

                return (
                  <tr key={order.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-all group">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="font-semibold text-[var(--color-institutional-blue)] hover:underline"
                      >
                        {order.orderNumber}
                      </button>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        order.orderType === "physical"
                          ? "bg-[#1E293B] text-white"
                          : order.orderType === "digital"
                          ? "bg-[#0F766E] text-white"
                          : "bg-[#6D28D9] text-white"
                      }`}>
                        {order.orderType === "physical" ? "Physical" : order.orderType === "digital" ? "Digital" : "Subscription"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {renderItemsSummary()}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="font-semibold">₹{order.total.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${paymentStatusConfig[order.paymentStatus].color}`}>
                        {paymentStatusConfig[order.paymentStatus].label}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div>
                        <div className="text-sm">{order.createdAt}</div>
                        {order.createdTime && (
                          <div className="text-xs text-muted-foreground mt-0.5">{order.createdTime}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <RowActionsMenu actions={[
                        {
                          label: "View Details",
                          icon: <Eye className="w-4 h-4" />,
                          onClick: () => setSelectedOrder(order),
                        },
                        {
                          label: "Add Tracking",
                          icon: <Truck className="w-4 h-4" />,
                          onClick: () => {
                            setTrackingOrderForEdit(order);
                            setShowTrackingModal(true);
                            setIsEditingTracking(false);
                            setCourier(order.courier || "india-post");
                            setTrackingInput(order.trackingNumber || "");
                            setTrackingError("");
                          },
                          hidden: !(order.orderType === "physical" && order.status === "pending"),
                        },
                        {
                          label: "View Tracking",
                          icon: <Truck className="w-4 h-4" />,
                          onClick: () => setActiveTrackingOrder(order),
                          hidden: !(order.orderType === "physical" && (order.status === "shipped" || order.status === "in-transit" || order.status === "delivered") && !!order.trackingNumber),
                        },
                      ]} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && !showRefundModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.3px] text-[#191c1e]">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-muted-foreground hover:text-foreground text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Customer Information */}
            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-4">Customer Information</h3>
              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Name</span>
                  <span className="font-medium">{selectedOrder.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Email</span>
                  <span className="font-medium">{selectedOrder.customerEmail}</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-4">Order Summary</h3>
              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Order Number</span>
                  <span className="font-semibold">{selectedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Order Type</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    selectedOrder.orderType === "physical"
                      ? "bg-[#1E293B] text-white"
                      : selectedOrder.orderType === "digital"
                      ? "bg-[#0F766E] text-white"
                      : "bg-[#6D28D9] text-white"
                  }`}>
                    {selectedOrder.orderType === "physical" ? "Physical" : selectedOrder.orderType === "digital" ? "Digital" : "Subscription"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Order Status</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusConfig[selectedOrder.status].color}`}>
                    {statusConfig[selectedOrder.status].label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Order Date</span>
                  <span className="font-medium">{selectedOrder.createdAt} {selectedOrder.createdTime && `at ${selectedOrder.createdTime}`}</span>
                </div>
                {selectedOrder.isManual && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Creation Mode</span>
                    <span className="font-semibold text-xs px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                      Manual Order
                    </span>
                  </div>
                )}
                {selectedOrder.orderType === "subscription" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Plan</span>
                      <span className="font-medium">{selectedOrder.subscriptionPlan === "monthly" ? "Monthly" : "Yearly"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">End Date</span>
                      <span className="font-medium">{selectedOrder.subscriptionEndDate}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-4">Payment Information</h3>
              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Payment Status</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${paymentStatusConfig[selectedOrder.paymentStatus].color}`}>
                    {paymentStatusConfig[selectedOrder.paymentStatus].label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Total Amount</span>
                  <span className="font-semibold text-lg">₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Manual Invoice */}
            {selectedOrder.isManual && (
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-4">Manual Invoice</h3>
                <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-lg border border-[#E2E8F0]">
                  {selectedOrder.invoiceFile ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-[#002045] flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-sm truncate">{selectedOrder.invoiceFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedOrder.invoiceFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setInvoicePreviewOrder(selectedOrder)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#002045] text-white rounded hover:opacity-95 transition-colors text-xs font-semibold flex-shrink-0 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Invoice
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">No custom invoice uploaded. Dynamic receipt available.</p>
                      <button
                        onClick={() => setInvoicePreviewOrder(selectedOrder)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#002045] text-white rounded hover:opacity-95 transition-colors text-xs font-semibold flex-shrink-0 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Invoice
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Ordered Items */}
            {selectedOrder.orderType !== "subscription" && selectedOrder.orderItems && selectedOrder.orderItems.length > 0 && (
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-4">Ordered Items</h3>
                <div className="space-y-5">
                  {selectedOrder.orderItems.map((item, idx) => {
                    const hasRefund = item.refundedQuantity && item.refundedQuantity > 0;
                    const isFullyRefunded = hasRefund && item.refundedQuantity === item.quantity;

                    return (
                      <div
                        key={idx}
                        className={`flex gap-4 p-4 rounded-lg ${
                          isFullyRefunded
                            ? "bg-[var(--color-neutral-100)] opacity-75"
                            : "bg-[var(--color-neutral-100)]"
                        }`}
                      >
                        <div className="w-16 h-20 bg-[var(--color-neutral-300)] rounded flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold mb-1">{item.bookTitle}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-card border border-border rounded">
                              {item.language}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded border ${
                              item.format === "digital"
                                ? "bg-[var(--color-success-green)]/10 text-[var(--color-success-green)] border-[var(--color-success-green)]/20"
                                : "bg-[var(--color-saffron)]/10 text-[var(--color-saffron)] border-[var(--color-saffron)]/20"
                            }`}>
                              {item.format === "digital" ? "Digital" : "Physical"}
                            </span>
                            {hasRefund && (
                              <span className="text-xs px-2 py-1 rounded border bg-destructive/10 text-destructive border-destructive/20">
                                {isFullyRefunded ? "Fully Refunded" : "Partially Refunded"}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Quantity</span>
                              <span className="font-medium">
                                {item.quantity}
                                {hasRefund && ` (${item.refundedQuantity} refunded)`}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Amount</span>
                              <div className="text-right">
                                <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                                {hasRefund && item.refundedAmount && (
                                  <div className="text-xs text-destructive mt-0.5">
                                    - ₹{item.refundedAmount.toLocaleString()} refunded
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Courier Tracking (Physical only) */}
            {selectedOrder.orderType === "physical" && selectedOrder.trackingNumber && (
              <div className="mb-8 pb-8 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Courier Tracking</h3>
                  <button
                    onClick={() => {
                      setTrackingOrderForEdit(selectedOrder);
                      setShowTrackingModal(true);
                      setIsEditingTracking(true);
                      setCourier(selectedOrder.courier || "india-post");
                      setTrackingInput(selectedOrder.trackingNumber || "");
                      setTrackingError("");
                    }}
                    className="text-sm text-[var(--color-institutional-blue)] hover:underline font-medium"
                  >
                    Edit Tracking
                  </button>
                </div>
                <div className="space-y-5 bg-[var(--color-neutral-100)] p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Courier Service</span>
                    <span className="font-medium">{selectedOrder.courier === "india-post" ? "India Post" : "DHL"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tracking Number</span>
                    <span className="font-mono font-medium">{selectedOrder.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusConfig[selectedOrder.status].color}`}>
                      {statusConfig[selectedOrder.status].label}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Refund Details */}
            {selectedOrder.paymentStatus !== "failed" && selectedOrder.paymentStatus !== "pending" && (
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-4">Refund Details</h3>

                {/* Refund Summary */}
                <div className="bg-[var(--color-neutral-100)] p-5 rounded-lg mb-5">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Order Total</span>
                      <span className="font-semibold">₹{selectedOrder.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Refunded Amount</span>
                      <span className="font-semibold text-destructive">
                        {selectedOrder.refundedAmount ? `- ₹${selectedOrder.refundedAmount.toLocaleString()}` : "₹0"}
                      </span>
                    </div>
                    <div className="h-px bg-border"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Refundable Balance</span>
                      <span className="font-semibold text-lg text-[var(--color-success-green)]">
                        ₹{(selectedOrder.total - (selectedOrder.refundedAmount || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Refund History */}
                {selectedOrder.refundHistory && selectedOrder.refundHistory.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Refund History</h4>
                    <div className="space-y-5">
                      {selectedOrder.refundHistory.map((refund, idx) => (
                        <div key={idx} className="border border-border rounded-lg p-4 bg-card">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-semibold text-destructive">- ₹{refund.amount.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {refund.date} at {refund.time}
                              </div>
                            </div>
                            <span className="text-xs px-2 py-1 bg-[var(--color-neutral-200)] border border-[var(--color-neutral-300)] rounded">
                              Refunded
                            </span>
                          </div>
                          {refund.reason && (
                            <div className="text-sm text-muted-foreground mb-2">
                              <span className="font-medium">Reason:</span> {refund.reason}
                            </div>
                          )}
                          <div className="mt-3 pt-3 border-t border-border">
                            <div className="text-xs font-medium text-muted-foreground mb-2">Refunded Items:</div>
                            <div className="space-y-1">
                              {refund.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex justify-between text-sm">
                                  <span>{item.bookTitle} ({item.language}) × {item.quantity}</span>
                                  <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Refund Actions */}
                {selectedOrder.paymentStatus !== "refunded" && (selectedOrder.total - (selectedOrder.refundedAmount || 0)) > 0 && (
                  <div className="space-y-5">
                    <button
                      onClick={() => {
                        setRefundType("full");
                        setShowRefundModal(true);
                        setRefundReason("");
                      }}
                      className="w-full px-5 py-3 border-2 border-destructive text-destructive rounded-lg hover:bg-destructive/5 transition-all font-medium"
                    >
                      Refund Full Amount (₹{(selectedOrder.total - (selectedOrder.refundedAmount || 0)).toLocaleString()})
                    </button>
                    {selectedOrder.orderType === "physical" &&
                     selectedOrder.orderItems &&
                     selectedOrder.orderItems.filter(item => !item.refundedQuantity || item.refundedQuantity < item.quantity).length > 1 && (
                      <button
                        onClick={() => {
                          setRefundType("partial");
                          setShowRefundModal(true);
                          setSelectedRefundItems([]);
                          setRefundReason("");
                        }}
                        className="w-full px-5 py-3 border-2 border-amber-600 text-amber-700 rounded-lg hover:bg-amber-50 transition-all font-medium"
                      >
                        Apply Partial Refund
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full px-5 py-3 border border-border rounded-lg hover:bg-[var(--color-neutral-100)] transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      {trackingOrderForEdit && showTrackingModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.3px] text-[#191c1e]">Courier Tracking</h2>
              <button
                onClick={() => {
                  setShowTrackingModal(false);
                  setTrackingOrderForEdit(null);
                  setTrackingInput("");
                  setTrackingError("");
                }}
                className="text-muted-foreground hover:text-foreground text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleTrackingSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold">Courier Service</label>
                <select
                  value={courier}
                  onChange={(e) => {
                    setCourier(e.target.value as "india-post" | "dhl");
                    setTrackingInput("");
                    setTrackingError("");
                  }}
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all"
                >
                  <option value="india-post">India Post</option>
                  <option value="dhl">DHL</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">Tracking Number</label>
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => {
                    setTrackingInput(e.target.value);
                    setTrackingError("");
                  }}
                  placeholder={courier === "india-post" ? "e.g., RN123456789IN" : "e.g., 1234567890"}
                  className={`w-full px-4 py-3 bg-input-background rounded-lg border ${
                    trackingError ? "border-destructive" : "border-border"
                  } focus:outline-none focus:ring-2 ${
                    trackingError ? "focus:ring-destructive/30" : "focus:ring-[var(--color-institutional-blue)]/25"
                  } focus:border-[var(--color-institutional-blue)] transition-all`}
                />
                {trackingError && (
                  <p className="text-sm text-destructive mt-2">{trackingError}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {isEditingTracking
                    ? "Update tracking information for this order"
                    : 'Saving will update status to "Shipped" and notify customer'}
                </p>
              </div>

              <button
                type="submit"
                className="w-full px-5 py-3 bg-[var(--color-institutional-blue)] text-white rounded-lg hover:opacity-90 transition-all font-semibold"
              >
                {isEditingTracking ? "Update Tracking Details" : "Save Tracking & Ship Order"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {selectedOrder && showRefundModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.3px] text-[#191c1e]">{refundType === "full" ? "Refund Full Amount" : "Apply Partial Refund"}</h2>
              <button
                onClick={() => {
                  setShowRefundModal(false);
                  setSelectedRefundItems([]);
                  setRefundReason("");
                }}
                className="text-muted-foreground hover:text-foreground text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {refundType === "full" ? (
              <div className="space-y-6">
                <div className="p-5 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-amber-600 text-xl">⚠️</div>
                    <div className="flex-1">
                      <p className="font-semibold text-amber-900 mb-2">
                        Refund Confirmation Required
                      </p>
                      <p className="text-sm text-amber-800">
                        You are about to refund <strong>₹{(selectedOrder.total - (selectedOrder.refundedAmount || 0)).toLocaleString()}</strong> for order <strong>{selectedOrder.orderNumber}</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Refund Reason (Optional)</label>
                  <textarea
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="e.g., Customer request, Damaged shipment, Duplicate order..."
                    rows={3}
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all resize-none"
                  />
                </div>

                <div className="p-4 bg-[var(--color-neutral-100)] border border-border rounded-lg">
                  <p className="text-sm font-medium mb-2">This action will:</p>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-institutional-blue)] mt-0.5">•</span>
                      <span>Update payment status to <strong>"Refunded"</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-institutional-blue)] mt-0.5">•</span>
                      <span>Process refund of ₹{(selectedOrder.total - (selectedOrder.refundedAmount || 0)).toLocaleString()}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-institutional-blue)] mt-0.5">•</span>
                      <span>Send refund confirmation email to customer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-institutional-blue)] mt-0.5">•</span>
                      <span>Add entry to refund history</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setShowRefundModal(false);
                      setRefundReason("");
                    }}
                    className="flex-1 px-6 py-3 border-2 border-border rounded-lg hover:bg-[var(--color-neutral-100)] transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const updatedOrders = orders.map(o => {
                        if (o.id === selectedOrder.id) {
                          return {
                            ...o,
                            paymentStatus: "refunded" as const,
                            status: "refunded" as const,
                            refundedAmount: o.total,
                            refundHistory: [
                              ...(o.refundHistory || []),
                              {
                                date: new Date().toISOString().split('T')[0],
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                amount: o.total - (o.refundedAmount || 0),
                                reason: refundReason,
                                items: o.orderItems?.map(item => ({
                                  bookTitle: item.bookTitle,
                                  language: item.language,
                                  quantity: item.quantity,
                                  amount: item.price
                                })) || []
                              }
                            ]
                          };
                        }
                        return o;
                      });
                      setOrders(updatedOrders);
                      localStorage.setItem("amrita_orders", JSON.stringify(updatedOrders));

                      const freshOrder = updatedOrders.find(o => o.id === selectedOrder.id);
                      if (freshOrder) setSelectedOrder(freshOrder);

                      alert(`Full refund processed:\n\nOrder: ${selectedOrder.orderNumber}\nAmount: ₹${(selectedOrder.total - (selectedOrder.refundedAmount || 0)).toLocaleString()}\nReason: ${refundReason || 'Not specified'}\n\nCustomer has been notified.`);
                      setShowRefundModal(false);
                      setRefundReason("");
                    }}
                    className="flex-1 px-6 py-3 bg-destructive text-white rounded-lg hover:opacity-90 transition-all font-semibold"
                  >
                    Process Full Refund
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-[var(--color-institutional-blue)]/5 border border-[var(--color-institutional-blue)]/20 rounded-lg">
                  <p className="text-sm text-[var(--color-institutional-blue)]">
                    Select the items and quantities you want to refund. You can refund individual items or adjust quantities for partial refunds.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-3">Select Items to Refund</h3>
                  <div className="space-y-5 max-h-96 overflow-y-auto">
                    {selectedOrder.orderItems
                      ?.filter(item => !item.refundedQuantity || item.refundedQuantity < item.quantity)
                      .map((item, idx) => {
                        const actualIdx = selectedOrder.orderItems!.indexOf(item);
                        const selected = selectedRefundItems.find(ri => ri.index === actualIdx);
                        const availableQty = item.quantity - (item.refundedQuantity || 0);
                        const unitPrice = item.price / item.quantity;

                        return (
                          <div
                            key={actualIdx}
                            className={`p-5 border-2 rounded-lg transition-all ${
                              selected
                                ? "border-[var(--color-institutional-blue)] bg-[var(--color-institutional-blue)]/5"
                                : "border-border"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <input
                                type="checkbox"
                                checked={!!selected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedRefundItems([
                                      ...selectedRefundItems,
                                      { index: actualIdx, quantity: availableQty, amount: item.price - (item.refundedAmount || 0) }
                                    ]);
                                  } else {
                                    setSelectedRefundItems(selectedRefundItems.filter(ri => ri.index !== actualIdx));
                                  }
                                }}
                                className="mt-1.5"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <p className="font-semibold">{item.bookTitle}</p>
                                    <div className="flex gap-2 mt-1.5">
                                      <span className="text-xs px-2 py-1 bg-[var(--color-neutral-200)] border border-border rounded">
                                        {item.language}
                                      </span>
                                      <span className="text-xs px-2 py-1 bg-[var(--color-neutral-200)] border border-border rounded">
                                        Available: {availableQty} of {item.quantity}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Unit Price</p>
                                    <p className="font-semibold">₹{unitPrice.toLocaleString()}</p>
                                  </div>
                                </div>

                                {selected && (
                                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                                    <div>
                                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                        Refund Quantity
                                      </label>
                                      <input
                                        type="number"
                                        min="1"
                                        max={availableQty}
                                        value={selected.quantity}
                                        onChange={(e) => {
                                          const qty = Math.min(Math.max(1, parseInt(e.target.value) || 1), availableQty);
                                          setSelectedRefundItems(
                                            selectedRefundItems.map(ri =>
                                              ri.index === actualIdx
                                                ? { ...ri, quantity: qty, amount: qty * unitPrice }
                                                : ri
                                            )
                                          );
                                        }}
                                        className="w-full px-3 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 transition-all"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                        Refund Amount
                                      </label>
                                      <div className="px-3 py-2 bg-[var(--color-neutral-100)] rounded-lg border border-border font-semibold">
                                        ₹{selected.amount.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Refund Reason (Optional)</label>
                  <textarea
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="e.g., Damaged during shipping, Wrong item delivered..."
                    rows={2}
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] transition-all resize-none"
                  />
                </div>

                {selectedRefundItems.length > 0 && (
                  <div className="p-5 bg-amber-50 border border-amber-300 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-amber-900">Total Refund Amount</span>
                      <span className="font-bold text-xl text-amber-900">
                        ₹{selectedRefundItems.reduce((sum, ri) => sum + ri.amount, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-amber-800">
                      Refunding {selectedRefundItems.reduce((sum, ri) => sum + ri.quantity, 0)} item(s) from {selectedRefundItems.length} book(s)
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setShowRefundModal(false);
                      setSelectedRefundItems([]);
                      setRefundReason("");
                    }}
                    className="flex-1 px-6 py-3 border-2 border-border rounded-lg hover:bg-[var(--color-neutral-100)] transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={selectedRefundItems.length === 0}
                    onClick={() => {
                      const totalRefund = selectedRefundItems.reduce((sum, ri) => sum + ri.amount, 0);
                      const itemCount = selectedRefundItems.reduce((sum, ri) => sum + ri.quantity, 0);

                      const updatedOrders = orders.map(o => {
                        if (o.id === selectedOrder.id) {
                          const updatedItems = o.orderItems?.map((item, idx) => {
                            const refundItem = selectedRefundItems.find(ri => ri.index === idx);
                            if (refundItem) {
                              return {
                                ...item,
                                refundedQuantity: (item.refundedQuantity || 0) + refundItem.quantity,
                                refundedAmount: (item.refundedAmount || 0) + refundItem.amount
                              };
                            }
                            return item;
                          });
                          return {
                            ...o,
                            paymentStatus: "partially-refunded" as const,
                            refundedAmount: (o.refundedAmount || 0) + totalRefund,
                            orderItems: updatedItems,
                            refundHistory: [
                              ...(o.refundHistory || []),
                              {
                                date: new Date().toISOString().split('T')[0],
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                amount: totalRefund,
                                reason: refundReason,
                                items: selectedRefundItems.map(ri => {
                                  const item = o.orderItems![ri.index];
                                  return {
                                    bookTitle: item.bookTitle,
                                    language: item.language,
                                    quantity: ri.quantity,
                                    amount: ri.amount
                                  };
                                })
                              }
                            ]
                          };
                        }
                        return o;
                      });
                      setOrders(updatedOrders);
                      localStorage.setItem("amrita_orders", JSON.stringify(updatedOrders));

                      const freshOrder = updatedOrders.find(o => o.id === selectedOrder.id);
                      if (freshOrder) setSelectedOrder(freshOrder);

                      alert(`Partial refund processed:\n\nOrder: ${selectedOrder.orderNumber}\nAmount: ₹${totalRefund.toLocaleString()}\nItems: ${itemCount}\nReason: ${refundReason || 'Not specified'}\n\nPayment status updated to "Partially Refunded"\nCustomer has been notified.`);
                      setShowRefundModal(false);
                      setSelectedRefundItems([]);
                      setRefundReason("");
                    }}
                    className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:opacity-90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Process Partial Refund
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Create Manual Order Modal */}
      {showManualOrderModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-5 border-b border-border pb-3">
              <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.3px] text-[#191c1e]">Create Manual Order</h2>
              <button
                type="button"
                onClick={() => setShowManualOrderModal(false)}
                className="text-muted-foreground hover:text-foreground text-2xl leading-none cursor-pointer border-none bg-transparent"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleManualOrderSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-foreground">Customer Name</label>
                  <input
                    type="text"
                    value={manualOrderForm.customerName}
                    onChange={(e) => setManualOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="Enter customer name..."
                    className={`w-full px-3 py-2 bg-input-background rounded-lg border ${
                      formErrors.customerName ? "border-destructive focus:ring-destructive/25" : "border-border focus:ring-[var(--color-institutional-blue)]/25"
                    } focus:outline-none focus:ring-2 focus:border-[var(--color-institutional-blue)] text-sm transition-all`}
                  />
                  {formErrors.customerName && (
                    <p className="text-xs text-destructive mt-1">{formErrors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-foreground">Customer Email</label>
                  <input
                    type="email"
                    value={manualOrderForm.customerEmail}
                    onChange={(e) => setManualOrderForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                    placeholder="Enter customer email..."
                    className={`w-full px-3 py-2 bg-input-background rounded-lg border ${
                      formErrors.customerEmail ? "border-destructive focus:ring-destructive/25" : "border-border focus:ring-[var(--color-institutional-blue)]/25"
                    } focus:outline-none focus:ring-2 focus:border-[var(--color-institutional-blue)] text-sm transition-all`}
                  />
                  {formErrors.customerEmail && (
                    <p className="text-xs text-destructive mt-1">{formErrors.customerEmail}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-foreground">Order Type</label>
                  <select
                    value={manualOrderForm.orderType}
                    onChange={(e) => {
                      const newType = e.target.value as "physical" | "digital";
                      setManualOrderForm(prev => {
                        const nextItems = prev.items.map(item => {
                          if (!item.bookId) return item;
                          const book = manualCatalog.find(b => b.id === item.bookId);
                          const variant = book?.variants.find(v => v.language === item.language);
                          if (variant) {
                            const preferredFormat = variant.formats.includes(newType) 
                              ? newType 
                              : variant.formats[0];
                            return {
                              ...item,
                              format: preferredFormat,
                              price: variant.price[preferredFormat] || 0
                            };
                          }
                          return item;
                        });
                        return { ...prev, orderType: newType, items: nextItems };
                      });
                    }}
                    className="w-full px-3 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] text-sm transition-all"
                  >
                    <option value="physical">Physical Order</option>
                    <option value="digital">Digital Order</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-foreground">Payment Status</label>
                  <select
                    value={manualOrderForm.paymentStatus}
                    onChange={(e) => setManualOrderForm(prev => ({ ...prev, paymentStatus: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--color-institutional-blue)]/25 focus:border-[var(--color-institutional-blue)] text-sm transition-all"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 pt-2 border-t border-[#E2E8F0]">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-[#191c1e]">Ordered Items</h3>
                  <button
                    type="button"
                    onClick={handleAddManualItem}
                    className="flex items-center gap-1 text-xs text-[var(--color-saffron)] hover:text-[var(--color-saffron-dark)] font-semibold transition-all cursor-pointer border-none bg-transparent"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Item
                  </button>
                </div>
                {formErrors.items && (
                  <p className="text-xs text-destructive">{formErrors.items}</p>
                )}
                
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {manualOrderForm.items.map((item, index) => {
                    const selectedBook = manualCatalog.find(b => b.id === item.bookId);
                    const availableLanguages = selectedBook?.variants.map(v => v.language) || [];
                    const selectedVariant = selectedBook?.variants.find(v => v.language === item.language);
                    const availableFormats = selectedVariant?.formats || [];
                    const itemErr = itemsErrors[index] || {};

                    return (
                      <div key={index} className="flex flex-col gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg relative">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pr-8">
                          {/* Book select */}
                          <div className="md:col-span-4">
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Book</label>
                            <select
                              value={item.bookId}
                              onChange={(e) => handleItemFieldChange(index, "bookId", e.target.value)}
                              className={`w-full px-2 py-1.5 bg-white border ${itemErr.bookId ? "border-destructive" : "border-[#D1D5DC]"} rounded text-xs focus:outline-none`}
                            >
                              <option value="">Select Book...</option>
                              {manualCatalog.map(b => (
                                <option key={b.id} value={b.id}>{b.title}</option>
                              ))}
                            </select>
                          </div>

                          {/* Language select */}
                          <div className="md:col-span-3">
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Language</label>
                            <select
                              value={item.language}
                              onChange={(e) => handleItemFieldChange(index, "language", e.target.value)}
                              disabled={!item.bookId}
                              className={`w-full px-2 py-1.5 bg-white border ${itemErr.language ? "border-destructive" : "border-[#D1D5DC]"} rounded text-xs focus:outline-none`}
                            >
                              <option value="">Select...</option>
                              {availableLanguages.map(l => (
                                <option key={l} value={l}>{l}</option>
                              ))}
                            </select>
                          </div>

                          {/* Format select */}
                          <div className="md:col-span-3">
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Format</label>
                            <select
                              value={item.format}
                              onChange={(e) => handleItemFieldChange(index, "format", e.target.value)}
                              disabled={!item.language}
                              className={`w-full px-2 py-1.5 bg-white border ${itemErr.format ? "border-destructive" : "border-[#D1D5DC]"} rounded text-xs focus:outline-none`}
                            >
                              <option value="">Select...</option>
                              {availableFormats.map(f => (
                                <option key={f} value={f}>{f === "physical" ? "Physical" : "Digital"}</option>
                              ))}
                            </select>
                          </div>

                          {/* Qty input */}
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Qty</label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleItemFieldChange(index, "quantity", e.target.value)}
                              disabled={!item.format}
                              className="w-full px-2 py-1 bg-white border border-[#D1D5DC] rounded text-xs text-center focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Price display and calculations */}
                        {item.format && (
                          <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-[#E2E8F0] pt-2">
                            <span>Unit Price: ₹{item.price}</span>
                            <span className="font-semibold text-foreground">Subtotal: ₹{item.price * item.quantity}</span>
                          </div>
                        )}

                        {/* Remove item button */}
                        {manualOrderForm.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveManualItem(index)}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer border-none bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Invoice Upload Container */}
              <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                <label className="block text-xs font-semibold text-foreground">Upload Manual Invoice</label>
                <div
                  className="border-2 border-dashed border-[#D1D5DC] hover:border-[var(--color-institutional-blue)]/50 rounded-lg p-5 text-center bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-all cursor-pointer relative"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleInvoiceUpload}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                  {manualOrderForm.invoiceFile ? (
                    <div className="flex items-center justify-between bg-white border border-[#E2E8F0] p-3 rounded-lg" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-[var(--color-success-green)]/10 text-[var(--color-success-green)] rounded flex items-center justify-center flex-shrink-0">
                          <Check className="w-5 h-5" />
                        </div>
                        <div className="text-left min-w-0">
                          <p className="font-semibold text-sm truncate max-w-[280px]">{manualOrderForm.invoiceFile.name}</p>
                          <p className="text-xs text-muted-foreground">{(manualOrderForm.invoiceFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveInvoice}
                        className="p-1.5 hover:bg-red-50 text-red-500 rounded transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-2">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-semibold text-[#191c1e] mb-1">Click to upload or drag & drop invoice</p>
                      <p className="text-xs text-muted-foreground">PDF, PNG, or JPG up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order summary / Total display */}
              <div className="p-4 bg-slate-50 border border-border rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Estimated Total</p>
                  <p className="text-2xl font-bold text-[var(--color-institutional-blue)]">
                    ₹{manualOrderForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  {manualOrderForm.items.reduce((sum, item) => sum + (item.quantity ? item.quantity : 0), 0)} Item(s) Selected
                </div>
              </div>

              <div className="flex gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => setShowManualOrderModal(false)}
                  className="flex-1 px-6 py-2.5 border border-border rounded-lg hover:bg-[var(--color-neutral-100)] transition-all font-medium text-sm cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2.5 bg-[var(--color-saffron)] text-white rounded-lg hover:opacity-90 transition-all font-semibold text-sm cursor-pointer shadow-sm border-none"
                >
                  Create Manual Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Viewer Modal */}
      {invoicePreviewOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative overflow-y-auto max-h-[92vh]">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <h2 className="text-[20px] font-semibold text-[#191c1e]">Invoice Viewer</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 border border-[#002045] text-[#002045] rounded hover:bg-[#002045]/5 transition-colors text-xs font-semibold cursor-pointer bg-transparent"
                >
                  Print
                </button>
                <button
                  onClick={() => setInvoicePreviewOrder(null)}
                  className="text-muted-foreground hover:text-foreground text-2xl leading-none cursor-pointer border-none bg-transparent"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Premium Invoice Layout */}
            <div className="border border-border p-6 rounded-lg relative overflow-hidden bg-white shadow-sm print:border-none print:shadow-none">
              {/* PAID Watermark stamp */}
              <div className="absolute top-8 right-8 pointer-events-none select-none z-10">
                {invoicePreviewOrder.paymentStatus === "paid" && (
                  <div className="border-4 border-emerald-500/30 text-emerald-500/30 font-bold uppercase tracking-widest text-2xl px-4 py-2 rounded-lg transform rotate-12">
                    PAID
                  </div>
                )}
                {invoicePreviewOrder.paymentStatus === "pending" && (
                  <div className="border-4 border-amber-500/30 text-amber-500/30 font-bold uppercase tracking-widest text-2xl px-4 py-2 rounded-lg transform rotate-12">
                    PENDING
                  </div>
                )}
                {invoicePreviewOrder.paymentStatus === "failed" && (
                  <div className="border-4 border-rose-500/30 text-rose-500/30 font-bold uppercase tracking-widest text-2xl px-4 py-2 rounded-lg transform rotate-12">
                    FAILED
                  </div>
                )}
              </div>

              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8 text-left">
                <div>
                  <h1 className="text-xl font-bold text-[#002045] uppercase tracking-wider mb-1">Amrita Books</h1>
                  <p className="text-[11px] text-muted-foreground font-medium">Spiritual Literature &amp; Scriptural Wisdom</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Amritapuri, Kollam, Kerala, 690525</p>
                </div>
                <div className="text-right">
                  <h2 className="text-md font-bold text-slate-800 uppercase mb-1">Tax Invoice</h2>
                  <p className="text-xs font-semibold text-[#002045]">{invoicePreviewOrder.orderNumber}</p>
                </div>
              </div>

              {/* Custom Uploaded invoice notification */}
              {invoicePreviewOrder.invoiceFile && (
                <div className="mb-6 p-2 bg-emerald-50 border border-emerald-200 rounded text-center">
                  <p className="text-[10px] text-emerald-800 font-semibold">
                    📄 Original Custom Invoice Uploaded: <strong>{invoicePreviewOrder.invoiceFile.name}</strong>
                  </p>
                </div>
              )}

              {/* Invoice Details Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8 pb-6 border-b border-dashed border-border text-xs text-left">
                <div>
                  <p className="text-muted-foreground font-semibold uppercase mb-1.5">Billed To</p>
                  <p className="font-bold text-slate-800 text-sm mb-0.5">{invoicePreviewOrder.customer}</p>
                  <p className="text-muted-foreground">{invoicePreviewOrder.customerEmail}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground font-semibold uppercase mb-1.5">Invoice Details</p>
                  <p className="text-slate-800 mb-0.5"><span className="text-muted-foreground">Date:</span> {invoicePreviewOrder.createdAt} {invoicePreviewOrder.createdTime}</p>
                  <p className="text-slate-800"><span className="text-muted-foreground">Status:</span> {statusConfig[invoicePreviewOrder.status].label}</p>
                </div>
              </div>

              {/* Itemized Table */}
              <table className="w-full text-xs text-left mb-6">
                <thead>
                  <tr className="border-b border-border bg-slate-50 text-[10px] font-bold text-slate-600 uppercase">
                    <th className="py-2.5 px-3">Item Details</th>
                    <th className="py-2.5 px-3 text-center">Format</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 px-3 text-right text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoicePreviewOrder.orderItems?.map((item, idx) => {
                    const unitPrice = item.price / item.quantity;
                    return (
                      <tr key={idx} className="border-b border-border/50 text-slate-700">
                        <td className="py-3 px-3">
                          <p className="font-semibold text-slate-800">{item.bookTitle}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Language: {item.language}</p>
                        </td>
                        <td className="py-3 px-3 text-center capitalize">{item.format}</td>
                        <td className="py-3 px-3 text-center">{item.quantity}</td>
                        <td className="py-3 px-3 text-right">₹{unitPrice.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right font-semibold">₹{item.price.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Total Calculation Area */}
              <div className="flex justify-end text-xs">
                <div className="w-64 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal:</span>
                    <span>₹{invoicePreviewOrder.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping Charges:</span>
                    <span className="text-emerald-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-800 font-bold border-t border-border pt-2 text-sm">
                    <span>Grand Total:</span>
                    <span>₹{invoicePreviewOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Support note */}
              <div className="mt-8 pt-6 border-t border-border text-center text-[10px] text-muted-foreground">
                <p className="font-semibold text-[#002045] mb-1">Amrita Books Official Publications</p>
                <p>If you have any questions about this invoice, please contact support@amritabooks.org</p>
              </div>
            </div>

            <button
              onClick={() => setInvoicePreviewOrder(null)}
              className="mt-6 w-full px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg text-sm transition-colors cursor-pointer border-none"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* View Tracking Modal */}
      {activeTrackingOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[92vh] overflow-y-auto text-left">
            <button
              onClick={() => setActiveTrackingOrder(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl leading-none cursor-pointer border-none bg-transparent"
            >
              ×
            </button>

            <h2 className="text-[20px] font-semibold text-[#191c1e] mb-6 pb-3 border-b border-border">
              Shipment Tracking
            </h2>

            {/* Shipment Header Details */}
            <div className="mb-6 bg-slate-50 p-5 rounded-xl border border-border">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-[18px] font-bold leading-none text-[#191c1e]">{activeTrackingOrder.trackingNumber}</h3>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${
                  activeTrackingOrder.status === "delivered" 
                    ? "text-[var(--color-success-green-dark)] bg-[var(--color-success-green)]/10 border-[var(--color-success-green)]/20" 
                    : "text-[var(--color-dusty-blue-dark)] bg-[var(--color-dusty-blue)]/10 border-[var(--color-dusty-blue)]/20"
                }`}>
                  <Truck className="w-3.5 h-3.5" />
                  {activeTrackingOrder.status === "delivered" ? "Delivered" : activeTrackingOrder.status === "shipped" ? "Shipped" : "In Transit"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <p>Order ID: <span className="font-semibold text-slate-800">{activeTrackingOrder.orderNumber}</span></p>
                <p>Customer: <span className="font-semibold text-slate-800">{activeTrackingOrder.customer}</span></p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6 pl-2">
              {(() => {
                const timeline = getDynamicTimeline(activeTrackingOrder);
                const isDelivered = activeTrackingOrder.status === "delivered";
                const displayTimeline = [...timeline];
                if (!isDelivered) {
                  displayTimeline.push({
                    timestamp: "--:--",
                    location: "Destination Address",
                    status: "Delivered",
                    description: "Pending delivery at destination address",
                    isFuture: true
                  } as any);
                }

                return displayTimeline.map((event: any, index) => {
                  const isLatest = index === timeline.length - 1;
                  const isFuture = event.isFuture;
                  const isCompleted = !isLatest && !isFuture;
                  
                  // Icon picker
                  const getIcon = (status: string) => {
                    const s = status.toLowerCase();
                    if (s.includes("dispatch")) return Package;
                    if (s.includes("transit")) return Truck;
                    if (s.includes("out for delivery") || s.includes("delivery")) return MapPin;
                    if (s.includes("delivered")) return CheckCircle;
                    return MapPin;
                  };

                  const TimelineIcon = isFuture ? MapPin : getIcon(event.status);

                  return (
                    <div key={index} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="relative flex items-center justify-center">
                          {isLatest && (
                            <span className="absolute -inset-1.5 rounded-xl bg-[var(--color-saffron)]/30 animate-[ping_1.5s_infinite] -z-10"></span>
                          )}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                            isFuture
                              ? "bg-transparent border-dashed border-neutral-300 text-neutral-400"
                              : isLatest
                              ? "bg-[var(--color-saffron)] border-[var(--color-saffron)] text-white shadow-md scale-105 z-10"
                              : "bg-[var(--color-success-green)]/10 border-[var(--color-success-green)] text-[var(--color-success-green-dark)]"
                          }`}>
                            <TimelineIcon className={`w-4.5 h-4.5 ${isLatest ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
                          </div>
                        </div>
                        {index < displayTimeline.length - 1 && (
                          <div className={`w-0.5 h-16 mt-3 ${
                            isCompleted
                              ? "bg-[var(--color-institutional-blue)]"
                              : "border-l-2 border-dashed border-neutral-300"
                          }`}></div>
                        )}
                      </div>
                      <div className="flex-1 pb-2 text-left">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`font-semibold mb-0.5 ${
                              isFuture
                                ? "text-slate-400 font-normal"
                                : isLatest
                                ? "text-[var(--color-saffron-dark)] font-bold text-base"
                                : "text-foreground/90 font-semibold"
                            }`}>
                              {event.status}
                            </p>
                            <p className={`text-sm leading-relaxed mb-0.5 ${
                              isFuture ? "text-neutral-400" : "text-muted-foreground"
                            }`}>
                              {event.description}
                            </p>
                            <p className={`text-xs ${
                              isFuture ? "text-neutral-400/80" : "text-foreground/70 font-medium"
                            }`}>
                              {event.location}
                            </p>
                          </div>
                          <span className={`text-sm whitespace-nowrap ml-4 ${
                            isFuture ? "text-neutral-400/80" : "text-muted-foreground"
                          }`}>
                            {event.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            <button
              onClick={() => setActiveTrackingOrder(null)}
              className="mt-8 w-full px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm transition-colors cursor-pointer border-none font-semibold"
            >
              Close Tracking Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
