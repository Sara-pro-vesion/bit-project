import { useState } from 'react';

export default function DonationModal({ isOpen, onClose, data }) {
  const [count, setCount] = useState(0);

  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50  backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] w-full max-w-2xl relative overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>

        <div className="p-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-4">{data.type}</h2>

            <div className="space-y-1 text-slate-500 text-lg mb-6">
              <p>contact: <span className="text-slate-800">{data.contact ?? '—'}</span></p>
              <p>remaining: <span className="text-slate-800">{data.quantity ?? 0}</span></p>
              <p>status: <span className="text-emerald-500 font-medium">available</span></p>
            </div>

            <div className="mb-6">
              <h4 className="text-slate-400 text-sm mb-2">Description</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {data.description || 'No description provided.'}
              </p>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center bg-[#0f172a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setCount(c => Math.max(0, c - 1))}
                  className="px-4 py-2 text-white hover:bg-slate-800"
                >−</button>
                <span className="px-4 py-2 text-white border-x border-slate-700 w-12 text-center">
                  {count}
                </span>
                <button
                  onClick={() => setCount(c => c + 1)}
                  className="px-4 py-2 text-white hover:bg-slate-800"
                >+</button>
              </div>

              <button className="bg-emerald-500 text-white px-10 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors">
                claim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}