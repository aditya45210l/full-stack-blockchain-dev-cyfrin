import { parseEther } from "viem";

export function calculateTotal(amounts: string): BigInt {
   const _amount = amounts
    .split(/[\s,]+/)
    .map(amt => parseFloat(amt.trim()))
    .filter(num => !isNaN((num)))
    .reduce((acc, curr) => acc + curr, 0)

    return BigInt(parseEther(String(_amount)));
}
