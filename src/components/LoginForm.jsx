import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit:", { email, password });
    //  make the API call to your Express backend 
  };

  return (
    <div className="bg-white p-12 mx-auto mt-20 md:w-[380px]">
    
      <h2 className=" text-left text-[34px] font-bold text-[#0f172a] leading-tight mb-12">
        welcome to <br /> brandName
      </h2>

      <form onSubmit={handleSubmit} className=" space-y-7 mb-6">
        
        <div>
          <input 
            type="email" 
            placeholder="email .." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 font-JetBrains-Mono placeholder:font-JetBrains-Mono text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            required
          />
        </div>

        <div>
          <input 
            type="password" 
            placeholder="password .." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 font-JetBrains-Mono placeholder:font-JetBrains-Mono text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            required
          />
        </div>

        <div className="text-left">
          <button 
            type="submit" 
            className="bg-[#2563eb] mt-1 text-white px-8 py-2 rounded-xl text-xl font-medium hover:bg-[#1d4ed8] transition-colors"
          >
            Log In
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