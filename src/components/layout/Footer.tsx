import React from 'react';
import { Link } from 'react-router-dom';
import { useService } from '../../context/ServiceContext';
import { ShieldCheck, Zap, Headphones, Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { service } = useService();
  const isRoom = service === 'ROOM';

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP TRUST BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-900 mb-12">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              isRoom ? 'bg-indigo-950/80 text-indigo-400' : 'bg-red-950/80 text-orange-400'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Anti-Scam Verified</h4>
              <p className="text-xs text-slate-500">100% Cash denomination match</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              isRoom ? 'bg-indigo-950/80 text-indigo-400' : 'bg-red-950/80 text-orange-400'
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Instant Confirmation</h4>
              <p className="text-xs text-slate-500">Digital keys & live meal ETA</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              isRoom ? 'bg-indigo-950/80 text-indigo-400' : 'bg-red-950/80 text-orange-400'
            }`}>
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 Butler & Chat</h4>
              <p className="text-xs text-slate-500">Live bilingual assistance</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              isRoom ? 'bg-indigo-950/80 text-indigo-400' : 'bg-red-950/80 text-orange-400'
            }`}>
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Best Rate Guarantee</h4>
              <p className="text-xs text-slate-500">Luxury stays & culinary treats</p>
            </div>
          </div>
        </div>

        {/* 4 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl theme-room-gradient flex items-center justify-center text-sm font-bold text-white">
                🏨
              </div>
              <span className="text-xl font-black font-heading text-white">StayEasy</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
              StayEasy is the world's first unified platform combining five-star luxury suites, private villas, and Michelin-inspired in-room and express gourmet food delivery.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>📍 Global HQ: Dubai & Mumbai</span>
              <span>•</span>
              <span>🔒 256-Bit SSL Encrypted</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">Luxury Stays</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/rooms" className="hover:text-white transition-colors">Presidential Suites</Link></li>
              <li><Link to="/rooms" className="hover:text-white transition-colors">Beachfront Villas</Link></li>
              <li><Link to="/rooms" className="hover:text-white transition-colors">Skyline Penthouses</Link></li>
              <li><Link to="/rooms" className="hover:text-white transition-colors">Lake View Haveli</Link></li>
              <li><Link to="/rooms" className="hover:text-white transition-colors">Executive Tech Studios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">Gourmet Food</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/food" className="hover:text-white transition-colors">Awadhi Dum Biryani</Link></li>
              <li><Link to="/food" className="hover:text-white transition-colors">Truffle Smash Burgers</Link></li>
              <li><Link to="/food" className="hover:text-white transition-colors">Himalayan Darjeeling Momos</Link></li>
              <li><Link to="/food" className="hover:text-white transition-colors">Royal Rajasthani Thali</Link></li>
              <li><Link to="/food" className="hover:text-white transition-colors">Artisan Beverages & Desserts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">Portals & Roles</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Guest Travel Desk</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Host Property Manager</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Restaurant Kitchen Portal</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Cash Handshake Verifier</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">24/7 Dispute Resolution</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 StayEasy Hospitality Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for luxury travel & food lovers worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
