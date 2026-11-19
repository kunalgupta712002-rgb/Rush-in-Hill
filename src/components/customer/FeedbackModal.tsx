import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, X, Check, Heart, ThumbsUp, Sparkles, MessageSquare } from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const {
    isFeedbackModalOpen,
    feedbackTargetOrderId,
    closeFeedbackModal,
    submitFeedback,
    orders,
  } = useApp();

  const targetOrder = orders.find((o) => o.id === feedbackTargetOrderId);

  const [overallRating, setOverallRating] = useState<number>(5);
  const [tasteRating, setTasteRating] = useState<number>(5);
  const [hygieneRating, setHygieneRating] = useState<number>(5);
  const [serviceRating, setServiceRating] = useState<number>(4);
  const [valueRating, setValueRating] = useState<number>(5);
  const [wouldRecommend, setWouldRecommend] = useState<'Yes' | 'Maybe' | 'No'>('Yes');
  const [comment, setComment] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>(targetOrder?.customerName || 'Aman Sharma');

  if (!isFeedbackModalOpen || !feedbackTargetOrderId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({
      orderId: feedbackTargetOrderId,
      customerName: customerName.trim() || 'Anonymous Student',
      overallRating,
      tasteRating,
      hygieneRating,
      serviceRating,
      valueRating,
      comment: comment.trim() || 'Food was delicious and quick!',
      wouldRecommend,
    });
  };

  const StarSelector = ({
    value,
    onChange,
    label,
  }: {
    value: number;
    onChange: (val: number) => void;
    label: string;
  }) => (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-xs font-semibold text-slate-700">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-125 transition-transform"
          >
            <Star
              className={`w-4 h-4 ${
                star <= value
                  ? 'fill-amber-400 text-amber-500'
                  : 'text-slate-300'
              }`}
            />
          </button>
        ))}
        <span className="text-xs font-bold text-slate-500 w-4 text-right ml-1">
          {value}
        </span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeFeedbackModal}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="w-full max-w-lg bg-white rounded-3xl text-left shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded">
                Order #{feedbackTargetOrderId}
              </span>
              <h3 className="text-lg font-extrabold mt-1">Rate Your Meal Experience</h3>
              <p className="text-xs text-amber-200">
                Your direct review helps improve food quality and campus service
              </p>
            </div>
            <button
              onClick={closeFeedbackModal}
              className="p-1.5 rounded-xl text-amber-200 hover:text-white hover:bg-amber-700/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Overall Rating Prominent */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 text-center">
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-2">
                Overall Rating
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setOverallRating(star)}
                    className="p-1.5 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= overallRating
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs font-bold text-amber-900 mt-2">
                {overallRating === 5
                  ? 'Excellent! Love it ★★★★★'
                  : overallRating === 4
                  ? 'Very Good ★★★★☆'
                  : overallRating === 3
                  ? 'Average ★★★☆☆'
                  : overallRating === 2
                  ? 'Needs Improvement ★★☆☆☆'
                  : 'Poor ★☆☆☆☆'}
              </p>
            </div>

            {/* Granular Ratings */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Detailed Criteria</h4>
              <StarSelector
                label="Taste & Flavour"
                value={tasteRating}
                onChange={setTasteRating}
              />
              <StarSelector
                label="Cleanliness & Hygiene"
                value={hygieneRating}
                onChange={setHygieneRating}
              />
              <StarSelector
                label="Speed of Service"
                value={serviceRating}
                onChange={setServiceRating}
              />
              <StarSelector
                label="Value for Money"
                value={valueRating}
                onChange={setValueRating}
              />
            </div>

            {/* Recommend Question */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Would you recommend Rush in Hill to friends & classmates? *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Yes', 'Maybe', 'No'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setWouldRecommend(opt)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      wouldRecommend === opt
                        ? opt === 'Yes'
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : opt === 'Maybe'
                          ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                          : 'bg-rose-600 text-white border-rose-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt === 'Yes' ? '👍 Yes' : opt === 'Maybe' ? '🤔 Maybe' : '👎 No'}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tell us about your experience
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Was the food fresh? What did you like best? Any suggestions for our kitchen?"
                rows={3}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            {/* Submitter Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white py-3 rounded-xl font-extrabold text-xs shadow-md transition active:scale-98"
              >
                <span>Submit Verified Feedback</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
