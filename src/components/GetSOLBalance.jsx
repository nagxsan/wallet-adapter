import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

export function GetSOLBalance() {  
  const wallet = useWallet()
  const { connection } = useConnection()

  const [balance, setBalance] = useState(0)

  const getUserBalance = async () => {
    setBalance((await connection.getBalance(wallet.publicKey)) / LAMPORTS_PER_SOL)
  }

  useEffect(() => {
    getUserBalance()
  }, [wallet])

  return (
    <div>
      {
        wallet.wallet
        ?
        `Balance: ${balance} SOL`
        :
        ''
      }
    </div>
  )
}