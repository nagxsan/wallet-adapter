import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { useState } from "react"

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

export function SendTransaction() {
  const wallet = useWallet()
  const { connection } = useConnection()

  const [receiverPublicKey, setReceiverPublicKey] = useState('')
  const [sol, setSol] = useState('')

  const sendSol = async () => {
    const transaction = new Transaction()
    console.log(wallet.publicKey)
    transaction.add(SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(receiverPublicKey),
      lamports: (isNaN(Number(sol)) ? 0 : Number(sol)) * LAMPORTS_PER_SOL
    }))

    await wallet.sendTransaction(transaction, connection)
    alert('Sent ' + sol + ' to ' + receiverPublicKey)
  }

  return (
    <div>
      {
        wallet.wallet
        ?
        <>
          <input
            type="text"
            placeholder="Receiver's address"
            value={receiverPublicKey}
            onChange={(e) => setReceiverPublicKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter SOL to send"
            value={sol}
            onChange={(e) => {
              setSol(e.target.value)
            }}
          />
          <button onClick={sendSol}>Send SOL</button>
        </>
        :
        ''
      }
    </div>
  )
}