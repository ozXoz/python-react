import logo from './logo.svg';
import './App.css';
import Signup from './SignUp';
import Login from './Login';
import Home from './Home';
import Welcome from './Welcome';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
