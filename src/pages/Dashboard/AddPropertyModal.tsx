import React, { useState } from 'react';
import { Listing } from '../../types';
import toast from 'react-hot-toast';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (property: Omit<Listing, 'id' | 'createdAt'>) => void;
  userName?: string;
  userId?: string;
  userAvatar?: string;
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
  onAddProperty,
  userName = 'Vikramaditya Oberoi',
  userId = 'host_01',
  userAvatar = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
}) => {
  const [propTitle, setPropTitle] = useState('');
  const [propCategory, setPropCategory] = useState<'suite' | 'villa' | 'penthouse' | 'deluxe' | 'studio'>('suite');
  const [propCity, setPropCity] = useState('Goa');
  const [propState, setPropState] = useState('Goa');
  const [propAddress, setPropAddress] = useState('');
  const [propLandmark, setPropLandmark] = useState('');
  const [propPinCode, setPropPinCode] = useState('403515');
  const [propPrice, setPropPrice] = useState<number>(6500);
  const [propGuests, setPropGuests] = useState<number>(4);
  const [propBedrooms, setPropBedrooms] = useState<number>(2);
  const [propBathrooms, setPropBathrooms] = useState<number>(2);
  const [propSqFt, setPropSqFt] = useState<number>(1450);
  const [propImage, setPropImage] = useState('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80');
  const [propDescription, setPropDescription] = useState('');
  const [propAmenities] = useState<string[]>([
    'Ocean View',
    'Private Plunge Pool',
    'High-Speed Wi-Fi',
    'Complimentary Breakfast',
    '24/7 Butler Support',
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propTitle || !propAddress || !propPrice) {
      toast.error('Please fill Title, Address, and Price');
      return;
    }

    onAddProperty({
      title: propTitle,
      category: propCategory,
      city: propCity,
      state: propState,
      address: propAddress,
      landmark: propLandmark || `${propCity} Center`,
      pinCode: propPinCode,
      pricePerNight: Number(propPrice),
      maxGuests: Number(propGuests),
      bedrooms: Number(propBedrooms),
      bathrooms: Number(propBathrooms),
      sizeSqFt: Number(propSqFt),
      images: [propImage],
      amenities: propAmenities,
      keyFeatures: propAmenities.slice(0, 4),
      description:
        propDescription || `Luxurious ${propCategory} located in the heart of ${propCity} with world-class hospitality.`,
      hostId: userId,
      hostName: userName,
      hostAvatar: userAvatar,
      hostRating: 4.98,
      foodAvailable: true,
      latitude: propCity === 'Goa' ? 15.5173 : propCity === 'Mumbai' ? 19.0166 : 26.9124,
      longitude: propCity === 'Goa' ? 73.7628 : propCity === 'Mumbai' ? 72.8166 : 75.7873,
      distanceKm: 0.8,
      rating: 5.0,
      totalReviews: 1,
      isActive: true,
    });

    onClose();
    setPropTitle('');
    setPropAddress('');
    setPropDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl" />

      <div className="relative w-full max-w-2xl bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 block">
              Host Direct Inventory
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading">List New Flat or Luxury Stay 🏡</h3>
            <p className="text-xs text-slate-400">
              Your property will be live instantly across India for verified guest reservations.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Flat / Property Title</label>
            <input
              type="text"
              placeholder="e.g. Royal 3BHK Oceanfront Flat, Candolim"
              value={propTitle}
              onChange={(e) => setPropTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* CATEGORY & PRICE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Category / Type</label>
              <select
                value={propCategory}
                onChange={(e) => setPropCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-indigo-500"
              >
                <option value="suite">👑 Luxury Suite / Flat</option>
                <option value="villa">🏖️ Private Villa</option>
                <option value="penthouse">🏙️ Skyline Penthouse</option>
                <option value="deluxe">✨ Deluxe Room</option>
                <option value="studio">🏡 Studio Apartment</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Price Per Night (₹ INR)</label>
              <input
                type="number"
                value={propPrice}
                onChange={(e) => setPropPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-bold text-amber-400 font-mono outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* CITY, STATE & PIN */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">City</label>
              <select
                value={propCity}
                onChange={(e) => {
                  const val = e.target.value;
                  setPropCity(val);
                  if (val === 'Goa') setPropState('Goa');
                  if (val === 'Mumbai') setPropState('Maharashtra');
                  if (val === 'Jaipur') setPropState('Rajasthan');
                  if (val === 'Bangalore') setPropState('Karnataka');
                  if (val === 'Delhi') setPropState('Delhi NCR');
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-indigo-500"
              >
                <option value="Goa">Goa</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Delhi">Delhi NCR</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">State</label>
              <input
                type="text"
                value={propState}
                onChange={(e) => setPropState(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">PIN Code</label>
              <input
                type="text"
                value={propPinCode}
                onChange={(e) => setPropPinCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none"
              />
            </div>
          </div>

          {/* ADDRESS & LANDMARK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Full Street Address</label>
              <input
                type="text"
                placeholder="e.g. 402, Ocean Breeze Residency, Candolim Beach Rd"
                value={propAddress}
                onChange={(e) => setPropAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Nearby Landmark</label>
              <input
                type="text"
                placeholder="e.g. Near Candolim Lighthouse"
                value={propLandmark}
                onChange={(e) => setPropLandmark(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* CAPACITY SPECS */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">👥 Guests</label>
              <input
                type="number"
                value={propGuests}
                onChange={(e) => setPropGuests(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-bold text-white outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">🛏️ Beds</label>
              <input
                type="number"
                value={propBedrooms}
                onChange={(e) => setPropBedrooms(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-bold text-white outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">🚿 Baths</label>
              <input
                type="number"
                value={propBathrooms}
                onChange={(e) => setPropBathrooms(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-bold text-white outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">📐 Area (SqFt)</label>
              <input
                type="number"
                value={propSqFt}
                onChange={(e) => setPropSqFt(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-bold text-white outline-none"
              />
            </div>
          </div>

          {/* IMAGE PHOTO PRESETS */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
              Property Cover Image (Choose Preset or Enter URL)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
              {[
                {
                  label: '🏖️ Ocean Villa',
                  url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
                },
                {
                  label: '🏙️ Penthouse',
                  url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
                },
                {
                  label: '🏰 Royal Haveli',
                  url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                },
                {
                  label: '🌿 Forest Retreat',
                  url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
                },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setPropImage(preset.url)}
                  className={`p-2 rounded-xl text-[10px] font-bold border transition-all ${
                    propImage === preset.url
                      ? 'bg-indigo-950 border-indigo-500 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Custom image URL (https://...)"
              value={propImage}
              onChange={(e) => setPropImage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-300 outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Description & Key Highlights</label>
            <textarea
              rows={2}
              placeholder="Spacious luxury flat with panoramic ocean views, designer kitchen, private balcony..."
              value={propDescription}
              onChange={(e) => setPropDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white font-black text-xs shadow-xl shadow-indigo-500/30"
            >
              Publish Flat Live on StayEasy 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
