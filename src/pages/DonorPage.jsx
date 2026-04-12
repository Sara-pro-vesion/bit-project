import React, { useState } from 'react'
import Hero2 from '../components/Hero2'
import Nav from '../components/nav'
import PreviousPosts from '../components/posts'
import DonationForm from '../components/DonationForm'
import Claims from '../components/Claims'
import Footer from '../components/Footer'

const initialPosts = [
  { id: 1, typeOfDonation: 'Food Pack', quantity: 27, image: null, category: 'food', contactInfo: '123455224', description: 'Fresh food packs available for families in need.' },
  { id: 2, typeOfDonation: 'Clothes', quantity: 10, image: null, category: 'clothes', contactInfo: '987654321', description: 'Gently used clothing for all ages.' },
  { id: 3, typeOfDonation: 'Toys', quantity: 5, image: null, category: 'toys', contactInfo: '111222333', description: 'Educational toys for children aged 3–10.' },
];

export default function DonorPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [activePost, setActivePost] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setActivePost(null);
    setIsFormOpen(true);
  };

  const handleEdit = (post) => {
    setActivePost(post);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = (formData) => {
    if (formData.id != null) {
      setPosts((prev) => prev.map((item) => item.id === formData.id ? {
        ...item,
        typeOfDonation: formData.typeOfDonation,
        quantity: formData.quantity,
        description: formData.description,
        contactInfo: formData.contactInfo,
        image: formData.image,
      } : item));
    } else {
      const nextId = Math.max(0, ...posts.map((item) => item.id)) + 1;
      setPosts((prev) => [
        ...prev,
        {
          id: nextId,
          typeOfDonation: formData.typeOfDonation,
          quantity: formData.quantity,
          description: formData.description,
          contactInfo: formData.contactInfo,
          image: formData.image,
          category: 'other',
        },
      ]);
    }

    setIsFormOpen(false);
    setActivePost(null);

    setTimeout(() => {
      document.getElementById('previous-posts')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative">
      <div className="fixed inset-x-0 top-0 bg-white/50 backdrop-blur-sm z-50 shadow-sm">
        <Nav />
      </div>
      <div className="pt-24 flex flex-col gap-20 md:gap-[55px]">
        <Hero2 onCreate={handleCreate} />
        <PreviousPosts posts={posts} onEdit={handleEdit} />
        <Claims />
      </div>
      <Footer />

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-3xl">
            <button
              onClick={handleCloseForm}
              className="absolute -top-3 -right-3 rounded-full bg-white p-2 shadow-lg text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <DonationForm
              initialValues={activePost ?? {}}
              submitLabel={activePost ? 'save' : 'done'}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  )
}
