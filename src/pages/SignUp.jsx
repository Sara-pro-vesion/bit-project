import SignupForm from "../components/SignupForm";
import authImage from '../assets/image1.jpg';

export default function SignUp() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f8fafc]">
 
      <div className="hidden md:flex md:w-1/2 lg:w-4/6 bg-slate-200 items-center justify-center relative overflow-hidden">
        <img src={authImage} alt="Signup illustration" className="h-full w-full object-cover" />
      </div>

      <div className=" w-full md:w-1/2 lg:w-2/6 flex items-center justify-center p-8">
        <SignupForm />
      </div>

    </div>
  );
}