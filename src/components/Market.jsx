import FilterBar from './FilterBar';
import Card from './CardCh';
import { useState } from 'react';

const donations = [
  { id: 1, type: 'Food Pack', quantity: 27, image: null, category: 'food', contact: '123455224', description: 'Fresh food packs available for families in need.' },
  { id: 2, type: 'Clothes', quantity: 10, image: null, category: 'clothes', contact: '987654321', description: 'Gently used clothing for all ages.' },
  { id: 3, type: 'Toys', quantity: 5, image: null, category: 'toys', contact: '111222333', description: 'Educational toys for children aged 3–10.' },
];

export default function Marketplace() {
  const [category, setCategory] = useState('all');

  const filteredDonations = category === 'all'
    ? donations
    : donations.filter(item => item.category === category);

  return (
    <div id="market" className="min-h-screen bg-white">
      <FilterBar onCategoryChange={setCategory} />

      <main className="max-w-7xl mx-auto mt-5 p-6 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 justify-items-center">
          {filteredDonations.map((item) => (
            <Card
              key={item.id}
              data={item}
            />
          ))}
        </div>

        {filteredDonations.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
            No items found in this category.
          </div>
        )}
      </main>
    </div>
  );
}