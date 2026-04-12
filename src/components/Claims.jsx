import ClaimCard from "./ClaimCard";


    const donations = [
  { id: 1, type: 'Food Pack', quantity: 27, image: null, category: 'food', contact: '123455224', description: 'Fresh food packs available for families in need.' },
 { id: 3, type: 'Toys', quantity: 5, image: null, category: 'toys', contact: '111222333', description: 'Educational toys for children aged 3–10.' },

    ]
export default function Claims(){
    
    
    return(
        <div className=" bg-white pb-12">
            <h3 className="px-12 font-Inter text-[28px] text-[#1E293B]">Your claims :</h3>
            <main className="max-w-7xl mx-auto lg:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 justify-items-center">
                    {donations.map((item) => (
                    <ClaimCard
                    key={item.id}
                    data={item}
                    />
                    ))}
                </div>
            </main>
        </div>
    )
}