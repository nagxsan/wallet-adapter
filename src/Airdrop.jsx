import { useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

export function Airdrop() {
  
  const wallet = useWallet()
  const { connection } = useConnection()

  const [airdropAmount, setAirdropAmount] = useState('')

  async function sendAirdropTuUser() {
    const publicKey = wallet.publicKey
    await connection.requestAirdrop(publicKey, Number(airdropAmount) * LAMPORTS_PER_SOL)
    alert("sol sent")
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Amount"
        value={airdropAmount}
        onChange={(e) => setAirdropAmount(e.target.value)}
      />
      <button onClick={sendAirdropTuUser}>Send Airdrop</button>
    </div>
  )
}
