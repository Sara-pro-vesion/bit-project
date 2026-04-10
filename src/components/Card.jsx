export default function Card() {
  return (
    <div className="w-[300px] max-w-full mx-auto bg-white border border-gray-300 rounded-[20px] overflow-hidden shadow-sm">
      {/* Top */}
      <div className="h-32 border-b border-gray-300 bg-gradient-to-br from-purple-100 via-white to-white"></div>

      {/* Bottom */}
      <div className="p-4">
        <h4 className="font-Poppins text-[25px] font-semibold text-slate-900 mb-4 text-left">type</h4>
        <div className="flex items-center justify-between">
          <span className="font-Inter text-slate-900 text-[20px] font-medium">stock : 27</span>
          <button className="font-Inter bg-emerald-500 text-white px-3 py-1 rounded-lg text-lg font-medium hover:shadow-xl transition-shadow duration-300 ease-in-out">
            more
          </button>
        </div>
      </div>
    </div>
  );
}