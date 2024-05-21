import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
    const results = await marketplace.queryFilter(filter)
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(results.map(async i => {
      // fetch arguments from each result
      i = i.args
      // get uri url from nft contract
      const uri = await nft.tokenURI(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(i.itemId)
      // define listed item object
      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image
      }
      return purchasedItem
    }))
    setLoading(false)
    setPurchases(purchases)
  }
  useEffect(() => {
    loadPurchasedItems()
  }, [])
  // if (loading) return (
  //   <main style={{ padding: "1rem 0" }}>
  //     <h2>Loading...</h2>
  //   </main>
  // )
  return (
    <div className="flex justify-center">
      {purchases.length > 0 ? (
        <div className="container px-5 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {purchases.map((item, idx) => (
              <div key={idx} className="bg-white rounded shadow-md overflow-hidden"> {/* Added styles for card-like appearance */}
                <img src={item.image} className="w-full h-48 object-cover" alt="Purchase Image" /> {/* Assuming image */}
                <div className="px-4 py-2 text-right"> {/* Added padding and right alignment */}
                  {ethers.utils.formatEther(item.totalPrice)} ETH
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="text-center px-4 py-4">
          <h2>No purchases</h2>
        </main>
      )}
    </div>
  );
  
  
}