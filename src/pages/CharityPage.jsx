
import { useEffect, useState } from "react";
import Hero from "../components/Hero1";
import Nav from "../components/nav";
import Marketplace from "../components/Market";
import Footer from "../components/Footer";
import api from "../services/api";

export default function CharityPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await api.get('/posts');
      setDonations(res.data);
    } catch (err) {
      console.error('Error fetching donations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleCreateClaim = async (payload) => {
    try {
      await api.post('/claims', payload);
      alert('Claim request sent to the donor.');
      fetchDonations();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create claim.');
      console.error('Claim failed:', err);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-20 md:gap-[120px]">
        <Nav />
        <Hero />
      </div>
      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading donations...</div>
      ) : (
        <Marketplace donations={donations} onCreateClaim={handleCreateClaim} />
      )}
      <Footer />
    </div>
  );
}