import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"
import { ed25519 } from "@noble/curves/ed25519"
import bs58 from 'bs58'

export function SignMessage() {
  const { publicKey, signMessage } = useWallet()

  const [message, setMessage] = useState('')

  const sign = async () => {
    if (!signMessage) {
      alert('wallet does not support signing messages.')
      return
    }

    const encodedMessage = new TextEncoder().encode(message)
    const signature = await signMessage(encodedMessage)

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      alert('Message signature is invalid')
    }

    alert('success', `Message signature: ${bs58.encode(signature)}`)
  }

  return (
    <div>
      {
        publicKey
        ?
        <>
          <input
            type="text"
            placeholder="Enter a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sign}>Sign Message</button>
        </>
        :
        ''
      }
    </div>
  )
}