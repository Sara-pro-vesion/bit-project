

export default function Hero1() {
    const scrollToMarket = () => {
        const marketSection = document.getElementById('market');
        if (marketSection) {
            marketSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col mb-10 justify-start px-10">
        <h1 className="text-[#1E293B] font-semibold font-Poppines text-[34px] md:text-[45px]">A great society___ 
<br/>starts from solidarity.</h1>
        <h4 className="text-[23px] md:text-[25px] font-Inter text-[#64748B]">Empowering change through shared giving.</h4>
        <button onClick={scrollToMarket} className="text-white mt-7 w-[80px] border rounded-md bg-[#2563EB] py-3 px-1 hover:bg-[#1E293B]">Browse</button>
        </div>
    )
}