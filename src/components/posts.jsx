import CardDo from "./CardDo";


export default function PreviousPosts({ posts = [], onEdit }){
    
    
    return(
        <div className=" bg-white border-t rounded-md border-[#1E293B]">
            <h3 className="px-12 pt-3 font-Inter text-[28px] text-[#1E293B]">Your posts :</h3>
            <main className="max-w-7xl mx-auto lg:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 justify-items-center">
                    {posts.map((item) => (
                    <CardDo
                    key={item.id}
                    data={item}
                    onEdit={onEdit}
                    />
                    ))}
                </div>
            </main>
        </div>
    )
}