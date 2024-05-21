import { createHelia } from "helia"
import { useState } from "react"


const Create = ({ marketplace, nft, account }) => {
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    

    const uploadToIPFS = async (event) => {
      event.preventDefault();
      const file = event.target.files[0];
    
      if (typeof file !== 'undefined') {
        try {
          // Create a Helia node instance
          const helia = await createHelia();
    
          // Add the file to IPFS using Helia
          const result = await helia.add(file);
          console.log(result);
    
          // Update image URL with IPFS path
          setImage(`ipfs://${result.cid}`);
        } catch (error) {
          console.log("IPFS image upload error:", error);
        }
      }
    };
    
    const createNFT = async () => {
        if (!image || !price || !name || !description) return
        try{
          const result = await client.add(JSON.stringify({image, price, name, description}))
          mintThenList(result)
        } catch(error) {
          console.log("ipfs uri upload error: ", error)
        }
      }
      const mintThenList = async (result) => {
        const uri = `https://ipfs.infura.io/ipfs/${result.path}`
        // mint nft 
        await(await nft.mint(uri)).wait()
        // get tokenId of new nft 
        const id = await nft.tokenCount()
        // approve marketplace to spend nft
        await(await nft.setApprovalForAll(marketplace.address, true)).wait()
        // add nft to marketplace
        const listingPrice = ethers.utils.parseEther(price.toString())
        await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
      }
      return ( account?(
        <div className="container mx-auto mt-10">
          <div className="flex flex-col items-center max-w-screen-lg">
            <div className="w-full mb-8">
              <input type="file" required name="file" onChange={uploadToIPFS} className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="w-full mb-4">
              <input type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)} className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="w-full mb-4">
              <textarea placeholder="Description" required onChange={(e) => setDescription(e.target.value)} className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"></textarea>
            </div>
            <div className="w-full mb-4">
              <input type="number" placeholder="Price in ETH" required onChange={(e) => setPrice(e.target.value)} className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button onClick={createNFT} className="w-full px-3 py-2 rounded-md bg-indigo-500 text-white font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">
              Create & List NFT!
            </button>
          </div>
        </div>
      ):(<div>Connect Wallet</div>)
      );
      
    }
    
    export default Create