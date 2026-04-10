import LoginForm from '../components/LoginForm';

export default function LogIn() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f8fafc]">
 
      <div className="hidden md:flex md:w-1/2 lg:w-4/6 bg-slate-200 items-center justify-center relative overflow-hidden">
    </div>

      <div className="h-[100vh] w-full md:w-1/2 lg:w-2/6 flex items-center justify-center p-8">
        <LoginForm />
      </div>

    </div>
  );
}