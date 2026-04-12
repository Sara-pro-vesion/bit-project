import FilterBar from './FilterBar';
import { useState } from 'react';
import CardCh from './CardCh';
import DonationModal from './MoreInfo';
import Img from "../assets/food.jpg";
import Shoes from "../assets/shoes.jpg";

const initialDonations = [
  { id: 1, type: 'Food Pack', quantity: 27, image: Img, category: 'food', contact: '123455224', description: 'Fresh food packs available for families in need.' },
  { id: 2, type: 'Clothes', quantity: 10, image: Shoes, category: 'clothes', contact: '987654321', description: 'Gently used clothing for all ages.' },
  { id: 3, type: 'Toys', quantity: 5, image: null, category: 'toys', contact: '111222333', description: 'Educational toys for children aged 3–10.' },
];

export default function Marketplace() {
  const [category, setCategory] = useState('all');
  const [donations, setDonations] = useState(initialDonations);
  const [selectedId, setSelectedId] = useState(null);

  const filteredDonations = category === 'all'
    ? donations
    : donations.filter(item => item.category === category);

  const selectedDonation = donations.find(item => item.id === selectedId) ?? null;

  const handleOpenMore = (item) => {
    setSelectedId(item.id);
  };

  const handleCloseMore = () => {
    setSelectedId(null);
  };

  const handleClaim = ({ remaining }) => {
    setDonations(prevDonations =>
      prevDonations.map(item =>
        item.id === selectedId ? { ...item, quantity: remaining } : item
      )
    );
  };

  return (
    <div id="market" className="min-h-screen bg-white">
      <FilterBar onCategoryChange={setCategory} />

      <main className="max-w-7xl mx-auto mt-5 p-6 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 justify-items-center">
          {filteredDonations.map((item) => (
            <CardCh
              key={item.id}
              data={item}
              onMoreClick={handleOpenMore}
            />
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No items found in this category.
          </div>
        )}
      </main>

      {selectedDonation && (
        <DonationModal
          title={selectedDonation.type}
          contactInfo={selectedDonation.contact}
          initialQuantity={selectedDonation.quantity}
          description={selectedDonation.description}
          image={selectedDonation.image}
          onClose={handleCloseMore}
          onClaim={handleClaim}
        />
      )}
    </div>
  );
}