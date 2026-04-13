
import Hero from "../components/Hero1";
import Nav from "../components/nav";
import Marketplace from "../components/Market";
import Footer from "../components/Footer";

export default function CharityPage({ donations, onCreateClaim }) {
  
  return (
    <div>
      <div className="flex flex-col gap-20 md:gap-[120px]">
        <Nav />
        <Hero />
      </div>
      <Marketplace donations={donations} onCreateClaim={onCreateClaim} />
      <Footer />
    </div>
  );
}