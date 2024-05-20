import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'


const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.marketItems
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        // Add item to items array
        items.push({

          itemId: item.nftId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.buyItem(item.nftId, { value: item.price })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 py-5">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow-md">
              <img src={item.image} className="w-full h-48 object-cover" alt={item.name} />
              <div className="p-4">
                <h5 className="text-lg font-bold">{item.name}</h5>
                <p className="text-gray-700">{item.description}</p>
              </div>
              <div className="flex items-center justify-between p-4 border-t border-gray-200">
                <span className="text-gray-700">{ethers.utils.formatEther(item.price)} ETH</span>
                <button onClick={() => buyMarketItem(item)} className="px-3 py-2 rounded-md bg-indigo-500 text-white font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <main className="text-center py-8">
          <h2 className="text-xl font-bold">No listed assets</h2>
        </main>
      )}
    </div>
  );
  
}
export default Home