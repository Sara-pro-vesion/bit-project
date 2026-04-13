import { useNavigate } from 'react-router-dom';
import Kindreach from '../assets/kindreach.png';

export default function Nav(){
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="flex justify-between py-4 px-6 items-center">
            <img src={Kindreach} alt="Kindreach logo" className="h-10" />
            <div className="flex gap-5">
                <button
                    onClick={handleProfile}
                    className="font-Inter border-solid border-2 text-[#1E293B] border-[#1E293B] rounded-[10px] px-3 overflow-hidden hover:bg-[#2563EB] hover:border-[#2563EB] hover:text-white shadow-xl transition-shadow duration-300 ease-in-out"
                >
                    profile
                </button>
                <button
                    onClick={handleLogout}
                    className="font-Inter border-solid border-2 text-[#1E293B] border-[#1E293B] rounded-[10px] px-3 overflow-hidden hover:bg-[#1E293B] hover:text-white shadow-xl transition-shadow duration-300 ease-in-out"
                >
                    log out
                </button>
            </div>
        </div>
    )
}