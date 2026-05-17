import type { Metadata } from "next";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { WithdrawForm } from "@/components/wallet/WithdrawForm";

export const metadata: Metadata = {
  title: "Withdraw earnings",
  description: "Request a withdrawal from your Inkline wallet earnings.",
};

export default function WithdrawPage() {
  return (
    <AuthGuard>
      <WithdrawForm />
    </AuthGuard>
  );
}
