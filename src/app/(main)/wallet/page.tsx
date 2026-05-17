import type { Metadata } from "next";
import { WalletClient } from "./WalletClient";

export const metadata: Metadata = {
  title: "Wallet",
  description: "Track your Inkline wallet balance, earnings, deposits, withdrawals, and premium-question payments.",
};

export default function WalletPage() {
  return <WalletClient />;
}
