
export default function ClaimCard({ data }) {
  return (
    <div className="w-[300px] max-w-full mx-auto bg-white border border-[#C2C2C2] rounded-[20px] overflow-hidden shadow-md shadow-[#C2C2C2] hover:shadow-none">
        
        <div className="flex items-center justify-between p-4">
            <div className=" flex flex-col">
                    <h4 className="text-[22px] font-semibold text-slate-900 mb-4">
                    {data?.type || 'Unknown'}
                    </h4>
                    <span className="text-slate-700 text-[18px] font-medium">
                        stock: {data?.quantity ?? 0}
                    </span>
            </div>
            <div className="flex flex-col gap-1">
                    <button className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-lg font-medium hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        approve
                    </button>
                    <button className="bg-[#F50B0B] text-white px-2 py-1 rounded-lg text-lg font-medium hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        reject
                    </button>
            </div>
        </div>
    </div>
  )
}