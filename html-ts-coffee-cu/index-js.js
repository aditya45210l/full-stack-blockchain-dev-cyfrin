import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
  formatEther,
} from "https://esm.sh/viem";
import { contractAddress, abi } from "./constant-js.js";

const connectButton = document.getElementById("ConnectButton");
const fundButton = document.getElementById("BuyCoffe");
const inputBalance = document.getElementById("ethAmount");
const BalanceBtn = document.getElementById("Balance");
const BalanceOutputBtn = document.getElementById("showBalance");
const withdrawalBtn = document.getElementById("WithdrawBtn");

let walletClient;
let publicClient;

connectButton.onclick = connect;
fundButton.onclick = ByMeCoffe;
BalanceBtn.onclick = getBalances;
withdrawalBtn.onclick = WithdrawBalance;

async function connect() {
  if (window.ethereum) {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    const account = await walletClient.requestAddresses();
    connectButton.innerHTML = "connected!";
    console.log(account);
  } else {
    alert("Please install metamusk");
  }
}

async function getPublicClient() {
  publicClient = await createPublicClient({
    transport: custom(window.ethereum),
  });
  // console.log("Public client generated!");
}

async function ByMeCoffe() {
  const ethEmount = inputBalance.value;
  console.log(`funding with ${ethEmount} ETH`);

  if (window.ethereum) {
    try {
      walletClient = createWalletClient({
        transport: custom(window.ethereum),
      });
      connectButton.innerHTML = "Connected!";

      await getPublicClient();
      const [connectedAccount] = await walletClient.requestAddresses();
      const currentChain = await getCurrentChain(walletClient);
      const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: abi,
        functionName: "fund",
        account: connectedAccount,
        chain: currentChain,
        value: parseEther(ethEmount),
      });
      console.log("Sending Fund Transaction...")
      const hash = await walletClient.writeContract(request);
      console.log("Transaction SuccesFully!");
      console.log( hash);
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Please install metamusk");
  }
}

async function getCurrentChain(client) {
  const chainId = await client.getChainId();
  const currentChain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://localhost:8545"],
      },
    },
  });
  return currentChain;
}
async function getBalances() {
  if (!publicClient) {
    await getPublicClient();
  }
  const balance = await publicClient.getBalance({
    address: contractAddress,
  });
  console.log(formatEther(balance));
}

async function WithdrawBalance() {
  if (window.ethereum) {
    try {
      // if ((await getBalances()) <= 0) {
      //   return;
      // }
      walletClient = await createWalletClient({
        transport: custom(window.ethereum),
      });
      await getPublicClient();
      const [account] = await walletClient.requestAddresses();
      const currentChain = await getCurrentChain(walletClient);

      const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: abi,
        functionName: "withdraw",
        account: account,
        chain: currentChain,
      });


      console.log("sending transaction...");
      const hash = await walletClient.writeContract(request);
      console.log("transaction SucessFully!");
      console.log("hash", hash);
    } catch (error) {
      console.error(error);
    }
  }
}
