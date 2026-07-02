import React from "react";
import logo from "../../imports/image.png";
import { X, Printer, Download } from "lucide-react";

type InvoiceItem = {
  bookTitle: string;
  language: string;
  format: "digital" | "physical" | "subscription";
  quantity: number;
  price: number;
};

type InvoiceOrder = {
  id: string;
  orderNumber: string;
  customer: string;
  customerEmail: string;
  createdAt: string;
  total: number;
  orderType: "physical" | "digital" | "subscription";
  invoiceNumber?: string;
  orderItems?: InvoiceItem[];
};

type InvoiceModalProps = {
  order: InvoiceOrder;
  onClose: () => void;
};

export function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  // Back-calculate values so Subtotal + GST + Shipping === Total
  const shipping = order.orderType === "physical" ? 100 : 0;
  const preTaxAndShipping = order.total - shipping;
  const subtotal = Math.round((preTaxAndShipping / 1.18) * 100) / 100;
  const gst = Math.round((preTaxAndShipping - subtotal) * 100) / 100;

  const invoiceNum = order.invoiceNumber || `INV-${order.orderNumber}`;
  const gstNumber = "29AMBMA9876F1Z2";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
      {/* Printable Invoice Container */}
      <div className="bg-white text-slate-800 rounded-xl w-full max-w-2xl flex flex-col shadow-2xl max-h-[90vh]">
        
        {/* Modal Controls (Not Printed) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0 print:hidden bg-slate-50 rounded-t-xl">
          <span className="text-sm font-bold text-[#002045]">Invoice Preview</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold rounded-lg text-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer border-none bg-transparent"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Page Body */}
        <div 
          id="printable-invoice" 
          className="flex-1 overflow-y-auto p-8 space-y-6 bg-white print:p-0 print:overflow-visible"
        >
          {/* Logo & Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Amrita Books Logo" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-lg font-bold text-[#002045] uppercase tracking-wide">Amrita Books</h1>
                <p className="text-[10px] text-slate-400 leading-tight">Mata Amritanandamayi Math<br/>Amritapuri, Kollam, Kerala - 690525</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-extrabold text-[#002045] tracking-tight uppercase">Invoice</h2>
              <div className="text-xs space-y-0.5 mt-2">
                <p><span className="text-slate-400">Invoice #:</span> <span className="font-semibold">{invoiceNum}</span></p>
                <p><span className="text-slate-400">GSTIN:</span> <span className="font-mono font-semibold">{gstNumber}</span></p>
                <p><span className="text-slate-400">Date:</span> <span className="font-semibold">{order.createdAt}</span></p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Billing Info */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider mb-1.5">Billed To</p>
              <p className="font-bold text-[#1E293B] text-sm">{order.customer}</p>
              <p className="text-slate-500 mt-0.5">{order.customerEmail}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 font-bold uppercase tracking-wider mb-1.5">Payment Details</p>
              <p className="font-semibold text-slate-700">Razorpay Online Payment</p>
              <p className="text-slate-400 mt-0.5">Order Ref: {order.orderNumber}</p>
            </div>
          </div>

          {/* Division table */}
          <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                  <th className="text-left p-3 font-semibold uppercase tracking-wider">Item Details</th>
                  <th className="text-center p-3 font-semibold uppercase tracking-wider">Format</th>
                  <th className="text-right p-3 font-semibold uppercase tracking-wider">Qty</th>
                  <th className="text-right p-3 font-semibold uppercase tracking-wider">Unit Price</th>
                  <th className="text-right p-3 font-semibold uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold text-slate-800">
                        {item.bookTitle} <span className="text-[10px] text-slate-400">({item.language})</span>
                      </td>
                      <td className="p-3 text-center capitalize text-slate-600">{item.format}</td>
                      <td className="p-3 text-center text-slate-600">{item.quantity}</td>
                      <td className="p-3 text-right text-slate-600">₹{item.price.toLocaleString()}</td>
                      <td className="p-3 text-right font-semibold text-slate-800">₹{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-3 font-semibold text-slate-800">
                      {order.orderType === "subscription" ? "Amrita Books Reading Subscription" : "General Bookstore Order"}
                    </td>
                    <td className="p-3 text-center capitalize text-slate-600">{order.orderType}</td>
                    <td className="p-3 text-center text-slate-600">1</td>
                    <td className="p-3 text-right text-slate-600">₹{preTaxAndShipping.toLocaleString()}</td>
                    <td className="p-3 text-right font-semibold text-slate-800">₹{preTaxAndShipping.toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals Section */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal (Excl. Tax)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping Fees</span>
                <span>₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#002045] pt-2 border-t border-slate-100">
                <span>Total Amount</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-6 text-[10px] text-slate-400 border-t border-slate-50">
            <p>Thank you for supporting spiritual publications. This is a computer generated tax invoice.</p>
            <p className="mt-1">For support, email: billing@amritabooks.com</p>
          </div>
        </div>
      </div>

      {/* Global CSS injected specifically for browser print functionality */}
      <style>{`
        @media print {
          body > * {
            display: none !important;
          }
          #printable-invoice {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            background: white !important;
            color: black !important;
            font-size: 12px;
          }
          .fixed {
            position: absolute !important;
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}
