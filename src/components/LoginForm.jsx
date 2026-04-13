import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(email, password);
 
      if (data.user.role === 'donor') {
        navigate('/DonorHome');
      } else if (data.user.role === 'charity') {
        navigate('/CharityHome');
      } else {
        navigate('/'); // Fallback
      }
    } catch (err) {
      //401 Unauthorized) 
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-12 mx-auto mt-20 md:w-[380px]">
    <h2 className="text-left text-[34px] font-bold text-[#0f172a] leading-tight mb-12">
        welcome to <br /> KindReach
      </h2>
      {error && (
      <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-7 mb-6">
        <div>
          <input 
            type="email" 
          placeholder="email .."
          autoComplete="email"
              value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <input 
            type="password" 
            placeholder="password .."
            autoComplete="current-password"
            value={password}
          onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            required
            disabled={isLoading}
          />
        </div>

        <div className="text-left">
          <button 
        type="submit" 
        disabled={isLoading}
              className={`bg-[#2563eb] mt-1 text-white px-8 py-2 rounded-xl text-xl font-medium transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1d4ed8]'
            }`}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
      </form>

    <p className="text-left text-[#334155] text-lg leading-snug">
      if you don't have an <br /> account you can{' '}
        <Link to="/signup" className="text-[#2563eb] hover:underline font-medium">
        sign up
        </Link>{' '}
      for free.
      </p>
    </div>
  );
}