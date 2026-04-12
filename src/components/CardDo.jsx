export default function CardDo({ data }) {
  return (
    <div className="w-[300px] max-w-full mx-auto bg-white border border-[#C2C2C2] rounded-[20px] overflow-hidden shadow-md shadow-[#C2C2C2] hover:shadow-none">
      <div className="h-32 border-b border-[#C2C2C2] bg-gradient-to-br from-purple-100 via-white to-white" />
      <div className="p-4">
        <h4 className="text-[22px] font-semibold text-slate-900 mb-4">
          {data?.type || 'Unknown'}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-slate-700 text-[18px] font-medium">
            stock: {data?.quantity ?? 0}
          </span>
          <button className="bg-[#1E293B] text-white px-3 py-1 rounded-lg text-lg font-medium hover:shadow-xl transition-shadow duration-300 ease-in-out">
            edit
          </button>
        </div>
      </div>
    </div>
  );
}