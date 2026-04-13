import { useEffect, useState } from "react";

const getStatus = (remaining) => {
  if (remaining <= 0) return "unavailable";
  return "available";
};

export default function DonationModal({
  donationId, 
  title,
  contactInfo,
  initialQuantity,
  description,
  image,
  onClose,
  onClaim,
}) {
  
  const [qty, setQty] = useState(initialQuantity > 0 ? 1 : 0);
  const [note, setNote] = useState("");

  useEffect(() => {
    // Reset quantity to 1 whenever a new item is selected
    setQty(initialQuantity > 0 ? 1 : 0);
    setNote("");
  }, [donationId, initialQuantity]);

  const status = getStatus(initialQuantity);

  const handleClaim = () => {
    if (status === "unavailable" || qty <= 0) return;
    
    // Send to Marketplace -> CharityPage -> API
    onClaim?.({ 
      donationId, 
      quantity: Number(qty), 
      note 
    });
  };

  const statusConfig = {
    available: { label: "available", style: "text-emerald-500" },
    unavailable: { label: "unavailable", style: "text-red-500" },
  };

  const { label, style } = statusConfig[status];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-xl animate-in fade-in zoom-in duration-200">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none transition-colors"
        >
          ✕
        </button>

        <div className="flex gap-5 mb-5">
          <div className="w-32 min-w-[8rem] h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-300 text-xs uppercase font-bold tracking-wider">No image</span>
            )}
          </div>

          <div className="flex flex-col justify-center gap-1">
            <h2 className="text-2xl font-semibold text-gray-800 leading-tight">{title}</h2>
            <p className="text-sm text-gray-500">
              contact: <span className="text-gray-700 font-medium">{contactInfo}</span>
            </p>
            <p className="text-sm text-gray-500">
              remaining: <span className="text-gray-700 font-medium">{initialQuantity}</span>
            </p>
            <p className="text-sm text-gray-500">
              status: <span className={`font-semibold ${style}`}>{label}</span>
            </p>
          </div>
        </div>

        <hr className="border-gray-100 mb-4" />

        <div className="mb-5">
          <p className="text-sm font-semibold text-gray-800 mb-1 italic">Description</p>
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
            {description}
          </p>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-800 mb-2 italic">Note for the donor</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full min-h-[80px] rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
            placeholder="Explain why your organization needs this donation..."
          />
        </div>

        {status === "unavailable" && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-600 font-medium text-center">
              This item has been fully claimed by other organizations.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={status !== "available" || qty <= 1}
              className="w-10 h-10 border border-gray-200 rounded-l-xl bg-white text-gray-700 text-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <div className="w-14 h-10 bg-slate-800 flex items-center justify-center">
              <span className="text-white font-bold">{qty}</span>
            </div>
            <button
              onClick={() => setQty((q) => Math.min(initialQuantity, q + 1))}
              disabled={status !== "available" || qty >= initialQuantity}
              className="w-10 h-10 border border-gray-200 rounded-r-xl bg-white text-gray-700 text-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={handleClaim}
            disabled={status !== "available" || qty <= 0}
            className="px-10 h-10 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-100 active:scale-95"
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}