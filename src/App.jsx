import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router> 
      <Routes>

        <Route path="/" element={<LogIn />} />
        <Route path="login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </Router>
  );
}