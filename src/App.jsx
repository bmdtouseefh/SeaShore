import { useState } from 'react'
import './App.css'
import Navigation from "./Navbar"
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import seashore from '../artifacts/contracts/NFTMarketplace.sol/seashore.json'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
import {ethers} from 'ethers'
import Home from './Home.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [account, setAccount]= useState(null)
  const [loading, setLoading]=useState(true)
  const [nft, setNft]=useState(null)
  const [marketplace, setMarket]=useState(null)
  let provider, signer
  let marketAddress="0x5fbdb2315678afecb367f032d93f642f64180aa3"
//web3 handler
  async function requestAccount(){
    const accounts = await window.ethereum.request({method : 'eth_requestAccounts'})
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner();
    setAccount(accounts[0])
    console.log("connect");
    window.ethereum.on('chainChanged', (chainId)=>{
      window.location.reload
    })

    // window.ethereum.on('accountsChanged', async function (accounts)=>{
    // setAccount(accounts[0])
    // await requestAccount()
    // }
    // )

    loadContract(signer)
  }

 //read function
 async function fetchGreeting() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
    try {
      const data = await contract.greet()
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }    
}

//write function
 async function loadContract(signer) {
  if (typeof window.ethereum !== 'undefined') {
    const marketplace = new ethers.Contract(marketAddress, seashore.abi, signer)
    // const transaction = await contract.setGreeting(greeting)
    // await transaction.wait()
    // fetchGreeting()
    setMarket(marketplace)
    // const nft = new ethers.Contract(nftAddress, NFT.abi, signer)
    // setNft(nft)
    setLoading(false)
  }
}
  return (
    <BrowserRouter>
    <div>
      <>
      <Navigation web3Handler={requestAccount} account={account}></Navigation>
        </>
      <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home marketplace={marketplace} nft={nft} />
              } />
              {/* <Route path="/create" element={
                <Create marketplace={marketplace} nft={nft} />
              } />
              <Route path="/my-listed-items" element={
                <MyListedItems marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } /> */}
            </Routes>
          )}
        </div>
        
      </div>

      </BrowserRouter>
      
  )
}

export default App
