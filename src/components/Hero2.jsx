

export default function Hero2({ onCreate }) {
    return (
        <div className="flex flex-col justify-start px-12">
        <h1 className="text-[#1E293B] font-semibold font-Poppines text-[34px] md:text-[45px]">A great society___ 
<br/>starts from solidarity.</h1>
        <h4 className="text-[23px] md:text-[25px] font-Inter text-[#64748B]">Empowering change through shared giving.</h4>
        <button onClick={onCreate} className="text-white mt-7 border rounded-md bg-[#2563EB] w-[150px] py-3 px-1 hover:bg-[#1E293B]">Create a post</button>
        </div>
    )
}