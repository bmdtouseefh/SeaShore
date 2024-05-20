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
          <NavLink to="/create" className="text-white hover:text-gray-400">Create</NavLink>
          <NavLink to="/listed" className="text-white hover:text-gray-400">My Listed items</NavLink>
          <NavLink to="/purchases" className="text-white hover:text-gray-400">My Purchases</NavLink>
          <NavLink to="/about" className="text-white hover:text-gray-400">About</NavLink>
        </nav>
      </div>{
        account? (<NavLink
          href={`https://etherscan.io/address/${account}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-green-300 flex items-center"
        >
          <span className="mr-2">
            {account.slice(0, 5) + '...' + account.slice(38, 42)}
          </span>
        </NavLink>
        ): <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={web3Handler}>Connect Wallet</button>
      }
    </nav>
  );
}

export default Navbar;
