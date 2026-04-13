
const statusStyles = {
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  pending: 'bg-amber-100 text-amber-700',
};

export default function ClaimCard({ data, onApprove, onReject, onDelete }) {
  const statusClass = statusStyles[data?.status] ?? 'bg-slate-100 text-slate-700';
  const itemType = data?.donationType ?? data?.type ?? 'Unknown';

  return (
    <div className="w-[300px] max-w-full mx-auto bg-white border border-[#C2C2C2] rounded-[20px] overflow-hidden shadow-md shadow-[#C2C2C2] hover:shadow-none">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-[22px] font-semibold text-slate-900 mb-2">
              {itemType}
            </h4>
            <p className="text-slate-600 text-sm mb-1">Requested by: <span className="text-slate-900 font-medium">{data?.requester || 'Unknown'}</span></p>
            <p className="text-slate-600 text-sm">Quantity: <span className="text-slate-900 font-medium">{data?.quantity ?? 0}</span></p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
            {data?.status ?? 'unknown'}
          </span>
        </div>

        <div className="mt-4 text-sm text-slate-500 space-y-2">
          <p><span className="font-medium text-slate-700">Date:</span> {data?.requestedAt}</p>
          <p><span className="font-medium text-slate-700">Note:</span> {data?.note || 'No additional details.'}</p>
        </div>

        {(onApprove || onReject || onDelete) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {data?.status === 'pending' && onApprove && (
              <button
                onClick={() => onApprove(data.id)}
                className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
              >
                Approve
              </button>
            )}
            {data?.status === 'pending' && onReject && (
              <button
                onClick={() => onReject(data.id)}
                className="rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600"
              >
                Reject
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(data.id)}
                className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}