export default function CardCh({ data }) {
  return (
    <div className="w-[300px] max-w-full mx-auto bg-white border border-[#C2C2C2] rounded-[20px] overflow-hidden shadow-lg shadow-[#4848483f] hover:shadow-none">
      <div className="h-32 border-b border-[#C2C2C2] bg-gray-100 overflow-hidden">
        {data?.image ? (
          <img
            src={data.image}
            alt={data?.type || 'Donation image'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-[22px] font-semibold text-slate-900 mb-4">
          {data?.type || 'Unknown'}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-slate-700 text-[18px] font-medium">
            stock: {data?.quantity ?? 0}
          </span>
          <button className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-lg font-medium shadow-lg shadow-[#c2c2c2] hover:shadow-none transition-shadow duration-300 ease-in-out">
            more
          </button>
        </div>
      </div>
    </div>
  );
}