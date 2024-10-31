import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useState } from "react"

export function RequestAirdrop() {  
  const wallet = useWallet()
  const { connection } = useConnection()

  const [sol, setSol] = useState('')

  const requestAirdrop = () => {
    const publicKey = wallet.publicKey
    connection.requestAirdrop(publicKey, Number(sol) * LAMPORTS_PER_SOL)
  }

  return (
    <div>
      {
        wallet.wallet
        ?
        <div>
          <input
            type="text"
            placeholder="Enter SOL amount"
            value={sol}
            onChange={(e) => setSol(e.target.value)}  
          />
          <button onClick={requestAirdrop}>Request Airdrop</button>
        </div>
        :
        ''
      }
    </div>
  )
}