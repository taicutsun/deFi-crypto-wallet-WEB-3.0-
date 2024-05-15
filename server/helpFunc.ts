const jwt = require("jsonwebtoken");
const { ethers } = require("ethers");
const server = require("./server");
//for tokens
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token === undefined) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCSESS_TOKEN_SECRET, (err: any) => {
    if (err) {
      console.log(`err in verification acT`);
      return res.sendStatus(403);
    }
    //req.user = loginuser;
    next();
  });
}

function generateAccessToken(user: any) {
  return jwt.sign(
    { username: user.username },
    process.env.ACCSESS_TOKEN_SECRET,
    { expiresIn: "15s" }
  );
}
//for tokens

//for bc
async function getBalance(cryptoI:number):Promise<number> {
  const signer = await server.provider.getSigner(cryptoI);
  const address:string = await signer.getAddress();
  const balance: bigint = await server.provider.getBalance(address);
  const formated:number = ethers.formatEther(balance);

  //console.log("Signer's balance:", formated , "ETH");
  return formated;
}

async function sendEther(cryptoI:number, _to: string, amountInEther: string):Promise<void> {
  const amountInWei = ethers.parseEther(amountInEther);
  const signer = await server.provider.getSigner(cryptoI);
 //console.log(signer);
   
  const tx = await server.contract
    .connect(signer)
    .forwardEther(_to, { value: amountInWei });
  
 
  await tx.wait(); //mining

  const bal:number = await server.provider.getBalance(_to);
  console.log( `Ether forwarded successfully in transaction: ${tx.hash},user who was sent balance = ${bal}`);
}
 
//for bc

module.exports = {
  authenticateToken,
  generateAccessToken,
  getBalance,
  sendEther
};
