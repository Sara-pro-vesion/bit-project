import FilterBar from './FilterBar';
import { useState } from 'react';
import CardCh from './CardCh';
import DonationModal from './MoreInfo';

export default function Marketplace({ donations, onCreateClaim }) {
  const [category, setCategory] = useState('all');
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

  const handleClaim = ({ donationId, quantity, note }) => {
    onCreateClaim?.({ donationId, quantity, note });
    handleCloseMore();
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
          donationId={selectedDonation.id}
          title={selectedDonation.typeOfDonation || selectedDonation.type}
          contactInfo={selectedDonation.contactInfo || selectedDonation.contact}
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