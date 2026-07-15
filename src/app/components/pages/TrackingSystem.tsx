import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { MapPin, Truck, CheckCircle, XCircle, Clock, Package, ChevronDown, ChevronUp } from "lucide-react";

type TrackingStatus = {
  timestamp: string;
  location: string;
  status: string;
  description: string;
};

type Shipment = {
  trackingNumber: string;
  orderNumber: string;
  customer: string;
  currentStatus: "in-transit" | "delivered" | "rts" | "pending";
  timeline: TrackingStatus[];
};

const mockShipments: Shipment[] = [
  {
    trackingNumber: "RN123456789IN",
    orderNumber: "AMR-2845",
    customer: "Amit Patel",
    currentStatus: "in-transit",
    timeline: [
      { timestamp: "2026-04-06 10:30", location: "Mumbai", status: "Dispatched", description: "Item dispatched from origin" },
      { timestamp: "2026-04-06 18:45", location: "Pune Hub", status: "In Transit", description: "Arrived at sorting facility" },
      { timestamp: "2026-04-07 08:15", location: "Bangalore Hub", status: "In Transit", description: "Out for delivery" },
    ],
  },
  {
    trackingNumber: "RN987654321IN",
    orderNumber: "AMR-2844",
    customer: "Sneha Reddy",
    currentStatus: "delivered",
    timeline: [
      { timestamp: "2026-04-05 11:00", location: "Delhi", status: "Dispatched", description: "Item dispatched from origin" },
      { timestamp: "2026-04-05 20:30", location: "Hyderabad Hub", status: "In Transit", description: "Arrived at sorting facility" },
      { timestamp: "2026-04-06 09:45", location: "Hyderabad", status: "Out for Delivery", description: "Out for delivery" },
      { timestamp: "2026-04-06 14:20", location: "Hyderabad", status: "Delivered", description: "Successfully delivered" },
    ],
  },
];

const statusConfig = {
  "in-transit": { label: "In Transit", icon: Truck, color: "text-[var(--color-dusty-blue-dark)] bg-[var(--color-dusty-blue)]/10 border-[var(--color-dusty-blue)]/20" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-[var(--color-sage-green-dark)] bg-[var(--color-sage-green)]/10 border-[var(--color-sage-green)]/20" },
  rts: { label: "Return to Sender", icon: XCircle, color: "text-destructive bg-destructive/10 border-destructive/20" },
  pending: { label: "Pending", icon: Clock, color: "text-[var(--color-taupe-dark)] bg-[var(--color-taupe)]/10 border-[var(--color-taupe)]/20" },
};

const getTimelineIcon = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("dispatch")) return Package;
  if (s.includes("transit")) return Truck;
  if (s.includes("out for delivery") || s.includes("delivery")) return MapPin;
  if (s.includes("delivered")) return CheckCircle;
  return MapPin;
};

