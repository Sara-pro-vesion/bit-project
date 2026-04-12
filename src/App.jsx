import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CharityPage from './pages/CharityPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonorPage from './pages/DonorPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/CharityHome' element={<CharityPage />} />
        <Route path='/' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/DonorHome' element={<DonorPage />} />
      </Routes>
    </Router>
  );
}