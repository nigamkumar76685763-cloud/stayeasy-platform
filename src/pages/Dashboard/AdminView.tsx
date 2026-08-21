import React from 'react';
import { Payment } from '../../types';

interface AdminViewProps {
  payments: Payment[];
  formatPrice: (amt: number) => string;
}

export const AdminView: React.FC<AdminViewProps> = ({ payments, formatPrice }) => {
  return (
    <div className="space-y-8">
      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Total Platform Volume</span>
          <div className="text-2xl font-black text-purple-400 font-heading">{formatPrice(842500)}</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">Live Escrow & Cash</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Verified Users</span>
          <div className="text-2xl font-black text-white font-heading">2,840 Active</div>
          <span className="text-[10px] text-indigo-400 mt-1 block">Aadhaar + Phone OTP</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Cash Handshakes Checked</span>
          <div className="text-2xl font-black text-amber-400 font-heading">1,420</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">99.8% Match Rate</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Active Disputes</span>
          <div className="text-2xl font-black text-rose-400 font-heading">0 Zero Disputes</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">All clear</span>
        </div>
      </div>

      {/* AUDIT LEDGER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <h3 className="text-xl font-black text-white font-heading mb-4">
          StayEasy Global Transaction & Anti-Scam Ledger
        </h3>
        <div className="space-y-3">
          {payments.map((p) => (
            <div
              key={p.id}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-mono text-indigo-400 font-bold">{p.billId}</span>
                <span className="text-slate-300 ml-2">{p.itemTitle}</span>
                <span className="text-slate-500 block">
                  {p.dateTime} • Paid by {p.paidBy} to {p.paidTo}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-black text-white font-heading">{formatPrice(p.amount)}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