export function TrackingSystem() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeQuery, setActiveQuery] = useState(queryParam);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([mockShipments[0].trackingNumber]));

  const toggleExpanded = (id: string) =>
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // Synchronize active query with URL param when it changes
  useEffect(() => {
    setSearchQuery(queryParam);
    setActiveQuery(queryParam);
  }, [queryParam]);

  const handleTrackSubmit = () => {
    setActiveQuery(searchQuery);
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTrackSubmit();
    }
  };

  // Helper to dynamically build shipment timeline from an order
  const getDynamicShipment = (order: any): Shipment => {
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
    
    if (order.status === "delivered" || order.status === "completed") {
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

    return {
      trackingNumber: order.trackingNumber || "",
      orderNumber: order.orderNumber,
      customer: order.customer,
      currentStatus: (order.status === "delivered" || order.status === "completed") ? "delivered" : "in-transit",
      timeline
    };
  };

  const [ordersList, setOrdersList] = useState<any[]>(() => {
    const saved = localStorage.getItem("amrita_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [shipmentsState, setShipmentsState] = useState<Shipment[]>([]);

  useEffect(() => {
    const combined = [...mockShipments];
    ordersList.forEach((order: any) => {
      if (order.trackingNumber && !combined.some(s => s.trackingNumber === order.trackingNumber)) {
        combined.push(getDynamicShipment(order));
      }
    });
    setShipmentsState(combined);
  }, [ordersList]);

  const handleMarkAsDelivered = (trackingNumber: string) => {
    const saved = localStorage.getItem("amrita_orders");
    let currentOrders = saved ? JSON.parse(saved) : [];
    let parentOrder = currentOrders.find((o: any) => o.trackingNumber === trackingNumber);

    if (parentOrder) {
      const updatedOrders = currentOrders.map((o: any) => {
        if (o.trackingNumber === trackingNumber) {
          return { ...o, status: "completed" }; // Auto-toggle status to Completed
        }
        return o;
      });
      localStorage.setItem("amrita_orders", JSON.stringify(updatedOrders));
      setOrdersList(updatedOrders);
      alert(`Consignment ${trackingNumber} has been successfully delivered!\n\nParent order ${parentOrder.orderNumber} status auto-toggled to "Completed".`);
    } else {
      setShipmentsState(prev => prev.map(s => {
        if (s.trackingNumber === trackingNumber) {
          const updatedTimeline = [...s.timeline];
          if (!updatedTimeline.some(t => t.status === "Delivered")) {
            updatedTimeline.push({
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              location: "Destination Address",
              status: "Delivered",
              description: "Successfully delivered"
            });
          }
          return {
            ...s,
            currentStatus: "delivered",
            timeline: updatedTimeline
          };
        }
        return s;
      }));
      alert(`Consignment ${trackingNumber} status updated to Delivered!`);
    }
  };

  // Filter based on active search query
  const displayedShipments = activeQuery
    ? shipmentsState.filter(s =>
        s.trackingNumber.toLowerCase() === activeQuery.trim().toLowerCase() ||
        s.orderNumber.toLowerCase() === activeQuery.trim().toLowerCase()
      )
    : shipmentsState;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Tracking System</h1>
        <p className="text-sm text-[#43474e] font-normal leading-5">Monitor shipment status via India Post & DTDC APIs</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter tracking number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-4 pr-4 py-2.5 text-sm text-[#191c1e] placeholder:text-[#94A3B8] bg-white rounded-full border border-[#D1D5DC] focus:outline-none focus:border-[#002045]/30 focus:ring-2 focus:ring-[#002045]/10 transition-all duration-200"
            />
          </div>
          <button
            onClick={handleTrackSubmit}
            className="px-6 py-3 bg-[var(--color-saffron)] text-white rounded-xl hover:bg-[var(--color-saffron-dark)] hover:shadow-md transition-all font-medium"
          >
            Track
          </button>
        </div>
      </div>

      <div className="grid gap-5">
        {displayedShipments.length > 0 ? (
          displayedShipments.map((shipment) => {
            const config = statusConfig[shipment.currentStatus];
            const StatusIcon = config.icon;
            const isExpanded = expandedIds.has(shipment.trackingNumber);
            const latestEvent = shipment.timeline[shipment.timeline.length - 1];

            return (
              <div key={shipment.trackingNumber} className="bg-card border border-border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
                {/* Clickable header — always visible */}
                <button
                  onClick={() => toggleExpanded(shipment.trackingNumber)}
                  className="w-full text-left bg-[#F8FAFC] px-8 py-5 border-b border-border hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">{shipment.trackingNumber}</h3>
                        <span className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-sm font-medium ${config.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {config.label}
                        </span>
                        {shipment.currentStatus === "delivered" && (
                          <span className="px-3 py-1 bg-[var(--color-sage-green)]/10 text-[var(--color-sage-green-dark)] border border-[var(--color-sage-green)]/20 rounded-lg text-xs font-medium">
                            Auto-marked Complete
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                        <span>Order: <span className="text-foreground font-medium">{shipment.orderNumber}</span></span>
                        <span>Customer: <span className="text-foreground font-medium">{shipment.customer}</span></span>
                        {!isExpanded && (
                          <>
                            <span>Last update: <span className="text-foreground font-medium">{latestEvent.status}</span> · {latestEvent.location}</span>
                            <span className="text-muted-foreground">{latestEvent.timestamp}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 text-muted-foreground">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {/* Expandable timeline */}
                {isExpanded && (
                <div className="p-8">
                  {shipment.currentStatus !== "delivered" && (
                    <div className="mb-6 p-4 bg-[var(--color-dawn-mid)]/30 border border-[var(--color-institutional-blue)]/20 rounded-xl flex items-center justify-between">
                      <div className="text-sm text-foreground/85">
                        <strong>Simulate Courier Milestone API:</strong> Manually trigger delivery update to test parent order completion.
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsDelivered(shipment.trackingNumber);
                        }}
                        className="px-4 py-2 bg-[var(--color-saffron)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--color-saffron-dark)] transition-all cursor-pointer border-none"
                      >
                        Simulate Delivery (Delivered)
                      </button>
                    </div>
                  )}
                  <div className="space-y-6">
                    {(() => {
                      const isDelivered = shipment.currentStatus === "delivered";
                      const displayTimeline = [...shipment.timeline];
                      if (!isDelivered) {
                        displayTimeline.push({
                          timestamp: "--:--",
                          location: "Destination",
                          status: "Delivered",
                          description: "Pending delivery at destination address",
                          isFuture: true
                        } as any);
                      }

                      return displayTimeline.map((event: any, index) => {
                        const TimelineIcon = event.isFuture ? MapPin : getTimelineIcon(event.status);
                        const isLatest = index === shipment.timeline.length - 1;
                        const isFuture = event.isFuture;
                        const isCompleted = !isLatest && !isFuture;

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
                            <div className="flex-1 pb-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className={`font-semibold mb-1 ${
                                    isFuture
                                      ? "text-neutral-400 font-normal"
                                      : isLatest
                                      ? "text-[var(--color-saffron-dark)] font-bold text-base"
                                      : "text-foreground/90 font-semibold"
                                  }`}>
                                    {event.status}
                                  </p>
                                  <p className={`text-sm leading-relaxed mb-1 ${
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
                </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-card border border-border rounded-xl p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-60" />
            <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-1">No Tracking Info Found</h3>
            <p className="text-sm text-muted-foreground">
              We couldn't find any shipping records for tracking number or order ID "{activeQuery}".
            </p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-card to-[var(--color-dawn-mid)] border border-[var(--color-saffron)]/20 rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-4">System Automation</h3>
        <div className="space-y-5 text-sm text-foreground/70 leading-relaxed">
          <p>• Tracking data syncs via India Post and DTDC Express APIs with cached updates</p>
          <p>• Courier statuses automatically map to internal order statuses</p>
          <p>• Delivered shipments auto-mark parent orders as "Completed"</p>
          <p>• RTS (Return to Sender) shipments flagged as high priority</p>
        </div>
      </div>
    </div>
  );
}
