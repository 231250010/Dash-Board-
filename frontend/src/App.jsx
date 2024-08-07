import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LogInPage';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};
const NoMatch = () => <h1>404 Not Found</h1>;

export default App;
