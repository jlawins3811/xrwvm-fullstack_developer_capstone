// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dealers from './components/Dealers/Dealers';
import Dealer from './components/Dealers/Dealer';
import PostReview from './components/Dealers/PostReview';
import Login from './components/Login/Login';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/dealer/:id" element={<Dealer />} />
          <Route path="/postreview/:id" element={<PostReview />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
  }

export default App;




