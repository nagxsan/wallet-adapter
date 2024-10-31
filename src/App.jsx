import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css"
import { RequestAirdrop } from "./components/RequestAirdrop";
import { GetSOLBalance } from "./components/GetSOLBalance";

export default function App() {
  const endpoint = clusterApiUrl('devnet')
  const wallets = []
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <RequestAirdrop />
          <GetSOLBalance />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}