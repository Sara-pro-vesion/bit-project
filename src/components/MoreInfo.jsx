import { useState } from "react";

const getStatus = (remaining, hasPendingClaim) => {
  if (remaining === 0) return "unavailable";
  if (hasPendingClaim) return "pending";
  return "available";
};

export default function DonationModal({
  title = "donation type",
  contactInfo = "123455224",
  initialQuantity = 25,
  initialStatus = "available",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  image = null,
  onClose,
  onClaim,
}) {
  const [qty, setQty] = useState(0);
  const [remaining, setRemaining] = useState(initialQuantity);
  const [hasPendingClaim, setHasPendingClaim] = useState(false);

  const status = getStatus(remaining, hasPendingClaim);

  const handleClaim = () => {
    if (qty === 0 || status === "unavailable") return;
    const newRemaining = remaining - qty;
    setRemaining(newRemaining);
    setQty(0);
    setHasPendingClaim(true);
    onClaim?.({ qty, remaining: newRemaining, status: getStatus(newRemaining, true) });
  };

  const handleConfirm = () => {
    setHasPendingClaim(false);
  };

  const statusConfig = {
    available:   { label: "available",   style: "text-emerald-500" },
    pending:     { label: "pending",     style: "text-amber-500"   },
    unavailable: { label: "unavailable", style: "text-red-500"     },
  };

  const { label, style } = statusConfig[status];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-lg">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>

        {/* Top section */}
        <div className="flex gap-5 mb-5">
          <div className="w-32 min-w-[8rem] h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-300 text-sm">No image</span>
            )}
          </div>

          <div className="flex flex-col justify-center gap-1">
            <h2 className="text-2xl font-medium text-gray-800 mb-1">{title}</h2>
            <p className="text-sm text-gray-500">
              contact info : <span className="text-gray-800">{contactInfo}</span>
            </p>
            <p className="text-sm text-gray-500">
              remaining quantity : <span className="text-gray-800">{remaining}</span>
            </p>
            <p className="text-sm text-gray-500">
              status : <span className={`font-medium ${style}`}>{label}</span>
            </p>
          </div>
        </div>

        <hr className="border-gray-100 mb-4" />

        {/* Description */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-800 mb-1">Description :</p>
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>

        {/* Status banner */}
        {status === "pending" && (
          <div className="mb-4 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
            <p className="text-sm text-amber-700">Your claim is awaiting approval.</p>
            <button
              onClick={handleConfirm}
              className="text-xs text-amber-700 underline hover:text-amber-900"
            >
              mark confirmed
            </button>
          </div>
        )}

        {status === "unavailable" && (
          <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">This donation is no longer available.</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setQty((q) => Math.max(0, q - 1))}
              disabled={status !== "available"}
              className="w-9 h-9 border border-gray-300 rounded-l-md bg-white text-gray-700 text-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform"
            >
              −
            </button>
            <div className="w-12 h-9 bg-gray-800 flex items-center justify-center">
              <span className="text-white text-sm font-medium">{qty}</span>
            </div>
            <button
              onClick={() => setQty((q) => Math.min(remaining, q + 1))}
              disabled={status !== "available"}
              className="w-9 h-9 border border-gray-300 rounded-r-md bg-white text-gray-700 text-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform"
            >
              +
            </button>
          </div>

          <button
            onClick={handleClaim}
            disabled={qty === 0 || status !== "available"}
            className="px-8 h-9 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            claim
          </button>
        </div>

      </div>
    </div>
  );
}