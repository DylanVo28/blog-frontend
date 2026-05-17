import type { Metadata } from "next";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { DepositForm } from "@/components/wallet/DepositForm";

export const metadata: Metadata = {
  title: "Deposit funds",
  description: "Add funds to your Inkline wallet to pay for premium questions.",
};

export default function DepositPage() {
  return (
    <AuthGuard>
      <DepositForm />
    </AuthGuard>
  );
}
