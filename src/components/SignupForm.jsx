import { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'donor',
    Authnumber: '',
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit Signup Data:", formData);
    // API endpoint call for registration here
  };


  const [showInput, setShowInput] = useState(false);

  return (
    <div className="w-[380px] bg-white p-12 border border-gray-200 rounded-[24px] shadow-sm font-sans mx-auto mt-10">
      
      <h2 className="text-[34px] font-bold text-[#0f172a] leading-tight mb-10">
        create your <br /> accout
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        

        <input 
          type="text" 
          name="username"
          placeholder="username .." 
          value={formData.username}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          required
        />

        <input 
          type="email" 
          name="email"
          placeholder="email .." 
          value={formData.email}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          required
        />

        <input 
          type="password" 
          name="password"
          placeholder="password .." 
          value={formData.password}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          required
        />


        <div className="mt-8">
          <label className="text-lg text-[#334155] font-medium block mb-2">
            I am a:
          </label>
          <div className="bg-[#f1f5f9] p-1 rounded-full flex items-center justify-between gap-1 w-full border border-slate-200">
            
       <button
              type="button"
              onClick={() => {
                 setFormData((prev) => ({ ...prev, role: 'donor', Authnumber: '0' }));
                 setShowInput(false);
              }}
              className={`flex-1 text-center py-2 px-6 rounded-full text-lg font-medium transition-colors ${
                formData.role === 'donor'
                  ? 'bg-[#2563eb] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Donor
            </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowInput(true);
                    setFormData((prev) => ({ ...prev, role: 'charity', Authnumber: '0' }));
                  }}
                  className={`flex-1 text-center py-2 px-6 rounded-full text-lg font-medium transition-colors ${
                    formData.role === 'charity'
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
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
            className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            required={formData.role === 'charity'}
          />
        )}

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mt-8">
          <input 
            type="checkbox" 
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="w-5 h-5 mt-1 border border-gray-300 rounded text-[#2563eb] focus:ring-blue-400"
            required
          />

          <label className="text-[#334155] text-lg leading-snug">
            I have read and agree to the{' '}
            <a href="#" className="text-[#2563eb] hover:underline">
              Terms & Conditions
            </a>.
          </label>
        </div>


        <button 
          type="submit" 
          className="bg-[#2563eb] text-white px-10 py-2 rounded-xl text-xl font-medium hover:bg-[#1d4ed8] transition-colors mt-6"
        >
          Sign Up
        </button>
      </form>

      {/* Login link */}
      <p className="text-[#334155] text-lg leading-snug">
        already have an accout?{' '}
        <a href="#" className="text-[#2563eb] hover:underline font-medium">
          log in
        </a>
      </p>
    </div>
  );
}