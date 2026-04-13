import FilterBar from './FilterBar';
import { useState } from 'react';
import CardCh from './CardCh';
import DonationModal from './MoreInfo';

export default function Marketplace({ donations, onCreateClaim }) {
  const [category, setCategory] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  // 1. Updated filter to handle MongoDB categories (case-sensitive check)
  const filteredDonations = category === 'all'
    ? donations
    : donations.filter(item => item.category?.toLowerCase() === category.toLowerCase());

  // 2. Updated lookup to use _id
  const selectedDonation = donations.find(item => item._id === selectedId) ?? null;

  const handleOpenMore = (item) => {
    setSelectedId(item._id); // Use MongoDB ID
  };

  const handleCloseMore = () => {
    setSelectedId(null);
  };

  const handleClaim = ({ donationId, quantity, note }) => {
    // 3. The donationId here is already the MongoDB _id from the modal
    onCreateClaim?.({ 
      postId: donationId, // Backend likely expects 'postId' based on your report
      quantity: Number(quantity), 
      note 
    });
    handleCloseMore();
  };

  return (
    <div id="market" className="min-h-screen bg-white">
      <FilterBar onCategoryChange={setCategory} />

      <main className="max-w-7xl mx-auto mt-5 p-6 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 justify-items-center">
  {filteredDonations.map((item) => (
    <CardCh
      key={item._id}
      data={item}
      onMoreClick={handleOpenMore}
    />
  ))} 
</div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No items available at the moment.
          </div>
        )}
      </main>

      {selectedDonation && (
        <DonationModal
          donationId={selectedDonation._id} 
          title={selectedDonation.typeOfDonation}
          contactInfo={selectedDonation.contactInfo}
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