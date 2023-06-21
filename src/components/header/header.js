import React from 'react';
import logo from '../../assets/reddit-logo.png';
import Filter from '../filter/filter';
import Searchbar from '../searchbar/searchbar';

export default function Header() {
  return (
    <header>
      <div className='headerLogo'>
        <img
          src={logo}
          alt='Reddit Lite Logo'
          className='headerLogoImg'
        />
        <h1><span className='ruda'>reddit</span> LITE</h1>
      </div>
      <div className='headerUtilities' >
        <Filter />
        <Searchbar />
      </div>
    </header>
  );
}
