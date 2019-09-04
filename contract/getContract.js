const ethers = require("ethers");
const { address, ABI } = require("../constants/greeterContract");

const getProvider = ()=>{
  return ethers.getDefaultProvider('ropsten');
}
const getWallet = () => {
  var privateKey = "1B8E508257C3D12A3247FC7BB7A9AC6D6AA318B25826D880B4D3CAC48D6F6CC5";
  let provider = ethers.getDefaultProvider('ropsten');
  
  var etherInstance = new ethers.Wallet(privateKey,provider);
   return etherInstance;
};

const getContract = new Promise(function(resolve, reject) {
  const etherInstance = getWallet();
  const donationContract = new ethers.Contract(address, ABI, etherInstance.provider).connect(etherInstance);//new etherInstance.Contract(ABI, address);
  if (donationContract) resolve(donationContract);
  else reject();
});

const getCoinbase = async () => {
  const etherInstance = getWallet();
  return await etherInstance.address;
};

module.exports = { getContract, getCoinbase,getWallet,getProvider };
