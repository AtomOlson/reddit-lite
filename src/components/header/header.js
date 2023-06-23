import React from 'react';
import logo from '../../assets/reddit-logo.png';
import Filter from '../filter/filter';
import Searchbar from '../searchbar/searchbar';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to={'/'} 
            className='headerLogo'
          >
        <img
          src={logo}
          alt='Reddit Lite Logo'
          className='headerLogoImg'
        />
        <h1><span className='ruda'>reddit</span> LITE</h1>
      </Link>
      <div className='headerUtilities' >
        <Filter />
        <Searchbar />
      </div>
    </header>
  );
}
