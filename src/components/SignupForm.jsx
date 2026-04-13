import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
   role: 'donor',
   Authnumber: '0',
    agreedToTerms: false,
  });

          const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData((prev) => ({
              ...prev,
          [name]: type === 'checkbox' ? checked : value,
            }));
          };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const payload = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        organization: formData.role === 'charity' ? `Org-${formData.Authnumber}` : undefined
            };

      await api.post('/auth/register', payload);
      
 // Success
        navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[380px] bg-white p-12 font-sans mx-auto">
      <h2 className="text-[34px] font-bold text-[#0f172a] leading-tight mb-10">
        create your account
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input 
              type="text" 
              name="username"
              placeholder="username .." 
              value={formData.username}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all"
              required
          disabled={isLoading}
        />

        <input 
          type="email" 
          name="email"
              placeholder="email .." 
          value={formData.email}
            onChange={handleChange}               className="w-full px-5 py-3 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all"
             required
          disabled={isLoading}
        />

        <input 
          type="password" 
          name="password"
          placeholder="password .." 
          value={formData.password}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all"
          required
          disabled={isLoading}
        />

        <div className="mt-8">
          <label className="text-lg text-[#334155] font-medium block mb-2">I am a:</label>
          <div className="bg-[#f1f5f9] p-1 rounded-full flex items-center justify-between gap-1 w-full border border-slate-200">
          <button
              type="button"
        onClick={() => {
                setFormData((prev) => ({ ...prev, role: 'donor', Authnumber: '0' }));
                setShowInput(false);
              }}
          className={`flex-1 text-center py-2 px-6 rounded-full text-lg font-medium transition-colors ${
                formData.role === 'donor' ? 'bg-[#2563eb] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
            }`}
            >
              Donor
            </button>
            <button
              type="button"
              onClick={() => {
                setShowInput(true);
                setFormData((prev) => ({ ...prev, role: 'charity', Authnumber: '' }));
                        }}
            className={`flex-1 text-center py-2 px-6 rounded-full text-lg font-medium transition-colors ${
              formData.role === 'charity' ? 'bg-[#2563eb] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Charity
          </button>
          </div>
        </div>

        {showInput && (
          <input
            type="text"
            name="Authnumber"
            placeholder="Auth number .."
            value={formData.Authnumber}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all"
            required={formData.role === 'charity'}
            disabled={isLoading}
          />
        )}

        <div className="flex items-start gap-3 mt-8">
          <input 
            type="checkbox" 
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="w-5 h-5 mt-1 border border-gray-300 rounded text-[#2563eb]"
            required
          />
          <label className="text-[#334155] text-lg leading-snug">
            I agree to the <a href="#" className="text-[#2563eb] hover:underline">Terms & Conditions</a>.
          </label>
        </div>

        <button 
        type="submit" 
        disabled={isLoading}
        className={`bg-[#2563eb] text-white px-10 py-2 rounded-xl text-xl font-medium transition-colors mt-6 w-full ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1d4ed8]'          }`}
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="text-[#334155] text-lg">
        already have an account?{' '}
        <Link to="/login" className="text-[#2563eb] hover:underline font-medium">log in</Link>
      </p>
    </div>
  );
}