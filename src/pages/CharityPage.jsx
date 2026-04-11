import FilterBar from "../components/FilterBar";
import Hero from "../components/Hero";
import Nav from "../components/nav";

export default function CharityPage() {
  return (
    <div>
      <div className="flex flex-col gap-20 md:gap-40">
        <Nav />
        <Hero />
      </div>
      <FilterBar />
    </div>
  );
}