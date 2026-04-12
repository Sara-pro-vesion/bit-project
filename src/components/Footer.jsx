export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1e293b] text-slate-300 font-sans p-6 md:p-12 mt-auto">
      
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:items-start text-center md:text-left">
        
        <div className="flex flex-col items-center md:items-start order-2 md:order-1">
          <h1 className="hidden md:block text-5xl font-light text-slate-100 mb-6">
        brand name
      </h1>
          <div className="block md:hidden w-16 h-12 bg-slate-500 rounded-xl mb-12"></div>
        </div>
    <div className="space-y-2 order-3 md:order-2">
          <h4 className="text-xl text-slate-100 mb-4 md:mb-6">social media</h4>
          <a href="#" className="block hover:text-white">instagram</a>
          <a href="#" className="block hover:text-white">facebook</a>
        </div>
        <div className="space-y-2 order-4 md:order-3">
          <h4 className="text-xl text-slate-100 mb-4 md:mb-6">contact</h4>
          <p>+21359849</p>
          <p>A1@test.com</p>
        </div>

        <div className="hidden md:flex justify-end order-1 md:order-4">
          <button onClick={scrollToTop} className="flex gap-2 items-center hover:text-white text-sm">
            BACK TO THE TOP
            <span className="text-xl font-bold">""</span>
          </button>
        </div>
      <div className="block md:hidden order-1 mb-8">
          <button onClick={scrollToTop} className="flex gap-1 items-center hover:text-white text-base">
            BACK TO THE TOP
            <span className="text-xl font-bold">""</span>
          </button>
        </div>
      </div>

<div className="mt-16 pt-6 border-t border-slate-700 flex flex-wrap gap-x-12 gap-y-4 md:justify-between items-center text-slate-400 text-base">
        <div className="order-1 flex-1 md:flex-none">
          <a href="#" className="hover:text-white">website cookies</a>
        </div>
        
        <div className="order-2 flex-1 md:flex-none">
          <a href="#" className="hover:text-white">privacy policy</a>
        </div>
        <div className="w-full md:w-auto text-center md:text-right text-slate-500 order-3 md:order-3 mt-4 md:mt-0">
          made with <span className="text-slate-100">♡</span> by our team
        </div>
      </div>
    </footer>
  );
}