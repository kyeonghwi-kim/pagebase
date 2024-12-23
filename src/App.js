// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './comps/Navbar';
import Main from './pages/Main';
import About from './pages/About';
import Intro from './pages/Intro';
import PageLoading from './pages/PageLoading';



const App = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    // 페이지가 로드되면 로딩을 3초 동안 유지한 후 해제
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Router>
      {/* 네비게이션 바는 모든 페이지에서 항상 상단에 표시 */}
      <Navbar />
      
      {/* 로딩 페이지는 로딩 중일 때만 표시 */}
      {Loading ? (
        <PageLoading />
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/intro" element={<Intro />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;

