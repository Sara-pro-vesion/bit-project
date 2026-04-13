import ClaimCard from "./ClaimCard";

export default function Claims({ claims = [], mode = "donor", onApprove, onReject, onDelete }) {
  const isCharity = mode === "charity";

  return (
    <div className="bg-white pb-12">
      <div className="px-12 pt-10 pb-6">
        <h3 className="font-Inter text-[28px] text-[#1E293B]">Claims history</h3>
        <p className="mt-2 text-slate-600 max-w-2xl">
          {isCharity
            ? 'Review your charity claim history and remove old or canceled requests.'
            : 'Review incoming claim requests and approve or reject them based on stock availability.'}
        </p>
      </div>
      <main className="max-w-7xl mx-auto lg:p-5">
        {claims.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            {isCharity
              ? 'No charity claim history yet.'
              : 'No incoming claims at the moment.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 justify-items-center">
            {claims.map((item) => (
              <ClaimCard
                key={item.id}
                data={item}
                onApprove={onApprove}
                onReject={onReject}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

