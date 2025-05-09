"use client";
import { useMemo, useState } from "react";
import Input from "./UI/Input";
import { chainsToTSender, erc20Abi, tsenderAbi } from "../constants/constants";
import { useAccount, useChainId, useConfig, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "../utils";
import { parseEther } from "viem";

const AirdropForm = () => {
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [recipients, setRecipients] = useState<string>("");
  const [amounts, setAmounts] = useState<string>("");
  const chainId = useChainId();
  const account = useAccount();
  const config = useConfig();
  const totalAllowenced = useMemo(() => (calculateTotal(amounts)), [amounts]);
  const { writeContractAsync } = useWriteContract();
  // console.log("totall allowence", totalAllowenced);
  //------------------------------------------------
  const getApprovedAmount = async (tSenderAddress: string): Promise<Number> => {
    if (!tSenderAddress) {
      return 0;
    }
    const result = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address as `0x${string}`, tSenderAddress as `0x${string}`],
    });

    return result as Number;
  };
  //------------------------------------------------
  const sendToken = async (tSenderAddr: string) => {
    //------------------------------------------------
    const _amount = amounts
      .split(/[\s,]+/)
      .map((amt) => parseEther(amt.trim()))
      .filter((num) => !isNaN(Number(num)));
    console.log("from sendToken!");
    console.log("amount", _amount);
    console.log("totalAllowenced", totalAllowenced);
    //------------------------------------------------
    const _recipients = recipients
      .split(/[\s,]+/)
      .map((addr) => addr.trim())
      .filter((_addr) => _addr !== "");
    console.log(_recipients);
    //------------------------------------------------
    const sendTokenHash = await writeContractAsync({
      abi: tsenderAbi,
      address: tSenderAddr as `0x${string}`,
      functionName: "airdropERC20",
      args: [
        tokenAddress as `0x${string}`,
        _recipients,
        _amount,
        totalAllowenced,
      ],
    });
    console.log(sendTokenHash);
  };

  const handleSendToken = async () => {
    const tSenderAddress = chainsToTSender[chainId].tsender;
    const approvedAmount = await getApprovedAmount(tSenderAddress);
    console.log("appove amount", approvedAmount);
    //------------------------------------------------
    if (Number(approvedAmount) < Number(totalAllowenced)) {
      console.log("we try to allow the amount");
      //---------------------------
      const ApprovedHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [tSenderAddress as `0x${string}`, totalAllowenced],
      });
      //---------------------------
      const ApproveRecipets = await waitForTransactionReceipt(config, {
        hash: ApprovedHash,
      });
      //---------------------------
      console.log(ApprovedHash);
      console.log(ApproveRecipets);
      sendToken(tSenderAddress);
    } else {
      sendToken(tSenderAddress);
    }
    //------------------------------------------------
  };
  return (
    <div className="  my-4 max-w-11/12 mx-auto p-4 md:p-6 flex flex-col gap-4 bg-white rounded-xl ring-[4px] border-2 border-indigo-500 ring-indigo-500/25 md:my-8">
      <div>
        <Input
          lable="Token Address"
          placeHolder="0x"
          onChange={(e) => setTokenAddress(e.target.value.trim())}
          value={tokenAddress}
          large={false}
        />
      </div>

      <div>
        <Input
          lable="Recipients"
          placeHolder="0x12345, 0x67892, 0x239572,..."
          onChange={(e) => setRecipients(e.target.value)}
          value={recipients}
          large={true}
        />
      </div>

      <div>
        <Input
          lable="Amounts"
          placeHolder="100, 200, 300,..."
          onChange={(e) => setAmounts(e.target.value)}
          value={amounts}
          large={true}
        />
      </div>

      <div>
        <button
          onClick={handleSendToken}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:scale-105 hover:transition-all cursor-pointer active:scale-90 hover:bg-indigo-700 active:bg-indigo-600"
        >
          Send Tokens
        </button>
      </div>
    </div>
  );
};
export default AirdropForm;
