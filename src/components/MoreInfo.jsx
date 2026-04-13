import { useEffect, useState } from "react";

const getStatus = (remaining) => {
  if (remaining === 0) return "unavailable";
  return "available";
};

export default function DonationModal({
  donationId,
  title = "donation type",
  contactInfo = "123455224",
  initialQuantity = 25,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  image = null,
  onClose,
  onClaim,
}) {
  const [qty, setQty] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    setQty(0);
    setNote("");
  }, [initialQuantity, donationId]);

  const status = getStatus(initialQuantity);

  const handleClaim = () => {
    if (status === "unavailable" || qty <= 0) return;
    onClaim?.({ donationId, quantity: qty, note });
    onClose?.();
  };

  const statusConfig = {
    available: { label: "available", style: "text-emerald-500" },
    unavailable: { label: "unavailable", style: "text-red-500" },
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
              remaining quantity : <span className="text-gray-800">{initialQuantity}</span>
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

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-800 mb-2">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full min-h-[100px] rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-500"
            placeholder="Add details for the donor (optional)"
          />
        </div>

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
              onClick={() => setQty((q) => Math.min(initialQuantity, q + 1))}
              disabled={status !== "available"}
              className="w-9 h-9 border border-gray-300 rounded-r-md bg-white text-gray-700 text-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform"
            >
              +
            </button>
          </div>

          <button
            onClick={handleClaim}
            disabled={status !== "available" || qty <= 0}
            className="px-8 h-9 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            claim
          </button>
        </div>

      </div>
    </div>
  );
}