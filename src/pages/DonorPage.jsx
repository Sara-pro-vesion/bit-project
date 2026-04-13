import React, { useState, useEffect } from 'react';
import Hero2 from '../components/Hero2';
import Nav from '../components/nav';
import PreviousPosts from '../components/posts';
import DonationForm from '../components/DonationForm';
import Claims from '../components/Claims';
import Footer from '../components/Footer';
import api from '../services/api';

export default function DonorPage() {
  const [posts, setPosts] = useState([]);
  const [claims, setClaims] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    fetchDonorData();
  }, []);

  const fetchDonorData = async () => {
    try {
      setLoading(true);
      const [postsRes, claimsRes] = await Promise.all([
        api.get('/posts/my-posts'), 
        api.get('/claims/incoming')
      ]);
      setPosts(postsRes.data);
      setClaims(claimsRes.data);
    } catch (err) {
      console.error("Error fetching donor data:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (formData) => {    try {
      if (activePost) {

        await api.put(`/posts/${activePost._id}`, formData);
      } else {
        await api.post('/posts', formData);
      }
      setIsFormOpen(false);
      fetchDonorData();//refresh data
    } catch (err) {
      alert("Failed to save post. Check console for details.");
      console.error(err);
    }
  };

  const handleApproveClaim = async (claimId) => {
    try {
      await api.patch(`/claims/${claimId}/status`, { status: 'approved' });
    fetchDonorData();
  } catch (err) {      console.error("Approval failed:", err);
    }
  };

  const handleRejectClaim = async (claimId) => {
    try {
    await api.patch(`/claims/${claimId}/status`, { status: 'rejected' });
      fetchDonorData();
  } catch (err) {
       console.error("Rejection failed:", err);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading Dashboard...</div>;

  return (
    <div className="relative">
      <div className="fixed inset-x-0 top-0 bg-white/50 backdrop-blur-sm z-50 shadow-sm">
        <Nav />
      </div>
      <div className="pt-24 flex flex-col gap-20 md:gap-[55px]">
        <Hero2 onCreate={handleCreate} />
        <PreviousPosts posts={posts} onEdit={handleEdit} />
        <Claims
          claims={claims}
          mode="donor"
          onApprove={handleApproveClaim}
          onReject={handleRejectClaim}
        />
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
  );
}