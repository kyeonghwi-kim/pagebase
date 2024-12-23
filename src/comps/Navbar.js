
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Main</Link>
        </li>
        <li>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        </li>
        <li>
          <Link to="/intro" style={{ color: 'white', textDecoration: 'none' }}>Intro</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

