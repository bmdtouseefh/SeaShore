import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({web3Handler, account}) {
  return (
    <nav className="bg-gray-800 flex justify-between items-center px-4 py-6">
      <div className="flex items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <NavLink to="/">NFT Marketplace</NavLink>
        </div>
        {/* Separator */}
        <div className="bg-white mx-4"></div>
        {/* Navigation */}
        <nav className="ml-4 flex space-x-4">
          <NavLink to="/explore" className="text-white hover:text-gray-400">Explore</NavLink>

          <NavLink to="/create" className="text-white hover:text-gray-400">Create</NavLink>
          <NavLink to="/about" className="text-white hover:text-gray-400">About</NavLink>
        </nav>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Connect Wallet</button>
    </nav>
  );
}

export default Navbar;
