import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav';
import Claims from '../components/Claims';

export default function Profile({ claims, onDeleteClaim }) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="fixed inset-x-0 top-0 bg-white/50 backdrop-blur-sm z-50 shadow-sm">
        <Nav />
      </div>

      <main className="pt-[10rem] pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-9">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-semibold text-slate-900">Charity Profile</h1>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Review your claims history and manage claim approvals from one place.
              </p>
            </div>
            <button
              onClick={() => navigate('/CharityHome')}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Back to Home
            </button>
          </div>

          <Claims claims={claims} mode="charity" onDelete={onDeleteClaim} />
        </div>
      </main>
    </div>
  );
}
