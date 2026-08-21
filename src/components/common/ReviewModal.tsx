import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTitle: string;
  targetType: 'STAY' | 'FOOD';
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  targetTitle,
  targetType,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableTags =
    targetType === 'STAY'
      ? ['✨ Super Clean', '🌊 Amazing View', '👑 Luxury Bedding', '🏊 Private Pool', '⚡ Fast Check-in', '👨‍💼 Helpful Host']
      : ['🔥 Authentic Flavour', '♨️ Served Steaming Hot', '⚡ Fast Delivery', '🥗 Fresh Ingredients', ' packaging Eco-Friendly'];

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success(`⭐ Thank you for rating ${targetTitle}!`);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center"
        >
          {isSubmitted ? (
            <div className="py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-black text-white font-heading">Review Submitted!</h3>
              <p className="text-xs text-slate-400 mt-1">Your feedback helps fellow travelers and guests discover authentic luxury.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  {targetType === 'STAY' ? '🏨 Guest Stay Review' : '🍲 Dining Feedback'}
                </span>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-xl font-black text-white font-heading mb-1">{targetTitle}</h3>
              <p className="text-xs text-slate-400 mb-6">How was your luxury experience?</p>

              {/* STAR RATING INTERACTIVE */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          active ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* TAGS SELECTOR */}
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                      selectedTags.includes(tag)
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* REVIEW COMMENT TEXTAREA */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  rows={3}
                  placeholder="Write a few words about hospitality, cleanliness, or food taste..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-200 outline-none focus:border-amber-500 resize-none"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
